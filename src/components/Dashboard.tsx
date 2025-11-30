import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Heart, Footprints, Clock, Zap, TrendingUp, Calendar, Target } from "lucide-react";

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
    <div className="h-full overflow-auto space-y-4">
      {/* Today's Metrics */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            Today's Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Weekly Summary */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            This Week's Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Distance"
              value="28.5"
              unit="km"
              icon={<TrendingUp className="w-5 h-5 text-secondary" />}
              change="+15% vs last week"
            />
            <MetricCard
              title="Avg Pace"
              value="5:42"
              unit="min/km"
              icon={<Zap className="w-5 h-5 text-secondary" />}
              change="Improved by 12s"
            />
            <MetricCard
              title="Total Runs"
              value="4"
              unit="sessions"
              icon={<Activity className="w-5 h-5 text-secondary" />}
              change="As planned"
            />
            <MetricCard
              title="Calories"
              value="2,340"
              unit="kcal"
              icon={<Target className="w-5 h-5 text-secondary" />}
              change="+8%"
            />
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <Footprints className="w-6 h-6 text-primary" />
            Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "Today, 7:30 AM", type: "Morning Run", distance: "6.2 km", duration: "35:24", pace: "5:42" },
              { date: "Yesterday, 6:45 AM", type: "Interval Training", distance: "5.0 km", duration: "28:30", pace: "5:42" },
              { date: "2 days ago, 7:00 AM", type: "Easy Run", distance: "8.0 km", duration: "48:00", pace: "6:00" },
              { date: "3 days ago, 6:30 AM", type: "Recovery Run", distance: "4.0 km", duration: "26:00", pace: "6:30" },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{activity.type}</h4>
                  <p className="text-sm text-muted-foreground">{activity.date}</p>
                </div>
                <div className="flex gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-muted-foreground">Distance</p>
                    <p className="font-semibold text-foreground">{activity.distance}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-semibold text-foreground">{activity.duration}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Pace</p>
                    <p className="font-semibold text-foreground">{activity.pace}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
