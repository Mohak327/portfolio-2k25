import { StructuredData } from "@/lib/metadata";
import { generateStructuredData } from "@/lib/metadata";

interface StructuredDataProps {
  data: StructuredData | StructuredData[];
}

/**
 * Component for rendering JSON-LD structured data
 * Place this in the head of your page or in a Server Component
 */
export default function StructuredDataComponent({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: generateStructuredData(data),
      }}
    />
  );
}
