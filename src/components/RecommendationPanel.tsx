import { Card } from "@/components/ui/card";
import { MuscleType, muscleData } from "@/types/muscle";
import { Activity, Heart, Dumbbell, AlertTriangle, AlertCircle } from "lucide-react";

interface RecommendationPanelProps {
  selectedMuscle: MuscleType | null;
}

export const RecommendationPanel = ({ selectedMuscle }: RecommendationPanelProps) => {
  if (!selectedMuscle) {
    return (
      <Card className="h-full flex flex-col bg-white border-teal/20 shadow-md">
        <div className="p-4 border-b border-teal/20 bg-gradient-to-r from-teal/5 to-transparent">
          <h3 className="font-semibold text-gray-800">Muscle Information</h3>
          <p className="text-sm text-text-gray">
            Select a muscle from the diagram to see details
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center">
          <p className="text-text-gray text-center">
            Click on a muscle in the body diagram to view recovery recommendations and injury
            information.
          </p>
        </div>
      </Card>
    );
  }

  const muscle = muscleData[selectedMuscle];

  return (
    <Card className="h-full flex flex-col bg-white border-teal/20 shadow-md">
      <div className="p-4 border-b border-teal/20 bg-gradient-to-r from-teal/5 to-transparent">
        <h3 className="font-semibold text-gray-800">Muscle Information</h3>
        <p className="text-sm text-text-gray">
          Selected: {muscle.name}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-soft-white">
        <div>
          <h4 className="font-semibold text-lg mb-2 text-gray-800">{muscle.name}</h4>
          <p className="text-sm text-text-gray">{muscle.description}</p>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-gradient-to-br from-soft-green/10 to-soft-green/5 rounded-lg border border-soft-green/30">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-soft-green mt-0.5" />
              <div>
                <p className="font-medium text-sm text-gray-800">Can I run tomorrow?</p>
                <p className="text-sm text-text-gray mt-1">
                  {muscle.canRunTomorrow.answer}
                </p>
                <p className="text-xs text-text-gray mt-1">
                  Confidence: <span className="text-soft-green font-semibold">{muscle.canRunTomorrow.confidence}%</span>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-medium text-sm mb-2 flex items-center gap-2 text-soft-green">
              <Activity className="w-4 h-4" />
              Recovery Tips
            </h5>
            <ul className="space-y-1">
              {muscle.recovery.map((tip, index) => (
                <li key={index} className="text-sm text-text-gray flex items-start gap-2">
                  <span className="text-soft-green mt-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-medium text-sm mb-2 flex items-center gap-2 text-teal">
              <Dumbbell className="w-4 h-4" />
              Warm-up Exercises
            </h5>
            <ul className="space-y-1">
              {muscle.warmUp.map((exercise, index) => (
                <li key={index} className="text-sm text-text-gray flex items-start gap-2">
                  <span className="text-teal mt-1">•</span>
                  <span>{exercise}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-medium text-sm mb-2 flex items-center gap-2 text-coral">
              <Heart className="w-4 h-4" />
              Stretching Routine
            </h5>
            <ul className="space-y-1">
              {muscle.stretching.map((stretch, index) => (
                <li key={index} className="text-sm text-text-gray flex items-start gap-2">
                  <span className="text-coral mt-1">•</span>
                  <span>{stretch}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-gradient-to-br from-injury-red/10 to-injury-red/5 rounded-lg border border-injury-red/30">
            <h5 className="font-medium text-sm mb-2 flex items-center gap-2 text-injury-red">
              <AlertTriangle className="w-4 h-4" />
              Common Injuries
            </h5>
            <ul className="space-y-1">
              {muscle.commonInjuries.map((injury, index) => (
                <li key={index} className="text-sm text-text-gray flex items-start gap-2">
                  <span className="text-injury-red mt-1">•</span>
                  <span>{injury}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};
