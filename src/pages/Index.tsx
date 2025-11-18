import { useState } from "react";
import { BodyDiagram } from "@/components/BodyDiagram";
import { RecommendationPanel } from "@/components/RecommendationPanel";
import { ChatBox } from "@/components/ChatBox";
import { MuscleType } from "@/types/muscle";
import { Activity } from "lucide-react";

const Index = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleType | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Running Injury Advisor</h1>
              <p className="text-sm text-muted-foreground">
                AI-powered muscle recovery and running guidance
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[40%_60%] gap-6 h-[calc(100vh-140px)]">
          {/* Left Column - Body Diagram */}
          <div className="h-full">
            <BodyDiagram selectedMuscle={selectedMuscle} onMuscleSelect={setSelectedMuscle} />
          </div>

          {/* Right Column - Recommendations + Chat */}
          <div className="flex flex-col gap-6 h-full">
            {/* Recommendations Section */}
            <div className="h-[45%] overflow-hidden">
              <RecommendationPanel selectedMuscle={selectedMuscle} />
            </div>

            {/* Chat Section */}
            <div className="h-[55%] overflow-hidden">
              <ChatBox selectedMuscle={selectedMuscle} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
