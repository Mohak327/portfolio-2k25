"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { AccordionProps } from "./Accordion.interface";

const Accordion = ({ header, children, defaultOpen = true }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    // Let links and buttons (including the header toggle below) handle their own clicks.
    if (target.closest("a, button")) return;

    // Don't collapse the section out from under someone selecting text.
    if (window.getSelection()?.toString()) return;

    setIsOpen((prev) => !prev);
  };

  const toggle = (event: React.MouseEvent | React.KeyboardEvent) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`-m-6 p-6 ${!isOpen ? "cursor-pointer" : ""}`}
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        className="block w-full appearance-none border-0 bg-transparent p-0 m-0 text-left cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
      >
        {header}
      </button>

      {/* Anchored to the Card (its nearest positioned ancestor), so it stays
          bottom-right regardless of open/closed height. */}
      <div className="absolute bottom-3 right-3 border-2 border-black p-0.5 leading-none transition-colors hover:bg-black hover:text-white">
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Grid-rows 0fr/1fr is the smooth-height trick: no JS measurement, no
          jump, and it animates cleanly regardless of how tall the content is. */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
