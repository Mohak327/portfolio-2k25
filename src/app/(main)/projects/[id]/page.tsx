import ProjectDetailController from "@/page-vc/ProjectPage/ProjectPage.controller";
import { use } from "react";
import { projects } from "@/page-data/projects/projects.model";
import {
  generateMetadata as generateMeta,
  getProjectMetadata,
  generateProjectStructuredData,
  generateBreadcrumbs,
} from "@/lib/metadata";
import StructuredDataComponent from "@/components/StructuredData/StructuredData";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.id === resolvedParams.id);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return generateMeta(getProjectMetadata({
    title: project.title,
    subtitle: project.subtitle,
    summary: project.summary,
    tags: project.tags,
    id: project.id,
  }));
}

const Page = ({ params }: Props) => {
  const resolvedParams = use(params);
  const project = projects.find((p) => p.id === resolvedParams.id);

  if (!project) {
    return <div>Project not found</div>;
  }

  // Generate structured data
  const projectStructuredData = generateProjectStructuredData({
    name: project.title,
    description: project.summary,
    keywords: project.tags,
    codeRepository: project.github?.toString(),
    url: `/projects/${project.id}`,
  });

  const breadcrumbsData = generateBreadcrumbs([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.title, path: `/projects/${project.id}` },
  ]);

  return (
    <>
      <StructuredDataComponent data={[projectStructuredData, breadcrumbsData]} />
      <ProjectDetailController id={resolvedParams.id} />
    </>
  );
};

export default Page;
