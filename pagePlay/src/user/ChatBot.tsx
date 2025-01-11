import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "ai/react";
import { Paperclip, Send, Smile } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/navbar";


export default function ChatBot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [isLoading, setIsLoading] = useState(false);

  const formatTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5F0E8] pt-24">
        <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center p-4 border-b">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h1 className="text-xl font-semibold">PagePlay Assistant</h1>
            <p className="text-sm text-muted-foreground">Always here to help</p>
          </div>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-end gap-2 max-w-[80%]">
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-[10px] opacity-50 mt-1 block">
                      {formatTimestamp()}
                    </span>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 max-w-[80%]">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s] opacity-50" />
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s] opacity-50" />
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce opacity-50" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <Card className="mx-4 mb-4">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setIsLoading(true);
              await handleSubmit(e);
              setIsLoading(false);
            }}
            className="flex items-center p-2 gap-2"
          >
            <Button type="button" size="icon" variant="ghost">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button type="button" size="icon" variant="ghost">
              <Smile className="h-5 w-5" />
            </Button>
            <Button type="submit" size="icon" disabled={isLoading || !input}>
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </Card>
      </div>
    </div>
    </>
  );
}
