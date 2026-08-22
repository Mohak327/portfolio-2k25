import { PageMetadata } from "./metadata.types";
import { siteConfig } from "./site-config";

/**
 * Page-specific metadata configurations
 */

export const homePageMetadata: PageMetadata = {
  title: "Home",
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  ogType: "profile",
  canonicalUrl: siteConfig.url,
};

export const projectsPageMetadata: PageMetadata = {
  title: "Projects",
  description:
    "Explore my portfolio of robotics, AI, and computational neuroscience projects, from causal reasoning benchmarks to neural signal processing and embodied intelligence systems.",
  keywords: [
    "Robotics Projects",
    "AI Research",
    "Machine Learning Portfolio",
    "Computational Neuroscience",
    "Open Source Projects",
  ],
  ogType: "website",
  canonicalUrl: `${siteConfig.url}/projects`,
};

export const skillsPageMetadata: PageMetadata = {
  title: "Skills & Expertise",
  description:
    "Technical skills spanning robotics, machine learning, signal processing, and full-stack development. Proficient in Python, C++, PyTorch, ROS, and modern web technologies.",
  keywords: [
    "Technical Skills",
    "Robotics Engineering",
    "Machine Learning",
    "Python",
    "C++",
    "PyTorch",
    "ROS",
    "Computer Vision",
  ],
  ogType: "website",
  canonicalUrl: `${siteConfig.url}/skills`,
};

/**
 * Generate metadata for a specific project page
 */
export function getProjectMetadata(project: {
  title: string;
  subtitle?: string;
  summary: string;
  tags: string[];
  id: string;
}): PageMetadata {
  return {
    title: project.title,
    description: project.subtitle || project.summary,
    keywords: project.tags,
    ogType: "article",
    canonicalUrl: `${siteConfig.url}/projects/${project.id}`,
  };
}
