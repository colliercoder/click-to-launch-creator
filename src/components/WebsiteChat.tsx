import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface WebsiteChatProps {
  onMessageSend: (message: string) => void;
  isLoading?: boolean;
}

const WebsiteChat = ({ onMessageSend, isLoading = false }: WebsiteChatProps) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onMessageSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <Card className="p-4 mt-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe the website you want to create or the changes you'd like to make..."
          className="min-h-[60px] flex-1"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          disabled={!message.trim() || isLoading}
          className="self-end"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  );
};

export default WebsiteChat;