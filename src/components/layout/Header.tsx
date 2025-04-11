
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onOpenConfig: () => void;
}

export default function Header({ onOpenConfig }: HeaderProps) {
  return (
    <header className="bg-alfred-primary text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Alfred AI</h1>
      </div>
      <Button variant="ghost" size="icon" onClick={onOpenConfig}>
        <Settings className="h-5 w-5" />
      </Button>
    </header>
  );
}
