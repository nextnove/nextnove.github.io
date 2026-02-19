import { siteConfig } from '../../config/site';

/**
 * 구조화된 데이터 (JSON-LD)
 * 
 * Google 검색 결과에 리치 스니펫을 표시하기 위한 구조화된 데이터입니다.
 * Schema.org 형식을 따릅니다.
 */
export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.twitter,
      siteConfig.links.linkedin
    ],
    jobTitle: 'Developer',
    worksFor: {
      '@type': 'Organization',
      name: siteConfig.name
    },
    email: siteConfig.links.email,
    image: `${siteConfig.url}${siteConfig.og.image}`,
    knowsAbout: siteConfig.metadata.keywords
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
