import { Metadata } from "next";

/**
 * Extended metadata configuration for portfolio pages
 */
export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: StructuredData;
}

/**
 * Schema.org structured data types
 */
export type StructuredData =
  | PersonStructuredData
  | ProjectStructuredData
  | BreadcrumbStructuredData
  | WebPageStructuredData;

export interface PersonStructuredData {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  jobTitle: string;
  url: string;
  sameAs?: string[];
  description?: string;
  image?: string;
  email?: string;
  alumniOf?: {
    "@type": "EducationalOrganization";
    name: string;
  }[];
  knowsAbout?: string[];
}

export interface ProjectStructuredData {
  "@context": "https://schema.org";
  "@type": "SoftwareSourceCode";
  name: string;
  description: string;
  author: {
    "@type": "Person";
    name: string;
  };
  datePublished?: string;
  keywords?: string[];
  programmingLanguage?: string[];
  codeRepository?: string;
  url?: string;
}

export interface BreadcrumbStructuredData {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: {
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }[];
}

export interface WebPageStructuredData {
  "@context": "https://schema.org";
  "@type": "WebPage";
  name: string;
  description: string;
  url: string;
  author?: {
    "@type": "Person";
    name: string;
  };
  datePublished?: string;
  dateModified?: string;
}

/**
 * Site-wide metadata configuration
 */
export interface SiteConfig {
  name: string;
  author: string;
  description: string;
  url: string;
  ogImage: string;
  keywords: string[];
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    email?: string;
  };
}
