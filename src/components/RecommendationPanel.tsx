import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MuscleType, muscleData } from "@/types/muscle";
import { Activity, Heart, Shield, Dumbbell } from "lucide-react";

interface RecommendationPanelProps {
  selectedMuscle: MuscleType | null;
}

export const RecommendationPanel = ({ selectedMuscle }: RecommendationPanelProps) => {
  if (!selectedMuscle) {
    return (
      <Card className="p-8 bg-card shadow-card h-full flex items-center justify-center">
        <div className="text-center space-y-3">
          <Activity className="w-12 h-12 mx-auto text-muted-foreground opacity-50" />
          <h3 className="text-lg font-semibold text-foreground">No Muscle Selected</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Select a muscle from the body diagram to view injury information, recovery tips, and
            running recommendations.
          </p>
        </div>
      </Card>
    );
  }

  const muscleInfo = muscleData[selectedMuscle];

  return (
    <Card className="p-6 bg-card shadow-card h-full overflow-y-auto animate-slide-up">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{muscleInfo.name}</h2>
          <p className="text-muted-foreground">{muscleInfo.description}</p>
        </div>

        {/* Can I Run Tomorrow? */}
        <div className="p-4 bg-primary/5 rounded-lg border-2 border-primary/20">
          <div className="flex items-start gap-3 mb-3">
            <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Can I Run Tomorrow?</h3>
              <p className="text-sm text-foreground/80">{muscleInfo.canRunTomorrow.answer}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Safety Confidence</span>
              <span className="font-semibold text-primary">
                {muscleInfo.canRunTomorrow.confidence}%
              </span>
            </div>
            <Progress value={muscleInfo.canRunTomorrow.confidence} className="h-2" />
          </div>
        </div>

        {/* Common Injuries */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-destructive" />
            <h3 className="font-semibold text-foreground">Common Injuries</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {muscleInfo.commonInjuries.map((injury, idx) => (
              <Badge key={idx} variant="outline" className="text-destructive border-destructive/30">
                {injury}
              </Badge>
            ))}
          </div>
        </div>

        {/* Warm-up */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-foreground">Warm-up Routine</h3>
          </div>
          <ul className="space-y-2">
            {muscleInfo.warmUp.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-foreground/90">
                <span className="text-accent font-bold mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stretching */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Dumbbell className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Stretching & Mobility</h3>
          </div>
          <ul className="space-y-2">
            {muscleInfo.stretching.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-foreground/90">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recovery */}
        <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
          <h3 className="font-semibold text-foreground mb-3">Recovery Tips</h3>
          <ul className="space-y-2">
            {muscleInfo.recovery.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-foreground/90">
                <span className="text-accent font-bold mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};
