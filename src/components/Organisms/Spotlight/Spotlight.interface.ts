import { LucideIcon } from "lucide-react";

export interface SpotlightItem {
  title: string;
  subtitle?: string;
  description: string;
  icon: LucideIcon;
  link: string;
  accentColor: string;
}

export interface SpotlightProps {
  title: string;
  items: SpotlightItem[];
}
