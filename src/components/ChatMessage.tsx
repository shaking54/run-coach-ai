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
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-slide-up`}>
      <div
        className={`
          max-w-[80%] rounded-lg px-4 py-3 
          ${
            isUser
              ? "bg-chat-userBg text-chat-userText ml-auto"
              : "bg-chat-aiBg text-chat-aiText"
          }
        `}
      >
        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        <span className={`text-xs mt-1 block ${isUser ? "opacity-70" : "opacity-50"}`}>
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
};
