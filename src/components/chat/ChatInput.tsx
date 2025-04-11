
import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send } from "lucide-react";
import { toast } from "sonner";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onSendAttachment: (file: File) => void;
  isProcessing: boolean;
}

export default function ChatInput({ onSendMessage, onSendAttachment, isProcessing }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isProcessing) return;
    
    onSendMessage(message);
    setMessage("");
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if the file is an image or PDF
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      toast.error("Por favor, envie apenas imagens ou PDFs.");
      return;
    }

    // Check if the file is too large (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Arquivo muito grande. O tamanho máximo é 10MB.");
      return;
    }

    onSendAttachment(file);
    
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t">
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="text-muted-foreground hover:text-foreground"
        onClick={() => fileInputRef.current?.click()}
        disabled={isProcessing}
      >
        <Paperclip className="h-5 w-5" />
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        accept="image/*, application/pdf"
        disabled={isProcessing}
      />
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Digite uma mensagem para o Alfred..."
        className="flex-grow"
        disabled={isProcessing}
      />
      <Button
        type="submit"
        size="icon"
        disabled={!message.trim() || isProcessing}
        className="bg-alfred-primary hover:bg-alfred-secondary text-white"
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
}
