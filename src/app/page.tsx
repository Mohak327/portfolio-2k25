import HomePageController from "@/page-vc/HomePage/HomePage.controller";
import { generateMetadata as generateMeta, generatePersonStructuredData } from "@/lib/metadata";
import { homePageMetadata } from "@/lib/metadata";
import StructuredDataComponent from "@/components/StructuredData/StructuredData";

export const metadata = generateMeta(homePageMetadata);

export default function Page() {
  const personData = generatePersonStructuredData();

  return (
    <>
      <StructuredDataComponent data={personData} />
      <HomePageController />
    </>
  );
}
