# Vera Styling Guide

This project now includes the Vera color palette and font configuration from the vera-web project.

## Color Palette

The Vera color palette has been integrated into the Tailwind CSS configuration. You can use these colors in your components:

### Available Colors

- **Background Colors:**
  - `bg-vera-background` - #344033 (Main background)
  - `bg-vera-background-secondary` - #1B251D (Secondary background)
  - `bg-vera-gradient` - Linear gradient from top to bottom

- **Text Colors:**
  - `text-vera-text` - #FFFFDF (Main text color)
  - `text-vera-primary` - #FFD600 (Primary/accent text)
  - `text-vera-success` - #717B68 (Success text)
  - `text-vera-accent` - #B1B59D (Accent text)
  - `text-vera-error` - #FF6B6B (Error text)
  - `text-vera-warning` - #FFD166 (Warning text)

- **Border Colors:**
  - `border-vera-border` - #717B68 (Default border)
  - `border-vera-primary` - #FFD600 (Primary border)

### CSS Variables

All colors are also available as CSS variables:
- `var(--vera-background)`
- `var(--vera-background-secondary)`
- `var(--vera-text)`
- `var(--vera-primary)`
- `var(--vera-success)`
- `var(--vera-accent)`
- `var(--vera-error)`
- `var(--vera-warning)`
- `var(--vera-gradient-top)`
- `var(--vera-gradient-bottom)`

## Typography

### Font Families

Two main font families are configured:
- **GeneralSans** (Sans-serif) - For body text, buttons, and UI elements
- **Sentient** (Serif) - For headings and titles

### Font Utility Classes

Use these predefined font classes for consistent typography:

- `.font-large-title` - 34px/41px, Sentient, Bold
- `.font-title1` - 28px/34px, Sentient, Bold
- `.font-title2` - 22px/28px, Sentient, Bold
- `.font-title3` - 20px/25px, Sentient, Medium
- `.font-body` - 17px/22px, GeneralSans, Regular
- `.font-body-light` - 17px/22px, GeneralSans, Light
- `.font-body-medium` - 17px/22px, GeneralSans, Medium
- `.font-body-small` - 15px/20px, GeneralSans, Regular
- `.font-caption` - 12px/16px, GeneralSans, Regular
- `.font-button` - 17px/22px, GeneralSans, Semibold
- `.font-link` - 17px/22px, GeneralSans, Regular

### Tailwind Font Classes

You can also use standard Tailwind classes with the configured fonts:
- `font-sans` - Uses GeneralSans
- `font-serif` - Uses Sentient

## Font Files Setup

✅ **Fonts are now implemented!** The Vera brand fonts are successfully loaded from `/public/fonts/`.

### Available Font Files

**GeneralSans (.otf format):**
- Extralight (200 weight) + Italic
- Light (300 weight) + Italic
- Regular (400 weight) + Italic
- Medium (500 weight) + Italic
- Semibold (600 weight) + Italic
- Bold (700 weight) + Italic

**Sentient (.otf format):**
- Extralight (200 weight) + Italic
- Light (300 weight) + Italic
- Regular (400 weight) + Italic
- Medium (500 weight) + Italic
- Bold (700 weight) + Italic

### Fallback Fonts

If font files fail to load, the system will fall back to:
- **GeneralSans fallback:** system-ui, -apple-system, sans-serif
- **Sentient fallback:** serif

### Font Weight Reference

- **200**: Extralight
- **300**: Light  
- **400**: Regular (normal)
- **500**: Medium
- **600**: Semibold
- **700**: Bold

## Usage Examples

```jsx
// Using Vera colors and fonts
<div className="bg-vera-background text-vera-text">
  <h1 className="font-large-title text-vera-primary">
    Welcome to Vera
  </h1>
  <p className="font-body text-vera-accent">
    This is body text using the Vera color palette.
  </p>
  <button className="font-button bg-vera-primary text-black border-vera-primary">
    Get Started
  </button>
</div>

// Using the gradient background
<div className="bg-vera-gradient min-h-screen">
  <div className="text-vera-text font-body">
    Content with Vera gradient background
  </div>
</div>
```

## Integration Notes

- The color palette is integrated into both the Tailwind theme and as utility classes
- Font variables are set up for use with Tailwind CSS v4
- All colors and fonts maintain compatibility with existing shadcn/ui components
- The styling system supports both light and dark modes (though Vera typically uses dark themes)
