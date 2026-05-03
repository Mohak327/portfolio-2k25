# Metadata Infrastructure

Comprehensive metadata management system for SEO optimization, Open Graph tags, Twitter Cards, and Schema.org structured data.

## Features

- ✅ **Type-safe metadata configuration** with TypeScript
- ✅ **Next.js 14+ App Router** compatible
- ✅ **SEO optimization** (title, description, keywords)
- ✅ **Open Graph** tags for social media sharing
- ✅ **Twitter Card** optimization
- ✅ **Schema.org structured data** (JSON-LD)
- ✅ **Breadcrumb navigation** for SEO
- ✅ **Per-page metadata** customization
- ✅ **Centralized site configuration**

## Quick Start

### 1. Configure Site Settings

Update `site-config.ts` with your portfolio details:

```typescript
export const siteConfig: SiteConfig = {
  name: "Your Name",
  author: "Your Name",
  description: "Your professional description",
  url: "https://yoursite.com",
  ogImage: "/og-image.png",
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "your@email.com",
  },
};
```

### 2. Add Metadata to Pages

#### Root Layout (`app/layout.tsx`)

```typescript
import { siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // ... other metadata
};
```

#### Page-Level Metadata (`app/page.tsx`)

```typescript
import { generateMetadata, homePageMetadata } from "@/lib/metadata";

export const metadata = generateMetadata(homePageMetadata);
```

#### Dynamic Page Metadata (`app/projects/[id]/page.tsx`)

```typescript
export async function generateMetadata({ params }: Props) {
  const project = await getProject(params.id);
  
  return generateMetadata(getProjectMetadata({
    title: project.title,
    description: project.description,
    tags: project.tags,
    id: project.id,
  }));
}
```

### 3. Add Structured Data

Use the `StructuredDataComponent` to add Schema.org structured data:

```typescript
import StructuredDataComponent from "@/components/StructuredData/StructuredData";
import { generateProjectStructuredData, generateBreadcrumbs } from "@/lib/metadata";

export default function ProjectPage({ project }) {
  const projectData = generateProjectStructuredData({
    name: project.title,
    description: project.description,
    keywords: project.tags,
    codeRepository: project.github,
  });

  const breadcrumbs = generateBreadcrumbs([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.title, path: `/projects/${project.id}` },
  ]);

  return (
    <>
      <StructuredDataComponent data={[projectData, breadcrumbs]} />
      {/* Your page content */}
    </>
  );
}
```

## API Reference

### Core Functions

#### `generateMetadata(config: PageMetadata): Metadata`

Generates Next.js metadata object from page configuration.

**Parameters:**
- `config.title` - Page title (will be templated with site name)
- `config.description` - Page description
- `config.keywords` - Array of keywords
- `config.ogType` - Open Graph type ('website' | 'article' | 'profile')
- `config.canonicalUrl` - Canonical URL for the page
- `config.noIndex` - Set to true to prevent indexing

**Returns:** Next.js `Metadata` object

#### `generateStructuredData(data: StructuredData | StructuredData[]): string`

Converts structured data objects to JSON-LD string.

#### `generateBreadcrumbs(items: { name: string; path: string }[]): BreadcrumbStructuredData`

Creates breadcrumb navigation structured data.

#### `generatePersonStructuredData(): PersonStructuredData`

Generates Person schema for the site owner (used on homepage).

#### `generateProjectStructuredData(project): ProjectStructuredData`

Generates SoftwareSourceCode schema for project pages.

#### `getProjectMetadata(project): PageMetadata`

Helper to generate metadata configuration for project pages.

## Structured Data Types

### Person (Homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Your Name",
  "jobTitle": "Your Job Title",
  "url": "https://yoursite.com",
  "sameAs": ["https://github.com/...", "https://linkedin.com/..."],
  "knowsAbout": ["Robotics", "AI", ...]
}
```

### SoftwareSourceCode (Project Pages)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Project Name",
  "description": "Project description",
  "author": { "@type": "Person", "name": "Your Name" },
  "keywords": ["tag1", "tag2"],
  "codeRepository": "https://github.com/..."
}
```

### BreadcrumbList (All Pages)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "..." },
    { "@type": "ListItem", "position": 2, "name": "Projects", "item": "..." }
  ]
}
```

## Testing

### Verify Metadata

1. **View Page Source** - Right-click → View Page Source
2. **Check `<head>` tags** for title, description, og:tags
3. **Find JSON-LD scripts** - Look for `<script type="application/ld+json">`

### Validation Tools

- **Open Graph**: [Open Graph Debugger](https://www.opengraph.xyz/)
- **Twitter Cards**: [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- **Schema.org**: [Google Rich Results Test](https://search.google.com/test/rich-results)
- **General SEO**: [SEO Site Checkup](https://seositecheckup.com/)

## Best Practices

1. **Unique titles per page** - Use descriptive, keyword-rich titles
2. **Description length** - Keep between 150-160 characters
3. **Keywords** - 5-10 relevant keywords per page
4. **OG Images** - Use 1200x630px images for best social media display
5. **Canonical URLs** - Always set canonical URLs to avoid duplicate content
6. **Structured Data** - Include relevant Schema.org types for better search results
7. **Breadcrumbs** - Add breadcrumb structured data on all pages
8. **Testing** - Validate all pages with the tools above before launch

## Environment Variables

Add to `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

This is used in `site-config.ts` for generating absolute URLs.

## File Structure

```
src/lib/metadata/
├── index.ts                 # Public exports
├── metadata.types.ts        # TypeScript type definitions
├── metadata.utils.ts        # Core utility functions
├── site-config.ts          # Global site configuration
├── page-metadata.ts        # Page-specific metadata configs
└── README.md               # This file

src/components/StructuredData/
└── StructuredData.tsx      # Component for rendering JSON-LD
```

## Extending

### Add New Structured Data Type

1. Define type in `metadata.types.ts`:

```typescript
export interface CustomStructuredData {
  "@context": "https://schema.org";
  "@type": "YourType";
  // ... your properties
}
```

2. Add utility function in `metadata.utils.ts`:

```typescript
export function generateCustomStructuredData(data): CustomStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "YourType",
    // ... map data
  };
}
```

3. Use in your page:

```typescript
const customData = generateCustomStructuredData({ ... });
<StructuredDataComponent data={customData} />
```

## Troubleshooting

**Issue**: Metadata not showing in production
- Check `metadataBase` is set in root layout
- Verify `NEXT_PUBLIC_SITE_URL` environment variable
- Ensure pages export metadata (not in client components)

**Issue**: Structured data validation errors
- Use [Google's Rich Results Test](https://search.google.com/test/rich-results)
- Check for required properties in Schema.org documentation
- Ensure JSON-LD is valid JSON (no trailing commas, proper escaping)

**Issue**: Open Graph image not displaying
- Verify image path is absolute (starts with `/` or `https://`)
- Check image dimensions (1200x630px recommended)
- Test with [Open Graph Debugger](https://www.opengraph.xyz/)
