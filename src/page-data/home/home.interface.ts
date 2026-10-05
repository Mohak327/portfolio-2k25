import { LucideIcon } from "lucide-react";
import { FilterOption } from "@/components/Organisms/PillFilters/PillFilters.interface";
import { ProjectCategory } from "../projects/projects.interface";

export interface Skill {
  name: string;
  category: string;
  priority: "high" | "medium" | "low";
  color: string;
}

export interface HomeProjectItem {
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

export interface HomeViewProps {
  projectItems: HomeProjectItem[];
  projectFilterOptions: FilterOption[];
  activeProjectFilter: string;
  allProjectsLabel: string;
  onProjectFilterChange: (value: string) => void;
  techArsenal: {
    title: string;
    skills: Skill[];
    ctaLink: string;
    ctaText: string;
    ctaIcon?: LucideIcon;
  };
}