import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Heart, Footprints, Clock, TrendingUp, Calendar, Target, Watch } from "lucide-react";
import { api } from "@/lib/api";

interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  change?: string;
}

const MetricCard = ({ title, value, unit, icon, change }: MetricCardProps) => (
  <div className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-br from-card to-muted/30 border border-border shadow-sm hover:shadow-md transition-shadow">
    <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm text-muted-foreground">{title}</p>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
      {change && (
        <span className="text-sm text-accent font-medium">{change}</span>
      )}
    </div>
  </div>
);

export const Dashboard = () => {
  const { data: activities } = useQuery({
    queryKey: ["activities"],
    queryFn: () => api.getActivities(5),
  });

  const { data: dailyMetrics } = useQuery({
    queryKey: ["dailyMetrics"],
    queryFn: () => api.getDailyMetrics(1),
  });

  const latestMetric = dailyMetrics?.[0];
  const steps = latestMetric?.steps?.toLocaleString() || "0";
  const restingHR = latestMetric?.resting_heart_rate || "--";
  const sleepScore = latestMetric?.sleep_score || "--";

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDistance = (meters?: number) => {
    if (!meters) return "0.0";
    return (meters / 1000).toFixed(2);
  };

  return (
    <div className="h-full overflow-auto space-y-4">
      {/* Today's Metrics */}
      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="pb-4 bg-gradient-to-r from-primary/5 to-transparent">
          <CardTitle className="text-xl flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary/80">
              <Watch className="w-5 h-5 text-white" />
            </div>
            Today's Stats (Synced)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Resting HR"
              value={restingHR.toString()}
              unit="bpm"
              icon={<Heart className="w-5 h-5 text-primary" />}
            />
            <MetricCard
              title="Steps Today"
              value={steps}
              unit="steps"
              icon={<Footprints className="w-5 h-5 text-primary" />}
            />
            <MetricCard
              title="Sleep Score"
              value={sleepScore.toString()}
              unit="/100"
              icon={<Clock className="w-5 h-5 text-primary" />}
            />
            <MetricCard
              title="Distance"
              value={formatDistance(latestMetric?.steps ? latestMetric.steps * 0.76 : 0)} // Rough estimate if distance not synced
              unit="km"
              icon={<Activity className="w-5 h-5 text-primary" />}
            />
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card className="border-navy/20 shadow-lg">
        <CardHeader className="pb-4 bg-gradient-to-r from-navy/5 to-transparent">
          <CardTitle className="text-xl flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-navy to-navy/80">
              <Footprints className="w-5 h-5 text-white" />
            </div>
            Recent Activities (Garmin)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activities?.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No activities synced yet.</p>
            ) : (
              activities?.map((activity, index) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-gradient-to-r from-card to-muted/20 hover:shadow-md transition-all"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{activity.activity_name || activity.activity_type}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(activity.start_time).toLocaleString()}
                    </p>
                    <span className="text-xs bg-secondary px-2 py-1 rounded-full mt-1 inline-block">
                      {activity.source}
                    </span>
                  </div>
                  <div className="flex gap-6 text-sm">
                    <div className="text-center">
                      <p className="text-muted-foreground">Distance</p>
                      <p className="font-semibold text-foreground">{formatDistance(activity.distance_meters)} km</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-semibold text-foreground">{formatDuration(activity.duration_seconds)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground">Calories</p>
                      <p className="font-semibold text-foreground">{activity.calories || "--"}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
