import { useState, useEffect } from 'react';
import { Mail, Sun, Moon, Menu, X } from 'lucide-react';
import GithubIcon from '../icons/GithubIcon';
import LinkedinIcon from '../icons/LinkedinIcon';
import type { Theme } from '../../types';
import { siteConfig } from '../../config/site';


interface NavigationProps {
  theme: Theme;
  activeSection: string;
  onSectionClick: (id: string) => void;
  onThemeToggle: () => void;
}

export default function Navigation({ theme, activeSection, onSectionClick, onThemeToggle }: NavigationProps) {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const handleSectionClick = (id: string) => {
    onSectionClick(id);
    setIsOffcanvasOpen(false);
  };

  // 오프캔버스 열릴 때 body 스크롤 잠금
  useEffect(() => {
    if (isOffcanvasOpen) {
      document.body.style.overflow = 'hidden';
      
      // Escape 키로 닫기
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOffcanvasOpen(false);
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOffcanvasOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl ${
        theme === 'dark' 
          ? 'border-white/5 bg-black/80' 
          : 'border-black/5 bg-white/80'
      }`} aria-label="Main navigation">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => handleSectionClick('home')}
              className={`text-sm font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded ${
                theme === 'dark' 
                  ? 'hover:text-white/60 focus-visible:ring-white/50' 
                  : 'hover:text-black/60 focus-visible:ring-black/50'
              }`}
              aria-label="Go to home section"
            >
              {siteConfig.name}
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main menu">
              {['About', 'Projects', 'Milestones'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleSectionClick(item === 'Milestones' ? 'experience' : item.toLowerCase())}
                  className={`text-sm transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded px-2 py-1 ${
                    activeSection === (item === 'Milestones' ? 'experience' : item.toLowerCase())
                      ? theme === 'dark' ? 'text-white' : 'text-black'
                      : theme === 'dark' ? 'text-white/40 hover:text-white/60' : 'text-black/40 hover:text-black/60'
                  } ${theme === 'dark' ? 'focus-visible:ring-white/50' : 'focus-visible:ring-black/50'}`}
                  aria-label={`Go to ${item} section`}
                  aria-current={activeSection === (item === 'Milestones' ? 'experience' : item.toLowerCase()) ? 'page' : undefined}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* Desktop Social Links */}
              <div className="hidden md:flex items-center gap-4">
                <button
                  onClick={onThemeToggle}
                  className={`p-2 rounded-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    theme === 'dark' 
                      ? 'hover:bg-white/5 focus-visible:ring-white/50' 
                      : 'hover:bg-black/5 focus-visible:ring-black/50'
                  }`}
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                
                <a href={siteConfig.links.github}
                   target="_blank"
                   rel="noopener noreferrer"
                   className={`transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded p-1 ${
                     theme === 'dark' 
                       ? 'text-white/40 hover:text-white focus-visible:ring-white/50' 
                       : 'text-black/40 hover:text-black focus-visible:ring-black/50'
                   }`}
                   aria-label="Visit our GitHub profile">
                  <GithubIcon size={18} />
                </a>
                <a href={siteConfig.links.linkedin}
                   target="_blank"
                   rel="noopener noreferrer"
                   className={`transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded p-1 ${
                     theme === 'dark' 
                       ? 'text-white/40 hover:text-white focus-visible:ring-white/50' 
                       : 'text-black/40 hover:text-black focus-visible:ring-black/50'
                   }`}
                   aria-label="Visit our LinkedIn profile">
                  <LinkedinIcon size={18} />
                </a>
                <a href={`mailto:${siteConfig.links.email}`} 
                   className={`transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded p-1 ${
                     theme === 'dark' 
                       ? 'text-white/40 hover:text-white focus-visible:ring-white/50' 
                       : 'text-black/40 hover:text-black focus-visible:ring-black/50'
                   }`}
                   aria-label="Send us an email">
                  <Mail size={18} />
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOffcanvasOpen(true)}
                className={`md:hidden p-2 rounded-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  theme === 'dark' 
                    ? 'hover:bg-white/5 focus-visible:ring-white/50' 
                    : 'hover:bg-black/5 focus-visible:ring-black/50'
                }`}
                aria-label="Open navigation menu"
                aria-expanded={isOffcanvasOpen}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Offcanvas Overlay */}
      {isOffcanvasOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] md:hidden"
          onClick={() => setIsOffcanvasOpen(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
              setIsOffcanvasOpen(false);
            }
          }}
          aria-label="Close navigation menu"
        />
      )}

      {/* Offcanvas Menu */}
      <aside 
        className={`fixed top-0 right-0 h-full w-64 sm:w-72 z-[70] transform transition-transform duration-300 ease-in-out md:hidden ${
          isOffcanvasOpen ? 'translate-x-0' : 'translate-x-full'
        } ${theme === 'dark' ? 'bg-black border-l border-white/10' : 'bg-white border-l border-black/10'}`}
        aria-label="Mobile navigation menu"
        aria-hidden={!isOffcanvasOpen}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`flex items-center justify-between p-6 border-b ${
            theme === 'dark' ? 'border-white/10' : 'border-black/10'
          }`}>
            <span className="text-sm font-medium">Menu</span>
            <button
              onClick={() => setIsOffcanvasOpen(false)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-black/5'
              }`}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 p-6" role="navigation" aria-label="Mobile menu">
            {['About', 'Projects', 'Milestones'].map((item) => (
              <button
                key={item}
                onClick={() => handleSectionClick(item === 'Milestones' ? 'experience' : item.toLowerCase())}
                className={`text-left px-4 py-3 rounded-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset ${
                  activeSection === (item === 'Milestones' ? 'experience' : item.toLowerCase())
                    ? theme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/10 text-black'
                    : theme === 'dark' ? 'text-white/60 hover:bg-white/5' : 'text-black/60 hover:bg-black/5'
                } ${theme === 'dark' ? 'focus-visible:ring-white/50' : 'focus-visible:ring-black/50'}`}
                aria-label={`Go to ${item} section`}
                aria-current={activeSection === (item === 'Milestones' ? 'experience' : item.toLowerCase()) ? 'page' : undefined}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Social Links & Theme Toggle */}
          <div className={`mt-auto p-6 border-t ${
            theme === 'dark' ? 'border-white/10' : 'border-black/10'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <span className={`text-sm ${
                theme === 'dark' ? 'text-white/60' : 'text-black/60'
              }`}>Theme</span>
              <button
                onClick={onThemeToggle}
                className={`p-2 rounded-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset ${
                  theme === 'dark' 
                    ? 'hover:bg-white/5 focus-visible:ring-white/50' 
                    : 'hover:bg-black/5 focus-visible:ring-black/50'
                }`}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
            
            <nav className="flex items-center gap-4" aria-label="Social links">
              <a href={siteConfig.links.github}
                 target="_blank"
                 rel="noopener noreferrer"
                 className={`transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset rounded p-1 ${
                   theme === 'dark' 
                     ? 'text-white/40 hover:text-white focus-visible:ring-white/50' 
                     : 'text-black/40 hover:text-black focus-visible:ring-black/50'
                 }`}
                 aria-label="Visit our GitHub profile">
                <GithubIcon size={20} />
              </a>
              <a href={siteConfig.links.linkedin}
                 target="_blank"
                 rel="noopener noreferrer"
                 className={`transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset rounded p-1 ${
                   theme === 'dark' 
                     ? 'text-white/40 hover:text-white focus-visible:ring-white/50' 
                     : 'text-black/40 hover:text-black focus-visible:ring-black/50'
                 }`}
                 aria-label="Visit our LinkedIn profile">
                <LinkedinIcon size={20} />
              </a>
              <a href={`mailto:${siteConfig.links.email}`} 
                 className={`transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset rounded p-1 ${
                   theme === 'dark' 
                     ? 'text-white/40 hover:text-white focus-visible:ring-white/50' 
                     : 'text-black/40 hover:text-black focus-visible:ring-black/50'
                 }`}
                 aria-label="Send us an email">
                <Mail size={20} />
              </a>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}