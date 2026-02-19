import { useEffect } from 'react';
import { siteConfig } from '../../config/site';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

/**
 * SEO 컴포넌트
 * 
 * 페이지별로 동적으로 메타 태그를 업데이트합니다.
 * 
 * @example
 * ```tsx
 * <SEO 
 *   title="프로젝트 - NextNove Dev"
 *   description="우리의 프로젝트를 확인하세요"
 * />
 * ```
 */
export default function SEO({
  title = siteConfig.title,
  description = siteConfig.description,
  image = `${siteConfig.url}${siteConfig.og.image}`,
  url = siteConfig.url,
  type = siteConfig.metadata.type
}: SEOProps) {
  useEffect(() => {
    // 타이틀 업데이트
    document.title = title;

    // 메타 태그 업데이트 헬퍼 함수
    const updateMetaTag = (selector: string, content: string) => {
      let element = document.querySelector(selector);
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        const match = selector.match(/\[(.+?)=["'](.+?)["']\]/);
        if (match) {
          const [, attr, value] = match;
          element.setAttribute(attr, value);
          element.setAttribute('content', content);
          document.head.appendChild(element);
        }
      }
    };

    // Primary Meta Tags
    updateMetaTag('meta[name="title"]', title);
    updateMetaTag('meta[name="description"]', description);

    // Open Graph
    updateMetaTag('meta[property="og:title"]', title);
    updateMetaTag('meta[property="og:description"]', description);
    updateMetaTag('meta[property="og:image"]', image);
    updateMetaTag('meta[property="og:url"]', url);
    updateMetaTag('meta[property="og:type"]', type);

    // Twitter
    updateMetaTag('meta[property="twitter:title"]', title);
    updateMetaTag('meta[property="twitter:description"]', description);
    updateMetaTag('meta[property="twitter:image"]', image);
    updateMetaTag('meta[property="twitter:url"]', url);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', url);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', url);
      document.head.appendChild(canonical);
    }
  }, [title, description, image, url, type]);

  return null;
}
