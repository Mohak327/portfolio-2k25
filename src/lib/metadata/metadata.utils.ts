import { Metadata } from "next";
import { PageMetadata, StructuredData } from "./metadata.types";
import { siteConfig } from "./site-config";

/**
 * Generate Next.js metadata object from page metadata configuration
 */
export function generateMetadata(config: PageMetadata): Metadata {
  const title = config.title
    ? `${config.title} | ${siteConfig.name}`
    : siteConfig.name;

  const metadata: Metadata = {
    title,
    description: config.description || siteConfig.description,
    keywords: config.keywords || siteConfig.keywords,
    authors: [{ name: config.author || siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    robots: config.noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      type: config.ogType || "website",
      locale: "en_US",
      url: config.canonicalUrl || siteConfig.url,
      title,
      description: config.description || siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: config.ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: config.description || siteConfig.description,
      images: [config.ogImage || siteConfig.ogImage],
      creator: siteConfig.social.twitter,
    },
  };

  // Add canonical URL if provided
  if (config.canonicalUrl) {
    metadata.alternates = {
      canonical: config.canonicalUrl,
    };
  }

  return metadata;
}

/**
 * Generate JSON-LD structured data script tag
 */
export function generateStructuredData(
  data: StructuredData | StructuredData[]
): string {
  const structuredDataArray = Array.isArray(data) ? data : [data];

  return JSON.stringify(structuredDataArray.length === 1 ? data : structuredDataArray);
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbs(
  items: { name: string; path: string }[]
): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

/**
 * Generate Person structured data for the site owner
 */
export function generatePersonStructuredData(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author,
    jobTitle: "Robotics Engineer & AI Researcher",
    url: siteConfig.url,
    sameAs: Object.values(siteConfig.social).filter(Boolean) as string[],
    description: siteConfig.description,
    email: siteConfig.social.email,
    knowsAbout: siteConfig.keywords,
  };
}

/**
 * Generate Project/SoftwareSourceCode structured data
 */
export function generateProjectStructuredData(project: {
  name: string;
  description: string;
  datePublished?: string;
  keywords?: string[];
  programmingLanguage?: string[];
  codeRepository?: string;
  url?: string;
}): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.description,
    author: {
      "@type": "Person",
      name: siteConfig.author,
    },
    datePublished: project.datePublished,
    keywords: project.keywords,
    programmingLanguage: project.programmingLanguage,
    codeRepository: project.codeRepository,
    url: project.url,
  };
}

/**
 * Generate WebPage structured data
 */
export function generateWebPageStructuredData(page: {
  name: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.name,
    description: page.description,
    url: page.url,
    author: {
      "@type": "Person",
      name: siteConfig.author,
    },
    datePublished: page.datePublished,
    dateModified: page.dateModified,
  };
}
