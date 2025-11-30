import { useState } from "react";
import { BodyDiagram } from "@/components/BodyDiagram";
import { ChatBox } from "@/components/ChatBox";
import { Dashboard } from "@/components/Dashboard";
import { PlanningTable } from "@/components/PlanningTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MuscleType } from "@/types/muscle";
import { Activity, TrendingUp } from "lucide-react";

const Index = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleType | null>(null);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm flex-shrink-0">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg shadow-md">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Running AI Coach</h1>
              <p className="text-xs text-muted-foreground">
                AI-powered running guidance with <span className="text-primary font-semibold">Google Gemini</span>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <Tabs defaultValue="coach" className="h-full flex flex-col">
          <TabsList className="mx-4 mt-4 w-fit">
            <TabsTrigger value="coach" className="gap-2">
              <Activity className="w-4 h-4" />
              Coach
            </TabsTrigger>
            <TabsTrigger value="activities" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Activities Dashboard
            </TabsTrigger>
          </TabsList>

          {/* Coach Tab */}
          <TabsContent value="coach" className="flex-1 overflow-hidden px-4 pb-4 mt-4">
            <div className="grid lg:grid-cols-[35%_65%] gap-4 h-full">
              {/* Left Column - Body Diagram */}
              <div className="h-full overflow-hidden">
                <BodyDiagram 
                  selectedMuscle={selectedMuscle} 
                  onMuscleSelect={setSelectedMuscle} 
                />
              </div>

              {/* Right Column - Planning & Chat */}
              <div className="flex flex-col gap-4 h-full overflow-hidden">
                {/* Planning Table - 40% */}
                <div className="h-[40%] overflow-auto">
                  <PlanningTable />
                </div>

                {/* Chat Section - 60% */}
                <div className="h-[60%] overflow-hidden">
                  <ChatBox selectedMuscle={selectedMuscle} />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Activities Dashboard Tab */}
          <TabsContent value="activities" className="flex-1 overflow-hidden px-4 pb-4 mt-4">
            <div className="h-full">
              <Dashboard />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
