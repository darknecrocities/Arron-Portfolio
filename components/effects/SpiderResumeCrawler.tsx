"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* =============================================================================
   SPIDER RESUME CRAWLER
   -----------------------------------------------------------------------------
   Clicking any resume link triggers a line-art spider bot that "web-crawls" the
   whole portfolio: the page auto-scrolls to the footer while the spider follows
   with spring physics. Its 8 inverse-kinematics legs plant on real keywords
   (headings, bold text) and light them up. At the footer it inflates, pops into
   black & white confetti, and only then starts the resume download.
   ============================================================================= */

const RESUME_URL = "/projects/ArronKian_Parejas_Resume.pdf";
const RESUME_FILE = "ArronKian_Parejas_Resume.pdf";

type Vec = { x: number; y: number };
type Phase = "rewind" | "crawl" | "finale" | "pop" | "burst";

/** Where a foot is planted. If `el` is set, the foot sticks to that element
 *  (follows sticky / animated content); otherwise it uses doc coords. */
type Anchor = { el: HTMLElement | null; rx: number; ry: number; dx: number; dy: number };

type Leg = {
  side: 1 | -1;
  angle: number;
  group: 0 | 1;
  foot: Anchor;
  stepping: boolean;
  stepFrom: Vec;
  stepTo: Anchor;
  stepT: number;
  stepDur: number;
  lastPlanted: number;
};

type Confetti = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  rot: number;
  vr: number;
  black: boolean;
  phase: number;
  strip: boolean;
};

type Hud = { progress: number; count: number; word: string; burst: boolean };
const INITIAL_HUD: Hud = { progress: 0, count: 0, word: "", burst: false };

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const dist = (a: Vec, b: Vec) => Math.hypot(a.x - b.x, a.y - b.y);
const angDiff = (a: number, b: number) => Math.atan2(Math.sin(a - b), Math.cos(a - b));

function downloadResume() {
  const a = document.createElement("a");
  a.href = RESUME_URL;
  a.download = RESUME_FILE;
  a.dataset.spiderBypass = "1";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/** Prepares text nodes inside `<main>` so every individual word becomes a
 *  step target (.spider-word). Restores the original DOM on cleanup. */
function prepareWords(root: HTMLElement) {
  const spans: HTMLElement[] = [];
  const textNodes: Text[] = [];

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;

      const tag = parent.tagName.toLowerCase();
      if (["script", "style", "svg", "canvas", "noscript", "iframe", "input", "textarea"].includes(tag)) {
        return NodeFilter.FILTER_REJECT;
      }
      if (parent.closest(".spider-word") || parent.closest("[data-spider-bypass]")) {
        return NodeFilter.FILTER_REJECT;
      }
      const val = node.nodeValue;
      if (!val || !val.trim()) return NodeFilter.FILTER_SKIP;

      return NodeFilter.FILTER_ACCEPT;
    },
  });

  let cur = walker.nextNode();
  while (cur) {
    textNodes.push(cur as Text);
    cur = walker.nextNode();
  }

  for (const tn of textNodes) {
    const parent = tn.parentNode;
    if (!parent) continue;

    const text = tn.nodeValue || "";
    const tokens = text.split(/(\s+)/);
    if (tokens.length <= 1 && !/[a-zA-Z0-9]/.test(tokens[0] || "")) continue;

    let isFlexOrGrid = false;
    if (tn.parentElement) {
      try {
        const disp = window.getComputedStyle(tn.parentElement).display;
        if (disp === "flex" || disp === "inline-flex" || disp === "grid") {
          isFlexOrGrid = true;
        }
      } catch {}
    }

    const frag = document.createDocumentFragment();
    const container = isFlexOrGrid ? document.createElement("span") : null;
    if (container) container.className = "spider-flex-item";

    for (const token of tokens) {
      if (!token) continue;
      if (/^\s+$/.test(token) || !/[a-zA-Z0-9]/.test(token)) {
        (container || frag).appendChild(document.createTextNode(token));
      } else {
        const s = document.createElement("span");
        s.className = "spider-word";
        s.textContent = token;
        (container || frag).appendChild(s);
        spans.push(s);
      }
    }

    if (container) frag.appendChild(container);
    parent.replaceChild(frag, tn);
  }

  return {
    spans,
    cleanup: () => {
      for (const s of spans) {
        if (s.parentNode) {
          s.replaceWith(document.createTextNode(s.textContent || ""));
        }
      }
      root.querySelectorAll(".spider-flex-item").forEach((el) => {
        const parent = el.parentNode;
        if (parent) {
          while (el.firstChild) parent.insertBefore(el.firstChild, el);
          parent.removeChild(el);
        }
      });
      root.normalize();
    },
  };
}

export default function SpiderResumeCrawler() {
  const [active, setActive] = useState(false);
  const [closing, setClosing] = useState(false);
  const [hud, setHud] = useState<Hud>(INITIAL_HUD);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skipRef = useRef(false);

  /* ---------------------------------------------------------------------------
     1. Intercept every resume link on the page (capture phase)
     --------------------------------------------------------------------------- */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target as Element | null;
      const link = target?.closest?.("a[href$='Resume.pdf']") as HTMLAnchorElement | null;
      if (!link || link.dataset.spiderBypass) return;

      e.preventDefault();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        downloadResume();
        return;
      }
      skipRef.current = false;
      setHud(INITIAL_HUD);
      setClosing(false);
      setActive(true);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  /* ---------------------------------------------------------------------------
     2. The simulation + render loop
     --------------------------------------------------------------------------- */
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let disposed = false;
    let raf = 0;
    const timeouts: number[] = [];
    const touchTimers = new Map<HTMLElement, number>();

    // Prepare every word inside <main> so all visible words can be stepped on
    const mainEl = (document.querySelector("main") as HTMLElement | null) || document.body;
    const prepared = prepareWords(mainEl);

    // ---- Viewport / canvas -------------------------------------------------
    let vw = window.innerWidth;
    let vh = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);
    };
    resize();

    // ---- Spider dimensions (scale with viewport) ---------------------------
    const S = clamp(Math.min(vw, vh * 1.4) / 640, 1.05, 1.85);
    const L1 = 72 * S;
    const L2 = 86 * S;
    const REACH = L1 + L2;
    const MAX_STRETCH = REACH * 1.95; // legs can stretch up to 195% to reach words
    const REST = 112 * S;
    const HIP = 10 * S;
    const STEP = 54 * S;
    const SNAP = 340 * S; // wide magnetic pull to capture words
    const LEG_ANGLES = [0.42, 1.0, 1.7, 2.45];

    // ---- Scroll plan: rewind to the top first, then crawl to the footer -----
    const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const rewindFrom = window.scrollY;
    const rewindDur = rewindFrom > 20 ? clamp(rewindFrom / 5000, 0.9, 2.2) : 0;
    const crawlDur = clamp(maxScroll() / 380, 20, 42); // long and deliberate crawl
    const CRAWL_DELAY = 0.9;

    // ---- Word Index (scans active sections near viewport) -------------------
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section, main > div, main"));
    type VisibleKw = { el: HTMLElement; l: number; t: number; r: number; b: number };
    let visible: VisibleKw[] = [];
    let lastRefresh = -1;
    const refreshVisible = (now: number) => {
      if (now - lastRefresh < 65) return;
      lastRefresh = now;
      visible = [];
      const activeSections = sections.filter((sec) => {
        const r = sec.getBoundingClientRect();
        return r.bottom >= -350 && r.top <= vh + 350;
      });
      for (const sec of activeSections) {
        const words = sec.querySelectorAll<HTMLElement>(".spider-word, [data-keyword]");
        for (let i = 0; i < words.length; i++) {
          const el = words[i];
          const r = el.getBoundingClientRect();
          if (r.width < 3 || r.height < 3) continue;
          if (r.bottom < -220 || r.top > vh + 220) continue;
          visible.push({ el, l: r.left, t: r.top, r: r.right, b: r.bottom });
        }
      }
    };

    const resolve = (a: Anchor, sy: number): Vec => {
      if (a.el && a.el.isConnected) {
        const r = a.el.getBoundingClientRect();
        return { x: r.left + a.rx, y: r.top + a.ry + sy };
      }
      return { x: a.dx, y: a.dy };
    };

    const touchedAt = new WeakMap<HTMLElement, number>();
    const indexed = new Set<HTMLElement>();
    let lastWord = "";

    // ---- Spider state (spawned when the crawl starts at the top) ------------
    const body = { x: vw * 0.5, y: -170 * S, vx: 0, vy: 0 };
    let heading = Math.PI / 2;
    let prevTarget: Vec | null = null;
    const legs: Leg[] = [];
    const silk: Vec[] = [];

    /** Choose where a foot lands. Words are strongly prioritized over empty space,
     *  and unstepped words are actively preferred across the spider's path. */
    const pickAnchor = (
      want: Vec,
      reachFrom: Vec,
      sy: number,
      now: number,
      taken: Set<HTMLElement>,
      side: 1 | -1
    ): Anchor => {
      refreshVisible(now);
      let best: Anchor | null = null;
      let bestScore = SNAP;

      for (const k of visible) {
        const w = k.r - k.l;
        const px = w < 8 ? (k.l + k.r) / 2 : clamp(want.x, k.l + 3, k.r - 3);
        const pyV = (k.t + k.b) / 2;
        const p = { x: px, y: pyV + sy };

        if (dist(p, reachFrom) > MAX_STRETCH * 0.96) continue;

        // Prefer words on the leg's side of the spider body
        const xRel = (p.x - body.x) * side;
        if (xRel < -50 * S) continue;

        let score = dist(p, want);

        if (taken.has(k.el)) score += 360 * S;

        const lastTouch = touchedAt.get(k.el);
        if (lastTouch === undefined) {
          // UNTOUCHED WORD - HIGHEST STEPPING PRIORITY!
          score -= 240 * S;
        } else {
          const age = (now - lastTouch) / 1000;
          if (age < 2.5) score += 320 * S;
        }

        if (score < bestScore) {
          bestScore = score;
          best = { el: k.el, rx: px - k.l, ry: pyV - k.t, dx: p.x, dy: p.y };
        }
      }

      return best ?? { el: null, rx: 0, ry: 0, dx: want.x, dy: want.y };
    };

    const spawn = (sy: number) => {
      body.x = vw * 0.5;
      body.y = sy - 170 * S;
      body.vx = 0;
      body.vy = 0;
      heading = Math.PI / 2;
      prevTarget = null;
      legs.length = 0;
      ([-1, 1] as const).forEach((side) => {
        LEG_ANGLES.forEach((angle, k) => {
          const a = heading + side * angle;
          const p = { x: body.x + Math.cos(a) * REST, y: body.y + Math.sin(a) * REST };
          const anchor: Anchor = { el: null, rx: 0, ry: 0, dx: p.x, dy: p.y };
          legs.push({
            side,
            angle,
            group: ((k + (side > 0 ? 1 : 0)) % 2) as 0 | 1,
            foot: anchor,
            stepping: false,
            stepFrom: p,
            stepTo: anchor,
            stepT: 0,
            stepDur: 0.12,
            lastPlanted: 0,
          });
        });
      });
      silk.length = 0;
      silk.push({ x: body.x, y: sy });
    };

    let lastSilk = 0;
    const ripples: { x: number; y: number; age: number }[] = [];
    const confetti: Confetti[] = [];
    const rings: { age: number; x: number; y: number }[] = [];
    let flash = 0;

    let phase: Phase = rewindDur > 0 ? "rewind" : "crawl";
    if (phase === "crawl") spawn(window.scrollY);
    let phaseT = 0;
    let time = 0;
    let crawlT = 0;
    let last = performance.now();
    let lastHud = 0;
    let progress = 0;
    let popOrigin: Vec = { x: vw / 2, y: vh / 2 };

    // ---- Word "touch" effect (solid white box badge) ------------------------
    const touch = (el: HTMLElement, now: number) => {
      touchedAt.set(el, now);
      indexed.add(el);
      const text = (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 36);
      if (text) lastWord = text;
      el.classList.remove("spider-fade");
      el.classList.add("spider-touch");
      const prev = touchTimers.get(el);
      if (prev) window.clearTimeout(prev);
      touchTimers.set(
        el,
        window.setTimeout(() => {
          el.classList.remove("spider-touch");
          el.classList.add("spider-fade");
          touchTimers.set(
            el,
            window.setTimeout(() => {
              el.classList.remove("spider-fade");
              touchTimers.delete(el);
            }, 1800)
          );
        }, 1800)
      );
    };

    const plant = (leg: Leg, sy: number, now: number) => {
      leg.foot = leg.stepTo;
      leg.stepping = false;
      leg.lastPlanted = now;
      const p = resolve(leg.foot, sy);
      if (leg.foot.el) {
        touch(leg.foot.el, now);
        ripples.push({ x: p.x, y: p.y, age: 0 });
        if (time - lastSilk > 0.16) {
          silk.push(p);
          if (silk.length > 500) silk.shift();
          lastSilk = time;
        }
      }
    };

    // ---- Burst --------------------------------------------------------------
    const burst = (origin: Vec) => {
      flash = 1;
      rings.push({ age: 0, x: origin.x, y: origin.y }, { age: -0.12, x: origin.x, y: origin.y });
      const count = vw < 640 ? 150 : 240;
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = (350 + Math.random() * 950) * (0.7 + S * 0.4);
        confetti.push({
          x: origin.x,
          y: origin.y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 420,
          w: 5 + Math.random() * 8,
          h: 3 + Math.random() * 6,
          rot: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 16,
          black: Math.random() < 0.45,
          phase: Math.random() * Math.PI * 2,
          strip: Math.random() < 0.18,
        });
      }
      timeouts.push(window.setTimeout(downloadResume, 280));
      timeouts.push(window.setTimeout(() => setClosing(true), 2600));
      timeouts.push(window.setTimeout(() => setActive(false), 3150));
    };

    // ---- Drawing helpers ----------------------------------------------------
    const strokePath = (pts: Vec[], width: number, alpha = 1) => {
      if (pts.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.strokeStyle = `rgba(0,0,0,${0.6 * alpha})`;
      ctx.lineWidth = width + 2.5;
      ctx.stroke();
      ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
      ctx.lineWidth = width;
      ctx.stroke();
    };

    /** Two-bone IK. If the foot is beyond normal reach, both bones stretch
     *  proportionally (keeping a slight knee bend) so feet can land on words. */
    const solveKnee = (hip: Vec, foot: Vec, center: Vec): { knee: Vec; stretch: number } => {
      const dx = foot.x - hip.x;
      const dy = foot.y - hip.y;
      const raw = Math.max(1, Math.hypot(dx, dy));
      const stretch = Math.max(1, raw / (REACH * 0.94));
      const l1 = L1 * stretch;
      const l2 = L2 * stretch;
      const d = Math.min(raw, (l1 + l2) * 0.999);
      const base = Math.atan2(dy, dx);
      const a = Math.acos(clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1));
      const k1 = { x: hip.x + Math.cos(base + a) * l1, y: hip.y + Math.sin(base + a) * l1 };
      const k2 = { x: hip.x + Math.cos(base - a) * l1, y: hip.y + Math.sin(base - a) * l1 };
      // Knees always bulge away from the body
      return { knee: dist(k1, center) > dist(k2, center) ? k1 : k2, stretch };
    };

    // ---- Input blocking while crawling --------------------------------------
    const block = (e: Event) => e.preventDefault();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skipRef.current = true;
      if ([" ", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(e.key)) e.preventDefault();
    };
    window.addEventListener("wheel", block, { passive: false });
    window.addEventListener("touchmove", block, { passive: false });
    window.addEventListener("keydown", onKey);

    /* ======================================================================
       FRAME
       ====================================================================== */
    const frame = (now: number) => {
      if (disposed) return;
      const dt = clamp((now - last) / 1000, 0.001, 1 / 30);
      last = now;
      time += dt;
      phaseT += dt;
      if (window.innerWidth !== vw || window.innerHeight !== vh) resize();

      if (skipRef.current && (phase === "rewind" || phase === "crawl" || phase === "finale")) {
        if (phase === "rewind") {
          spawn(window.scrollY);
          body.y = window.scrollY + vh * 0.5;
        }
        phase = "pop";
        phaseT = 0;
      }

      // ---- Rewind: glide back to the very top before crawling ---------------
      if (phase === "rewind") {
        const p = clamp(phaseT / rewindDur, 0, 1);
        progress = 0;
        window.scrollTo({ top: rewindFrom * (1 - easeInOutSine(p)), behavior: "instant" });
        if (p >= 1) {
          window.scrollTo({ top: 0, behavior: "instant" });
          spawn(0);
          phase = "crawl";
          phaseT = 0;
        }
      }

      // ---- Auto-scroll (the crawl) -----------------------------------------
      if (phase === "crawl") {
        crawlT += dt;
        const p = clamp((crawlT - CRAWL_DELAY) / crawlDur, 0, 1);
        progress = p;
        window.scrollTo({ top: maxScroll() * easeInOutSine(p), behavior: "instant" });
        if (p >= 1) {
          phase = "finale";
          phaseT = 0;
        }
      } else if (phase === "finale" && phaseT > 0.75) {
        phase = "pop";
        phaseT = 0;
      }
      const sy = window.scrollY;

      // ---- Body physics: critically-damped spring with velocity feed-forward
      if (phase !== "burst" && phase !== "rewind") {
        let tx: number;
        let ty: number;
        if (phase === "crawl") {
          tx = vw * 0.5 + Math.sin(crawlT * 0.38) * vw * 0.26 + Math.sin(crawlT * 1.05 + 1) * vw * 0.05;
          ty = sy + vh * (0.5 + Math.sin(crawlT * 0.6) * 0.06);
        } else {
          tx = vw * 0.5;
          ty = sy + vh * 0.55;
        }
        const tv = prevTarget ? { x: (tx - prevTarget.x) / dt, y: (ty - prevTarget.y) / dt } : { x: 0, y: 0 };
        prevTarget = { x: tx, y: ty };
        const k = phase === "pop" ? 120 : 55;
        const c = 2 * Math.sqrt(k) * 0.85;
        body.vx += (k * (tx - body.x) + c * (tv.x - body.vx)) * dt;
        body.vy += (k * (ty - body.y) + c * (tv.y - body.vy)) * dt;
        body.x += body.vx * dt;
        body.y += body.vy * dt;

        const speed = Math.hypot(body.vx, body.vy);
        if (speed > 25) {
          heading += angDiff(Math.atan2(body.vy, body.vx), heading) * (1 - Math.exp(-dt * 5));
        }

        // ---- Legs: Arachnid metachronal gait + active word hunting ---------
        if (phase !== "pop") {
          const lead = { x: body.vx * 0.12, y: body.vy * 0.12 };
          const lm = Math.hypot(lead.x, lead.y);
          const maxLead = 75 * S;
          if (lm > maxLead) {
            lead.x *= maxLead / lm;
            lead.y *= maxLead / lm;
          }

          let steppingCount = 0;
          let steppingLeft = 0;
          let steppingRight = 0;
          const taken = new Set<HTMLElement>();
          for (const leg of legs) {
            if (leg.stepping) {
              steppingCount++;
              if (leg.side === -1) steppingLeft++;
              else steppingRight++;
              if (leg.stepTo.el) taken.add(leg.stepTo.el);
            } else if (leg.foot.el) {
              taken.add(leg.foot.el);
            }
          }

          // Advance legs currently in flight
          for (const leg of legs) {
            if (leg.stepping) {
              leg.stepT += dt / leg.stepDur;
              if (leg.stepT >= 1) plant(leg, sy, now);
            }
          }

          // Evaluate planted legs for steps / word strikes
          for (const leg of legs) {
            if (leg.stepping) continue;

            const a = heading + leg.side * leg.angle;
            const ideal = { x: body.x + Math.cos(a) * REST + lead.x, y: body.y + Math.sin(a) * REST + lead.y };
            const fp = resolve(leg.foot, sy);
            const d = dist(fp, ideal);
            const legDistFromBody = dist(fp, body);

            const mustStep = legDistFromBody > MAX_STRETCH * 0.95 || d > STEP * 3.4;
            const timeSincePlant = (now - leg.lastPlanted) / 1000;
            const sideStepping = leg.side === -1 ? steppingLeft : steppingRight;

            // Stable gait: at least 4 legs planted total, at most 2 stepping per side
            const canStep = mustStep || (steppingCount < 4 && sideStepping < 2);

            if (canStep) {
              const threshold = leg.foot.el ? STEP * 1.15 : STEP * 0.75;
              const movementWantsStep = d > threshold;
              const huntWantsStep = timeSincePlant > 0.13;

              if (movementWantsStep || huntWantsStep || mustStep) {
                const want = { x: ideal.x + lead.x * 0.7, y: ideal.y + lead.y * 0.7 };
                const reachFrom = { x: body.x + lead.x * 1.2, y: body.y + lead.y * 1.2 };
                if (leg.foot.el) taken.delete(leg.foot.el);

                const targetAnchor = pickAnchor(want, reachFrom, sy, now, taken, leg.side);

                const foundWord = !!targetAnchor.el;
                const isUntouchedWord = foundWord && !touchedAt.has(targetAnchor.el!);

                // Step if forced by movement, or if an untouched word was targeted
                if (movementWantsStep || mustStep || isUntouchedWord) {
                  leg.stepFrom = fp;
                  leg.stepTo = targetAnchor;
                  if (leg.stepTo.el) taken.add(leg.stepTo.el);
                  leg.stepDur = clamp(0.18 - speed * 0.00008, 0.11, 0.19);
                  leg.stepT = 0;
                  leg.stepping = true;
                  steppingCount++;
                  if (leg.side === -1) steppingLeft++;
                  else steppingRight++;
                }
              }
            }
          }
        }

        if (phase === "pop" && phaseT >= 0.4) {
          popOrigin = { x: body.x, y: body.y - sy };
          phase = "burst";
          phaseT = 0;
          burst(popOrigin);
        }
      }

      // ---- HUD (throttled React updates) ------------------------------------
      if (now - lastHud > 90) {
        lastHud = now;
        setHud({
          progress,
          count: indexed.size,
          word: phase === "rewind" ? "ascending to top…" : lastWord,
          burst: phase === "burst",
        });
      }

      /* ---------------------------- RENDER ---------------------------- */
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, vw, vh);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const V = (p: Vec): Vec => ({ x: p.x, y: p.y - sy });

      if (phase !== "burst" && phase !== "rewind") {
        const popE = phase === "pop" ? easeOutCubic(clamp(phaseT / 0.4, 0, 1)) : 0;
        const center = V(body);

        // Silk trail + dragline
        const silkPts = silk.map(V).filter((p) => p.y > -400 && p.y < vh + 400);
        silkPts.push(center);
        ctx.setLineDash([]);
        strokePath(silkPts, 0.8, 0.28);
        for (const p of silkPts) {
          ctx.fillStyle = "rgba(255,255,255,0.35)";
          ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
        }

        // Scanner ring
        ctx.save();
        ctx.setLineDash([3 * S, 9 * S]);
        ctx.lineDashOffset = -time * 40;
        ctx.strokeStyle = "rgba(255,255,255,0.12)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(center.x, center.y, REACH * 0.92, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Legs
        for (const leg of legs) {
          let foot: Vec;
          let lifted = 0;
          if (leg.stepping) {
            const t = clamp(leg.stepT, 0, 1);
            const to = resolve(leg.stepTo, sy);
            const e = easeOutCubic(t);
            foot = { x: leg.stepFrom.x + (to.x - leg.stepFrom.x) * e, y: leg.stepFrom.y + (to.y - leg.stepFrom.y) * e };
            lifted = Math.sin(Math.PI * t);
            const dx = foot.x - body.x;
            const dy = foot.y - body.y;
            const dl = Math.hypot(dx, dy) || 1;
            foot.x += (dx / dl) * lifted * 14 * S;
            foot.y += (dy / dl) * lifted * 14 * S;
          } else {
            foot = resolve(leg.foot, sy);
          }
          foot = V(foot);
          if (popE > 0) {
            foot = { x: foot.x + (center.x - foot.x) * popE * 0.75, y: foot.y + (center.y - foot.y) * popE * 0.75 };
          }
          const ha = heading + leg.side * leg.angle * 0.55;
          const hip = { x: center.x + Math.cos(ha) * HIP, y: center.y + Math.sin(ha) * HIP };
          const { knee, stretch } = solveKnee(hip, foot, center);
          strokePath([hip, knee, foot], (1.5 / Math.sqrt(stretch)) * Math.max(S, 0.8));
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(knee.x, knee.y, 1.6 * S, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(foot.x, foot.y, (2.2 + lifted * 1.6) * S, 0, Math.PI * 2);
          ctx.fill();
        }

        // Body
        const jitter = popE * 3 * S;
        const cx = center.x + (Math.random() - 0.5) * jitter;
        const cy = center.y + (Math.random() - 0.5) * jitter;
        const s = 1 + popE * 0.9;
        const f = { x: Math.cos(heading), y: Math.sin(heading) };
        const pp = { x: -f.y, y: f.x };

        const outline = () => {
          ctx.fillStyle = "#000";
          ctx.fill();
          ctx.strokeStyle = "rgba(0,0,0,0.6)";
          ctx.lineWidth = 4;
          ctx.stroke();
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 1.6;
          ctx.stroke();
        };

        // Abdomen
        const ab = { x: cx - f.x * 18 * S * s, y: cy - f.y * 18 * S * s };
        ctx.beginPath();
        ctx.ellipse(ab.x, ab.y, 19 * S * s, 13 * S * s, heading, 0, Math.PI * 2);
        outline();
        // Abdomen markings (chevrons)
        ctx.strokeStyle = "rgba(255,255,255,0.75)";
        ctx.lineWidth = 1;
        for (let i = -1; i <= 1; i++) {
          const m = { x: ab.x + f.x * i * 6 * S * s, y: ab.y + f.y * i * 6 * S * s };
          ctx.beginPath();
          ctx.moveTo(m.x - f.x * 3 * S * s + pp.x * 5 * S * s, m.y - f.y * 3 * S * s + pp.y * 5 * S * s);
          ctx.lineTo(m.x, m.y);
          ctx.lineTo(m.x - f.x * 3 * S * s - pp.x * 5 * S * s, m.y - f.y * 3 * S * s - pp.y * 5 * S * s);
          ctx.stroke();
        }

        // Cephalothorax
        const head = { x: cx + f.x * 6 * S * s, y: cy + f.y * 6 * S * s };
        ctx.beginPath();
        ctx.arc(head.x, head.y, 10 * S * s, 0, Math.PI * 2);
        outline();

        // Pedipalps
        for (const side of [-1, 1]) {
          strokePath(
            [
              { x: head.x + f.x * 8 * S * s + pp.x * side * 3 * S, y: head.y + f.y * 8 * S * s + pp.y * side * 3 * S },
              { x: head.x + f.x * 17 * S * s + pp.x * side * 6 * S, y: head.y + f.y * 17 * S * s + pp.y * side * 6 * S },
            ],
            1.2
          );
        }

        // Eyes (blink every few seconds)
        const blink = Math.sin(time * 1.7) > 0.985 ? 0.3 : 1;
        ctx.fillStyle = "#fff";
        for (const side of [-1, 1]) {
          ctx.beginPath();
          ctx.ellipse(
            head.x + f.x * 5 * S * s + pp.x * side * 3.6 * S * s,
            head.y + f.y * 5 * S * s + pp.y * side * 3.6 * S * s,
            1.9 * S * s,
            1.9 * S * s * blink,
            heading,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }

      // Contact ripples (keyword touches)
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.age += dt;
        if (r.age > 0.6) {
          ripples.splice(i, 1);
          continue;
        }
        const p = V(r);
        const k = r.age / 0.6;
        ctx.strokeStyle = `rgba(255,255,255,${(1 - k) * 0.85})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4 * S + k * 34 * S, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Burst: flash, shockwaves, confetti
      if (flash > 0) {
        ctx.fillStyle = `rgba(255,255,255,${flash * 0.35})`;
        ctx.fillRect(0, 0, vw, vh);
        flash = Math.max(0, flash - dt * 4);
      }
      for (const ring of rings) {
        ring.age += dt;
        if (ring.age <= 0 || ring.age > 0.9) continue;
        const k = easeOutCubic(ring.age / 0.9);
        ctx.strokeStyle = `rgba(255,255,255,${(1 - k) * 0.9})`;
        ctx.lineWidth = 2.5 * (1 - k) + 0.5;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, k * Math.max(vw, vh) * 0.6, 0, Math.PI * 2);
        ctx.stroke();
      }
      for (const c of confetti) {
        const drag = Math.exp(-dt * 1.7);
        c.vx *= drag;
        c.vy = c.vy * drag + 1250 * dt;
        c.x += c.vx * dt + Math.sin(time * 6 + c.phase) * 28 * dt;
        c.y += c.vy * dt;
        c.rot += c.vr * dt;
        if (c.y > vh + 40) continue;
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rot);
        const flip = Math.abs(Math.cos(time * 7 + c.phase));
        const w = c.strip ? 2 : c.w;
        const h = (c.strip ? c.w * 2.2 : c.h) * (0.25 + flip * 0.75);
        ctx.fillStyle = c.black ? "#000" : "#fff";
        ctx.fillRect(-w / 2, -h / 2, w, h);
        if (c.black) {
          ctx.strokeStyle = "rgba(255,255,255,0.85)";
          ctx.lineWidth = 0.8;
          ctx.strokeRect(-w / 2, -h / 2, w, h);
        }
        ctx.restore();
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      timeouts.forEach((t) => window.clearTimeout(t));
      touchTimers.forEach((t, el) => {
        window.clearTimeout(t);
        el.classList.remove("spider-touch", "spider-fade");
      });
      touchTimers.clear();
      prepared.cleanup();
      window.removeEventListener("wheel", block);
      window.removeEventListener("touchmove", block);
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      className={`fixed inset-0 z-[9998] transition-opacity duration-500 ${closing ? "opacity-0" : "opacity-100"}`}
      role="dialog"
      aria-modal="true"
      aria-label="Resume download animation"
    >
      <div className="absolute inset-0 bg-black/15" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Crawl progress line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10">
        <div className="h-full bg-white transition-[width] duration-100" style={{ width: `${hud.progress * 100}%` }} />
      </div>

      {/* Crawler telemetry HUD */}
      <div
        className="absolute top-20 left-4 sm:left-6 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-300 bg-black/75 border border-white/15 px-3 py-2 backdrop-blur-sm select-none"
        aria-live="polite"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>spider.crawl // indexing portfolio</span>
        </div>
        <div className="text-white mt-1">
          {hud.count} words indexed · {Math.round(hud.progress * 100)}%
        </div>
        <div className="text-zinc-500 normal-case tracking-normal mt-1 truncate max-w-[240px]">
          &gt; {hud.word ? `touched "${hud.word}"` : "deploying crawler…"}
        </div>
      </div>

      {/* Skip */}
      {!hud.burst && (
        <button
          onClick={() => {
            skipRef.current = true;
          }}
          className="absolute bottom-6 right-6 font-mono text-[11px] uppercase tracking-widest text-white border border-white/30 bg-black/70 px-3 py-1.5 hover:bg-white hover:text-black transition-colors cursor-pointer"
        >
          Skip · Esc
        </button>
      )}

      {/* Pop card */}
      {hud.burst && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.1 }}
            className="bg-black border border-white px-6 py-5 text-center font-mono shadow-[0_0_60px_rgba(255,255,255,0.15)]"
          >
            <div className="text-white text-sm sm:text-base font-bold uppercase tracking-widest">✓ Crawl complete</div>
            <div className="text-zinc-400 text-[11px] mt-1.5">
              {hud.count} words indexed · downloading résumé…
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
