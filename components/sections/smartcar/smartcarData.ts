export interface ArchitecturePhase {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  tags: string[];
  specs: { label: string; value: string }[];
}

export interface MetricItem {
  label: string;
  value: string;
  unit?: string;
  detail: string;
}

export const SMARTCAR_METRICS: MetricItem[] = [
  {
    label: "Classification Accuracy",
    value: "95.08",
    unit: "%",
    detail: "Validated on 43 distinct traffic sign classes under diverse lighting",
  },
  {
    label: "Macro F1-Score",
    value: "93.38",
    unit: "%",
    detail: "Balanced precision and recall across rare and critical road signs",
  },
  {
    label: "Edge Inference Speed",
    value: ">200",
    unit: "FPS",
    detail: "Ultralytics YOLOv8n model optimized via FP16 TensorRT / ONNX",
  },
  {
    label: "RL Environment Steps",
    value: "500K+",
    unit: "",
    detail: "PPO actor-critic training with generalized advantage estimation",
  },
];

export const SMARTCAR_PHASES: ArchitecturePhase[] = [
  {
    id: "decoupled-architecture",
    number: "01",
    title: "Perception Decoupling",
    subtitle: "Solving the Sim-to-Real Gap",
    summary:
      "Monolithic end-to-end pixel-to-torque deep networks suffer from catastrophic sample complexity, brittle failure modes, and uninterpretable black-box decisions. By decoupling high-frequency visual perception from control policy, the system converts rich RGB camera streams into compact, interpretable semantic state vectors.",
    tags: ["Decoupled Systems", "Semantic State Vectors", "Sim-to-Real"],
    specs: [
      { label: "Perception Stage", value: "YOLOv8 Nano (YOLOv8n)" },
      { label: "State Representation", value: "Continuous 14-dim Vector" },
      { label: "Update Rate", value: "60 Hz Control Loop" },
    ],
  },
  {
    id: "vision-pipeline",
    number: "02",
    title: "YOLOv8n Edge Perception",
    subtitle: "Real-Time Object & Sign Classification",
    summary:
      "Trained on comprehensive road sign datasets including regulatory, warning, and informational signs. The lightweight YOLOv8n backbone extracts bounding boxes, class probabilities, and depth/distance estimates with sub-2ms frame latency, ensuring zero latency lag for fast-moving vehicles.",
    tags: ["YOLOv8n", "FP16 Quantization", "Ultralytics", "Computer Vision"],
    specs: [
      { label: "Precision", value: "92.08%" },
      { label: "Recall", value: "95.08%" },
      { label: "Latency", value: "1.8 ms / frame" },
    ],
  },
  {
    id: "rl-control",
    number: "03",
    title: "Gymnasium PPO Navigation",
    subtitle: "Continuous Action Space Steering & Throttle",
    summary:
      "Implemented using Proximal Policy Optimization (PPO) via Stable-Baselines3 in a custom Gymnasium simulation environment. The reward function combines lane progress maximization, dynamic speed limit compliance, and high penalty multipliers for lateral drift and obstacle collision vectors.",
    tags: ["PPO", "Gymnasium", "Stable-Baselines3", "Reward Shaping"],
    specs: [
      { label: "Action Space", value: "Box(2): [Steering, Throttle]" },
      { label: "Clipping Range (ε)", value: "0.2" },
      { label: "Discount Factor (γ)", value: "0.99" },
    ],
  },
  {
    id: "evaluation-deployment",
    number: "04",
    title: "Closed-Loop Telemetry",
    subtitle: "Evaluation & Hardware Optimization",
    summary:
      "Extensive benchmark testing verified zero false-negative critical stop signs, robust obstacle avoidance under adverse weather conditions, and seamless inference on embedded edge devices like Jetson Nano and mobile edge chips.",
    tags: ["Edge Deployment", "ONNX Runtime", "Safety Redundancy"],
    specs: [
      { label: "Failure Rate", value: "< 0.02% critical misses" },
      { label: "Target Platform", value: "Edge AI / Embedded SBC" },
      { label: "Lead Engineer", value: "Arron Kian Parejas (Modeling Lead)" },
    ],
  },
];

export const SMARTCAR_GITHUB_URL = "https://github.com/darknecrocities/IntelliAIDrive";
