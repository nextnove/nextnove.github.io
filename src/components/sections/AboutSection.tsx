import type { Theme, Skills } from '../../types';

interface AboutSectionProps {
  theme: Theme;
  skills: Skills;
}


export default function AboutSection({ theme, skills }: AboutSectionProps) {
  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6 scroll-reveal">
            <h2 className="text-4xl font-bold">About NextNove</h2>
            <div className={`space-y-4 leading-relaxed ${
              theme === 'dark' ? 'text-white/60' : 'text-black/70'
            }`}>
              <p>
                NextNove는 혁신적인 기술로 더 나은 미래를 만들어가는 개발 조직입니다.
              </p>
              <p>
                우리는 최신 웹 기술과 AI를 활용하여 사용자 중심의 솔루션을 개발하며,
                끊임없는 학습과 실험을 통해 기술의 경계를 확장합니다.
              </p>
              <p>
                오픈소스 정신을 바탕으로 커뮤니티와 함께 성장하며,
                모든 프로젝트에서 품질과 사용자 경험을 최우선으로 생각합니다.
              </p>
            </div>
          </div>

          <div className="space-y-8 scroll-reveal">
            <div>
              <h3 className="text-lg font-medium mb-6">Tech Stack</h3>
              <div className="space-y-6">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category} className="space-y-3">
                    <div className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-white/40' : 'text-black/40'
                    }`}>{category}</div>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className={`px-3 py-1 rounded-md text-sm transition-all ${
                            theme === 'dark'
                              ? 'bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
                              : 'bg-black/5 border border-black/10 text-black/80 hover:bg-black/10 hover:border-black/20'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}