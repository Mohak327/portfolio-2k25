interface CardProps {
    bgColor?: string;
    accentColor?: string;
    children: React.ReactNode;
    className?: string;
    /** Whether the card responds to clicks (a link, an expand/collapse, etc).
     *  Non-interactive cards skip the press-down hover so they don't imply a CTA that isn't there. */
    interactive?: boolean;
}

const Card = ({ bgColor, accentColor, children, className, interactive = true }: CardProps) => {
    const cardStyle = { backgroundColor: bgColor };
    const hoverClasses = interactive
        ? "hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
        : "";
    return (
        <div style={cardStyle} className={`border-4 border-black p-6 relative transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${hoverClasses} ${className}`}>
            {children}
        </div>
    );
};

export default Card;
