"use client";
import { useMemo, useState } from "react";
import { featuredProjectIds, projectCards } from "@/page-data/projects/projects.model";
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

  // Featured projects get their own block so they split evenly across both
  // columns, the same way they do on the home page.
  const featuredItems = projectItems.filter((p) =>
    featuredProjectIds.includes(p.id),
  );
  const otherItems = projectItems.filter(
    (p) => !featuredProjectIds.includes(p.id),
  );

  return (
    <ProjectsPageView
      featuredItems={featuredItems}
      otherItems={otherItems}
      filterOptions={filterOptions}
      activeFilter={activeFilter}
      allLabel={allLabel}
      onFilterChange={setActiveFilter}
    />
  );
};

export default ProjectsPageController;
