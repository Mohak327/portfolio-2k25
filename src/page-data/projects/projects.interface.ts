import { FilterOption } from "@/components/Organisms/PillFilters/PillFilters.interface";

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

/** A project as shown on a listing card. */
export interface ProjectCardItem {
  id: string;
  link: string;
  focus?: string;
  categories: ProjectCategory[];
  title: string;
  description: string;
  tags: string[];
  accent: string;
  bgColor: string;
}

export interface ProjectsPageViewProps {
  projectItems: ProjectCardItem[];
  filterOptions: FilterOption[];
  activeFilter: string;
  allLabel: string;
  onFilterChange: (value: string) => void;
}

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
