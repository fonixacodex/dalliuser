import { FilterType, AspectRatio } from "../types/create.types";

 
export const convertToWebP = async (file: File, quality: number = 0.8): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const webpFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.webp'), {
                type: 'image/webp',
              });
              resolve(webpFile);
            } else {
              reject(new Error('تبدیل ناموفق'));
            }
          },
          'image/webp',
          quality
        );
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

 
export const cropToAspectRatio = (
  imageUrl: string,
  aspectRatio: AspectRatio,
  zoom: number = 1,
  position: { x: number; y: number } = { x: 0, y: 0 }
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const ratios: Record<AspectRatio, number> = {
        "1:1": 1,
        "16:9": 16 / 9,
        "4:5": 4 / 5,
        "9:16": 9 / 16,
      };
      
      const targetRatio = ratios[aspectRatio];
      let width = img.width;
      let height = img.height;
      
      if (width / height > targetRatio) {
        width = height * targetRatio;
      } else {
        height = width / targetRatio;
      }
      
      const canvas = document.createElement('canvas');
      canvas.width = width * zoom;
      canvas.height = height * zoom;
      
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(
        img,
        position.x, position.y,
        width, height,
        0, 0,
        canvas.width, canvas.height
      );
      
      resolve(canvas.toDataURL('image/webp'));
    };
    img.onerror = reject;
  });
};

 
export const applyFilter = (
  imageUrl: string,
  filter: FilterType,
  settings: { brightness: number; contrast: number; saturation: number; temperature: number }
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Canvas not supported'));
        return;
      }
      
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
 
      for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];
        
      
        r += settings.brightness * 255;
        g += settings.brightness * 255;
        b += settings.brightness * 255;
        
      
        const factor = (259 * (settings.contrast * 255 + 255)) / (255 * (259 - settings.contrast * 255));
        r = factor * (r - 128) + 128;
        g = factor * (g - 128) + 128;
        b = factor * (b - 128) + 128;
        
 
        r += settings.temperature * 50;
        b -= settings.temperature * 50;
        
        data[i] = Math.min(255, Math.max(0, r));
        data[i + 1] = Math.min(255, Math.max(0, g));
        data[i + 2] = Math.min(255, Math.max(0, b));
      }
      
      ctx.putImageData(imageData, 0, 0);
      
 
      if (filter !== "normal") {
        ctx.filter = getFilterStyle(filter);
        ctx.drawImage(canvas, 0, 0);
      }
      
      resolve(canvas.toDataURL('image/webp'));
    };
    img.onerror = reject;
  });
};

const getFilterStyle = (filter: FilterType): string => {
  const filters: Record<FilterType, string> = {
    normal: "none",
    clarendon: "contrast(1.2) brightness(1.1)",
    gingham: "sepia(0.2) brightness(1.05)",
    moon: "grayscale(1) contrast(1.1)",
    lark: "saturate(1.2) brightness(1.05)",
    reyes: "sepia(0.3) brightness(1.05) contrast(0.9)",
    juno: "contrast(1.1) saturate(1.3) brightness(1.05)",
    slumber: "sepia(0.2) brightness(0.95) saturate(1.1)",
    crema: "brightness(1.05) contrast(0.95) saturate(1.1)",
    ludwig: "brightness(1.05) contrast(0.95)",
    aden: "hue-rotate(-10deg) saturate(1.1) brightness(1.05)",
    perpetua: "contrast(1.1) saturate(1.1) brightness(1.05)",
  };
  return filters[filter];
};

 
export const addTextToImage = (
  imageUrl: string,
  texts: { text: string; x: number; y: number; fontSize: number; color: string; fontFamily: string }[]
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Canvas not supported'));
        return;
      }
      
      ctx.drawImage(img, 0, 0);
      
      texts.forEach(text => {
        ctx.font = `${text.fontSize}px ${text.fontFamily}`;
        ctx.fillStyle = text.color;
        ctx.fillText(text.text, text.x, text.y);
      });
      
      resolve(canvas.toDataURL('image/webp'));
    };
    img.onerror = reject;
  });
};