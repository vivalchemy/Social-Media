import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from 'lucide-react';
import ReactMarkdown from "react-markdown";

interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
}

export function Chatbot() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const userMessage: ChatMessage = { sender: 'user', message: inputMessage };
      setChatMessages([...chatMessages, userMessage]);

      const botMessage: ChatMessage = { sender: 'bot', message: "This is an ai generated response" };
      setChatMessages((prevMessages) => [...prevMessages, botMessage]);
      setInputMessage('');
    }
  };

  return (
    <div className="h-[85vh]">
    <div className="h-full w-full flex-1 overflow-hidden">
      <Card className="h-full flex flex-col rounded-none border-0">
        <CardHeader className="border-b px-4 py-3 shrink-0">
          <CardTitle className="text-xl font-semibold">Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex flex-col space-y-4">
            {chatMessages.map((chatMessage, index) => (
              <div
                key={index}
                className={`flex ${chatMessage.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] break-words ${
                    chatMessage.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <div className="text-xs opacity-75 mb-1">
                    {chatMessage.sender === 'user' ? 'You' : 'Bot'}
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown>{chatMessage.message}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <div className="border-t p-4 bg-background mt-auto shrink-0">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
    </div>
  );
}