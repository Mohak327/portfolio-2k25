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

export interface ProjectInterface {
  id: string;
  title: string;
  subtitle: string;
  category?: string;
  summary: string;
  role?: string;
  focus?: string;
  sections: SectionItem[];
  tags: string[];
  accentColor: string;
  github?: URL;
}
