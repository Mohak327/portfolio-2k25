import SkillsPageController from "@/page-vc/SkillsPage/SkillsPage.controller";
import { generateMetadata as generateMeta, generateBreadcrumbs } from "@/lib/metadata";
import { skillsPageMetadata } from "@/lib/metadata";
import StructuredDataComponent from "@/components/StructuredData/StructuredData";

export const metadata = generateMeta(skillsPageMetadata);

export default function Page() {
  const breadcrumbsData = generateBreadcrumbs([
    { name: "Home", path: "/" },
    { name: "Skills", path: "/skills" },
  ]);

  return (
    <>
      <StructuredDataComponent data={breadcrumbsData} />
      <SkillsPageController />
    </>
  );
}
