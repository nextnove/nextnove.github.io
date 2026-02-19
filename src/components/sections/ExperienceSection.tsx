import type { Theme, Experience } from '../../types';

interface ExperienceSectionProps {
  theme: Theme;
  experience: Experience[];
}

export default function ExperienceSection({ theme, experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-16 scroll-reveal">Milestones</h2>

        <div className="space-y-12">
          {experience.map((exp, index) => (
            <div key={index} className={`relative pl-8 border-l scroll-reveal ${
              theme === 'dark' ? 'border-white/10' : 'border-black/10'
            }`} style={{ transitionDelay: `${index * 0.15}s` }}>
              <div className={`absolute left-0 top-0 w-2 h-2 -ml-1.25 rounded-full ${
                theme === 'dark' ? 'bg-white' : 'bg-black'
              }`} />
              
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{exp.role}</h3>
                    <div className={theme === 'dark' ? 'text-white/60' : 'text-black/60'}>{exp.company}</div>
                  </div>
                  <div className={`text-sm font-mono ${
                    theme === 'dark' ? 'text-white/40' : 'text-black/40'
                  }`}>{exp.period}</div>
                </div>

                <p className={`leading-relaxed ${
                  theme === 'dark' ? 'text-white/60' : 'text-black/60'
                }`}>
                  {exp.description}
                </p>

                <ul className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className={`flex items-start gap-3 text-sm ${
                      theme === 'dark' ? 'text-white/60' : 'text-black/60'
                    }`}>
                      <span className={theme === 'dark' ? 'text-white/40' : 'text-black/40'}>→</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
