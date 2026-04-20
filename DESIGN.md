# Design System Document

## 1. Overview & Creative North Star: "The Kinetic Blueprint"

This design system is built for "The Optimistic Architect"—a persona that balances the structural rigor of high-end editorial design with the relentless momentum of progress. We are moving away from the static, "boxy" web. Our goal is to create a digital environment that feels like it is in a state of elegant motion.

**Creative North Star: The Kinetic Blueprint**
This system rejects the rigidity of traditional grids in favor of **intentional asymmetry** and **tonal depth**. We achieve a "premium" feel not through heavy ornamentation, but through the sophisticated use of white space, massive corner radii, and a "no-border" philosophy. The experience should feel like a high-end architectural monograph: airy, authoritative, and playfully unexpected.

---

## 2. Colors & Surface Philosophy

The palette is anchored by deep, intellectual violets and punctuated by energetic, high-vibration magentas. The neutral base is never a cold gray; it is always tinted with lavender to maintain warmth and "The Optimistic Architect" spirit.

### The "No-Line" Rule
**Explicit Instruction:** You are prohibited from using 1px solid borders for sectioning or containment. Traditional lines create visual clutter that breaks the editorial flow.
- **Boundaries** must be defined solely through background color shifts. Use `surface-container-low` (#f7f1fc) against the `surface` (#fdf7ff) background to define distinct areas.
- **The Signature Texture:** Use subtle linear gradients for primary CTAs, transitioning from `primary` (#2c29bb) to `primary_container` (#4647d3). This adds "soul" and depth that flat hex codes cannot provide.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—stacked sheets of frosted glass or fine paper.
- **Level 0 (Base):** `surface` (#fdf7ff)
- **Level 1 (Sections):** `surface_container_low` (#f7f1fc)
- **Level 2 (Cards/Interaction):** `surface_container` (#f2ecf7) or `surface_container_highest` (#e6e0eb)
- **Level 3 (Floating/Glass):** Use semi-transparent `surface` with a 20px-40px `backdrop-blur`.

---

## 3. Typography: Editorial Authority

We use typography to drive the "Momentum" of the brand. The contrast between our two typefaces creates a dialogue between architectural structure and human readability.

### Headline: Plus Jakarta Sans
- **Role:** High-impact, momentum-driven headers.
- **Styling:** Always use tight letter-spacing (approx -0.02em to -0.04em) to create a cohesive, custom-lettered look. 
- **Scale:** `display-lg` (3.5rem) should be used aggressively to anchor pages.

### Body: Be Vietnam Pro
- **Role:** Clarity and professional narrative.
- **Styling:** Generous line-height (1.6x) to ensure the "editorial" feel remains legible and sophisticated.
- **Scale:** `body-lg` (1rem) for standard reading; `title-lg` (1.375rem) for lead-ins.

---

## 4. Elevation & Depth

In this design system, depth is a tool for storytelling, not just hierarchy. We eschew "material" shadows for "ambient" lighting.

- **Tonal Layering:** Achieve lift by placing a `surface_container_lowest` (#ffffff) card on a `surface_container_low` (#f7f1fc) background. The 2-3% shift in luminosity is enough for the eye to perceive depth without the "mud" of a shadow.
- **Ambient Shadows:** When an element must float (e.g., a modal or a floating action button), use an extra-diffused shadow.
    - **Specs:** `0px 20px 40px` blur.
    - **Color:** Use a 6% opacity version of `on_surface` (#1c1a22) tinted with a hint of `primary`. Never use pure black (#000).
- **The "Ghost Border" Fallback:** If accessibility requirements demand a border, use the `outline_variant` (#c7c4d7) at **15% opacity**. It should be felt, not seen.
- **Glassmorphism:** For floating navigation or over-image text, use `surface` at 70% opacity with a `backdrop-filter: blur(24px)`. This integrates the component into the environment.

---

## 5. Components

### Buttons: The "Momentum" Pills
- **Radius:** Always `xl` (3rem) or `full`.
- **Primary:** Gradient from `primary` to `primary_container`. White text. No border.
- **Secondary:** `secondary` (#b4136d) with a soft `secondary_fixed` (#ffd9e4) background.
- **Padding:** Editorial-style wide padding (e.g., 1rem top/bottom, 2.5rem left/right).

### Cards: Asymmetrical Containers
- **Radius:** `xl` (3rem) or `lg` (2rem).
- **Style:** No dividers. Use `surface_container_low` for the card body. 
- **Layout:** Encourage content to break the internal grid—perhaps an image that bleeds off the top-left edge while text is padded deeply on the right.

### Input Fields: The Recessed Look
- **Style:** Do not use outlined boxes. Use a solid `surface_variant` (#e6e0eb) background with a `sm` (0.5rem) or `md` (1.5rem) radius.
- **Active State:** Instead of a thick border, use a subtle glow of `primary` and a shift to `surface_container_lowest`.

### Chips & Tags
- **Style:** Small, high-contrast pills using `secondary_container` (#fd56a6) with `on_secondary_container` (#600037) text. This provides the "playful" spark against the serious violet background.

---

## 6. Do's and Don'ts

### Do:
- **Embrace White Space:** Give elements 2x the breathing room you think they need.
- **Use Asymmetry:** Place a `display-lg` headline off-center to create visual tension and interest.
- **Layer with Purpose:** Use `backdrop-blur` to allow colors from the background to bleed through into your components.
- **Tighten Headers:** Ensure Plus Jakarta Sans is always tightly tracked to keep the "Momentum" vibe.

### Don't:
- **Don't use 1px Borders:** Never use a solid line to separate content. Use a color shift.
- **Don't use Sharp Corners:** Nothing in this system should have a radius smaller than `0.5rem`. The world of the Optimistic Architect is smooth and continuous.
- **Don't use Gray Shadows:** Always tint your shadows with the violet/lavender palette to keep the "high-end" glow.
- **Don't Over-center:** Center-aligned layouts often feel like "standard templates." Use left-aligned editorial layouts with wide gutters.

---

**Director's Final Note:** 
Remember, we are building a *blueprint for the future*. Every component should feel like it was placed with architectural intent, yet carries the lightness of a playful idea. If it feels "standard," you haven't pushed the tonal layering or the typography scale far enough.