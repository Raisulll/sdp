import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
const API_KEY = import.meta.env.VITE_GEMINI_API;

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedChatHistory = localStorage.getItem("chatHistory");
    if (savedChatHistory) {
      setMessages(JSON.parse(savedChatHistory));
    }
  }, []);

  // Save chat history to local storage whenever messages change
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const formatTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `${Date.now()}`,
      content: input,
      role: "user",
      timestamp: formatTimestamp(),
    };

    // Add the user message to state immediately
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Build conversation context using previous messages plus current user input
    // For assistant messages, strip any HTML formatting before sending context.
    const conversationContext = [...messages, userMessage]
      .map((message) => {
        const roleLabel = message.role === "user" ? "User" : "Assistant";
        // Remove HTML tags if message is from the assistant
        const plainContent =
          message.role === "assistant"
            ? message.content.replace(/<[^>]*>/g, "")
            : message.content;
        return `${roleLabel}: ${plainContent}`;
      })
      .join("\n");

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                // Send the full conversation context so the model has the previous context
                parts: [{ text: conversationContext }],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const rawContent =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received.";

      // Clean and format the response
      const formattedContent = rawContent
        .trim()
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>") // Bold
        .replace(/__([^_]+)__/g, "<em>$1</em>") // Italic
        .replace(/~~([^~]+)~~/g, "<del>$1</del>") // Strikethrough
        .replace(/\n/g, "<br />") // New lines
        .replace(/`([^`]+)`/g, "<code>$1</code>") // Inline code
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>'); // Links

      const assistantMessage: Message = {
        id: `${Date.now() + 1}`,
        content: formattedContent || "Sorry, I didn't get that.",
        role: "assistant",
        timestamp: formatTimestamp(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error fetching response from Gemini API:", error);
    } finally {
      setIsLoading(false);
      const chatMessages = document.getElementById("chat-messages");
      if (chatMessages) {
        setTimeout(() => {
          chatMessages.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }, 100);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5F0E8] pt-24">
        <div className="max-w-7xl mx-auto px-4 py-8 h-[calc(100vh-96px)] grid grid-rows-[auto_1fr_auto]">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-[#F5F0E8] flex items-center p-4 border-b">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h1 className="text-xl font-semibold">PagePlay Assistant</h1>
              <p className="text-sm text-muted-foreground">
                Always here to help
              </p>
            </div>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4" id="chat-messages">
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
                      <p
                        className="text-sm"
                        dangerouslySetInnerHTML={{ __html: message.content }}
                      />
                      <span className="text-[10px] opacity-50 mt-1 block">
                        {message.timestamp}
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
          <Card className="sticky bottom-0 mx-4 mb-4 bg-[#F5F0E8]">
            <form
              onSubmit={handleSubmit}
              className="flex items-center p-2 gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
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
