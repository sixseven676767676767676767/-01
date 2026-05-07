import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "motion/react";
import { Send, User, Bot, X, MessageCircle } from "lucide-react";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "你好！我是李家論的 AI 助手。我可以告訴你關於他的專案經驗、技能專長，或是協助你預約面試。有什麼我可以幫你的嗎？" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...history, { role: 'user', parts: [{ text: input }] }],
        config: {
          systemInstruction: `你現在是「李家論 (Li Jialun)」的個人 AI 助手。
          你的目標是向潛在雇主或合作夥伴介紹家論。
          
          家論的背景資訊：
          - 定位：AI 教育設計師 / 數位品牌顧問
          - 核心技能：Python, C#, Unity, Adobe Illustrator, Canva, AI 工具應用（提示詞工程、AI 內容創作）
          - 專案：
            1. 阿爸的家園：健康餐點系統 (PRD 規劃、UX 研究)
            2. DreamFlow AI：行銷敘事專案 (AI 輔助工作流、行銷腳本)
            3. 礁溪旅遊導覽：AI 影音創作 (AI 語音合成、影像生成)
          - 聯絡方式：f132100366@gmail.com
          - 所在地：台灣，台北
          
          語氣要求：
          - 專業、親切、充滿自信。
          - 回答要簡潔有力，並引導用戶查看作品集或預約面試。
          - 如果用戶詢問非家論相關的問題，請禮貌地將話題引導回他的專業領域。`,
        }
      });

      const modelText = response.text || "抱歉，我現在無法回應。請稍後再試。";
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "抱歉，系統連線出現問題。您可以直接透過 Email 聯繫家論：f132100366@gmail.com" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button with Label */}
      <div className="fixed bottom-8 right-8 flex flex-col items-end gap-3 z-[100]">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-brand-accent text-white px-4 py-2 rounded-xl shadow-2xl text-sm font-bold flex items-center gap-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              有問題想問家論嗎？
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-brand-accent text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(230,126,34,0.4)] hover:scale-110 hover:shadow-[0_0_40px_rgba(230,126,34,0.6)] transition-all relative group"
        >
          <MessageCircle size={32} />
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-brand-accent text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-brand-accent animate-bounce">
              1
            </span>
          )}
        </button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-8 w-[350px] h-[500px] bg-brand-bg border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[100]"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold">Jialun AI Assistant</div>
                  <div className="text-[10px] text-green-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Online
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-brand-accent text-white rounded-tr-none' 
                      : 'bg-white/5 text-brand-text border border-white/10 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/10">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="詢問關於家論的事..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-accent transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="w-10 h-10 bg-brand-accent text-white rounded-xl flex items-center justify-center hover:bg-brand-accent/80 transition-colors disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
