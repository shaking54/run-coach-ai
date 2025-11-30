import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface DayPlan {
  day: string;
  recommendation: string;
}

const weekPlan: DayPlan[] = [
  { day: "Monday", recommendation: "Easy 5K run + dynamic stretching" },
  { day: "Tuesday", recommendation: "Rest day - focus on hip flexor stretches" },
  { day: "Wednesday", recommendation: "Interval training - 6x400m with 90s rest" },
  { day: "Thursday", recommendation: "Cross-training: cycling or swimming" },
  { day: "Friday", recommendation: "Recovery run 3K + foam rolling" },
  { day: "Saturday", recommendation: "Long run 10K at comfortable pace" },
  { day: "Sunday", recommendation: "Active recovery - yoga or light walk" },
];

export const PlanningTable = () => {
  return (
    <Card className="h-full border-primary/20 shadow-md">
      <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-transparent">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-primary/80">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          Weekly Training Plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {weekPlan.map((plan, index) => (
            <div
              key={plan.day}
              className="flex gap-3 p-3 rounded-lg border border-border bg-gradient-to-r from-card to-muted/20 hover:shadow-sm transition-all"
            >
              <div className="flex-shrink-0 w-24">
                <span className="text-sm font-semibold text-primary">
                  {plan.day}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">{plan.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
