export interface HeroSectionProps {
    hero: {
        title: string[];
        subtitle: {
            prefix: string;
            highlight1: string;
            and: string;
            highlight2: string;
        };
        buttons: Array<{
            text: string;
            type: "primary" | "secondary";
            href?: string;
        }>;
    };
    status: {
        title: string;
        lines: { text: string; color: string }[];
    };
    meta: { label: string; value: string }[];
}
