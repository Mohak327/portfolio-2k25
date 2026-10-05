export interface MediaItem {
  url: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface CodeItem {
  language: string;
  code: string;
  filename?: string;
}

export interface EmbedItem {
  url: string;
  title?: string;
  width?: string;
  height?: string;
  aspectRatio?: string;
}

export interface ContentItem {
  type: "paragraph" | "list" | "bullet" | "ordered-list" | "image" | "video" | "code" | "embed";
  data: string | string[] | MediaItem | CodeItem | EmbedItem;
}

export interface SectionItem {
  heading: string;
  content: Array<{
    type: "paragraph" | "list" | "ordered-list" | "image" | "video" | "code" | "embed";
    data: string | string[] | MediaItem | CodeItem | EmbedItem;
  }>;
}

export const projectCategories = [
  "Neuroscience",
  "Computer Vision",
  "AI / LLMs",
  "Robotics & BCI",
  "Web Apps",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export interface ProjectInterface {
  id: string;
  title: string;
  subtitle: string;
  categories: ProjectCategory[];
  summary: string;
  role?: string;
  focus?: string;
  sections: SectionItem[];
  tags: string[];
  accentColor: string;
  github?: URL;
  liveUrl?: URL;
}
