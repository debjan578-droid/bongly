# Design Brief: Bongly — Soft UI + Glass + Neumorphism

## Direction
Soft UI base layer with glass morphism for depth and neumorphism for tactile interaction feedback. Premium, accessible, warm modern tech aesthetic. Every surface intentional; no flatness.

## Palette — OKLCH

| Token | L | C | H | Usage |
|-------|---|---|---|-------|
| Primary (Bongly Blue) | 0.42 | 0.25 | 264 | Buttons, accents, headers |
| Secondary | 0.95 | 0.02 | 150 | Soft green tint, borders |
| Accent | 0.88 | 0.08 | 120 | Highlights, interactive feedback |
| Background | 0.995 | 0.001 | 0 | Main canvas, near-white |
| Card | 0.99 | 0.002 | 0 | Card surfaces |
| Muted | 0.96 | 0.01 | 0 | Secondary backgrounds, disabled states |
| Border | 0.95 | 0.005 | 0 | Subtle dividers, glass edges |

## Typography

| Layer | Font | Weight | Usage |
|-------|------|--------|-------|
| Display | Space Grotesk | 700 | H1–H6, section titles, branded header |
| Body | General Sans | 400 | Paragraph text, navigation, UI labels |

## Elevation & Depth

| State | Shadow Token | Usage |
|-------|--------------|-------|
| Base | `shadow-soft` | Cards, containers, default elevation |
| Elevated | `shadow-elevated` | Hovered cards, modals, popovers |
| Glass | Inset + border | Glass morphism surfaces |
| Neumorphic Hover | Layered outset + inset | Button/card hover state |
| Neumorphic Press | Inset only | Button/card active/press state |

## Structural Zones

| Zone | Treatment | Notes |
|------|-----------|-------|
| Header (sticky) | `bg-background`, `border-b border-border` | Minimal elevation; Bongly logo in Space Grotesk, #1530C8 |
| Hero | Aurora mesh gradient, soft radial overlays | Animated, pastel green/blue/purple blend |
| App Cards (Chalok) | Glass base + animated glowing border | Purple→Blue→Orange→Pink keyframe, 3s pulse |
| Blog Cards | Glass morphism, `backdrop-blur-md` | Soft shadow on hover via neumorphic-hover |
| About Section | Glass card, `soft-radius-lg` | Warm, welcoming tone; no "labs" |
| Privacy Promise | Glass treatment, centered, shield icon | Minimal, trustworthy |
| Footer | Glass base, `border-t border-border` | Two-column layout, centered |

## Spacing & Rhythm

- Large elements: 24–32px radii (`soft-radius-lg`, `soft-radius-md`)
- Buttons: 12px radii (`soft-radius-sm`)
- Padding: 20–32px on card interiors
- Gap: 16–24px between sections
- Density: Generous spacing; breathing room over compact layout

## Component Patterns

| Pattern | Tailwind Classes | Notes |
|---------|------------------|-------|
| Soft Button | `glass-base soft-radius-sm neumorphic-hover transition-smooth` | Hovers lift with layered shadow |
| Card | `glass-card soft-shadow transition-smooth` | Always frosted; white at 0.7 opacity |
| Link/Interactive | `transition-smooth neumorphic-hover` | Smooth color + shadow shifts on hover |
| Input | `bg-background border border-border rounded-lg` | Subtle appearance, focus via ring |

## Motion

- Default: `--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` — easing for all interactive elements
- Aurora: `aurora-shift 12s ease-in-out infinite` — slow mesh gradient animation
- Glow: `rotate-glow 4s linear`, `card-glow-pulse 3s ease-in-out` — Chalok card multi-color pulse
- Drawer: `slide-in-right 0.25s ease` from right side

## Constraints

- **No "labs" wording** anywhere in copy
- **Preserve** Chalok animated glowing border (purple→blue→orange→pink)
- **Preserve** drawer slide-in from right
- **Static site**: No backend logic; all content hardcoded
- **Accessibility**: WCAG AA+ contrast via OKLCH tuning; semantic HTML; alt text on all images
- **Responsive**: Mobile-first; tested on small/medium/large viewports

## Signature Detail

**Animated glowing border on Chalok app card** — multi-color conic gradient (purple→blue→green→orange→pink) that rotates continuously and pulses through color intensity. Creates visual anchor and memorable brand marker. Always visible, even at rest.
