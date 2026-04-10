# Design Brief: CONNECT

**Purpose**: Landing & services platform connecting fresh graduates and job seekers with internship and job opportunities. Youth-focused, motivating, and professionally trustworthy.

## Tone
Professional yet approachable — modern fintech energy meets educational platform. Confidence without corporate stiffness.

## Differentiation
Clean minimalism with strategic blue accents; moderate card elevation; mobile-first responsive; intentional surface hierarchy (header > content > footer).

## Color Palette

| Token | OKLCH | Usage |
|-------|-------|-------|
| Primary Blue | `0.45 0.20 260` | CTAs, key interactions, brand identity |
| Sky Blue | `0.70 0.12 260` | Hover states, secondary actions |
| White | `0.98 0 0` | Primary background, card surfaces |
| Charcoal | `0.20 0 0` | Primary text, strong contrast |
| Grey | `0.88 0 0` | Borders, dividers, secondary backgrounds |

## Typography

| Layer | Font | Usage |
|-------|------|-------|
| Display | DM Sans | Headlines, section titles, CTAs |
| Body | Figtree | Body text, descriptions, form inputs |
| Mono | Geist Mono | Data, numbers, technical information |

## Structural Zones

| Zone | Treatment | Intent |
|------|-----------|--------|
| Header/Nav | `bg-card` with `border-b-1 border-border` | Elevated, intentional separation |
| Hero | `bg-background` with blue gradient accent element | Clear visual hierarchy, motivating |
| Content Sections | Alternating `bg-background` and `bg-muted/10` | Rhythm and visual variety |
| Cards | `bg-card shadow-subtle` with `card-hover` class | Elevation, interactive feedback |
| Footer | `bg-muted/5 border-t-1 border-border` | Grounded, distinct from content |

## Shape Language
- Button radius: `6px` (modern, approachable)
- Card radius: `8px` (friendly hierarchy)
- Input radius: `6px` (consistent with buttons)
- No sharp edges on primary surfaces

## Spacing & Rhythm
- Base unit: `4px` (Tailwind default)
- Vertical rhythm: alternating section densities (`py-8` dense → `py-16` spacious)
- Card grid: `gap-6` (2-3 column responsive)

## Component Patterns
- **Buttons**: `.btn-primary` (blue bg, white text) + `.btn-secondary` (sky blue, dark text) with `hover:opacity-90` + `active:scale-95`
- **Cards**: `.card-hover` (shadow lift + translate on hover)
- **Transitions**: `.transition-smooth` (cubic-bezier for ease, 0.3s)
- **Shadows**: `.shadow-subtle` (8px cards) + `.shadow-elevated` (on hover)

## Motion & Micro-interactions
- **Entry**: `fade-in` (0.4s) for page sections
- **Hover**: `shadow-elevated` + `-translate-y-1` for card lift
- **Focus**: Blue ring (`ring-primary`) with `ring-2` offset
- **Active**: `active:scale-95` for button feedback (micro-compression)

## Responsive Design
- Mobile-first approach with `sm:`, `md:`, `lg:` breakpoints
- Hero typography scales: `text-3xl sm:text-4xl md:text-5xl`
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Padding adjusts: `px-4 sm:px-8 md:px-12`

## Constraints
- No gradient backgrounds (solid fills only)
- Max shadow opacity: 8% (no harsh shadows)
- Limit animations to 0.3–0.4s (snappy, not sluggish)
- All text on primary blue: use white only (`--primary-foreground`)
- Maintain AA+ contrast across light/dark modes

## Signature Detail
**Blue accent bar**: Subtle right border on card elements using primary blue (`border-r-2 border-primary`) — visual signature without decoration.
