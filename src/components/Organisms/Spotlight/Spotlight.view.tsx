"use client";
import React from "react";
import { SpotlightProps } from "./Spotlight.interface";
import Link from "next/link";
import { BookOpenText } from "lucide-react";

const Spotlight: React.FC<SpotlightProps> = ({ title, items }) => {
  return (
    <div className="w-full">
      {/* <h2 className="text-3xl md:text-4xl font-black uppercase mb-8 border-b-4 border-black inline-block">
        {title}
      </h2> */}
      <div className="flex items-center gap-6 mb-6">
        <div className="bg-black text-white p-2 border-2 border-black">
          <BookOpenText size={24} />
        </div>
        <h2 className="text-4xl font-black uppercase">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="block border-4 border-black bg-white p-6 transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            style={{ borderTopWidth: "8px", borderTopColor: item.accentColor }}
          >
            <div className="flex flex-col items-start gap-4">
              <div
                className="p-3 border-2 border-black"
                style={{ backgroundColor: item.accentColor }}
              >
                <item.icon size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-black uppercase leading-tight">
                {item.title}
              </h3>
              {item.subtitle && (
                <p className="font-bold text-xs uppercase opacity-75">
                  {item.subtitle}
                </p>
              )}
              <p className="font-bold text-sm">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Spotlight;
