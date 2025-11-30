import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Heart, Footprints, Clock } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  change?: string;
}

const MetricCard = ({ title, value, unit, icon, change }: MetricCardProps) => (
  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border">
    <div className="p-3 rounded-lg bg-primary/10">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm text-muted-foreground">{title}</p>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
      {change && (
        <span className="text-sm text-secondary font-medium">{change}</span>
      )}
    </div>
  </div>
);

export const Dashboard = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary" />
          Smartwatch Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <MetricCard
            title="Heart Rate"
            value="72"
            unit="bpm"
            icon={<Heart className="w-5 h-5 text-primary" />}
            change="+2 from avg"
          />
          <MetricCard
            title="Steps Today"
            value="8,547"
            unit="steps"
            icon={<Footprints className="w-5 h-5 text-primary" />}
            change="+12% vs yesterday"
          />
          <MetricCard
            title="Active Time"
            value="42"
            unit="min"
            icon={<Clock className="w-5 h-5 text-primary" />}
            change="On track"
          />
          <MetricCard
            title="Distance"
            value="6.2"
            unit="km"
            icon={<Activity className="w-5 h-5 text-primary" />}
            change="+0.8 km"
          />
        </div>
      </CardContent>
    </Card>
  );
};
