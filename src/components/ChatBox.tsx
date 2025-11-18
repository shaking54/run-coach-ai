import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { MuscleType, muscleData } from "@/types/muscle";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: generateAIResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="flex flex-col h-full bg-card shadow-card">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">AI Running Coach</h3>
        <p className="text-sm text-muted-foreground">
          Ask about pain, recovery, or running schedule
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-center max-w-sm">
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

      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about pain, recovery, or running schedule..."
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-primary hover:bg-primary-hover"
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
