import type { Theme } from '../../types';
import { siteConfig } from '../../config/site';

interface FooterProps {
  theme: Theme;
}

export default function Footer({ theme }: FooterProps) {
  return (
    <footer className={`border-t py-12 ${
      theme === 'dark' ? 'border-white/5' : 'border-black/5'
    }`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className={`flex flex-col md:flex-row items-center justify-between gap-4 text-sm ${
          theme === 'dark' ? 'text-white/40' : 'text-black/40'
        }`}>
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved
          </div>
          <nav className="flex items-center gap-6" aria-label="Footer navigation">
            <a 
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                theme === 'dark' ? 'hover:text-white' : 'hover:text-black'
              }`}
              aria-label="Visit our GitHub profile"
            >
              GitHub
            </a>
            <a 
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                theme === 'dark' ? 'hover:text-white' : 'hover:text-black'
              }`}
              aria-label="Follow us on Twitter"
            >
              Twitter
            </a>
            <a 
              href={`mailto:${siteConfig.links.email}`} 
              className={`transition-colors ${
                theme === 'dark' ? 'hover:text-white' : 'hover:text-black'
              }`}
              aria-label="Send us an email"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}