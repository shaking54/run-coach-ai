export const TypingIndicator = () => {
  return (
    <div className="flex justify-start animate-slide-up">
      <div className="bg-chat-aiBg text-chat-aiText rounded-lg px-4 py-3 max-w-[80%]">
        <div className="flex gap-1 items-center">
          <div className="w-2 h-2 bg-current rounded-full animate-typing" />
          <div className="w-2 h-2 bg-current rounded-full animate-typing" style={{ animationDelay: "0.2s" }} />
          <div className="w-2 h-2 bg-current rounded-full animate-typing" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </div>
  );
};
