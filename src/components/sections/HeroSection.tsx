import { ArrowRight } from 'lucide-react';

import type { Theme } from '../../types';
import { siteConfig } from '../../config/site';

interface HeroSectionProps {
  theme: Theme;
  typedText: string;
  onSectionClick: (id: string) => void;
}

export default function HeroSection({ theme, typedText, onSectionClick }: HeroSectionProps) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div 
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl animate-blob ${
            theme === 'dark' ? 'bg-blue-500 opacity-20' : 'bg-blue-400 opacity-30'
          }`}
        />
        <div 
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 ${
            theme === 'dark' ? 'bg-purple-500 opacity-20' : 'bg-purple-400 opacity-30'
          }`}
        />
        <div 
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000 ${
            theme === 'dark' ? 'bg-pink-500 opacity-20' : 'bg-pink-400 opacity-30'
          }`}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="space-y-6">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm ${
            theme === 'dark' 
              ? 'border-white/10 bg-white/5 text-white/60' 
              : 'border-black/10 bg-black/5 text-black/60'
          }`}>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true" />
            Building the future
          </div>
          
          <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
            {siteConfig.name}
            <br />
            <span className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {typedText}
              <span className="animate-pulse" aria-hidden="true">|</span>
            </span>
          </h1>
          
          <p className={`text-xl max-w-2xl leading-relaxed ${
            theme === 'dark' ? 'text-white/60' : 'text-black/60'
          }`}>
            {siteConfig.description}
          </p>

          <div className="flex items-center gap-4 pt-4">
            <button 
              onClick={() => onSectionClick('projects')}
              className={`group px-6 py-3 text-sm font-medium rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                theme === 'dark' 
                  ? 'bg-white text-black hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50' 
                  : 'bg-black text-white hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black/50'
              }`}
              aria-label="View our projects"
            >
              프로젝트 보기
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
            <button 
              onClick={() => onSectionClick('about')}
              className={`px-6 py-3 border text-sm font-medium rounded-lg transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'border-white/10 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/50'
                  : 'border-black/10 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/50'
              }`}
              aria-label="Learn more about us"
            >
              더 알아보기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}