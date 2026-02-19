import Navigation from './components/layout/Navigation';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import Footer from './components/layout/Footer';
import SEO from './components/common/SEO';
import StructuredData from './components/common/StructuredData';
import Analytics from './components/common/Analytics';
// Data
import { skills } from './data/skills';
import { projects } from './data/projects';
import { experience } from './data/experience';
// Hooks
import { 
  useTheme, 
  useCursorTrailCanvas, 
  useTypingAnimation, 
  useScrollReveal, 
  useActiveSection,
  usePerformanceMonitor
} from './hooks';
import { siteConfig } from './config/site';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { activeSection, scrollToSection } = useActiveSection();
  const canvasRef = useCursorTrailCanvas(
    theme, 
    siteConfig.animation.cursorTrail
  );
  const typedText = useTypingAnimation(
    siteConfig.tagline, 
    siteConfig.animation.typing.speed
  );
  
  // 스크롤 리빌 효과 (activeSection 변경 시 재관찰)
  useScrollReveal(activeSection, siteConfig.animation.scrollReveal);
  
  // 성능 모니터링 (개발 환경에서만)
  usePerformanceMonitor(siteConfig.features.performanceMonitoring);

  return (
    <>
      {/* SEO */}
      <SEO />
      <StructuredData />
      <Analytics />
      
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
      }`}>
      {/* Canvas 기반 마우스 커서 트레일 */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-9999"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Navigation */}
      <Navigation 
        theme={theme}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        onThemeToggle={toggleTheme}
      />

      {/* Hero Section */}
      <HeroSection 
        theme={theme}
        typedText={typedText}
        onSectionClick={scrollToSection}
      />

      {/* About Section */}
      <AboutSection 
        theme={theme}
        skills={skills}
      />

      {/* Projects Section */}
      <ProjectsSection 
        theme={theme}
        projects={projects}
      />

      {/* Experience Section */}
      <ExperienceSection 
        theme={theme}
        experience={experience}
      />

      {/* Footer */}
      <Footer theme={theme} />
    </div>
    </>
  );
}