#!/usr/bin/env python3
"""
Generates an expressive, high-resolution looping animated GIF of the cat mascot
from the user's artwork (public/mascot/peeking_mascot.png).

Animations:
- Swaying curly tail (sine-wave rotation around base)
- Flame tip glow pulse
- Gentle breathing / bobbing body
- Smooth cartoon eye blink on frames 7 and 8
"""

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

def generate_gif():
    source_path = "public/mascot/peeking_mascot.png"
    out_path = "public/mascot/cat_mascot_animated.gif"

    base = Image.open(source_path)
    W, H = base.size
    arr = np.array(base).astype(float)

    # Tail and body separation:
    # Tail is mostly x < 450 with soft transition between 400 and 460
    x_coords = np.arange(W)
    tail_weight = np.clip((460 - x_coords) / 60.0, 0, 1)

    tail_arr = arr * tail_weight[None, :, None]
    body_arr = arr * (1.0 - tail_weight[None, :, None])

    tail_img = Image.fromarray(tail_arr.astype(np.uint8), mode="RGBA")
    body_img = Image.fromarray(body_arr.astype(np.uint8), mode="RGBA")

    # Scale down slightly for optimized web loading while staying crisp
    target_width = 460
    target_height = int(H * (target_width / float(W)))
    scale_factor = target_width / float(W)

    tail_scaled = tail_img.resize((target_width, target_height), Image.Resampling.LANCZOS)
    body_scaled = body_img.resize((target_width, target_height), Image.Resampling.LANCZOS)

    # Scaled pivot points:
    tail_pivot = (int(420 * scale_factor), int(700 * scale_factor))
    flame_pos = (int(120 * scale_factor), int(95 * scale_factor))

    # Eye coordinates in scaled image:
    # Left eye: (670, 540), Right eye: (746, 540)
    lex = int(670 * scale_factor)
    ley = int(540 * scale_factor)
    rex = int(746 * scale_factor)
    rey = int(540 * scale_factor)
    eye_radius_x = int(24 * scale_factor)
    eye_radius_y = int(32 * scale_factor)

    frames = []
    NUM_FRAMES = 16

    for i in range(NUM_FRAMES):
        t = (i / float(NUM_FRAMES)) * 2 * np.pi

        # 1. Tail Sway: natural wagging sine curve
        tail_rot = np.sin(t) * 5.2
        rot_tail = tail_scaled.rotate(tail_rot, center=tail_pivot, resample=Image.Resampling.BICUBIC)

        # 2. Body breathing bob
        body_dy = int(np.cos(t) * 5)

        # 3. Canvas assembly with breathing margin
        canvas_w = target_width + 24
        canvas_h = target_height + 24
        frame = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))

        # Paste tail
        frame.paste(rot_tail, (12, 12), rot_tail)

        # Body frame
        cur_body = body_scaled.copy()

        # Eye blink on frame 7 and 8
        if i in [7, 8]:
            # Close eyes into happy anime arcs
            draw_eye = ImageDraw.Draw(cur_body)
            # Cover open pupils with face orange color [255, 181, 107]
            face_color = (255, 181, 107, 255)
            line_color = (75, 35, 37, 255)
            # Left eye cover & arc
            draw_eye.ellipse([lex - eye_radius_x, ley - eye_radius_y, lex + eye_radius_x, ley + eye_radius_y], fill=face_color)
            draw_eye.arc([lex - eye_radius_x, ley - 10, lex + eye_radius_x, ley + 16], start=200, end=340, fill=line_color, width=4)
            # Right eye cover & arc
            draw_eye.ellipse([rex - eye_radius_x, rey - eye_radius_y, rex + eye_radius_x, rey + eye_radius_y], fill=face_color)
            draw_eye.arc([rex - eye_radius_x, rey - 10, rex + eye_radius_x, rey + 16], start=200, end=340, fill=line_color, width=4)

        # Paste body
        frame.paste(cur_body, (12, 12 + body_dy), cur_body)

        # 4. Flame tip glow pulse
        glow_r = int((10 + np.sin(t * 2) * 5) * scale_factor)
        glow_layer = Image.new("RGBA", frame.size, (0, 0, 0, 0))
        draw_glow = ImageDraw.Draw(glow_layer)
        fx, fy = flame_pos[0] + 12, flame_pos[1] + 12
        draw_glow.ellipse([fx - glow_r, fy - glow_r, fx + glow_r, fy + glow_r], fill=(255, 150, 0, 50))
        glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(radius=5))
        frame = Image.alpha_composite(frame, glow_layer)

        frames.append(frame)

    # Save as optimized looping animated GIF with transparency
    frames[0].save(
        out_path,
        save_all=True,
        append_images=frames[1:],
        duration=95,
        loop=0,
        disposal=2,
    )
    print(f"Successfully generated {out_path} ({len(frames)} frames)")

if __name__ == "__main__":
    generate_gif()
