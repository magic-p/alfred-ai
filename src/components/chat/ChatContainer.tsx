
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import ChatMessage, { Message } from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { toast } from "sonner";

// Simulate AI responses for the MVP
const getAIResponse = async (userMessage: string): Promise<string> => {
  // Simple predefined responses for demo purposes
  const responses = {
    default: "Entendi! Posso ajudar com mais alguma coisa? 😊",
    gastos: "Registrei seu gasto! Obrigado por me informar. 👍",
    meta: "Meta registrada com sucesso! Vou te ajudar a acompanhar isso. 🎯",
    consulta: "Com base nos seus registros, você gastou um total de R$ 320,75 nessa categoria este mês. 📊",
    categoria: "Categoria criada com sucesso! Agora você pode classificar suas despesas com ela. ✅",
    ajuda: "Sou o Alfred, seu assistente financeiro! Posso ajudar com registro de gastos, metas e consultas. Apenas me diga o que precisa ou envie uma foto de um recibo/comprovante! 🤓"
  };

  // Wait a random time to simulate processing
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  // Choose a response based on the message content
  if (userMessage.toLowerCase().includes("ajuda") || userMessage.toLowerCase().includes("help")) {
    return responses.ajuda;
  } else if (userMessage.toLowerCase().includes("gastei") || userMessage.toLowerCase().includes("comprei")) {
    return responses.gastos;
  } else if (userMessage.toLowerCase().includes("meta")) {
    return responses.meta;
  } else if (userMessage.toLowerCase().includes("quanto") || userMessage.toLowerCase().includes("consulta")) {
    return responses.consulta;
  } else if (userMessage.toLowerCase().includes("categoria")) {
    return responses.categoria;
  }
  return responses.default;
};

// Simulate processing an attachment
const processAttachment = async (): Promise<string> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 3000));
  return "Analisei seu anexo! Encontrei um comprovante de R$ 85,90 na Livraria Cultura, categoria 'Lazer'. Confirma? 📚";
};

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      type: "assistant",
      content: "Olá! Sou o Alfred, seu assistente financeiro pessoal. Como posso ajudar hoje? 😊",
      timestamp: new Date(),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (content: string) => {
    const newUserMessage: Message = {
      id: uuidv4(),
      type: "user",
      content,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setIsProcessing(true);

    try {
      const response = await getAIResponse(content);
      
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          type: "assistant",
          content: response,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast.error("Não consegui processar sua mensagem. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendAttachment = async (file: File) => {
    // Create a temporary URL for the image preview
    const attachmentUrl = URL.createObjectURL(file);
    
    const newUserMessage: Message = {
      id: uuidv4(),
      type: "user",
      content: "Aqui está um anexo para você analisar.",
      timestamp: new Date(),
      attachmentUrl,
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setIsProcessing(true);

    try {
      // In a real app, we would upload the file and process it
      // For now, we'll just simulate it
      const response = await processAttachment();
      
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          type: "assistant",
          content: response,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error processing attachment:", error);
      toast.error("Não consegui processar seu anexo. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isProcessing && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput 
        onSendMessage={handleSendMessage} 
        onSendAttachment={handleSendAttachment}
        isProcessing={isProcessing} 
      />
    </div>
  );
}
