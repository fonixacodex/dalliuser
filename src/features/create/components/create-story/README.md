# Instagram-Style Story Editor

A complete, production-ready story editor built with Next.js 16, React, TypeScript, and react-konva.

## Features

✅ **Canvas-Based Editing** (react-konva)
- 9:16 aspect ratio (360×640 preview, exports to 1080×1920)
- Real-time rendering with high-quality export

✅ **Image Editing**
- Upload and add images
- Drag, pinch-zoom, rotate, resize
- Double-tap to reset transform

✅ **Text Editing**
- Multiple text layers
- Customizable font size, color
- Drag, rotate, resize
- Inline text editing

✅ **Stickers**
- Add PNG/GIF stickers
- Full transform support

✅ **Layer Management**
- Bring forward / send backward
- Delete layers
- Visual selection with transformer handles

✅ **Mobile Gestures** (@use-gesture/react)
- One-finger drag
- Two-finger pinch zoom
- Two-finger rotate
- Double-tap to reset

✅ **Export & Save**
- High-resolution PNG export (1080×1920)
- POST to `/api/story-upload`
- Automatic download

## Tech Stack

- **Next.js 16** - App Router
- **TypeScript** - 100% type-safe
- **TailwindCSS** - Styling
- **react-konva** - Canvas rendering
- **Konva** - Canvas manipulation
- **Zustand** - State management
- **@use-gesture/react** - Mobile gestures
- **lucide-react** - Icons
- **react-hot-toast** - Notifications

## Installation

Dependencies are already installed. If you need to reinstall:

```bash
pnpm add react-konva konva zustand @use-gesture/react
```

## Project Structure

```
app/
├── create-story/
│   ├── page.tsx                 # Route page
│   ├── StoryEditor.tsx          # Main editor component
│   ├── utils.ts                 # Utility functions
│   ├── components/
│   │   ├── StoryCanvas.tsx      # Konva canvas with layers
│   │   └── Toolbar.tsx          # Bottom toolbar with controls
│   └── store/
│       └── storyStore.ts        # Zustand store
└── api/
    └── story-upload/
        └── route.ts             # Upload API endpoint
```

## Usage

### Run the Development Server

```bash
pnpm dev
```

Navigate to: `http://localhost:3000/create-story`

### How to Use the Editor

1. **Add Elements**
   - Click "Image" to upload photos
   - Click "Text" to add text layers
   - Click "Sticker" to add PNG stickers

2. **Edit Elements**
   - Tap to select any element
   - Drag to move
   - Use corner handles to resize
   - Rotate with two fingers (mobile) or handles
   - Double-tap to reset transform

3. **Text Editing**
   - Select text layer
   - Edit content in the text input
   - Adjust font size with slider
   - Change color with color picker

4. **Layer Controls**
   - Bring Forward: Move layer up
   - Send Backward: Move layer down
   - Delete: Remove selected layer

5. **Export**
   - Click "Save" to export
   - Automatically downloads PNG
   - Sends to API endpoint

### Mobile Gestures

- **One finger**: Drag elements
- **Two fingers (pinch)**: Zoom in/out
- **Two fingers (rotate)**: Rotate elements
- **Double-tap**: Reset transform to default

## API Endpoint

### POST /api/story-upload

**Request:**
```json
{
  "image": "data:image/png;base64,..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Story uploaded successfully",
  "data": {
    "id": "story_1234567890",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "size": 123456
  }
}
```

**Production Implementation:**

Replace the mock API with real storage:

```typescript
// Example with S3
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-1' });
const buffer = Buffer.from(base64Data, 'base64');

await s3.send(new PutObjectCommand({
  Bucket: 'your-bucket',
  Key: `stories/${id}.png`,
  Body: buffer,
  ContentType: 'image/png',
}));
```

## Customization

### Canvas Size

Edit `stageSize` in `storyStore.ts`:

```typescript
stageSize: { width: 360, height: 640 }, // 9:16 ratio
```

### Export Resolution

Adjust `pixelRatio` in `StoryEditor.tsx`:

```typescript
const dataURL = stage.toDataURL({
  pixelRatio: 3, // 360*3 = 1080, 640*3 = 1920
});
```

### Color Scheme

Modify Tailwind classes in components:

```tsx
className="bg-gray-900"  // Dark background
className="bg-blue-600"  // Primary button
```

### Text Defaults

Edit `createTextLayer` in `utils.ts`:

```typescript
fontSize: 32,
fontFamily: 'Arial',
fill: '#ffffff',
```

## Advanced Features

### Add Custom Fonts

```typescript
// In createTextLayer or Toolbar
fontFamily: 'Roboto, Arial, sans-serif'
```

Make sure to load fonts in your layout or global CSS.

### Add Filters

Install konva filters:

```typescript
import Konva from 'konva';

// Apply filter to image
imageNode.cache();
imageNode.filters([Konva.Filters.Blur]);
imageNode.blurRadius(5);
```

### Add Undo/Redo

Extend the Zustand store:

```typescript
interface StoryState {
  history: Layer[][];
  historyStep: number;
  undo: () => void;
  redo: () => void;
}
```

## Performance Tips

1. **Image Optimization**: Compress images before upload
2. **Layer Limit**: Consider limiting layers to 10-15 for smooth performance
3. **Caching**: Use Konva's `cache()` method for complex shapes
4. **Debouncing**: Debounce transform updates during gestures

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Safari (latest)
- ✅ Firefox (latest)
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android 10+)

## Troubleshooting

### Images not loading
- Check CORS settings
- Ensure `crossOrigin='anonymous'` on images

### Gestures not working on mobile
- Verify touch events are not prevented
- Check `eventOptions: { passive: false }`

### Export quality poor
- Increase `pixelRatio` in export settings
- Check original image quality

### Transformer not appearing
- Verify layer is selected
- Check z-index of transformer layer

## License

This implementation is part of your project and follows your project's license.

## Support

For issues or questions, refer to:
- [react-konva docs](https://konvajs.org/docs/react/)
- [Zustand docs](https://zustand-demo.pmnd.rs/)
- [@use-gesture docs](https://use-gesture.netlify.app/)
