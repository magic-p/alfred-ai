
import { useState } from "react";
import Header from "@/components/layout/Header";
import ChatContainer from "@/components/chat/ChatContainer";
import ConfigDialog from "@/components/config/ConfigDialog";

interface ChatPageProps {
  onLogout: () => void;
}

export default function ChatPage({ onLogout }: ChatPageProps) {
  const [configOpen, setConfigOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <Header onOpenConfig={() => setConfigOpen(true)} />
      <main className="flex-grow">
        <ChatContainer />
      </main>
      <ConfigDialog 
        open={configOpen} 
        onOpenChange={setConfigOpen} 
        onLogout={onLogout} 
      />
    </div>
  );
}
