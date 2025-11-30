import { Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
      {message.role === "ai" && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-soft-green/30 to-soft-green/20 border border-soft-green/40 flex items-center justify-center">
            <Bot className="w-5 h-5 text-soft-green" />
          </div>
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          message.role === "user"
            ? "bg-gradient-to-br from-teal to-teal/90 text-white shadow-sm"
            : "bg-white text-gray-800 border border-gray-200 shadow-sm"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <p className="text-xs opacity-60 mt-1">
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>

      {message.role === "user" && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal/30 to-teal/20 border border-teal/40 flex items-center justify-center">
            <User className="w-5 h-5 text-teal" />
          </div>
        </div>
      )}
    </div>
  );
};
