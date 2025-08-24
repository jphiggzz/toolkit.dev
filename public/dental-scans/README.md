# Dental Scans Directory

This directory contains mock dental scan images for the patient simulation feature.

## Expected Files

For the EB patient simulation, place the following files here:

### CBCT Scan
- `cbct-thumb.jpg` - Thumbnail image (recommended size: 150x150px)
- `cbct-full.jpg` - Full-size scan image (recommended size: 800x600px or larger)

### Bitewing Scan
- `bitewing-thumb.jpg` - Thumbnail image (recommended size: 150x150px)
- `bitewing-full.jpg` - Full-size scan image (recommended size: 800x600px or larger)

## Image Guidelines

- **Format**: JPG or PNG
- **Thumbnails**: Small, square images for sidebar display
- **Full images**: High-resolution scans for modal viewing
- **Content**: Use realistic dental X-ray or CBCT images
- **Privacy**: Ensure all images are anonymized/synthetic

## Adding More Scans

To add additional scans:

1. Add image files to this directory
2. Update the patient data in `src/app/_components/chat/mock/eb-patient.ts`
3. Add the new scan object with proper paths and metadata

Example scan object:
```typescript
{
  id: "scan-3",
  type: "Panoramic",
  date: "2025-08-01",
  thumbnail: "/dental-scans/panoramic-thumb.jpg",
  fullImage: "/dental-scans/panoramic-full.jpg",
  description: "Full mouth panoramic radiograph",
  findings: ["No pathology detected", "All teeth present"]
}
```
