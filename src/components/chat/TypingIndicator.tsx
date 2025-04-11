
export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-2">
      <div className="message-bubble assistant-message py-3">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
