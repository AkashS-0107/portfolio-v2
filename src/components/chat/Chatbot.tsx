import React, { useState, useRef } from 'react';
import { useChat } from '../../hooks/useChat';
import { ChatLauncher } from './ChatLauncher';
import { ChatPanel } from './ChatPanel';

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const launcherRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    isLoading,
    error,
    isOnline,
    sendMessage,
    retry,
    clearChat,
  } = useChat();

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Return focus to launcher button for keyboard accessibility
    if (launcherRef.current) {
      const button = launcherRef.current.querySelector('button');
      if (button) button.focus();
    }
  };

  return (
    <div className="relative">
      <ChatPanel
        isOpen={isOpen}
        onClose={handleClose}
        messages={messages}
        isLoading={isLoading}
        isOffline={!isOnline}
        error={error}
        onSendMessage={sendMessage}
        onRetry={retry}
        onClear={clearChat}
      />

      <div ref={launcherRef}>
        <ChatLauncher isOpen={isOpen} onToggle={handleToggle} isOffline={!isOnline} />
      </div>
    </div>
  );
};

export default Chatbot;
