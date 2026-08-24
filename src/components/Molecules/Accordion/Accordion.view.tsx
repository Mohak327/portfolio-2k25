"use client";

import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import type { AccordionProps } from "./Accordion.interface";

const Accordion = ({ header, children, defaultOpen = true }: AccordionProps) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDetailsElement>) => {
    const details = detailsRef.current;
    if (!details) return;

    const target = event.target as HTMLElement;

    if (target.closest("summary")) return;

    if (target.closest("a, button")) return;

    if (window.getSelection()?.toString()) return;

    details.open = !details.open;
  };

  return (
    <details
      ref={detailsRef}
      open={defaultOpen}
      onClick={handleClick}
      className="group -m-6 p-6 [&:not([open])]:cursor-pointer"
    >
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        {header}
        <div className="absolute bottom-3 right-3 border-2 border-black p-0.5 leading-none transition-all hover:bg-black hover:text-white">
          <ChevronDown
            size={14}
            className="transition-transform duration-200 group-open:rotate-180"
          />
        </div>
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  );
};

export default Accordion;
