import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MuscleType } from "@/types/muscle";
import { FlipHorizontal, Info } from "lucide-react";
import Model from "react-body-highlighter";

interface BodyDiagramProps {
  selectedMuscle: MuscleType | null;
  onMuscleSelect: (muscle: MuscleType) => void;
}

type ViewMode = "anterior" | "posterior";

// Map react-body-highlighter muscle names to our muscle types
const muscleMapping: Record<string, MuscleType> = {
  "quadriceps": "quadriceps",
  "hamstring": "hamstrings",
  "gluteal": "glutes",
  "calves": "calves",
  "adductor": "adductors",
  "lower-back": "lower-back",
  "obliques": "core",
  "abs": "core",
  "trapezius": "trapezius",
  "upper-back": "upper-back",
  "chest": "chest",
  "biceps": "biceps",
  "triceps": "triceps",
  "forearm": "forearm",
  "front-deltoids": "deltoids",
  "back-deltoids": "deltoids",
  "abductors": "abductors",
  "neck": "neck",
  "head": "neck", // Map head clicks to neck
};

// All available muscles in the library (for debugging/display)
const allAvailableMuscles = {
  anterior: [
    "trapezius", "chest", "biceps", "triceps", "forearm", 
    "front-deltoids", "abs", "obliques", "adductor", 
    "quadriceps", "abductors", "calves", "head", "neck"
  ],
  posterior: [
    "trapezius", "upper-back", "lower-back", "biceps", "triceps",
    "forearm", "back-deltoids", "gluteal", "hamstring", 
    "calves", "head", "neck"
  ]
};

// Reverse mapping: our muscle types to library muscle names
const getMusclesForType = (muscleType: MuscleType | null): { name: string; muscles: string[] } => {
  if (!muscleType) return { name: "", muscles: [] };

  const mappings: Record<MuscleType, string[]> = {
    "quadriceps": ["quadriceps"],
    "hamstrings": ["hamstring"],
    "glutes": ["gluteal"],
    "calves": ["calves"],
    "hip-flexors": ["adductor"], // Map hip-flexors to adductor area
    "adductors": ["adductor"],
    "lower-back": ["lower-back"],
    "core": ["obliques", "abs"],
    "trapezius": ["trapezius"],
    "upper-back": ["upper-back"],
    "chest": ["chest"],
    "biceps": ["biceps"],
    "triceps": ["triceps"],
    "forearm": ["forearm"],
    "deltoids": ["front-deltoids", "back-deltoids"],
    "abductors": ["abductors"],
    "neck": ["neck", "head"],
    "knee": ["quadriceps"], // Knee area overlaps with quads visually
  };

  return {
    name: muscleType,
    muscles: mappings[muscleType] || [],
  };
};

export const BodyDiagram = ({ selectedMuscle, onMuscleSelect }: BodyDiagramProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>("anterior");
  const [showAllMuscles, setShowAllMuscles] = useState(false);

  const handleMuscleClick = (muscleData: { muscle: string; label?: string }) => {
    console.log("Clicked muscle:", muscleData.muscle); // Debug log
    const mappedMuscle = muscleMapping[muscleData.muscle];
    if (mappedMuscle) {
      onMuscleSelect(mappedMuscle);
    } else {
      console.log("Muscle not mapped to app muscle type:", muscleData.muscle);
    }
  };

  const selectedMuscles = getMusclesForType(selectedMuscle);

  // Create data array for highlighting selected muscles
  const muscleData = selectedMuscles.muscles.map((muscle) => ({
    name: muscle,
    muscles: [muscle as any],
  }));

  const currentViewMuscles = allAvailableMuscles[viewMode];
  const runningMuscles = viewMode === "anterior" 
    ? ["quadriceps", "calves", "adductor", "abs", "obliques", "chest", "front-deltoids", "trapezius", "biceps", "triceps", "forearm", "neck"]
    : ["hamstring", "gluteal", "calves", "lower-back", "upper-back", "trapezius", "back-deltoids", "biceps", "triceps", "forearm", "neck"];

  return (
    <Card className="h-full p-6 flex flex-col bg-card shadow-card overflow-auto">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h2 className="text-2xl font-bold text-foreground">Select Muscle</h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAllMuscles(!showAllMuscles)}
            className="gap-2"
          >
            <Info className="w-4 h-4" />
            {showAllMuscles ? "Hide" : "Show"} All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === "anterior" ? "posterior" : "anterior")}
            className="gap-2"
          >
            <FlipHorizontal className="w-4 h-4" />
            {viewMode === "anterior" ? "View Back" : "View Front"}
          </Button>
        </div>
      </div>

      <div className="flex-1 relative flex items-center justify-center overflow-auto">
        <div className="relative w-full h-full flex items-center justify-center py-4">
          <Model
            data={muscleData}
            style={{
              width: "100%",
              height: "100%",
              minHeight: "500px",
            }}
            highlightedColors={["#10b981"]}
            onClick={handleMuscleClick}
            type={viewMode}
          />
        </div>
      </div>

      {showAllMuscles && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800 flex-shrink-0">
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Available Muscles ({viewMode === "anterior" ? "Front" : "Back"} View)
          </h3>
          <div className="flex flex-wrap gap-2">
            {currentViewMuscles.map((muscle) => {
              const isRunningMuscle = runningMuscles.includes(muscle);
              const isMapped = muscleMapping[muscle];
              return (
                <Badge
                  key={muscle}
                  variant={isMapped ? "default" : "outline"}
                  className={`text-xs ${isRunningMuscle ? "bg-green-600" : ""}`}
                >
                  {muscle}
                  {isMapped && " ✓"}
                </Badge>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            <span className="text-green-600 font-semibold">Green = Running-relevant</span> | 
            <span className="ml-2">✓ = Mapped to app data</span>
          </p>
        </div>
      )}

      <div className="mt-4 flex-shrink-0 space-y-3">
        {/* Additional Joint Selections */}
        <div className="p-3 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
          <h3 className="text-xs font-semibold mb-2 text-amber-900 dark:text-amber-100">
            Common Injury Areas (Click to select)
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedMuscle === "knee" ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => onMuscleSelect("knee")}
            >
              🦵 Knee (Runner's Knee, IT Band)
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};
