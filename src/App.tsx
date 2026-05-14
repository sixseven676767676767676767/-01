/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { 
  Brain, 
  Code, 
  Cpu, 
  ExternalLink, 
  Github, 
  Mail, 
  MessageSquare, 
  Palette, 
  Rocket, 
  Terminal, 
  Video,
  ChevronRight
} from "lucide-react";
import { cn } from "./lib/utils";

import { AIChatbot } from "./components/AIChatbot";

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold mb-4"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-white/60 max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

interface ProjectProps {
  title: string;
  category: string;
  s: string;
  a: string;
  r: string;
  tags: string[];
  index: number;
  key?: string;
}

const ProjectCard = ({ 
  title, 
  category, 
  s, a, r, 
  tags,
  index 
}: ProjectProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="mb-20 group"
  >
    <div className="flex flex-col mb-6">
      <span className="section-label">0{index + 1} / {category}</span>
      <h3 className="text-4xl font-serif group-hover:text-brand-accent transition-colors duration-500 leading-tight">
        {title}
      </h3>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <div className="star-item">
        <span className="block text-[10px] font-mono uppercase text-brand-muted mb-3 tracking-widest">The Challenge</span>
        <p className="text-sm text-brand-muted leading-relaxed">{s}</p>
      </div>
      <div className="star-item">
        <span className="block text-[10px] font-mono uppercase text-brand-muted mb-3 tracking-widest">My Solution</span>
        <p className="text-sm text-brand-muted leading-relaxed">{a}</p>
      </div>
      <div className="star-item">
        <span className="block text-[10px] font-mono uppercase text-brand-accent mb-3 tracking-widest">Key Impact</span>
        <p className="text-sm text-brand-text leading-relaxed font-medium">{r}</p>
      </div>
    </div>

    <div className="h-[1px] w-full bg-white/5 relative overflow-hidden">
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-brand-accent/50 to-brand-accent origin-left"
      />
    </div>

    <div className="flex flex-wrap gap-2 mt-6">
      {tags.map(tag => (
        <span key={tag} className="skill-tag">
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

export default function App() {
  const skills = [
    { icon: <Terminal size={18} />, name: "Automation", desc: "Python / C# / Node.js 系統整合" },
    { icon: <Cpu size={18} />, name: "Prompt Engineering", desc: "LLM 應用開發與工作流優化" },
    { icon: <Palette size={18} />, name: "UI/UX Strategy", desc: "PRD 規劃、用戶體驗與品牌設計" },
    { icon: <Code size={18} />, name: "Unity Engine", desc: "XR 沉浸式互動與數位孿生" },
  ];

  const philosophies = [
    { title: "AI-First Thinking", text: "不只是使用工具，而是重新定義解決問題的邏輯，將生產力提升至極致。" },
    { title: "Educational UX", text: "技術的價值在於落地。我致力於降低科技學習門檻，讓知識流動更順暢。" },
    { title: "Data-Driven Narrative", text: "結合數據洞察與感性敘事，創造具備商業轉化力與品牌溫度的內容。" },
  ];

  const projects = [
    {
      title: "阿爸的家園：健康餐點系統",
      category: "Product Management",
      s: "健康餐飲市場競爭激烈，傳統訂購方式缺乏系統化流程，導致營運效率低下且用戶體驗斷層。",
      a: "主導完整 PRD 規劃，包含深度用戶畫像分析、功能清單定義、業務流程圖繪製及線框圖設計。",
      r: "成功建立標準化開發藍圖，預期提升跨團隊溝通效率 40%，並為後續系統開發奠定穩固基礎。",
      tags: ["PRD Planning", "UX Research", "System Architecture"],
    },
    {
      title: "DreamFlow AI：行銷敘事專案",
      category: "AI Workflow",
      s: "品牌行銷內容產出耗時，且在不同平台間難以維持敘事的一致性與吸引力。",
      a: "建構 AI 輔助工作流，利用提示詞工程生成多維度行銷腳本、視覺資產與品牌故事線。",
      r: "縮短 60% 內容產出時間，同時透過 AI 數據洞察提升敘事精準度與受眾互動率。",
      tags: ["GPT-4", "Midjourney", "Workflow Design"],
    },
    {
      title: "宜蘭旅遊導覽：AI 影音創作",
      category: "Digital Content",
      s: "傳統旅遊導覽形式單一，難以在短影音時代吸引年輕族群的注意力。",
      a: "整合 AI 語音合成與影像生成技術，創作專業級導覽影片，實現高效率、低成本的內容產出。",
      r: "以極低成本達成專業級影音效果，展現 AI 在地方觀光數位轉型中的應用潛力。",
      tags: ["AI Video", "Digital Branding", "Creative AI"],
    },
  ];

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white relative bg-brand-bg">
      {/* Editorial Header */}
      <header className="fixed top-0 left-0 w-full p-10 z-50 flex justify-between items-start mix-blend-difference pointer-events-none">
        <div className="text-[10px] font-mono text-white/50 uppercase tracking-[0.4em]">
          Available for Hire / 2024
        </div>
        <div className="text-[10px] font-mono text-white/50 uppercase tracking-[0.4em] text-right">
          Taipei, Taiwan / AI Designer
        </div>
      </header>

      <main className="editorial-grid">
        {/* Left Column: Hero & Insights */}
        <section className="p-10 lg:p-20 flex flex-col relative min-h-screen lg:sticky lg:top-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="my-auto pt-20"
          >
            {/* Persona Image with Modern Mask */}
            <div className="mb-16 relative flex justify-center lg:justify-start">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 1.2 }}
                className="w-56 h-72 overflow-hidden rounded-[2px] border border-white/5 relative group"
              >
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
                  alt="李家論" 
                  className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-accent/5 mix-blend-screen" />
              </motion.div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l border-b border-brand-accent/30 -z-10" />
            </div>

            <div className="mb-8">
              <span className="section-label">Professional Identity</span>
              <h1 className="text-7xl lg:text-9xl font-bold tracking-tighter leading-[0.8] mb-8 uppercase">
                李家論<br />
                <span className="text-white/10 italic font-serif lowercase tracking-normal">Jialun Li</span>
              </h1>
            </div>

            <div className="max-w-md space-y-8">
              <div className="border-l border-brand-accent pl-8">
                <p className="text-xl text-brand-text/90 font-serif leading-relaxed italic">
                  "技術從不孤立存在，它的意義在於如何服務於人的成長與品牌的演化。"
                </p>
              </div>
              <p className="text-brand-muted leading-relaxed">
                我是李家論，一名 AI 教育設計師與數位品牌顧問。擅長利用 Python 與 Unity 建構自動化解決方案，並透過提示詞工程將複雜技術轉化為直觀的商業價值。
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 mt-16">
              {skills.map(skill => (
                <div key={skill.name} className="group">
                  <div className="flex items-center gap-3 mb-2 text-brand-accent">
                    {skill.icon}
                    <span className="text-[10px] font-bold uppercase tracking-widest">{skill.name}</span>
                  </div>
                  <p className="text-[11px] text-brand-muted group-hover:text-brand-text transition-colors">{skill.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Social Links / Footer */}
          <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap gap-8">
             <a href="mailto:f132100366@gmail.com" className="group flex items-center gap-3 text-brand-accent">
                <div className="w-10 h-10 rounded-full border border-brand-accent flex items-center justify-center group-hover:bg-brand-accent group-hover:text-white transition-all">
                  <Mail size={16} />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Contact Me</span>
             </a>
             <a href="#" className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors">
                <Github size={18} />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Github</span>
             </a>
          </div>
        </section>

        {/* Right Column: Case Studies & Philosophy */}
        <section className="p-10 lg:p-20 lg:border-l border-white/5">
          <div className="max-w-3xl ml-auto">
            {/* Philosophy Section - Critical for interviewers */}
            <div className="mb-32">
              <span className="section-label">Thinking Process</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
                {philosophies.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <h4 className="text-sm font-bold mb-3 text-brand-text uppercase tracking-wider">{item.title}</h4>
                    <p className="text-xs text-brand-muted leading-relaxed">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mb-20 flex justify-between items-end">
              <div>
                <span className="section-label">Case Studies</span>
                <h2 className="text-5xl font-serif">核心作品展示</h2>
              </div>
              <ChevronRight className="text-brand-accent mb-2" size={32} />
            </div>
            
            <div className="space-y-12">
              {projects.map((project, i) => (
                <ProjectCard 
                  key={project.title} 
                  {...project}
                  index={i} 
                />
              ))}
            </div>

            {/* Final CTA */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-32 p-12 bg-white/5 border border-white/10 rounded-[2px] text-center"
            >
              <h3 className="text-3xl font-serif mb-6 italic text-brand-accent">準備好一起定義未來了嗎？</h3>
              <p className="text-brand-muted mb-10 max-w-lg mx-auto">
                如果您正在尋找一位能結合 AI 技術、產品思維與視覺美學的合作夥伴，歡迎隨時聯繫我，讓我們展開精彩的對話。
              </p>
              <a 
                href="mailto:f132100366@gmail.com" 
                className="inline-block px-12 py-5 bg-brand-accent text-white font-bold text-xs uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-brand-accent/20"
              >
                Send Interview Invite
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <AIChatbot />
    </div>
  );
}
