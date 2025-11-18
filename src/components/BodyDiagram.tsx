import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MuscleType } from "@/types/muscle";
import { FlipHorizontal } from "lucide-react";
import bodyAnatomyFront from "@/assets/body-anatomy-front.png";

interface BodyDiagramProps {
  selectedMuscle: MuscleType | null;
  onMuscleSelect: (muscle: MuscleType) => void;
}

type ViewMode = "front" | "back";

// Define clickable regions as percentage coordinates on the image
interface MuscleRegion {
  id: MuscleType;
  name: string;
  // SVG path for clickable area
  path: string;
  labelPosition: { x: string; y: string };
}

export const BodyDiagram = ({ selectedMuscle, onMuscleSelect }: BodyDiagramProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>("front");
  const [hoveredMuscle, setHoveredMuscle] = useState<MuscleType | null>(null);

  // Define clickable regions for front view (based on anatomical positions in the image)
  const frontMuscles: MuscleRegion[] = [
    {
      id: "quadriceps",
      name: "Quadriceps",
      path: "M 45 62 L 55 62 L 56 75 L 44 75 Z", // Front thigh area
      labelPosition: { x: "50", y: "68" },
    },
    {
      id: "hip-flexors",
      name: "Hip Flexors",
      path: "M 44 55 L 56 55 L 56 62 L 44 62 Z", // Hip/groin area
      labelPosition: { x: "50", y: "58" },
    },
    {
      id: "adductors",
      name: "Adductors",
      path: "M 42 62 L 44 62 L 44 74 L 42 72 Z M 56 62 L 58 62 L 58 72 L 56 74 Z", // Inner thighs
      labelPosition: { x: "40", y: "68" },
    },
    {
      id: "core",
      name: "Core",
      path: "M 42 42 L 58 42 L 58 54 L 42 54 Z", // Abdominal area
      labelPosition: { x: "50", y: "48" },
    },
    {
      id: "calves",
      name: "Calves",
      path: "M 44 76 L 48 76 L 48 88 L 44 87 Z M 52 76 L 56 76 L 56 87 L 52 88 Z", // Lower legs
      labelPosition: { x: "50", y: "82" },
    },
  ];

  // Define clickable regions for back view
  const backMuscles: MuscleRegion[] = [
    {
      id: "hamstrings",
      name: "Hamstrings",
      path: "M 44 62 L 56 62 L 56 76 L 44 76 Z", // Back thigh area
      labelPosition: { x: "50", y: "68" },
    },
    {
      id: "glutes",
      name: "Glutes",
      path: "M 42 54 L 58 54 L 58 62 L 42 62 Z", // Buttocks area
      labelPosition: { x: "50", y: "58" },
    },
    {
      id: "lower-back",
      name: "Lower Back",
      path: "M 44 44 L 56 44 L 56 54 L 44 54 Z", // Lower back area
      labelPosition: { x: "50", y: "49" },
    },
    {
      id: "calves",
      name: "Calves",
      path: "M 44 76 L 48 76 L 48 88 L 44 87 Z M 52 76 L 56 76 L 56 87 L 52 88 Z", // Lower legs
      labelPosition: { x: "50", y: "82" },
    },
  ];

  const muscles = viewMode === "front" ? frontMuscles : backMuscles;

  return (
    <Card className="h-full p-6 flex flex-col bg-card shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Select Muscle</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setViewMode(viewMode === "front" ? "back" : "front")}
          className="gap-2"
        >
          <FlipHorizontal className="w-4 h-4" />
          {viewMode === "front" ? "View Back" : "View Front"}
        </Button>
      </div>

      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-[400px] h-full flex items-center justify-center">
          {/* Anatomical Body Image */}
          {viewMode === "front" ? (
            <img
              src={bodyAnatomyFront}
              alt="Human body anatomy front view"
              className="w-full h-auto max-h-[600px] object-contain"
            />
          ) : (
            // For back view, we'll use a simple outline (can add separate back image later)
            <div className="relative w-full h-auto max-h-[600px] flex items-center justify-center bg-muted/20 rounded-lg">
              <svg viewBox="0 0 200 400" className="w-full h-auto opacity-20" fill="currentColor">
                <ellipse cx="100" cy="40" rx="30" ry="35" />
                <rect x="60" y="75" width="80" height="120" rx="10" />
                <rect x="30" y="80" width="25" height="100" rx="8" />
                <rect x="145" y="80" width="25" height="100" rx="8" />
                <rect x="70" y="195" width="25" height="150" rx="8" />
                <rect x="105" y="195" width="25" height="150" rx="8" />
              </svg>
            </div>
          )}

          {/* Interactive SVG Overlay */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ maxHeight: "600px" }}
          >
            {muscles.map((muscle) => (
              <g key={muscle.id}>
                {/* Clickable region */}
                <path
                  d={muscle.path}
                  className={`
                    pointer-events-auto cursor-pointer transition-all duration-300
                    ${
                      selectedMuscle === muscle.id
                        ? "fill-muscle-selected opacity-40 stroke-muscle-selected stroke-2"
                        : hoveredMuscle === muscle.id
                        ? "fill-muscle-hover opacity-30 stroke-muscle-hover stroke-2"
                        : "fill-transparent hover:fill-muscle-hover hover:opacity-20 stroke-transparent hover:stroke-muscle-hover hover:stroke-1"
                    }
                  `}
                  onClick={() => onMuscleSelect(muscle.id)}
                  onMouseEnter={() => setHoveredMuscle(muscle.id)}
                  onMouseLeave={() => setHoveredMuscle(null)}
                />

                {/* Label badge */}
                {(hoveredMuscle === muscle.id || selectedMuscle === muscle.id) && (
                  <g className="pointer-events-none">
                    <rect
                      x={parseFloat(muscle.labelPosition.x) - 8}
                      y={parseFloat(muscle.labelPosition.y) - 2}
                      width="16"
                      height="4"
                      rx="2"
                      className={`
                        ${
                          selectedMuscle === muscle.id
                            ? "fill-muscle-selected"
                            : "fill-muscle-hover"
                        }
                      `}
                    />
                    <text
                      x={muscle.labelPosition.x}
                      y={parseFloat(muscle.labelPosition.y) + 1.5}
                      textAnchor="middle"
                      className="fill-white text-[2.5px] font-semibold"
                    >
                      {muscle.name}
                    </text>
                  </g>
                )}
              </g>
            ))}
          </svg>
        </div>
      </div>

      <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
        <p className="text-sm text-muted-foreground text-center">
          {viewMode === "front"
            ? "Hover over or click on muscle groups in the anatomy diagram"
            : "Viewing back muscles - click on highlighted areas for details"}
        </p>
      </div>
    </Card>
  );
};
