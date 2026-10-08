import ProjectsPageController from "@/page-vc/ProjectsPage/ProjectsPage.controller";
import { generateMetadata as generateMeta, generateBreadcrumbs } from "@/lib/metadata";
import { projectsPageMetadata } from "@/lib/metadata";
import StructuredDataComponent from "@/components/StructuredData/StructuredData";

export const metadata = generateMeta(projectsPageMetadata);

export default function Page() {
  const breadcrumbsData = generateBreadcrumbs([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
  ]);

  return (
    <>
      <StructuredDataComponent data={breadcrumbsData} />
      <ProjectsPageController />
    </>
  );
}
