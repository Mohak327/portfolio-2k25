import Link from "next/link";
import type { SiteFooterProps } from "./SiteFooter.interface";
import Card from "../../Molecules/Card/Card.view";
import { Award } from "lucide-react";

// Bolds standalone numbers, skipping anything inside an HTML tag so that
// digits in embedded markup (e.g. a LinkedIn slug) are left intact.
const boldNumbers = (point: string) =>
  point
    .split(/(<[^>]+>)/g)
    .map((segment) =>
      segment.startsWith("<")
        ? segment
        : segment.replace(/(\d+,?\d*)/g, '<span class="font-bold">$1</span>')
    )
    .join("");

const SiteFooter = ({ beyondTheCode, contact, copyright }: SiteFooterProps) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div>
          <div className="inline-block text-lg bg-yellow-400 px-6 py-2 border-2 border-black font-bold uppercase transform -rotate-2 mb-4">
            {beyondTheCode.title}
          </div>
          <div className="flex items-center gap-6">
            <div className="bg-black text-white p-2 border-2 border-black">
              <Award size={24} />
            </div>
            <h2 className="text-4xl font-black uppercase">
              {beyondTheCode.subtitle}
            </h2>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {beyondTheCode.sections.map((section, index) => (
            <Card
              key={index}
              bgColor={section.bgColor ? section.bgColor : "white"}
              accentColor={section.accent ? section.accent : "white"}
              interactive={false}
            >
              <div
                style={{ backgroundColor: section.accent }}
                className="absolute top-0 right-0 p-2 border-l-4 border-b-4 border-black font-bold"
              >
                {section.duration}
              </div>
              {/* pr-40 reserves room for the flush corner badge so the title wraps
                  around it instead of needing a top margin that pushes the whole
                  header down and wastes vertical space. */}
              <h4 className="font-black text-2xl uppercase mb-3 pr-40">
                {section.title}
              </h4>
              <ul className="list-disc space-y-2 pl-5">
                {section.points.map((point, i) => (
                  <li
                    key={i}
                    className="text-sm pl-2"
                    dangerouslySetInnerHTML={{ __html: boldNumbers(point) }}
                  ></li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

      <div id="contact" className="border-4 border-white bg-black p-8 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] scroll-mt-24">
        <h4 className="gradient-text font-bold uppercase text-4xl md:text-5xl mb-6">
          {contact.title}
        </h4>
        <div className="flex flex-wrap gap-4">
          {contact.links.map((link, index) => (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              href={link.href}
              className={`flex items-center gap-2 px-6 py-3 border-2 border-black font-bold uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] bg-white text-black ${link.hoverClass}`}
            >
              {link.icon} {link.text}
            </Link>
          ))}
        </div>
      </div>

      <div className="text-center font-bold uppercase text-sm opacity-50">
        {copyright}
      </div>

      <style>{`
        .gradient-text {
          background: linear-gradient(
            90deg,
            #f472b6,
            #a78bfa,
            #22d3ee,
            #facc15,
            #f472b6
          );
          background-size: 300% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: gradientFlow 8s linear infinite;
        }
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
      `}</style>
    </div>
  );
};

export default SiteFooter;
