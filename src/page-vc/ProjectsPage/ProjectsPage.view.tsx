import React from "react";
import PillFilters from "@/components/Organisms/PillFilters/PillFilters.controller";
import Card from "@/components/Molecules/Card/Card.view";
import ConditionLinkView from "@/components/Molecules/ConditionLink/ConditionLink.view";
import ProjectCardContent from "@/components/Molecules/ProjectCardContent/ProjectCardContent.view";
import {
  ProjectCardItem,
  ProjectsPageViewProps,
} from "../../page-data/projects/projects.interface";

// Same two-column card layout as the home page's project list.
const ProjectColumns = ({ items }: { items: ProjectCardItem[] }) => (
  <div className="[column-count:1] md:[column-count:2]">
    {items.map((project) => (
      <div key={project.id} className="break-inside-avoid mb-6">
        <ConditionLinkView link={project.link}>
          <Card
            bgColor={project.bgColor ? project.bgColor : "white"}
            accentColor={project.accent ? project.accent : "white"}
            interactive
          >
            <ProjectCardContent project={project} />
          </Card>
        </ConditionLinkView>
      </div>
    ))}
  </div>
);

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

        {/* One continuous list. Featured projects get their own column block
            so they fill the top of both columns instead of stacking down the
            left one. */}
        <ProjectColumns items={featuredItems} />
        <ProjectColumns items={otherItems} />
      </div>
    </div>
  );
};

export default ProjectsPageView;
