export type MuscleType =
  | "quadriceps"
  | "hamstrings"
  | "glutes"
  | "calves"
  | "hip-flexors"
  | "adductors"
  | "lower-back"
  | "core"
  | "trapezius"
  | "upper-back"
  | "chest"
  | "biceps"
  | "triceps"
  | "forearm"
  | "deltoids"
  | "abductors"
  | "neck"
  | "knee";

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
  trapezius: {
    id: "trapezius",
    name: "Trapezius",
    description:
      "Upper back and shoulder muscles that support proper running posture and arm swing mechanics.",
    commonInjuries: ["Muscle tension", "Trigger points", "Postural strain"],
    warmUp: [
      "Shoulder rolls",
      "Arm circles",
      "Neck rotations",
      "Cross-body arm stretches",
    ],
    stretching: [
      "Upper trapezius stretch",
      "Shoulder shrugs and releases",
      "Doorway chest stretch",
    ],
    recovery: [
      "Massage or foam rolling",
      "Heat therapy for tension",
      "Posture correction exercises",
      "Reduce shoulder tension during runs",
    ],
    canRunTomorrow: {
      answer: "Yes, running usually okay. Focus on relaxed shoulders.",
      confidence: 85,
    },
  },
  "upper-back": {
    id: "upper-back",
    name: "Upper Back",
    description:
      "Thoracic spine muscles that maintain upright posture and support breathing efficiency during running.",
    commonInjuries: ["Thoracic strain", "Postural dysfunction", "Muscle fatigue"],
    warmUp: [
      "Thoracic rotations",
      "Cat-cow stretches",
      "Arm circles",
      "Shoulder blade squeezes",
    ],
    stretching: [
      "Child's pose",
      "Thread the needle stretch",
      "Seated spinal twist",
    ],
    recovery: [
      "Foam rolling thoracic spine",
      "Strengthen postural muscles",
      "Check running form and posture",
      "Ergonomic workspace setup",
    ],
    canRunTomorrow: {
      answer: "Usually okay for easy runs. Avoid if breathing is restricted.",
      confidence: 80,
    },
  },
  chest: {
    id: "chest",
    name: "Chest",
    description:
      "Pectoral muscles that assist with arm swing and can affect breathing mechanics if tight.",
    commonInjuries: ["Muscle strain", "Tightness from poor posture", "Breathing restriction"],
    warmUp: [
      "Arm swings",
      "Chest openers",
      "Light arm circles",
      "Dynamic stretches",
    ],
    stretching: [
      "Doorway chest stretch",
      "Lying chest stretch",
      "Foam rolling pecs",
    ],
    recovery: [
      "Stretch regularly if desk worker",
      "Strengthen upper back to balance",
      "Focus on breathing exercises",
      "Maintain open chest posture while running",
    ],
    canRunTomorrow: {
      answer: "Yes, chest soreness rarely limits running ability.",
      confidence: 90,
    },
  },
  biceps: {
    id: "biceps",
    name: "Biceps",
    description:
      "Front arm muscles that help control arm swing angle. Can fatigue on long runs with poor form.",
    commonInjuries: ["Muscle fatigue", "Tendinitis", "Strain from carrying items"],
    warmUp: [
      "Arm swings",
      "Dynamic arm stretches",
      "Light mobility work",
    ],
    stretching: [
      "Standing bicep stretch",
      "Doorway bicep stretch",
      "Wrist and forearm stretches",
    ],
    recovery: [
      "Rest from strength training",
      "Light massage",
      "Focus on relaxed arm swing",
      "Keep arms at 90-degree angle while running",
    ],
    canRunTomorrow: {
      answer: "Yes, bicep soreness won't impact running performance.",
      confidence: 95,
    },
  },
  triceps: {
    id: "triceps",
    name: "Triceps",
    description:
      "Back arm muscles that assist with arm drive during running. Important for powerful uphill running.",
    commonInjuries: ["Muscle fatigue", "Strain", "Overuse from strength training"],
    warmUp: [
      "Arm circles",
      "Overhead reaches",
      "Dynamic arm movements",
    ],
    stretching: [
      "Overhead tricep stretch",
      "Cross-body arm stretch",
      "Wall tricep stretch",
    ],
    recovery: [
      "Rest from upper body workouts",
      "Light stretching",
      "Reduce tension in arm swing",
      "Maintain relaxed shoulders while running",
    ],
    canRunTomorrow: {
      answer: "Yes, tricep soreness doesn't affect running ability.",
      confidence: 95,
    },
  },
  forearm: {
    id: "forearm",
    name: "Forearm",
    description:
      "Controls hand position and grip tension. Often tight from clenched fists during stressful runs.",
    commonInjuries: ["Muscle tension", "Forearm strain", "Carpal tunnel issues"],
    warmUp: [
      "Wrist circles",
      "Finger flexion/extension",
      "Forearm shakes",
    ],
    stretching: [
      "Wrist flexor stretch",
      "Wrist extensor stretch",
      "Prayer stretch",
    ],
    recovery: [
      "Massage and stretching",
      "Avoid clenching fists while running",
      "Keep hands relaxed and loose",
      "Ergonomic mouse/keyboard if desk worker",
    ],
    canRunTomorrow: {
      answer: "Yes, forearm tension won't limit running.",
      confidence: 95,
    },
  },
  deltoids: {
    id: "deltoids",
    name: "Deltoids",
    description:
      "Shoulder muscles crucial for efficient arm swing and maintaining rhythm during running.",
    commonInjuries: ["Shoulder strain", "Impingement", "Fatigue from poor mechanics"],
    warmUp: [
      "Arm circles forward and backward",
      "Shoulder rolls",
      "Cross-body arm swings",
      "Light mobility drills",
    ],
    stretching: [
      "Cross-body shoulder stretch",
      "Doorway shoulder stretch",
      "Overhead shoulder stretch",
    ],
    recovery: [
      "Ice if inflamed",
      "Reduce arm tension during runs",
      "Strengthen rotator cuff",
      "Focus on relaxed, natural arm swing",
    ],
    canRunTomorrow: {
      answer: "Usually yes. Avoid if sharp shoulder pain during arm movement.",
      confidence: 80,
    },
  },
  abductors: {
    id: "abductors",
    name: "Abductors",
    description:
      "Outer hip and thigh muscles that stabilize the pelvis and prevent knee collapse during running.",
    commonInjuries: ["Hip abductor weakness", "IT band syndrome", "Lateral hip pain"],
    warmUp: [
      "Lateral leg swings",
      "Monster walks with resistance band",
      "Side-lying leg lifts",
      "Hip circles",
    ],
    stretching: [
      "IT band stretch",
      "Standing side hip stretch",
      "Pigeon pose variations",
    ],
    recovery: [
      "Strengthen with lateral movements",
      "Foam roll IT band and outer thigh",
      "Single-leg balance exercises",
      "Address running form if recurring",
    ],
    canRunTomorrow: {
      answer: "Possible if no sharp pain. Monitor for hip drop or instability.",
      confidence: 65,
    },
  },
  neck: {
    id: "neck",
    name: "Neck",
    description:
      "Supports head position and can become tense from poor running posture or looking down at devices.",
    commonInjuries: ["Neck strain", "Tension headaches", "Postural dysfunction"],
    warmUp: [
      "Gentle neck rotations",
      "Neck tilts side to side",
      "Chin tucks",
      "Shoulder rolls",
    ],
    stretching: [
      "Neck side bends",
      "Forward neck stretch",
      "Upper trap stretch",
    ],
    recovery: [
      "Heat for muscle tension",
      "Gentle massage",
      "Improve running posture (eyes forward)",
      "Reduce phone/computer time",
      "Consider professional evaluation if persistent",
    ],
    canRunTomorrow: {
      answer: "Usually okay. Focus on keeping head neutral and eyes forward.",
      confidence: 85,
    },
  },
  knee: {
    id: "knee",
    name: "Knee",
    description:
      "The knee joint is the most commonly injured area in running. It absorbs 3-5x your body weight with each stride and is vulnerable to overuse injuries.",
    commonInjuries: [
      "Runner's knee (patellofemoral pain syndrome)",
      "IT band syndrome",
      "Patellar tendinitis (jumper's knee)",
      "Meniscus tear",
      "Knee bursitis",
      "Plica syndrome",
    ],
    warmUp: [
      "Leg swings (forward/back and side to side)",
      "Walking lunges",
      "Leg circles",
      "Gentle knee flexion/extension",
      "Start with slow, easy pace for 10 minutes",
    ],
    stretching: [
      "Quad stretch (standing or lying)",
      "Hamstring stretch",
      "IT band stretch (standing or foam roll)",
      "Hip flexor stretch",
      "Calf stretch",
    ],
    recovery: [
      "RICE method (Rest, Ice, Compression, Elevation)",
      "Avoid running on cambered surfaces",
      "Strengthen surrounding muscles (quads, hamstrings, hips)",
      "Check running shoes for proper support and cushioning",
      "Reduce mileage and avoid hills/speedwork",
      "Consider gait analysis if pain persists",
      "See a sports medicine doctor if pain is severe or lasting >2 weeks",
    ],
    canRunTomorrow: {
      answer: "Not recommended if painful. Knee injuries worsen quickly with continued running. Rest 3-7 days minimum.",
      confidence: 25,
    },
  },
};
