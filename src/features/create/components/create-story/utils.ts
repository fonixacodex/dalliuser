import { ImageLayer, StickerLayer, TextLayer } from './store/storyStore';

/**
 * Load an image from a URL or File and return an HTMLImageElement
 */
export const loadImage = (src: string | File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => resolve(img);
    img.onerror = reject;
    
    if (typeof src === 'string') {
      img.src = src;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          img.src = e.target.result as string;
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(src);
    }
  });
};

/**
 * Generate a unique ID for layers
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Create a new image layer from a file
 */
export const createImageLayer = async (
  file: File,
  stageWidth: number,
  stageHeight: number
): Promise<ImageLayer> => {
  const img = await loadImage(file);
  const imageUrl = URL.createObjectURL(file);
  
  // Calculate initial size to fit within canvas while maintaining aspect ratio
  const maxWidth = stageWidth * 0.8;
  const maxHeight = stageHeight * 0.8;
  const scale = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
  
  return {
    id: generateId(),
    type: 'image',
    imageUrl,
    image: img,
    x: stageWidth / 2,
    y: stageHeight / 2,
    width: img.width,
    height: img.height,
    scaleX: scale,
    scaleY: scale,
    rotation: 0,
  };
};

/**
 * Create a new text layer
 */
export const createTextLayer = (
  stageWidth: number,
  stageHeight: number
): TextLayer => {
  return {
    id: generateId(),
    type: 'text',
    text: 'Double tap to edit',
    fontSize: 32,
    fontFamily: 'Arial',
    fill: '#ffffff',
    x: stageWidth / 2,
    y: stageHeight / 2,
    width: 200,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
  };
};

/**
 * Create a new sticker layer
 */
export const createStickerLayer = async (
  file: File,
  stageWidth: number,
  stageHeight: number
): Promise<StickerLayer> => {
  const img = await loadImage(file);
  const imageUrl = URL.createObjectURL(file);
  
  // Stickers should be smaller than images
  const maxSize = Math.min(stageWidth, stageHeight) * 0.3;
  const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
  
  return {
    id: generateId(),
    type: 'sticker',
    imageUrl,
    image: img,
    x: stageWidth / 2,
    y: stageHeight / 2,
    width: img.width,
    height: img.height,
    scaleX: scale,
    scaleY: scale,
    rotation: 0,
  };
};

/**
 * Calculate distance between two points (for gesture detection)
 */
export const getDistance = (
  p1: { x: number; y: number },
  p2: { x: number; y: number }
): number => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

/**
 * Calculate angle between two points (for rotation)
 */
export const getAngle = (
  p1: { x: number; y: number },
  p2: { x: number; y: number }
): number => {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
};

/**
 * Export canvas as image data URL
 */
export const exportStage = (stage: any): string => {
  return stage.toDataURL({
    pixelRatio: 2,
    mimeType: 'image/png',
    quality: 1,
  });
};
