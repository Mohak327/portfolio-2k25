# Janus-Head Landing Page & Site Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the site so the current portfolio lives at `/code`, add a new `/` landing page built around an interactive rotating Janus head (two personas, one object), and add a `/create` coming-soon placeholder for the second persona.

**Architecture:** Next.js App Router route move (`(main)` group relocates under `app/code/`), plus one new client component (`JanusHead`, React Three Fiber) driving a `useFrame` rotation loop that blends a constant auto-rotate with pointer-edge-proximity steering, with front-facing-persona detection bridged into React state only on boundary crossings (not every frame) to avoid unnecessary re-renders.

**Tech Stack:** `three`, `@react-three/fiber`, `@react-three/drei` (Next.js 16 / React 19.2, already in place).

**Spec:** `docs/superpowers/specs/2026-08-25-janus-head-landing-design.md`

## Global Constraints

- No test framework exists in this repo (no jest/vitest configured, no test script in `package.json`). Every task's "test" step is `tsc --noEmit` plus manual verification in the dev browser (matching the spec's own Testing/verification section) — not unit tests.
- Follow existing import conventions: `@/*` path alias for cross-directory imports (see `src/lib/metadata`, `src/page-vc/HomePage/HomePage.controller`).
- Match the site's existing neo-brutalist visual language (black/white/yellow, thick black borders, `font-black uppercase`, hard drop shadows) for any new UI chrome — do not introduce a new color palette for the Janus landing page or `/create`.
- The real `.glb` Janus head model does not exist yet and is explicitly out of scope (user sources it separately). **Deviation from the spec's literal wording:** the spec describes the placeholder as "a stand-in .glb file at `/models/janus-head.glb`" loaded via `useGLTF` — but no code-writing process can author a binary 3D asset. Task 4 instead builds the placeholder as **procedural Three.js geometry** (no file dependency, nothing to 404 on), behind a swappable interface so wiring in a real `.glb` later (via `useGLTF`) is a small, isolated follow-up change to one file, not a redesign.
- `pathname === "/"` in the moved `MainLayout` becomes `pathname === "/code"` post-move (it was already dead/unused code pre-move; fixed while the file is being touched anyway, not a separate unrelated change).
- **Spec correction:** the spec's file list included `src/page-vc/SkillsPage/SkillsPage.controller.tsx` and `SkillsPage.view.tsx` as needing route-literal updates. Re-grepping at plan-writing time (as the spec instructed) shows these were false positives — the original grep matched the substring `/skills` inside import paths like `@/page-data/skills/skills.model`, not actual route literals. Neither file contains a real route reference. **No task in this plan touches them.** The confirmed real list (all covered by Task 2/3 below) is: `src/app/(main)/layout.tsx`, `src/app/(main)/skills/page.tsx`, `src/app/(main)/projects/[id]/page.tsx`, `src/app/not-found.tsx` (left unchanged — see Task 2 Step 2 note), `src/page-data/home/home.model.ts`, `src/lib/metadata/page-metadata.ts`.

---

## Task 1: Install 3D dependencies and add the R3F JSX type declaration

**Files:**
- Modify: `package.json` (via `npm install`)
- Create: `src/types/r3f.d.ts`

**Interfaces:**
- Produces: no runtime exports. Makes `<mesh>`, `<group>`, `<ambientLight>`, etc. valid JSX in any `.tsx` file project-wide.

- [ ] **Step 1: Install the three packages**

Run:
```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

- [ ] **Step 2: Verify versions landed correctly**

Run: `npm ls three @react-three/fiber @react-three/drei @types/three`
Expected: all four listed with no `UNMET DEPENDENCY` / peer-dep error output. `@react-three/fiber` should resolve to a `9.x` version (confirmed compatible with React 19.0–19.2 per pmndrs release notes as of Aug 2026).

- [ ] **Step 3: Add the TypeScript JSX declaration**

Create `src/types/r3f.d.ts`:

```typescript
import type { ThreeElements } from "@react-three/fiber";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}
```

This file is picked up automatically by the existing `tsconfig.json` (its `include` covers `**/*.ts`, which matches `.d.ts` files too) — no `tsconfig.json` edit needed.

- [ ] **Step 4: Verify the declaration works**

Run: `npx tsc --noEmit`
Expected: passes with no errors (there's no R3F JSX anywhere yet, so this just confirms the new file itself doesn't break the build).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/types/r3f.d.ts
git commit -m "chore: add react-three-fiber and JSX type declaration"
```

---

## Task 2: Move the `(main)` route group under `/code`, fix its internal route literals

**Files:**
- Move: `src/app/(main)/layout.tsx` → `src/app/code/(main)/layout.tsx`
- Move: `src/app/(main)/skills/page.tsx` → `src/app/code/(main)/skills/page.tsx`
- Move: `src/app/(main)/projects/[id]/page.tsx` → `src/app/code/(main)/projects/[id]/page.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing consumed by later tasks (this task is routing-only; Task 3 handles the homepage content and metadata module).

**Note on `src/app/not-found.tsx`:** it has a `Link href="/"` ("Return to HQ"). This is deliberately **not** changed by this plan — after the restructure, `/` is still a valid, real page (the new Janus landing page), so the link continues to work correctly as "return to the site's front door." No task touches this file.

- [ ] **Step 1: Move the three files preserving git history**

```bash
mkdir -p "src/app/code/(main)/skills" "src/app/code/(main)/projects/[id]"
git mv "src/app/(main)/layout.tsx" "src/app/code/(main)/layout.tsx"
git mv "src/app/(main)/skills/page.tsx" "src/app/code/(main)/skills/page.tsx"
git mv "src/app/(main)/projects/[id]/page.tsx" "src/app/code/(main)/projects/[id]/page.tsx"
git status --short
```

Expected: three renames shown, old `src/app/(main)/` directory now empty (Next.js needs no placeholder for an empty dir; it just won't route there anymore).

- [ ] **Step 2: Fix the "Back to HQ" link and page-title logic in the moved layout**

In `src/app/code/(main)/layout.tsx`, replace the full file contents with:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Theme } from "@/Theme";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isCodeHome = pathname === "/code";

  const getPageTitle = () => {
    // pathname is "/code" or "/code/<segment>/..." — the page title is the
    // segment right after "code", not "code" itself.
    const segments = pathname?.split("/").filter(Boolean) ?? [];
    const pathSegment = segments[1];
    if (!pathSegment) return "";
    return pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1);
  };

  const pageTitle = getPageTitle();

  return (
    <>
      <nav className="border-b-4 border-black p-4 sticky top-0 z-50 flex justify-between items-center relative" style={{ backgroundColor: Theme.colors.yellow[400] }}>
        <Link
          href="/code"
          className="flex items-center gap-2 font-bold uppercase border-2 border-black bg-white px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          <ArrowLeft size={16} /> Back to HQ
        </Link>
        {pageTitle && (
          <span className="font-black uppercase text-lg tracking-tighter hidden md:block">
            Mohak Sharma / {pageTitle}
          </span>
        )}
      </nav>
      {children}
    </>
  );
}
```

Note: `isCodeHome` is computed but still unused in JSX — this matches the pre-existing behavior (the original `isHome` was also unused) rather than introducing new dead code; if it's genuinely never needed, a future cleanup can drop it, but that's not this task's job.

- [ ] **Step 3: Fix breadcrumb/structured-data path literals in the moved skills page**

In `src/app/code/(main)/skills/page.tsx`, change:

```tsx
  const breadcrumbsData = generateBreadcrumbs([
    { name: "Home", path: "/" },
    { name: "Skills", path: "/skills" },
  ]);
```

to:

```tsx
  const breadcrumbsData = generateBreadcrumbs([
    { name: "Home", path: "/code" },
    { name: "Skills", path: "/code/skills" },
  ]);
```

- [ ] **Step 4: Fix breadcrumb/structured-data path literals in the moved project detail page**

In `src/app/code/(main)/projects/[id]/page.tsx`, change:

```tsx
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
```

to:

```tsx
  const projectStructuredData = generateProjectStructuredData({
    name: project.title,
    description: project.summary,
    keywords: project.tags,
    codeRepository: project.github?.toString(),
    url: `/code/projects/${project.id}`,
  });

  const breadcrumbsData = generateBreadcrumbs([
    { name: "Home", path: "/code" },
    { name: "Projects", path: "/code/projects" },
    { name: project.title, path: `/code/projects/${project.id}` },
  ]);
```

- [ ] **Step 5: Type-check**

Run: `npx tsc --noEmit`
Expected: passes with no errors.

- [ ] **Step 6: Commit**

```bash
git add "src/app/code"
git commit -m "refactor: move (main) route group under /code"
```

---

## Task 3: Move the homepage into `/code`, fix its data-layer links and metadata

**Files:**
- Create: `src/app/code/(main)/page.tsx` (new file; content is the old `src/app/page.tsx` with an updated metadata import)
- Delete: `src/app/page.tsx` (superseded by Task 5's new landing page)
- Modify: `src/page-data/home/home.model.ts:45,53,61,69,223` (internal links)
- Modify: `src/lib/metadata/page-metadata.ts` (canonical URLs; rename `homePageMetadata` → `codePageMetadata`)

**Interfaces:**
- Consumes: nothing new from Task 2.
- Produces: `codePageMetadata` (renamed from `homePageMetadata`) — Task 5 must **not** reuse this name; it defines its own `landingPageMetadata`.

- [ ] **Step 1: Create the homepage at its new location**

Create `src/app/code/(main)/page.tsx`:

```tsx
import HomePageController from "@/page-vc/HomePage/HomePage.controller";
import { generateMetadata as generateMeta, generatePersonStructuredData } from "@/lib/metadata";
import { codePageMetadata } from "@/lib/metadata";
import StructuredDataComponent from "@/components/StructuredData/StructuredData";

export const metadata = generateMeta(codePageMetadata);

export default function Page() {
  const personData = generatePersonStructuredData();

  return (
    <>
      <StructuredDataComponent data={personData} />
      <HomePageController />
    </>
  );
}
```

(Identical to the old `src/app/page.tsx` except importing `codePageMetadata` instead of `homePageMetadata` — the rename happens in Step 4 below.)

- [ ] **Step 2: Delete the old root page file**

```bash
rm src/app/page.tsx
```

(Task 5 will create a new `src/app/page.tsx` with different content — the Janus landing page. Deleting now rather than leaving stale content prevents any confusion about which file is authoritative in between tasks; if you're executing tasks strictly in order this gap is momentary.)

- [ ] **Step 3: Fix internal portfolio links in the homepage data file**

In `src/page-data/home/home.model.ts`, update the three `researchSpotlight.items[].link` fields:

```typescript
        link: "/projects/neubody-embodied-ai",
```
becomes
```typescript
        link: "/code/projects/neubody-embodied-ai",
```

```typescript
        link: "/projects/clarisnet",
```
becomes
```typescript
        link: "/code/projects/clarisnet",
```

```typescript
        link: "/projects/physnerf-3d-reconstruction",
```
becomes
```typescript
        link: "/code/projects/physnerf-3d-reconstruction",
```

And the `techArsenal.ctaLink` field:

```typescript
    ctaLink: "/skills",
```
becomes
```typescript
    ctaLink: "/code/skills",
```

And the `projects.items` mapping:
```typescript
    items: projects.map((p) => ({
      id: p.id,
      link: `/projects/${p.id}`,
```
becomes
```typescript
    items: projects.map((p) => ({
      id: p.id,
      link: `/code/projects/${p.id}`,
```

Leave `href: "/mohak_sharma_resume.pdf"` and `href: "/mohak_sharma_research_cv.pdf"` untouched — those are static files in `public/`, not app routes, unaffected by this restructure.

- [ ] **Step 4: Rename and fix canonical URLs in the metadata module**

In `src/lib/metadata/page-metadata.ts`, replace the full file contents with:

```typescript
import { PageMetadata } from "./metadata.types";
import { siteConfig } from "./site-config";

/**
 * Page-specific metadata configurations
 */

export const landingPageMetadata: PageMetadata = {
  title: "Home",
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  ogType: "profile",
  canonicalUrl: siteConfig.url,
};

export const codePageMetadata: PageMetadata = {
  title: "Code",
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  ogType: "profile",
  canonicalUrl: `${siteConfig.url}/code`,
};

export const projectsPageMetadata: PageMetadata = {
  title: "Projects",
  description:
    "Explore my portfolio of robotics, AI, and computational neuroscience projects, from causal reasoning benchmarks to neural signal processing and embodied intelligence systems.",
  keywords: [
    "Robotics Projects",
    "AI Research",
    "Machine Learning Portfolio",
    "Computational Neuroscience",
    "Open Source Projects",
  ],
  ogType: "website",
  canonicalUrl: `${siteConfig.url}/code/projects`,
};

export const skillsPageMetadata: PageMetadata = {
  title: "Skills & Expertise",
  description:
    "Technical skills spanning robotics, machine learning, signal processing, and full-stack development. Proficient in Python, C++, PyTorch, ROS, and modern web technologies.",
  keywords: [
    "Technical Skills",
    "Robotics Engineering",
    "Machine Learning",
    "Python",
    "C++",
    "PyTorch",
    "ROS",
    "Computer Vision",
  ],
  ogType: "website",
  canonicalUrl: `${siteConfig.url}/code/skills`,
};

export const createPageMetadata: PageMetadata = {
  title: "Create",
  description:
    "Poetry and photography from Mohak Sharma — coming soon.",
  keywords: ["Poetry", "Photography", "Creative Work"],
  ogType: "website",
  canonicalUrl: `${siteConfig.url}/create`,
};

/**
 * Generate metadata for a specific project page
 */
export function getProjectMetadata(project: {
  title: string;
  subtitle?: string;
  summary: string;
  tags: string[];
  id: string;
}): PageMetadata {
  return {
    title: project.title,
    description: project.subtitle || project.summary,
    keywords: project.tags,
    ogType: "article",
    canonicalUrl: `${siteConfig.url}/code/projects/${project.id}`,
  };
}
```

This adds `landingPageMetadata` (for Task 5) and `createPageMetadata` (for Task 6) now, alongside the rename, so `page-metadata.ts` only needs editing once.

- [ ] **Step 5: Type-check**

Run: `npx tsc --noEmit`
Expected: passes with no errors. (If it fails referencing `homePageMetadata`, grep for any remaining import of that name — it no longer exists after this step.)

Run: `grep -rn "homePageMetadata" src/`
Expected: no output (confirms nothing still imports the old name).

- [ ] **Step 6: Commit**

```bash
git add "src/app/code/(main)/page.tsx" src/app/page.tsx src/page-data/home/home.model.ts src/lib/metadata/page-metadata.ts
git commit -m "refactor: move homepage to /code, update internal links and metadata"
```

---

## Task 4: Build the `JanusHead` component (procedural placeholder, rotation, edge-steering, click-to-navigate)

**Files:**
- Create: `src/components/Organisms/JanusHead/JanusHead.view.tsx`
- Create: `src/components/Organisms/JanusHead/JanusHead.interface.ts`

**Interfaces:**
- Consumes: `next/navigation`'s `useRouter`.
- Produces: `JanusHead` component with props `{ codeHref: string; createHref: string }` (no hardcoded route strings inside the component — Task 5 passes `/code` and `/create` explicitly, keeping the component itself route-agnostic and independently testable/reusable).

- [ ] **Step 1: Define the component's props interface**

Create `src/components/Organisms/JanusHead/JanusHead.interface.ts`:

```typescript
export interface JanusHeadProps {
  /** Route to navigate to when the "code" face is front-facing and clicked. */
  codeHref: string;
  /** Route to navigate to when the "create" face is front-facing and clicked. */
  createHref: string;
}

export type JanusFace = "code" | "create";
```

- [ ] **Step 2: Build the component**

Create `src/components/Organisms/JanusHead/JanusHead.view.tsx`:

```tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { JanusHeadProps, JanusFace } from "./JanusHead.interface";

// Full rotation period for the constant auto-rotate, in seconds.
const AUTO_ROTATE_PERIOD_SEC = 40;
// Additional rotation speed (radians/sec) applied at full edge-steering strength.
const MAX_STEER_SPEED = (Math.PI * 2) / 8;
// Fraction of the viewport width (from each edge) where steering kicks in.
const EDGE_ZONE_FRACTION = 0.2;
// Damping time constant for smoothing rotation changes (Three.js damp()).
const ROTATION_DAMP_TIME = 0.25;

/**
 * Normalizes pointer X into a steering strength in [-1, 1].
 * 0 in the center 60% of the viewport; ramps to ±1 in the outer 20% edges.
 */
function pointerXToSteer(clientX: number, viewportWidth: number): number {
  const normalized = (clientX / viewportWidth) * 2 - 1; // -1..1 across full width
  const deadZone = 1 - EDGE_ZONE_FRACTION * 2;
  if (Math.abs(normalized) <= deadZone) return 0;
  const edgeProgress = (Math.abs(normalized) - deadZone) / (1 - deadZone);
  return Math.sign(normalized) * Math.min(edgeProgress, 1);
}

function faceFromRotation(rotationY: number): JanusFace {
  const twoPi = Math.PI * 2;
  const normalized = ((rotationY % twoPi) + twoPi) % twoPi; // 0..2π
  // Front half (code) is within ±90° of 0; back half (create) is the rest.
  return normalized <= Math.PI / 2 || normalized >= (Math.PI * 3) / 2 ? "code" : "create";
}

/**
 * Procedural placeholder bust: a double-sided sphere, half-tone-shaded so the
 * front and back read as visually distinct "faces" without any external
 * asset. Swap this out for a real GLTF head later — see the module doc
 * comment below for how.
 *
 * To swap in a real model: replace this component's contents with
 * `const { scene } = useGLTF("/models/janus-head.glb"); return <primitive object={scene} />;`
 * and add `useGLTF.preload("/models/janus-head.glb")` — the parent group's
 * rotation/steering logic in JanusHead does not need to change.
 */
function PlaceholderBust() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color="#111827" flatShading />
      </mesh>
      {/* Front face marker. circleGeometry lies flat in the XY plane with its
          face normal along +Z by default, so no rotation is needed here — it
          already faces the camera when rotation.y is near 0. */}
      <mesh position={[0, 0, 0.98]}>
        <circleGeometry args={[0.5, 32]} />
        <meshStandardMaterial color="#f472b6" flatShading side={THREE.DoubleSide} />
      </mesh>
      {/* Back face marker. Flipped 180° around Y so its normal points -Z
          (outward on the back of the sphere) instead of inward. */}
      <mesh position={[0, 0, -0.98]} rotation={[0, Math.PI, 0]}>
        <circleGeometry args={[0.5, 32]} />
        <meshStandardMaterial color="#22d3ee" flatShading side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function RotatingGroup({ onFaceChange }: { onFaceChange: (face: JanusFace) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const rotationRef = useRef(0);
  const steerRef = useRef(0);
  const currentFaceRef = useRef<JanusFace>("code");

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return; // touch: auto-rotate only, no edge-steering.

    const handlePointerMove = (event: PointerEvent) => {
      steerRef.current = pointerXToSteer(event.clientX, window.innerWidth);
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useFrame((_, delta) => {
    const baseSpeed = (Math.PI * 2) / AUTO_ROTATE_PERIOD_SEC;
    const target = rotationRef.current + (baseSpeed + steerRef.current * MAX_STEER_SPEED) * delta;
    rotationRef.current = THREE.MathUtils.damp(rotationRef.current, target, 1 / ROTATION_DAMP_TIME, delta);

    if (groupRef.current) {
      groupRef.current.rotation.y = rotationRef.current;
    }

    const face = faceFromRotation(rotationRef.current);
    if (face !== currentFaceRef.current) {
      currentFaceRef.current = face;
      onFaceChange(face);
    }
  });

  // No click handler here: `<Canvas onClick={...}>` in JanusHead below is a
  // plain DOM handler that already fires for any click within the canvas
  // rectangle (mesh or empty space), which is exactly "click anywhere on the
  // canvas navigates" per spec. A handler here would be redundant — it would
  // just re-report the same face value `useFrame` above already tracks.
  return (
    <group ref={groupRef}>
      <PlaceholderBust />
    </group>
  );
}

const JanusHead = ({ codeHref, createHref }: JanusHeadProps) => {
  const router = useRouter();
  const [activeFace, setActiveFace] = useState<JanusFace>("code");
  const activeFaceRef = useRef<JanusFace>("code");

  const handleFaceChange = useCallback((face: JanusFace) => {
    activeFaceRef.current = face;
    setActiveFace(face);
  }, []);

  const handleCanvasClick = useCallback(() => {
    router.push(activeFaceRef.current === "code" ? codeHref : createHref);
  }, [router, codeHref, createHref]);

  return (
    <div className="relative w-full h-[90vh]">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} onClick={handleCanvasClick}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={1} />
        <directionalLight position={[-3, 2, -3]} intensity={0.4} />
        <RotatingGroup onFaceChange={handleFaceChange} />
      </Canvas>
      <div
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 border-2 border-black bg-yellow-400 px-6 py-2 font-black uppercase tracking-tight"
        aria-live="polite"
      >
        {activeFace === "code" ? "Code" : "Create"}
      </div>
    </div>
  );
};

export default JanusHead;
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: passes. If `ThreeElements` JSX (e.g. `<mesh>`, `<coneGeometry>`) fails to typecheck, re-check Task 1 Step 3 landed correctly.

- [ ] **Step 3: Manual verification (no page wires this in yet — verify via a scratch route)**

This component has no consumer until Task 5. Skip manual browser verification for this task specifically; Task 5's verification step covers it end-to-end (rendering `JanusHead` is meaningless in isolation without a page to host it).

- [ ] **Step 4: Commit**

```bash
git add src/components/Organisms/JanusHead
git commit -m "feat: add JanusHead 3D rotating component with edge-steering"
```

---

## Task 5: Build the new root landing page (`/`)

**Files:**
- Create: `src/app/page.tsx`

**Interfaces:**
- Consumes: `JanusHead` (Task 4) — props `{ codeHref: string; createHref: string }`. `landingPageMetadata` (Task 3, Step 4) from `@/lib/metadata`.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Create the landing page**

Create `src/app/page.tsx`:

```tsx
import { generateMetadata as generateMeta, landingPageMetadata } from "@/lib/metadata";
import JanusHead from "@/components/Organisms/JanusHead/JanusHead.view";

export const metadata = generateMeta(landingPageMetadata);

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-4">
      <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-center">
        Mohak Sharma
      </h1>
      <p className="text-lg font-bold text-center max-w-xl">
        Two sides of one person. Move toward an edge, or click, to step
        through.
      </p>
      <JanusHead codeHref="/code" createHref="/create" />
    </main>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: passes with no errors.

- [ ] **Step 3: Manual verification in the dev browser**

Run: `npm run dev`, then in a browser:

- Navigate to `http://localhost:3000/` — confirm the head renders, auto-rotates continuously without any pointer interaction.
- Move the mouse toward the left edge of the window — confirm rotation speeds up / steers noticeably; move to the right edge — confirm it steers the other way; move back to the center — confirm it returns to plain auto-rotate speed.
- Confirm the "Code"/"Create" label at the bottom updates as the front-facing side changes.
- Click the canvas while "Code" is showing — confirm navigation to `/code` and the portfolio homepage renders correctly (nav bar, hero, all sections).
- Go back to `/`, wait for or steer to "Create", click — confirm navigation to `/create` (built in Task 6; if Task 6 isn't done yet, this will 404 — acceptable at this point in sequential execution, re-verify after Task 6).

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add Janus-head landing page at /"
```

---

## Task 6: Build the `/create` coming-soon placeholder

**Files:**
- Create: `src/app/create/page.tsx`

**Interfaces:**
- Consumes: `createPageMetadata` (Task 3, Step 4) from `@/lib/metadata`.
- Produces: nothing consumed by later tasks (final task in this plan).

- [ ] **Step 1: Create the placeholder page**

Create `src/app/create/page.tsx`:

```tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { generateMetadata as generateMeta, createPageMetadata } from "@/lib/metadata";

export const metadata = generateMeta(createPageMetadata);

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
        Create
      </h1>
      <p className="text-xl font-bold max-w-md">
        Poetry and photography. Coming soon.
      </p>
      <Link
        href="/"
        className="mt-4 flex items-center gap-2 font-bold uppercase border-2 border-black bg-white px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
      >
        <ArrowLeft size={16} /> Back
      </Link>
    </main>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: passes with no errors.

- [ ] **Step 3: Manual verification in the dev browser**

- Navigate to `http://localhost:3000/create` directly — confirm it renders (heading, message, back link).
- Click "Back" — confirm it returns to `/` and the Janus head is still working.
- Re-run the full click-through from Task 5 Step 3 (steer to "Create", click) — confirm it now correctly lands on this page.

- [ ] **Step 4: Commit**

```bash
git add src/app/create
git commit -m "feat: add /create coming-soon placeholder page"
```

---

## End-to-end verification (after all tasks)

- [ ] Run `npx tsc --noEmit` once more from a clean state — confirm zero errors across the whole change set.
- [ ] Run `grep -rn "homePageMetadata" src/` — confirm no output (nothing references the renamed export).
- [ ] Run `grep -rnE '"/projects|'"'"'/projects|"/skills|'"'"'/skills' src/ --include="*.tsx" --include="*.ts"` — confirm every remaining match is prefixed with `/code` (no bare `/projects` or `/skills` route literals left).
- [ ] In the dev browser, click through: `/` → steer/click to `/code` → click a project card → back to `/code` → click "Full Skill Matrix" → confirm `/code/skills` loads → use "Back to HQ" → confirm it returns to `/code` (not `/`).
- [ ] Confirm `/` → steer/click to `/create` works.
- [ ] Confirm the site's global 404 (`src/app/not-found.tsx`) still links to `/` correctly (unchanged in this plan, but worth a sanity check after the restructure — hit a nonsense URL like `/asdf` and confirm the 404 page's "Return to HQ" link lands on the new Janus landing page).
