import { SiteConfig } from "./metadata.types";

/**
 * Global site configuration
 * Update these values to match your portfolio details
 */
export const siteConfig: SiteConfig = {
  name: "Mohak Sharma",
  author: "Mohak Sharma",
  description:
    "Robotics engineer and AI researcher specializing in embodied intelligence, causal reasoning, and computational neuroscience. Building intelligent systems that bridge the gap between digital computation and physical action.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mohaksharma.com",
  ogImage: "/og-image.png", // Add your default OG image
  keywords: [
    "Robotics",
    "Embodied AI",
    "Machine Learning",
    "Computational Neuroscience",
    "Causal Inference",
    "Computer Vision",
    "Signal Processing",
    "Neural Networks",
    "LLM Applications",
    "Product Strategy",
  ],
  social: {
    github: "https://github.com/Mohak327",
    linkedin: "https://linkedin.com/in/sharma-mohak", // Update with your LinkedIn
    email: "ms7306@columbia.edu", // Update with your email
    twitter: "", // Add if you have Twitter
  },
};
