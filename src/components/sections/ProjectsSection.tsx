import { ArrowUpRight } from 'lucide-react';
import type { Theme, Project } from '../../types';
import { siteConfig } from '../../config/site';

interface ProjectsSectionProps {
  theme: Theme;
  projects: Project[];
}

export default function ProjectsSection({ theme, projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-16 scroll-reveal">
          <h2 className="text-4xl font-bold">Our Projects</h2>
          <a 
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded ${
              theme === 'dark' 
                ? 'text-white/60 hover:text-white focus:ring-white/50' 
                : 'text-black/60 hover:text-black focus:ring-black/50'
            }`}
            aria-label="View all projects on GitHub"
          >
            View all on GitHub
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>

        <div className="space-y-6" role="list">
          {projects.map((project, index) => (
            <article
              key={project.id}
              role="listitem"
              className="scroll-reveal"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  theme === 'dark' ? 'focus:ring-white/50' : 'focus:ring-black/50'
                }`}
                aria-label={`View ${project.title} project`}
              >
                <div className={`border rounded-2xl p-8 transition-all ${
                  theme === 'dark'
                    ? 'border-white/10 hover:bg-white/5 hover:border-white/20'
                    : 'border-black/10 hover:bg-black/5 hover:border-black/20'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className={`text-2xl font-semibold transition-colors ${
                          theme === 'dark' ? 'group-hover:text-white/80' : 'group-hover:text-black/80'
                        }`}>
                          {project.title}
                        </h3>
                        <ArrowUpRight 
                          size={20} 
                          className={`transition-all group-hover:translate-x-1 group-hover:-translate-y-1 ${
                            theme === 'dark' ? 'text-white/40 group-hover:text-white' : 'text-black/40 group-hover:text-black'
                          }`}
                          aria-hidden="true"
                        />
                      </div>
                      <p className={`leading-relaxed mb-4 ${
                        theme === 'dark' ? 'text-white/60' : 'text-black/60'
                      }`}>
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                    {project.tech.map((tech: string) => (
                      <span
                        key={tech}
                        role="listitem"
                        className={`px-3 py-1 rounded-md text-xs ${
                          theme === 'dark'
                            ? 'bg-white/5 border border-white/5 text-white/60'
                            : 'bg-black/5 border border-black/5 text-black/60'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className={`flex flex-wrap items-center gap-4 text-xs ${
                    theme === 'dark' ? 'text-white/40' : 'text-black/40'
                  }`} role="list" aria-label="Project metrics">
                    {(Object.entries(project.metrics) as [string, string][]).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2" role="listitem">
                        <span className="capitalize">{key}</span>
                        <span className={`font-medium ${
                          theme === 'dark' ? 'text-white/60' : 'text-black/60'
                        }`}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}