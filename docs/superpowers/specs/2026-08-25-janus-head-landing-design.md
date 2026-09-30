# Janus-Head Landing Page & Site Restructure

**Date:** 2026-08-25
**Status:** Approved for planning

## Summary

Mohak has two personas: developer/researcher ("code") and poet/photographer
("create"). The site gets a new root landing page (`/`) built around a single
rotating 3D head with one persona's face sculpted/textured on the front and
the other on the back (a Janus head). The head auto-rotates; moving the
pointer toward the left or right edge of the screen steers the rotation
toward that side's face; clicking the currently front-facing face navigates
to that persona's page. The existing portfolio moves from `/` to `/code` to
make room for this. A `/create` route is added as a placeholder for the new
persona's content, which does not exist yet.

## URL structure (before → after)

| Before | After |
|---|---|
| `/` (dev portfolio) | `/code` |
| `/projects/[id]` | `/code/projects/[id]` |
| `/skills` | `/code/skills` |
| — | `/` (new Janus-head landing page) |
| — | `/create` (new "coming soon" placeholder) |

Everything currently in the `(main)` route group (`layout.tsx`,
`projects/[id]/page.tsx`, `skills/page.tsx`) moves into a new `(main)` group
nested under `app/code/`. `app/page.tsx` (currently the portfolio homepage)
is replaced by the new Janus-head landing component; the portfolio's actual
page component moves to `app/code/(main)/page.tsx` (or equivalent) and keeps
its existing implementation unchanged.

## Files with hardcoded references to the moved routes

Found via repo search; each needs its path prefix updated to `/code/...`:

- `src/lib/metadata/page-metadata.ts`
- `src/page-data/home/home.model.ts` (project card `link` fields, skills CTA link)
- `src/page-vc/SkillsPage/SkillsPage.controller.tsx`
- `src/page-vc/SkillsPage/SkillsPage.view.tsx`

This list is from a repo-wide grep for `/projects` and `/skills` path
literals at design time; the implementation plan must re-grep at
implementation time in case anything changed, and must also check for any
`next/link` usages of the bare `/` root.

## Stack

- `three`
- `@react-three/fiber` (v9 — confirmed compatible with React 19.0–19.2 and
  Next.js 16 per pmndrs release notes/GitHub issue tracker as of Aug 2026)
- `@react-three/drei` (helper utilities: `useGLTF`, `Environment`/lighting
  helpers; **not** `OrbitControls` — see Rotation mechanism below)

**Known setup gotcha:** R3F 9 on Next.js 16 requires a TypeScript
declaration extending `JSX.IntrinsicElements` with R3F's `ThreeElements` (a
one-time `.d.ts` addition), otherwise JSX for Three primitives
(`<mesh>`, `<group>`, etc.) fails to typecheck. This must be added as part
of initial setup, not discovered later as a build failure.

## Component design

### `JanusHead` (new, client component, R3F Canvas)

- Renders a single `<group>` containing the head mesh, loaded via
  `useGLTF` from `/models/janus-head.glb`.
- The model is expected to have two "front-facing" orientations 180° apart
  (front = persona A, back = persona B). No specific mesh/material naming
  contract is required beyond that; the component only cares about rotation
  angle, not model internals.
- **Placeholder model:** ships with a simple stand-in (e.g. a two-toned
  double-sided procedural bust, or two flat-shaded cones/planes facing
  opposite directions) at the same path, so rotation/steering/click-to-navigate
  all work and are visually demonstrable before the real AI-generated model
  exists. Swapping in the real `.glb` later requires no code change — only
  replacing the file (front/back orientation must be verified matching
  when the real model is dropped in, since the placeholder's orientation
  convention must match).
- **Sizing:** canvas takes ~90% of viewport height, centered horizontally,
  responsive to viewport width without layout shift.

### Rotation mechanism (custom, not `OrbitControls`)

- A `useFrame` callback increments a `rotation.y` target continuously (auto-rotate),
  at a constant base speed (e.g. slow, ~1 full rotation per 30–45s — exact
  speed is a tuning decision made during implementation, not fixed here).
- Pointer position is tracked via a window-level `pointermove` listener,
  normalized to `-1..1` based on horizontal distance from viewport center,
  with the effect weighted more heavily as the pointer approaches the left
  or right 20% edge zones (i.e., near-center pointer movement has little to
  no steering effect; edge-zone movement steers strongly).
- The steering value offsets the rotation target; the actual applied
  rotation each frame is lerped toward `(auto-rotate accumulator + steering
  offset)` rather than snapping, so movement stays smooth.
- **Front-facing persona detection:** the currently front-facing persona is
  derived each frame from `rotation.y modulo 2π`, bucketed into two 180°
  halves (front half = persona A / "code", back half = persona B /
  "create"). This value drives (a) which persona label/CTA is shown as an
  overlay, and (b) the click-to-navigate target.
- **Click behavior:** clicking anywhere on the canvas navigates to `/code`
  or `/create` based on the currently front-facing persona at the moment of
  the click.

### Page composition (`app/page.tsx`, new)

- Full-height hero section containing `JanusHead`.
- Minimal text/label overlay (not yet specified in detail — copy and any
  secondary UI chrome around the head, e.g. small persona name labels, are
  an implementation-time decision, not fixed by this spec) confirming which
  persona is currently front-facing, to reduce ambiguity for users unsure
  what clicking will do.
- Inherits the existing root layout (`app/layout.tsx`), including the
  site-wide `EnergyFieldController` background effect — no change to shared
  chrome. If this background reads as visually wrong against the 3D scene
  once built, that's a follow-up design call, not something this spec
  resolves in advance.

### `/create` page (new)

- Static "coming soon" placeholder. No component reuse requirement beyond
  matching the site's existing visual language (same fonts/theme via
  `Theme.ts`, consistent with the rest of the site) — exact copy/layout is
  an implementation-time decision.

## Explicitly out of scope

- Sourcing or generating the real `.glb` Janus head model — this is a
  prerequisite the user handles outside this codebase (AI 3D generation
  tool of their choice), not an implementation task here.
- Any redesign of the existing `/code` portfolio content itself — it moves
  as-is; no visual or content changes beyond path updates.
- Mobile-specific interaction design for the edge-steering mechanic (touch
  has no persistent "pointer position" the way desktop hover does) —
  the implementation plan must address a touch fallback (e.g. drag-to-rotate,
  or auto-rotate-only with tap-to-navigate) but the exact behavior is not
  fixed by this spec and should be decided during implementation or flagged
  back to the user if it materially changes the interaction model.

## Testing / verification approach

- Type-check (`tsc --noEmit`) after each phase.
- Manual verification in the dev browser: confirm `/code`, `/code/projects/[id]`,
  `/code/skills` all render correctly post-move; confirm every internal link
  updated in the four files listed above actually resolves (no 404s);
  confirm `/` loads the Janus head, auto-rotates, steers on edge hover, and
  navigates correctly on click for both persona halves; confirm `/create`
  renders.
