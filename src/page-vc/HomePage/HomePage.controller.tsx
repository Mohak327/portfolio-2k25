"use client";
import { useMemo, useState } from "react";
import { homeData } from "@/page-data/home/home.model";
import { projectCategories } from "@/page-data/projects/projects.interface";
import { FilterOption } from "@/components/Organisms/PillFilters/PillFilters.interface";
import HomePageView from "./HomePage.view";

// Shown in the Research Spotlight instead of the project list.
const spotlightProjectIds = [
  "clarisnet",
  "neubody-embodied-ai",
  "physnerf-3d-reconstruction",
];

const listedProjects = homeData.projects.items.filter(
  (p) => !spotlightProjectIds.includes(p.id),
);

const HomePageController = () => {
  const allLabel = "All";
  const [activeFilter, setActiveFilter] = useState<string>(allLabel);

  const filterOptions: FilterOption[] = useMemo(
    () =>
      projectCategories
        .map((category) => ({
          label: category,
          value: category,
          count: listedProjects.filter((p) => p.categories.includes(category))
            .length,
        }))
        .filter((option) => option.count > 0),
    [],
  );

  const projectItems = useMemo(
    () =>
      activeFilter === allLabel
        ? listedProjects
        : listedProjects.filter((p) =>
            (p.categories as string[]).includes(activeFilter),
          ),
    [activeFilter, allLabel],
  );

  return (
    <HomePageView
      techArsenal={homeData.techArsenal}
      projectItems={projectItems}
      projectFilterOptions={filterOptions}
      activeProjectFilter={activeFilter}
      allProjectsLabel={allLabel}
      onProjectFilterChange={setActiveFilter}
    />
  );
};

export default HomePageController;
