import { useState } from "react";
import { BodyDiagram } from "@/components/BodyDiagram";
import { RecommendationPanel } from "@/components/RecommendationPanel";
import { ChatBox } from "@/components/ChatBox";
import { MuscleType } from "@/types/muscle";
import { Activity } from "lucide-react";

const Index = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleType | null>(null);

  return (
    <div className="h-screen flex flex-col bg-soft-white overflow-hidden">
      {/* Header */}
      <header className="border-b border-teal/20 bg-white shadow-sm flex-shrink-0">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-teal to-teal/90 rounded-lg shadow-md">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Running AI Coach</h1>
              <p className="text-xs text-text-gray">
                AI-powered running guidance with <span className="text-soft-green font-semibold">Google Gemini</span>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full px-4 py-4">
          <div className="grid lg:grid-cols-[35%_65%] gap-4 h-full">
            {/* Left Column - Body Diagram */}
            <div className="h-full overflow-hidden">
              <BodyDiagram 
                selectedMuscle={selectedMuscle} 
                onMuscleSelect={setSelectedMuscle} 
              />
            </div>

            {/* Right Column - Recommendations + Chat */}
            <div className="flex flex-col gap-4 h-full overflow-hidden">
              {/* Recommendations Section - 40% */}
              <div className="h-[40%] overflow-hidden">
                <RecommendationPanel selectedMuscle={selectedMuscle} />
              </div>

              {/* Chat Section - 60% */}
              <div className="h-[60%] overflow-hidden">
                <ChatBox selectedMuscle={selectedMuscle} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
