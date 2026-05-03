import { LucideIcon } from "lucide-react";

export interface Skill {
    name: string;
    category: string;
    priority: "high" | "medium" | "low";
    color: string;
}

export interface TitledTagCloudProps {
    title: string;
    items: Skill[];
    ctaLink: string;
    ctaText: string;
    ctaIcon?: LucideIcon;
}
