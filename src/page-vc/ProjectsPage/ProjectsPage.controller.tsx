"use client";
import { useMemo, useState } from "react";
import { projectCards } from "@/page-data/projects/projects.model";
import { projectCategories } from "@/page-data/projects/projects.interface";
import { FilterOption } from "@/components/Organisms/PillFilters/PillFilters.interface";
import ProjectsPageView from "./ProjectsPage.view";

const ProjectsPageController = () => {
  const allLabel = "All";
  const [activeFilter, setActiveFilter] = useState<string>(allLabel);

  const filterOptions: FilterOption[] = useMemo(
    () =>
      projectCategories
        .map((category) => ({
          label: category,
          value: category,
          count: projectCards.filter((p) => p.categories.includes(category))
            .length,
        }))
        .filter((option) => option.count > 0),
    [],
  );

  const projectItems = useMemo(
    () =>
      activeFilter === allLabel
        ? projectCards
        : projectCards.filter((p) =>
            (p.categories as string[]).includes(activeFilter),
          ),
    [activeFilter, allLabel],
  );

  return (
    <ProjectsPageView
      projectItems={projectItems}
      filterOptions={filterOptions}
      activeFilter={activeFilter}
      allLabel={allLabel}
      onFilterChange={setActiveFilter}
    />
  );
};

export default ProjectsPageController;
