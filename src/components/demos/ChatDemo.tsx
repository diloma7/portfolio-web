"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send } from "lucide-react";

type Message = {
  id: number;
  sender: "alice" | "bob";
  text: string;
  timestamp: string;
};

const AUTO_REPLIES = [
  "Hey! Nice to meet you 😊",
  "That sounds interesting, tell me more!",
  "Haha, love that!",
  "I was just thinking the same thing!",
  "So, what do you do for fun?",
  "That's awesome! I'd love to hear more.",
  "Same here! We have a lot in common.",
  "😂 You're funny!",
];

function getTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      sender: "bob",
      text: "Hey there! 👋 Try sending a message.",
      timestamp: getTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const nextId = useRef(1);
  const replyIndex = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = {
      id: nextId.current++,
      sender: "alice",
      text,
      timestamp: getTime(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate "typing..." then auto-reply
    setIsTyping(true);
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const reply: Message = {
        id: nextId.current++,
        sender: "bob",
        text: AUTO_REPLIES[replyIndex.current % AUTO_REPLIES.length],
        timestamp: getTime(),
      };
      replyIndex.current++;
      setIsTyping(false);
      setMessages((prev) => [...prev, reply]);
    }, delay);
  };

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-700/50 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center text-xs font-bold text-slate-900">
          B
        </div>
        <div>
          <p className="text-sm font-medium text-slate-200">Bob</p>
          <p className="text-xs text-emerald-400">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="h-72 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "alice" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-3.5 py-2 rounded-2xl text-sm ${
                msg.sender === "alice"
                  ? "bg-cyan-600/80 text-white rounded-br-sm"
                  : "bg-slate-800 text-slate-200 rounded-bl-sm"
              }`}
            >
              <p>{msg.text}</p>
              <p
                className={`text-[10px] mt-1 ${msg.sender === "alice" ? "text-cyan-200/60" : "text-slate-500"}`}
              >
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-800 text-slate-400 px-3.5 py-2 rounded-2xl rounded-bl-sm text-sm">
              <span className="inline-flex gap-1">
                <span className="animate-bounce [animation-delay:0ms]">.</span>
                <span className="animate-bounce [animation-delay:150ms]">
                  .
                </span>
                <span className="animate-bounce [animation-delay:300ms]">
                  .
                </span>
              </span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="px-4 py-3 border-t border-slate-700/50 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message…"
          className="flex-1 bg-slate-800/80 border border-slate-700/50 rounded-full px-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-cyan-500/60 transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="w-9 h-9 rounded-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-500 text-white flex items-center justify-center transition-colors shrink-0"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
