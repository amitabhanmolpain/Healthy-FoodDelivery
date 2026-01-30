# Design Notes

## Color Palette
The app uses a fresh, trust-inspiring green palette.

- **Primary Green**: `#8FD694` (Tailwind: `primary`) - Used for main buttons, highlights.
- **Accent/CTA**: `#3AA76D` (Tailwind: `accent`) - Used for active states, badges.
- **Dark Text**: `#12623A` (Tailwind: `primary-foreground`) - High contrast text.
- **Background**: `#F8FAF8` (Light minty white) - Page backgrounds.

## Typography
- **Font**: Inter (via Next.js Google Fonts)
- **Weights**: Regular (400), Medium (500), Bold (700)
- **Headings**: Tight tracking, heavy weights.

## UI Components
- **Buttons**: Fully rounded (`rounded-2xl`), shadow-lg for primary.
- **Cards**: Large border-radius (`rounded-2xl` or `3xl`), clean white background, soft shadows on hover.
- **Inputs**: Large hit areas, rounded corners, soft focus rings.

## Animations
Uses `tailwindcss-animate` plugin.
- `animate-in fade-in`
- `slide-in-from-bottom-4`
- `zoom-in`

## Traceability Features
Key UI elements for trust:
1. **Zero-Adulteration Badge**: Prominent on meal cards.
2. **Lab Report Modal**: accessible via badge click.
3. **Healthy Score**: Calculated client-side in Cart.
\`\`\`
