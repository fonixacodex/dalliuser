# Story Editor - Quick Start Guide

## 🚀 Getting Started

The Instagram-style Story Editor is now fully installed and ready to use!

### Start the Development Server

```bash
pnpm dev
```

Then navigate to: **http://localhost:3000/create-story**

---

## 📁 Project Structure

```
app/create-story/
├── page.tsx                    # Main route page
├── StoryEditor.tsx             # Editor component with gestures
├── utils.ts                    # Helper functions
├── README.md                   # Full documentation
├── components/
│   ├── StoryCanvas.tsx        # Konva canvas with layers
│   └── Toolbar.tsx            # Bottom toolbar controls
└── store/
    └── storyStore.ts          # Zustand state management

app/api/story-upload/
└── route.ts                    # Upload API endpoint
```

---

## ✨ Features Implemented

### Canvas Editing
- ✅ 9:16 aspect ratio (360×640 → exports 1080×1920)
- ✅ react-konva rendering engine
- ✅ High-quality PNG export

### Image Layers
- ✅ Upload images
- ✅ Drag, resize, rotate
- ✅ Pinch-zoom on mobile
- ✅ Double-tap to reset

### Text Layers
- ✅ Add multiple text elements
- ✅ Edit text content
- ✅ Change font size (12-120px)
- ✅ Change text color
- ✅ Full transform support

### Stickers
- ✅ Upload PNG/GIF stickers
- ✅ Transform like images

### Layer Management
- ✅ Select layers by tapping
- ✅ Bring forward / Send backward
- ✅ Delete selected layer
- ✅ Visual selection with transform handles

### Mobile Gestures (@use-gesture/react)
- ✅ One-finger drag
- ✅ Two-finger pinch zoom
- ✅ Two-finger rotate
- ✅ Double-tap to reset transform

### Export
- ✅ Save as PNG (1080×1920)
- ✅ POST to `/api/story-upload`
- ✅ Auto-download to device
- ✅ Toast notifications

---

## 🎨 How to Use

### 1. Add Elements

**Add Image:**
- Click "Image" button
- Select a photo from your device
- Image appears on canvas

**Add Text:**
- Click "Text" button
- Text layer appears with default text
- Select and edit in toolbar below

**Add Sticker:**
- Click "Sticker" button
- Select PNG/GIF file
- Sticker appears on canvas

### 2. Edit Elements

**Select:**
- Tap any element to select it
- Transform handles appear

**Move:**
- Drag with one finger

**Resize:**
- Drag corner handles
- Or pinch with two fingers (mobile)

**Rotate:**
- Rotate with two fingers (mobile)
- Or use corner handles while holding

**Reset:**
- Double-tap selected element to reset transform

### 3. Edit Text

When text layer is selected:
- Edit text in input field
- Adjust font size with slider
- Change color with color picker

### 4. Layer Controls

**Bring Forward:**
- Moves layer up in z-order

**Send Backward:**
- Moves layer down in z-order

**Delete:**
- Removes selected layer

### 5. Save & Export

Click "Save" button:
- Exports as 1080×1920 PNG
- Sends to API endpoint
- Downloads to your device
- Shows success notification

---

## 🔧 Dependencies Installed

```json
{
  "react-konva": "^19.2.5",
  "konva": "^10.3.0",
  "zustand": "^5.0.14",
  "@use-gesture/react": "^10.3.1"
}
```

Already in your project:
- next: 16.2.6
- react: 19.2.4
- react-hot-toast: ^2.6.0
- lucide-react: ^1.3.0
- tailwindcss: ^4

---

## 📱 Mobile Testing

The editor works best on:
- iOS Safari (iOS 14+)
- Chrome Mobile (Android 10+)
- Desktop Chrome/Edge/Firefox

Gesture features require touch-enabled device or simulator.

---

## 🎯 API Integration

### Current Implementation

The API endpoint at `/api/story-upload/route.ts` currently logs uploads.

### Production Setup

Replace with real storage:

```typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Initialize S3
const s3 = new S3Client({ region: 'us-east-1' });

// Convert base64 to buffer
const base64Data = image.split(',')[1];
const buffer = Buffer.from(base64Data, 'base64');

// Upload to S3
await s3.send(new PutObjectCommand({
  Bucket: 'your-bucket',
  Key: `stories/${id}.png`,
  Body: buffer,
  ContentType: 'image/png',
}));

// Return URL
return { url: `https://cdn.example.com/stories/${id}.png` };
```

**Or use Cloudinary:**

```typescript
import { v2 as cloudinary } from 'cloudinary';

const result = await cloudinary.uploader.upload(image, {
  folder: 'stories',
  resource_type: 'image',
});

return { url: result.secure_url };
```

---

## 🎨 Customization

### Change Canvas Size

Edit `app/create-story/store/storyStore.ts`:

```typescript
stageSize: { width: 360, height: 640 }, // 9:16 ratio
```

### Change Export Resolution

Edit `app/create-story/StoryEditor.tsx`:

```typescript
const dataURL = stage.toDataURL({
  pixelRatio: 3, // Adjust multiplier (3 = 1080x1920)
});
```

### Change Default Text Style

Edit `app/create-story/utils.ts`:

```typescript
export const createTextLayer = (stageWidth, stageHeight): TextLayer => {
  return {
    // ... other props
    fontSize: 40,           // Change default size
    fontFamily: 'Roboto',  // Change default font
    fill: '#ff0000',       // Change default color
  };
};
```

### Change Color Scheme

All components use Tailwind classes. Search and replace:
- `bg-gray-900` → your dark background
- `bg-blue-600` → your primary color
- `bg-green-600` → your secondary color

---

## 🐛 Troubleshooting

### Canvas not rendering
- Check browser console for errors
- Verify all dependencies installed
- Try hard refresh (Cmd+Shift+R)

### Gestures not working
- Verify on touch-enabled device
- Check browser supports touch events
- Try mobile device simulator in DevTools

### Images not loading
- Check image file size (keep under 5MB)
- Verify image format (JPEG, PNG, WebP)
- Check browser console for CORS errors

### Export quality low
- Increase `pixelRatio` in export settings
- Check source image quality
- Verify canvas renders correctly

---

## 📚 Additional Resources

- [react-konva Documentation](https://konvajs.org/docs/react/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [@use-gesture Documentation](https://use-gesture.netlify.app/)
- [Next.js 16 App Router](https://nextjs.org/docs)

---

## ✅ What's Next?

### Suggested Enhancements

1. **Undo/Redo** - Add history tracking
2. **Filters** - Apply Instagram-style filters
3. **Shapes** - Add circles, rectangles, arrows
4. **Drawing** - Freehand drawing tool
5. **Templates** - Pre-made story templates
6. **Fonts** - Google Fonts integration
7. **Animations** - Animated stickers
8. **Backgrounds** - Gradient/pattern backgrounds

### Production Checklist

- [ ] Connect real storage (S3/Cloudinary)
- [ ] Add user authentication
- [ ] Save drafts to database
- [ ] Add analytics tracking
- [ ] Optimize image compression
- [ ] Add error boundary
- [ ] Set up CDN for assets
- [ ] Add rate limiting to API
- [ ] Implement image moderation
- [ ] Add share functionality

---

## 🎉 You're Ready!

Start the server and create your first story:

```bash
pnpm dev
```

Visit: **http://localhost:3000/create-story**

Happy creating! 🚀
