
import AuthForm from "@/components/auth/AuthForm";
import { useState } from "react";

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const handleLogin = async (email: string, password: string) => {
    // For the MVP, we'll simply accept any credentials
    // In a real app, this would call an API to authenticate
    console.log("Login attempt with:", email, password);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock login success
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-alfred-light to-alfred-primary/10">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-alfred-primary mb-2">Alfred AI</h1>
          <p className="text-muted-foreground">Seu assistente financeiro pessoal</p>
        </div>
        <AuthForm onLogin={handleLogin} />
      </div>
    </div>
  );
}
