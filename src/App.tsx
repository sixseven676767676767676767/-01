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
    className="mb-12 group"
  >
    <div className="flex flex-col mb-4">
      <span className="text-[10px] font-mono text-brand-accent uppercase tracking-[0.2em] mb-2 block">
        Featured Project {index + 1} / {category}
      </span>
      <h3 className="text-3xl font-serif group-hover:text-brand-accent transition-colors">
        {title}
      </h3>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="star-item">
        <b className="block text-[10px] uppercase text-white/40 mb-2 tracking-widest">Situation</b>
        <p className="text-sm text-brand-muted leading-relaxed">{s}</p>
      </div>
      <div className="star-item">
        <b className="block text-[10px] uppercase text-white/40 mb-2 tracking-widest">Action</b>
        <p className="text-sm text-brand-muted leading-relaxed">{a}</p>
      </div>
      <div className="star-item">
        <b className="block text-[10px] uppercase text-white/40 mb-2 tracking-widest">Result</b>
        <p className="text-sm text-brand-text leading-relaxed font-medium">{r}</p>
      </div>
    </div>

    <div className="h-1 w-full bg-white/5 relative overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: "85%" }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-0 left-0 h-full bg-brand-accent"
      />
    </div>

    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map(tag => (
        <span key={tag} className="text-[9px] font-mono px-2 py-0.5 border border-white/10 rounded-full text-white/40 uppercase tracking-wider">
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

export default function App() {
  const skills = [
    { icon: <Terminal size={20} />, name: "Python / C#", desc: "自動化腳本與系統邏輯開發" },
    { icon: <Palette size={20} />, name: "Design Tools", desc: "Adobe Illustrator / Canva 視覺設計" },
    { icon: <Cpu size={20} />, name: "AI Tools", desc: "提示詞工程與內容創作工作流" },
    { icon: <Code size={20} />, name: "Unity", desc: "沉浸式互動體驗與遊戲開發" },
  ];

  const projects = [
    {
      title: "阿爸的家園：健康餐點系統",
      category: "PRD Planning",
      s: "健康餐飲市場競爭激烈，傳統訂購方式缺乏系統化流程，導致營運效率低下且用戶體驗斷層。",
      a: "主導完整 PRD 規劃，包含深度用戶畫像分析、功能清單定義、業務流程圖繪製及線框圖設計。",
      r: "成功建立標準化開發藍圖，預期提升跨團隊溝通效率 40%，並為後續系統開發奠定穩固基礎。",
      tags: ["PRD", "UX Research", "System Design"],
    },
    {
      title: "DreamFlow AI：行銷敘事專案",
      category: "AI Content Strategy",
      s: "品牌行銷內容產出耗時，且在不同平台間難以維持敘事的一致性與吸引力。",
      a: "建構 AI 輔助工作流，利用提示詞工程生成多維度行銷腳本、視覺資產與品牌故事線。",
      r: "縮短 60% 內容產出時間，同時透過 AI 數據洞察提升敘事精準度與受眾互動率。",
      tags: ["Prompt Engineering", "Marketing AI", "Storytelling"],
    },
    {
      title: "礁溪旅遊導覽：AI 影音創作",
      category: "Digital Content",
      s: "傳統旅遊導覽形式單一，難以在短影音時代吸引年輕族群的注意力。",
      a: "整合 AI 語音合成與影像生成技術，創作 90 秒沉浸式導覽影片，實現高效率內容產出。",
      r: "以極低成本達成專業級影音效果，展現 AI 在地方觀光數位轉型中的應用潛力。",
      tags: ["AI Video", "Content Creation", "Tourism"],
    },
  ];

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white relative">
      {/* Editorial Header */}
      <header className="absolute top-10 right-10 z-50 hidden lg:block">
        <div className="text-[10px] font-mono text-brand-muted uppercase tracking-[0.3em]">
          AI Education Designer / Portfolio 2024
        </div>
      </header>

      <main className="editorial-grid">
        {/* Left Column: Hero & About */}
        <section className="p-10 lg:p-20 flex flex-col justify-center relative min-h-screen">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Profile Image with Editorial Mask */}
            <div className="mb-12 relative inline-block">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="w-48 h-64 overflow-hidden rounded-[100px] border border-white/10 relative group"
              >
                <img 
                  src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=1000&auto=format&fit=crop" 
                  alt="李家論 Persona" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-accent/10 mix-blend-overlay" />
              </motion.div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-brand-accent" />
            </div>

            <div className="text-brand-accent font-serif italic text-xl mb-4">
              數位品牌顧問觀點：高轉換率求職敘事
            </div>
            <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.85] mb-10">
              李家論<br />
              <span className="text-white/20">LI JIALUN</span>
            </h1>
            <div className="border-l-2 border-brand-accent pl-8 mb-12">
              <p className="text-lg text-brand-muted leading-relaxed max-w-md">
                擅長將複雜的 AI 技術轉化為可感知的教育體驗。我不只是開發工具，我是在設計未來學習的捷徑。透過 Python 與 Unity 的結合，為品牌創造具備商業價值的數位內容。
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-12">
              {skills.map(skill => (
                <span key={skill.name} className="text-[10px] font-mono px-4 py-1.5 border border-white/10 rounded-full text-white/60 uppercase tracking-wider">
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTA Footer for Left Column */}
          <div className="mt-auto pt-10 flex items-center gap-8">
            <a href="mailto:f132100366@gmail.com" className="px-10 py-4 bg-brand-accent text-white font-bold text-sm tracking-widest uppercase hover:scale-105 transition-all">
              預約面試邀請
            </a>
            <div className="text-[10px] font-mono text-brand-muted uppercase leading-relaxed tracking-widest">
              Email: f132100366@gmail.com<br />
              Location: Taiwan, Taipei
            </div>
          </div>
        </section>

        {/* Right Column: Projects */}
        <section className="p-10 lg:p-20 lg:border-l border-white/5 flex flex-col justify-center">
          <div className="max-w-2xl">
            <div className="mb-16">
              <h2 className="text-xs font-mono text-brand-muted uppercase tracking-[0.4em] mb-4">Selected Works</h2>
              <div className="h-px w-20 bg-brand-accent" />
            </div>
            
            <div className="space-y-4">
              {projects.map((project, i) => (
                <ProjectCard 
                  key={project.title} 
                  title={project.title}
                  category={project.category}
                  s={project.s}
                  a={project.a}
                  r={project.r}
                  tags={project.tags}
                  index={i} 
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Navigation / Footer */}
      <footer className="lg:hidden p-10 border-t border-white/5 bg-brand-bg">
        <div className="flex flex-col gap-6">
          <div className="text-[10px] font-mono text-brand-muted uppercase tracking-[0.3em]">
            AI Education Designer / Portfolio 2024
          </div>
          <a href="mailto:f132100366@gmail.com" className="w-full py-4 bg-brand-accent text-white font-bold text-center text-sm tracking-widest uppercase">
            預約面試邀請
          </a>
        </div>
      </footer>
      <AIChatbot />
    </div>
  );
}
