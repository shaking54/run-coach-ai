export type MuscleType =
  | "quadriceps"
  | "hamstrings"
  | "glutes"
  | "calves"
  | "hip-flexors"
  | "adductors"
  | "lower-back"
  | "core";

export interface MuscleInfo {
  id: MuscleType;
  name: string;
  description: string;
  commonInjuries: string[];
  warmUp: string[];
  stretching: string[];
  recovery: string[];
  canRunTomorrow: {
    answer: string;
    confidence: number;
  };
}

export const muscleData: Record<MuscleType, MuscleInfo> = {
  quadriceps: {
    id: "quadriceps",
    name: "Quadriceps",
    description:
      "Large muscle group on the front of your thigh, essential for running power and knee extension.",
    commonInjuries: ["Quad strain", "Tendinitis", "Muscle tear"],
    warmUp: [
      "Light jogging for 5-10 minutes",
      "Leg swings front to back",
      "Walking lunges",
    ],
    stretching: [
      "Standing quad stretch (hold 30 seconds each leg)",
      "Kneeling hip flexor stretch",
      "Foam roll quads for 2 minutes",
    ],
    recovery: [
      "Ice for 15 minutes if swollen",
      "Gentle massage",
      "Avoid high-intensity running for 48 hours",
      "Consider cross-training (swimming, cycling)",
    ],
    canRunTomorrow: {
      answer: "Light run possible if pain-free. Avoid speedwork.",
      confidence: 65,
    },
  },
  hamstrings: {
    id: "hamstrings",
    name: "Hamstrings",
    description:
      "Muscles on the back of your thigh, crucial for knee flexion and hip extension during running.",
    commonInjuries: ["Hamstring strain", "Pull or tear", "Tendinopathy"],
    warmUp: [
      "Dynamic leg swings",
      "High knees",
      "Butt kicks",
      "Gradual pace increase",
    ],
    stretching: [
      "Seated hamstring stretch",
      "Standing forward bend",
      "Single-leg deadlift stretch",
    ],
    recovery: [
      "RICE method (Rest, Ice, Compression, Elevation)",
      "Avoid sudden acceleration",
      "Strengthen with eccentric exercises after acute phase",
    ],
    canRunTomorrow: {
      answer: "Rest recommended. Wait 48-72 hours for minor strains.",
      confidence: 40,
    },
  },
  glutes: {
    id: "glutes",
    name: "Glutes",
    description:
      "Your powerhouse muscles for running, providing hip extension and stability.",
    commonInjuries: ["Gluteal strain", "Piriformis syndrome", "Bursitis"],
    warmUp: [
      "Glute bridges",
      "Clamshells",
      "Lateral band walks",
      "Easy running with focus on activation",
    ],
    stretching: [
      "Pigeon pose",
      "Figure-four stretch",
      "Seated spinal twist",
    ],
    recovery: [
      "Foam rolling glutes and IT band",
      "Strengthen with single-leg exercises",
      "Address biomechanics if recurring",
    ],
    canRunTomorrow: {
      answer: "Possible if no sharp pain. Monitor for compensation patterns.",
      confidence: 70,
    },
  },
  calves: {
    id: "calves",
    name: "Calves",
    description:
      "Critical for push-off during running. Includes gastrocnemius and soleus muscles.",
    commonInjuries: ["Calf strain", "Achilles tendinitis", "Muscle tear"],
    warmUp: [
      "Ankle circles",
      "Calf raises on stairs",
      "Gradual running warm-up",
    ],
    stretching: [
      "Wall calf stretch (straight and bent knee)",
      "Downward dog pose",
      "Eccentric calf drops",
    ],
    recovery: [
      "Ice and elevation",
      "Avoid running on toes",
      "Gradual return with flat terrain",
      "Check shoe cushioning",
    ],
    canRunTomorrow: {
      answer: "Rest 24-48 hours for minor strains. Risk of Achilles injury if rushed.",
      confidence: 35,
    },
  },
  "hip-flexors": {
    id: "hip-flexors",
    name: "Hip Flexors",
    description:
      "Muscles that lift your knee during running. Often tight in runners and desk workers.",
    commonInjuries: ["Hip flexor strain", "Tendinitis", "Iliopsoas syndrome"],
    warmUp: [
      "Leg swings",
      "Hip circles",
      "Walking lunges with rotation",
    ],
    stretching: [
      "Kneeling hip flexor stretch",
      "Low lunge pose",
      "Lying hip flexor stretch",
    ],
    recovery: [
      "Avoid excessive sitting",
      "Strengthen glutes to reduce compensation",
      "Massage and foam rolling",
    ],
    canRunTomorrow: {
      answer: "Light jogging okay if no sharp pain during hip flexion.",
      confidence: 60,
    },
  },
  adductors: {
    id: "adductors",
    name: "Adductors",
    description:
      "Inner thigh muscles that stabilize your leg during running and prevent overstriding.",
    commonInjuries: ["Groin strain", "Adductor tendinopathy", "Muscle pull"],
    warmUp: [
      "Side lunges",
      "Lateral leg swings",
      "Gradual acceleration",
    ],
    stretching: [
      "Butterfly stretch",
      "Wide-leg forward fold",
      "Side lunge stretch",
    ],
    recovery: [
      "Avoid lateral movements",
      "Ice for acute pain",
      "Strengthen with controlled exercises",
    ],
    canRunTomorrow: {
      answer: "Rest 2-3 days for groin strains. High re-injury risk.",
      confidence: 30,
    },
  },
  "lower-back": {
    id: "lower-back",
    name: "Lower Back",
    description:
      "Provides stability and power transfer during running. Core weakness often contributes to pain.",
    commonInjuries: ["Lumbar strain", "Disc issues", "Muscle spasm"],
    warmUp: [
      "Cat-cow stretches",
      "Pelvic tilts",
      "Gentle torso rotation",
    ],
    stretching: [
      "Child's pose",
      "Knee-to-chest stretch",
      "Spinal twist",
    ],
    recovery: [
      "Avoid running until pain subsides",
      "Core strengthening exercises",
      "Check running form and posture",
      "Consider professional evaluation",
    ],
    canRunTomorrow: {
      answer: "Not recommended. Back injuries need careful recovery.",
      confidence: 20,
    },
  },
  core: {
    id: "core",
    name: "Core",
    description:
      "Your body's foundation for stability, balance, and efficient running form.",
    commonInjuries: ["Abdominal strain", "Oblique strain", "Side stitch (cramp)"],
    warmUp: [
      "Planks",
      "Bird dogs",
      "Mountain climbers",
      "Torso rotation",
    ],
    stretching: [
      "Cobra pose",
      "Side bend stretch",
      "Torso rotation stretch",
    ],
    recovery: [
      "Rest from high-intensity core work",
      "Gentle breathing exercises",
      "Gradually rebuild core strength",
    ],
    canRunTomorrow: {
      answer: "Likely okay if just muscle soreness. Avoid if sharp pain.",
      confidence: 75,
    },
  },
};
