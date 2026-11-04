import React from "react";
import PillFilters from "@/components/Organisms/PillFilters/PillFilters.controller";
import TitledCardList from "@/components/Organisms/TitledCardList/TitledCardList.view";
import { Brain, Star } from "lucide-react";
import ProjectCardContent from "@/components/Molecules/ProjectCardContent/ProjectCardContent.view";
import { ProjectsPageViewProps } from "../../page-data/projects/projects.interface";

export const ProjectsPageView: React.FC<ProjectsPageViewProps> = ({
  featuredItems,
  otherItems,
  filterOptions,
  activeFilter,
  allLabel,
  onFilterChange,
}) => {
  return (
    <div className="min-h-screen p-4 lg:p-12 pb-24 font-mono text-black">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b-4 border-black pb-4">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">
            Projects
          </h1>
          <p className="text-xl font-bold max-w-2xl">
            Everything I have built and studied, from interactive models of the
            senses to causal AI. Filter by field.
          </p>
        </header>

        {/* Filters */}
        <div className="mb-10">
          <PillFilters
            options={filterOptions}
            value={activeFilter}
            onChange={onFilterChange}
            includeAll
            allLabel={allLabel}
          />
        </div>

        <div className="flex flex-col gap-12">
          {featuredItems.length > 0 && (
            <TitledCardList
              title="Featured"
              items={featuredItems}
              icon={<Star size={24} />}
              colCount={2}
              renderItem={(project) => <ProjectCardContent project={project} />}
            />
          )}
          {otherItems.length > 0 && (
            <TitledCardList
              title="More Projects"
              items={otherItems}
              icon={<Brain size={24} />}
              colCount={2}
              renderItem={(project) => <ProjectCardContent project={project} />}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPageView;
