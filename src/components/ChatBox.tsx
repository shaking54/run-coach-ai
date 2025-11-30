import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, AlertCircle } from "lucide-react";
import { MuscleType, muscleData } from "@/types/muscle";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { api, userManager } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface ChatBoxProps {
  selectedMuscle: MuscleType | null;
}

export const ChatBox = ({ selectedMuscle }: ChatBoxProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initialize user on mount
  useEffect(() => {
    const initUser = async () => {
      try {
        const id = await userManager.ensureUser();
        setUserId(id);
        
        // Check backend connection
        await api.healthCheck();
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to initialize:', error);
        setIsConnected(false);
        toast({
          title: "Connection Error",
          description: "Could not connect to AI backend. Using fallback mode.",
          variant: "destructive",
        });
      }
    };
    
    initUser();
  }, [toast]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check if asking about selected muscle
    if (selectedMuscle) {
      const muscle = muscleData[selectedMuscle];
      
      if (lowerMessage.includes("run tomorrow") || lowerMessage.includes("can i run")) {
        return `For your ${muscle.name}, ${muscle.canRunTomorrow.answer.toLowerCase()} I'm ${muscle.canRunTomorrow.confidence}% confident this is safe advice.`;
      }
      
      if (lowerMessage.includes("recover") || lowerMessage.includes("heal")) {
        return `To help your ${muscle.name} recover:\n\n${muscle.recovery.join("\n")}\n\nRemember: ${muscle.canRunTomorrow.answer}`;
      }
      
      if (lowerMessage.includes("stretch") || lowerMessage.includes("warm")) {
        return `Here's what I recommend for your ${muscle.name}:\n\n**Warm-up:**\n${muscle.warmUp.join("\n")}\n\n**Stretching:**\n${muscle.stretching.join("\n")}`;
      }
      
      if (lowerMessage.includes("injury") || lowerMessage.includes("hurt")) {
        return `Common injuries for ${muscle.name} include: ${muscle.commonInjuries.join(", ")}. ${muscle.description} ${muscle.canRunTomorrow.answer}`;
      }
    }
    
    // General responses
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hi! I'm your running injury advisor. Select a muscle from the body diagram and ask me anything about pain, recovery, or whether you should run tomorrow!";
    }
    
    if (lowerMessage.includes("pain") && !selectedMuscle) {
      return "To give you the best advice about your pain, please select the affected muscle from the body diagram on the left. Then I can provide specific recovery tips!";
    }
    
    // Default response
    if (selectedMuscle) {
      const muscle = muscleData[selectedMuscle];
      return `Great question about your ${muscle.name}! ${muscle.description} Would you like to know about recovery tips, stretching routines, or whether you can run tomorrow?`;
    }
    
    return "I'm here to help with running injuries! Select a muscle from the body diagram, and I can advise on recovery, stretching, and whether it's safe to run.";
  };

  const handleSend = async () => {
    if (!input.trim() || !userId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput("");
    setIsTyping(true);

    try {
      // Add context about selected muscle if any
      let contextualMessage = userInput;
      if (selectedMuscle) {
        const muscle = muscleData[selectedMuscle];
        contextualMessage = `I have pain in my ${muscle.name}. ${userInput}`;
      }

      // Call the AI backend
      const response = await api.chat({
        user_id: userId,
        message: contextualMessage,
      });

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: response.response,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('Chat error:', error);
      
      // Fallback to local response
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: generateAIResponse(userInput),
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, fallbackResponse]);
      
      toast({
        title: "Using Fallback Mode",
        description: "AI backend unavailable. Using local responses.",
        variant: "default",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="flex flex-col h-full bg-white border-teal/20 shadow-md">
      <div className="p-4 border-b border-teal/20 bg-gradient-to-r from-teal/5 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-2 h-2 bg-soft-green rounded-full animate-pulse"></span>
              AI Running Coach
            </h3>
            <p className="text-sm text-text-gray">
              Ask about pain, recovery, or running schedule
            </p>
          </div>
          {!isConnected && (
            <div className="flex items-center gap-1 text-xs text-white bg-coral px-2 py-1 rounded-full">
              <AlertCircle className="w-3 h-3" />
              <span>Offline</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-soft-white">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-text-gray text-center max-w-sm">
              Start a conversation by asking about your injury, recovery tips, or whether you should
              run tomorrow.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-teal/20 bg-white">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about pain, recovery, or running schedule..."
            className="flex-1 bg-soft-white border-gray-300 text-gray-800 placeholder:text-text-gray focus:border-teal focus:ring-teal"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-to-r from-teal to-teal/90 hover:from-teal/90 hover:to-teal/80 text-white shadow-md"
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
