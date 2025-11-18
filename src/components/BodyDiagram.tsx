import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MuscleType } from "@/types/muscle";
import { FlipHorizontal } from "lucide-react";

interface BodyDiagramProps {
  selectedMuscle: MuscleType | null;
  onMuscleSelect: (muscle: MuscleType) => void;
}

type ViewMode = "front" | "back";

export const BodyDiagram = ({ selectedMuscle, onMuscleSelect }: BodyDiagramProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>("front");

  const frontMuscles: { id: MuscleType; name: string; position: string }[] = [
    { id: "quadriceps", name: "Quadriceps", position: "top-[40%] left-[50%] -translate-x-1/2" },
    { id: "hip-flexors", name: "Hip Flexors", position: "top-[35%] left-[50%] -translate-x-1/2" },
    { id: "adductors", name: "Adductors", position: "top-[45%] left-[40%]" },
    { id: "core", name: "Core", position: "top-[25%] left-[50%] -translate-x-1/2" },
    { id: "calves", name: "Calves", position: "top-[60%] left-[50%] -translate-x-1/2" },
  ];

  const backMuscles: { id: MuscleType; name: string; position: string }[] = [
    { id: "hamstrings", name: "Hamstrings", position: "top-[42%] left-[50%] -translate-x-1/2" },
    { id: "glutes", name: "Glutes", position: "top-[35%] left-[50%] -translate-x-1/2" },
    { id: "lower-back", name: "Lower Back", position: "top-[22%] left-[50%] -translate-x-1/2" },
    { id: "calves", name: "Calves", position: "top-[60%] left-[50%] -translate-x-1/2" },
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

      <div className="flex-1 relative flex items-center justify-center">
        {/* Body outline */}
        <div className="relative w-full max-w-[280px] aspect-[1/2]">
          {/* Simple body silhouette */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              viewBox="0 0 200 400"
              className="w-full h-full opacity-10"
              fill="currentColor"
            >
              {/* Head */}
              <ellipse cx="100" cy="40" rx="30" ry="35" />
              {/* Torso */}
              <rect x="60" y="75" width="80" height="120" rx="10" />
              {/* Arms */}
              <rect x="30" y="80" width="25" height="100" rx="8" />
              <rect x="145" y="80" width="25" height="100" rx="8" />
              {/* Legs */}
              <rect x="70" y="195" width="25" height="150" rx="8" />
              <rect x="105" y="195" width="25" height="150" rx="8" />
            </svg>
          </div>

          {/* Muscle buttons overlaid on body */}
          {muscles.map((muscle) => (
            <button
              key={muscle.id}
              onClick={() => onMuscleSelect(muscle.id)}
              className={`
                absolute ${muscle.position}
                px-4 py-2 rounded-lg font-medium text-sm
                transition-all duration-300 transform
                hover:scale-105 hover:shadow-hover
                ${
                  selectedMuscle === muscle.id
                    ? "bg-muscle-selected text-white shadow-muscle scale-105"
                    : "bg-muted hover:bg-muscle-hover hover:text-white border-2 border-border"
                }
              `}
            >
              {muscle.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
        <p className="text-sm text-muted-foreground text-center">
          Click on a muscle group to view injury information and get personalized advice
        </p>
      </div>
    </Card>
  );
};
