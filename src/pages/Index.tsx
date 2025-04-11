
import { useState } from "react";
import Login from "./Login";
import ChatPage from "./Chat";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return <ChatPage onLogout={handleLogout} />;
}
