import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "motion/react";
import { Send, User, Bot, X, MessageCircle } from "lucide-react";

let aiClient: GoogleGenAI | null = null;

const getAIClient = () => {
  if (aiClient) return aiClient;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'undefined' || apiKey === '"MY_GEMINI_API_KEY"') {
    console.warn("GEMINI_API_KEY is missing or invalid. AI Chatbot will be disabled.");
    return null;
  }
  aiClient = new GoogleGenAI(apiKey);
  return aiClient;
};

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "您好！我是李家論的 AI 實踐助手。如果您是面試官或潛在合作夥伴，我可以直接為您分析家論的核心競爭力，或針對特定專案進行深掘。想先了解哪部分？" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "請介紹家論的 AI 核心技能",
    "家論在 PRD 規劃上有什麼特色？",
    "如何聯繫家論預約面試？",
    "分析家論的職涯亮點"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: messageText };
    setMessages(prev => [...prev, userMessage]);
    if (!text) setInput('');
    setIsLoading(true);

    try {
      const client = getAIClient();
      if (!client) {
        setMessages(prev => [...prev, { role: 'model', text: "抱歉，目前系統尚未設定 AI 金鑰。您可以直接透過 Email 聯繫家論：f132100366@gmail.com" }]);
        return;
      }

      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const model = client.getGenerativeModel({
        model: "gemini-1.5-flash", 
        systemInstruction: `你現在是「李家論 (Li Jialun)」的專屬 AI 職涯顧問。
          你的目標是向面試官（HR、PM 主管、技術總監）展現家論的獨特價值。
          
          核心策略：
          1. 強調「技術落地能力」：家論不只會 Python/Unity，更懂「商業場景」與「教育設計」。
          2. 使用「數據與成果」導向：在回答中引用專案成果（如：提升 40% 溝通效率、縮短 60% 產出時間）。
          3. 展示「AI 前瞻性」：強調其在提示詞工程與 AI 影音創作的領先應用。
          
          家論的關鍵資訊：
          - 標籤：AI 教育設計師 / 數位品牌顧問
          - 核心工具：Python, Unity, LLM Prompting, Adobe Creative Suite.
          - 亮點專案：
            - 阿爸的家園：將傳統餐飲數位化，主導 PRD。
            - DreamFlow AI：將 AI 導入行銷工作流，大幅提升產能。
            - 旅遊導覽：展示 AI 生成內容 (AIGC) 的低成本高效率優勢。
          
          語氣：
          - 觀察力敏銳、解答精確、充滿思維洞察。
          - 針對面試官的提問，給予具備「產品思維」的回應。
          - 如果詢問面試相關問題，主動提供 Email：f132100366@gmail.com 並引導其發送邀請。`,
      });

      const chat = model.startChat({
        history: history.filter(h => h.role === 'user' || h.role === 'model'),
      });

      const result = await chat.sendMessage(messageText);
      const response = await result.response;
      const modelText = response.text();
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
      {/* ... (button code remains same) */}
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
              面試官您好，請進
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-brand-accent text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(242,125,38,0.4)] hover:scale-110 hover:shadow-[0_0_40px_rgba(242,125,38,0.6)] transition-all relative group"
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
            className="fixed bottom-24 right-8 w-[380px] h-[600px] bg-brand-bg border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[100]"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center shadow-lg shadow-brand-accent/20">
                  <Bot size={22} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold tracking-tight">Jialun Insight Bot</div>
                  <div className="text-[10px] text-brand-accent flex items-center gap-1 uppercase font-bold tracking-widest">
                    <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" /> Active
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide">
              {messages.map((m, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i} 
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-brand-accent text-white rounded-tr-none' 
                      : 'bg-white/5 text-brand-text border border-white/10 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10">
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Quick Suggestions */}
              {!isLoading && messages.length < 3 && (
                <div className="flex flex-wrap gap-2 pt-4">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSend(s)}
                      className="text-[10px] px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:border-brand-accent hover:text-brand-accent transition-all text-brand-muted uppercase tracking-wider text-left"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-5 border-t border-white/10 bg-white/5">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="詢問關於家論的專業表現..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-colors placeholder:text-white/20"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading}
                  className="w-12 h-12 bg-brand-accent text-white rounded-xl flex items-center justify-center hover:bg-brand-accent/80 transition-all disabled:opacity-50 shadow-lg shadow-brand-accent/20"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
