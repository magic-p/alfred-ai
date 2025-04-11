
import { cn } from "@/lib/utils";

export type MessageType = "user" | "assistant";

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
  attachmentUrl?: string;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === "user";
  
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div className={cn(
        "message-bubble", 
        isUser ? "user-message" : "assistant-message"
      )}>
        {message.content}
        
        {message.attachmentUrl && (
          <div className="mt-2">
            <img 
              src={message.attachmentUrl} 
              alt="Anexo" 
              className="max-w-full rounded-md"
              style={{maxHeight: "200px"}} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
