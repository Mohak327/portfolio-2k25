"use client";
import { homeData } from "../../page-data/home/home.model";
import HeroSection from "../../components/Organisms/HeroSection/HeroSection.view";
import TitledTagCloud from "../../components/Organisms/TitledTagCloud/TitledTagCloud.view";
import TitledCardList from "../../components/Organisms/TitledCardList/TitledCardList.view";
import SiteFooter from "../../components/Organisms/SiteFooter/SiteFooter.view";
import { Brain, GraduationCap } from "lucide-react";
import Marquee from "../../components/Molecules/Marquee/Marquee.view";
import { HomeViewProps } from "../../page-data/home/home.interface";
import RichTextController from "@/components/Organisms/RichText/RichText.controller";
import PDFTile from "@/components/Molecules/PDFTile/PDFTile.view";
import Accordion from "@/components/Molecules/Accordion/Accordion.view";
import Spotlight from "@/components/Organisms/Spotlight/Spotlight.view";
import ProjectCardContent from "@/components/Molecules/ProjectCardContent/ProjectCardContent.view";
import Link from "next/link";

const HomePageView = ({ techArsenal }: HomeViewProps) => {
  return (
    <div
      className={`min-h-screen text-black font-mono selection:bg-black selection:text-white overflow-x-hidden`}
    >
      <Marquee text={homeData.marquee} />

      <main className="container mx-auto px-4 pt-24 pb-20 max-w-6xl flex flex-col gap-16">
        <HeroSection
          hero={homeData.hero}
          status={homeData.status}
          meta={homeData.meta}
        />

        <TitledTagCloud
          title={techArsenal.title}
          items={techArsenal.skills}
          ctaLink={techArsenal.ctaLink}
          ctaText={techArsenal.ctaText}
          ctaIcon={techArsenal.ctaIcon}
        />

        <Spotlight
          title={homeData.researchSpotlight.title}
          items={homeData.researchSpotlight.items}
        />

        <div className="flex flex-col gap-6">
          <TitledCardList
            title={homeData.projects.title}
            items={homeData.projects.items}
            icon={<Brain size={24} />}
            colCount={2}
            renderItem={(project) => <ProjectCardContent project={project} />}
          />
          <Link
            href={homeData.projects.ctaLink}
            className="self-center bg-black text-white px-6 py-3 font-bold uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-400 hover:text-black transition-all whitespace-nowrap text-center flex items-center gap-2"
          >
            {homeData.projects.ctaText}{" "}
            <homeData.projects.ctaIcon size={20} />
          </Link>
        </div>

        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-12"> */}
        <TitledCardList
          title={homeData.experience.title}
          items={homeData.experience.jobs}
          timeline
          renderItem={(job, index) => (
            <>
              {/* Flush to the card's outer corner, edge-to-edge like every other
                  card's badge on the site (not inset inside the content padding). */}
              <div
                style={{ backgroundColor: job.accent }}
                className="absolute top-0 right-0 p-2 border-l-4 border-b-4 border-black font-bold"
              >
                {job.duration}
              </div>
              <Accordion
                defaultOpen={index === 0}
                header={
                  <>
                    {/* pr-40 reserves room for the badge so the title wraps around it
                        instead of needing a top margin that wastes vertical space when
                        the accordion is collapsed. */}
                    <h3 className="text-2xl font-black uppercase mb-1 pr-40">
                      {job.role}
                    </h3>
                    <div className="text-lg font-bold flex items-center gap-2">
                      {job.company}{" "}
                    </div>
                  </>
                }
              >
                <ul className="list-disc space-y-2 pl-5">
                  {job.tasks.map((task, index) => (
                    <li key={index} className="text-sm pl-2">
                      <RichTextController text={task} />
                    </li>
                  ))}
                </ul>
                {job.doc && (
                  <PDFTile
                    pdfUrl={job.doc.url}
                    title={job.doc.title}
                    type={job.doc.type}
                    description={`Click to view ${job.doc.type}`}
                    className="mt-4"
                    icon={job.doc.icon}
                  />
                )}
              </Accordion>
            </>
          )}
        />

        <TitledCardList
          title={homeData.education.title}
          items={homeData.education.degrees}
          timeline
          icon={<GraduationCap size={24} />}
          renderItem={(degree) => (
            <>
              <div
                style={{ backgroundColor: degree.accent }}
                className={`absolute top-0 right-0 p-2 border-l-4 border-b-4 border-black font-bold`}
              >
                {degree.year}
              </div>
              {/* pr-40 reserves room for the flush corner badge so the title wraps
                  around it instead of needing a top margin that pushes the whole
                  header down and wastes vertical space. */}
              <h3 className="text-2xl font-black uppercase mb-1 pr-40">
                {degree.university}
              </h3>
              <div className="text-lg font-bold mb-4">{degree.degree}</div>
              <p className="text-sm border-l-4 border-black pl-4">
                {degree.courses}
              </p>
            </>
          )}
        />

        <SiteFooter
          beyondTheCode={homeData.footer.beyondTheCode}
          contact={{
            ...homeData.footer.contact,
            links: homeData.footer.contact.links.map((link) => ({
              ...link,
              icon: link.icon ? <link.icon /> : undefined,
            })),
          }}
          copyright={homeData.footer.copyright}
        />
      </main>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePageView;
