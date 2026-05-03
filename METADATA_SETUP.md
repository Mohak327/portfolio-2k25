# Metadata Infrastructure Setup Guide

Your portfolio now has a comprehensive metadata infrastructure for SEO, Open Graph, Twitter Cards, and structured data (Schema.org).

## 🎯 What's Included

- **SEO Optimization**: Page titles, descriptions, keywords
- **Social Media**: Open Graph tags for Facebook, LinkedIn
- **Twitter Cards**: Optimized preview cards
- **Structured Data**: JSON-LD for Google Rich Results
- **Breadcrumbs**: Navigation structure for search engines

## 📝 Quick Configuration Checklist

### 1. Update Site Configuration

Edit `src/lib/metadata/site-config.ts`:

```typescript
export const siteConfig: SiteConfig = {
  name: "Your Name",                    // ← Update
  author: "Your Name",                  // ← Update
  description: "Your bio",              // ← Update
  url: "https://yoursite.com",          // ← Update
  ogImage: "/og-image.png",            // ← Add your OG image
  social: {
    github: "https://github.com/...",   // ← Update
    linkedin: "https://linkedin.com/...",// ← Update
    email: "your@email.com",            // ← Update
    twitter: "@yourhandle",             // ← Add if you have Twitter
  },
};
```

### 2. Add Environment Variable

Create/update `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

### 3. Create Open Graph Image

Create an image at `public/og-image.png`:
- **Dimensions**: 1200x630px
- **Format**: PNG or JPG
- **Content**: Your name, title, and branding
- **Tools**: [Canva](https://canva.com), Figma, or Photoshop

## ✅ Already Configured Pages

The following pages already have metadata setup:

- ✅ **Homepage** (`/`) - Person structured data
- ✅ **Project Detail** (`/projects/[id]`) - Project structured data + breadcrumbs
- ✅ **Skills** (`/skills`) - Page metadata + breadcrumbs

## 🧪 Testing Your Setup

### 1. Run Development Server

```bash
npm run dev
```

### 2. View Page Source

- Open any page (e.g., http://localhost:3000)
- Right-click → "View Page Source"
- Check for:
  - `<title>` tag
  - `<meta name="description">` tag
  - `<meta property="og:*">` tags
  - `<script type="application/ld+json">` for structured data

### 3. Validate with Tools

Once deployed, test with:

- **Open Graph**: https://www.opengraph.xyz/
- **Twitter Cards**: https://cards-dev.twitter.com/validator
- **Structured Data**: https://search.google.com/test/rich-results
- **SEO Check**: https://seositecheckup.com/

## 📊 Example Output

### In HTML `<head>`:

```html
<title>Home | Your Name</title>
<meta name="description" content="Your professional description" />
<meta property="og:title" content="Home | Your Name" />
<meta property="og:description" content="Your description" />
<meta property="og:image" content="https://yoursite.com/og-image.png" />
<meta property="og:type" content="profile" />
<meta name="twitter:card" content="summary_large_image" />

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Your Name",
  "jobTitle": "Robotics Engineer & AI Researcher",
  "url": "https://yoursite.com"
}
</script>
```

## 🔧 Adding Metadata to New Pages

### Static Page Example

```typescript
// src/app/about/page.tsx
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "About Me",
  description: "Learn about my background and expertise",
  keywords: ["About", "Biography", "Experience"],
  ogType: "website",
  canonicalUrl: "https://yoursite.com/about",
});

export default function AboutPage() {
  return <div>...</div>;
}
```

### Dynamic Page Example

```typescript
// src/app/blog/[slug]/page.tsx
import { generateMetadata as generateMeta, generateBreadcrumbs } from "@/lib/metadata";
import StructuredDataComponent from "@/components/StructuredData/StructuredData";

export async function generateMetadata({ params }: Props) {
  const post = await getPost(params.slug);
  
  return generateMeta({
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    ogType: "article",
    canonicalUrl: `https://yoursite.com/blog/${params.slug}`,
  });
}

export default function BlogPost({ params }) {
  const post = getPost(params.slug);
  
  const breadcrumbs = generateBreadcrumbs([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${params.slug}` },
  ]);

  return (
    <>
      <StructuredDataComponent data={breadcrumbs} />
      {/* Your content */}
    </>
  );
}
```

## 📚 Available Utilities

Import from `@/lib/metadata`:

```typescript
// Core functions
generateMetadata(config)           // Generate Next.js metadata
generateStructuredData(data)       // Convert to JSON-LD string

// Structured data generators
generatePersonStructuredData()     // Person schema (homepage)
generateProjectStructuredData()    // Project/software schema
generateWebPageStructuredData()    // WebPage schema
generateBreadcrumbs(items)        // Breadcrumb navigation

// Pre-configured page metadata
homePageMetadata
projectsPageMetadata
skillsPageMetadata
getProjectMetadata(project)       // Dynamic project metadata

// Site configuration
siteConfig                         // Global site settings
```

## 🎨 Customizing Page Metadata

Edit `src/lib/metadata/page-metadata.ts`:

```typescript
export const customPageMetadata: PageMetadata = {
  title: "Custom Page",
  description: "Page description",
  keywords: ["keyword1", "keyword2"],
  ogType: "website",
  canonicalUrl: `${siteConfig.url}/custom`,
};
```

## 🐛 Common Issues

**Metadata not updating in development**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Restart dev server

**Structured data validation errors**
- Use Google Rich Results Test to see specific errors
- Check Schema.org documentation for required properties
- Ensure all URLs are absolute (include https://)

**Open Graph image not showing**
- Verify image exists at `public/og-image.png`
- Check image dimensions (1200x630px)
- Use absolute URL in metadata
- Clear social media cache (Facebook Debugger, Twitter Card Validator)

## 📖 Resources

- [Next.js Metadata Docs](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Docs](https://developer.twitter.com/en/docs/twitter-for-websites/cards)

## 🚀 Before Deployment

- [ ] Update `site-config.ts` with production URL
- [ ] Set `NEXT_PUBLIC_SITE_URL` environment variable
- [ ] Add Open Graph image (`public/og-image.png`)
- [ ] Test all pages with validation tools
- [ ] Verify metadata in production build
- [ ] Submit sitemap to Google Search Console

## 📁 File Structure

```
src/lib/metadata/
├── index.ts                 # Public exports
├── metadata.types.ts        # TypeScript types
├── metadata.utils.ts        # Utility functions
├── site-config.ts          # ← UPDATE THIS
├── page-metadata.ts        # Page configs
└── README.md               # Detailed docs

src/components/StructuredData/
└── StructuredData.tsx      # JSON-LD component

.env.local                   # ← ADD SITE_URL HERE
public/
└── og-image.png            # ← ADD THIS
```

---

For detailed API documentation, see `src/lib/metadata/README.md`
