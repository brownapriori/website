# Image Assets

This directory contains all image assets for the A Priori website.

## Current Files

- **a-priori-logo.svg** - A Priori journal logo (64x64px) - Currently a placeholder
- **brown-logo.svg** - Brown University logo (97x48px) - Currently a placeholder
- **article-placeholder.svg** - Placeholder for article images (400x300px)
- **banner-placeholder.svg** - Placeholder for banner images (1200x400px)

## Replacing Placeholders

To replace these placeholder images with actual assets:

1. Export your images from Figma or your design tool
2. Save them in this directory with the same filenames, or
3. Save them with different names and update the constants in the component files:
    - `app/components/Nav.tsx`
    - `app/components/Footer.tsx`
    - `app/page.tsx`
    - `app/papers/page.tsx`

## Recommended Formats

- **Logos**: SVG (scalable) or PNG with transparent background
- **Photos/Images**: WebP (best performance) or PNG/JPG
- **Banners**: WebP or PNG

## Image Optimization

For production, consider:

- Using Next.js Image component for automatic optimization
- Compressing images before upload
- Using appropriate formats (WebP for photos, SVG for logos)
- Providing multiple sizes for responsive images
