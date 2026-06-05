// سرویس ویرایش تصاویر

export interface EditSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  temperature: number;
  blur: number;
  sharpen: number;
}

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

class ImageEditorService {
  private static instance: ImageEditorService;

  static getInstance(): ImageEditorService {
    if (!ImageEditorService.instance) {
      ImageEditorService.instance = new ImageEditorService();
    }
    return ImageEditorService.instance;
  }

  // متد کمکی برای اعمال فیلتر روی تصویر
  private async applyFilterToImage(
    imageUrl: string,
    operation: (data: Uint8ClampedArray, width: number, height: number) => void
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;
      img.crossOrigin = "anonymous";
      
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        
        if (!ctx) {
          reject(new Error("Cannot get canvas context"));
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        operation(imageData.data, imageData.width, imageData.height);
        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL("image/webp"));
      };
      
      img.onerror = () => reject(new Error("Failed to load image"));
    });
  }

  // تغییر روشنایی
  async adjustBrightness(imageUrl: string, value: number): Promise<string> {
    return this.applyFilterToImage(imageUrl, (data) => {
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, Math.max(0, data[i] + value * 255));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + value * 255));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + value * 255));
      }
    });
  }

  // تغییر کنتراست
  async adjustContrast(imageUrl: string, value: number): Promise<string> {
    const factor = (259 * (value * 255 + 255)) / (255 * (259 - value * 255));
    return this.applyFilterToImage(imageUrl, (data) => {
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));
        data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128));
        data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128));
      }
    });
  }

  // تغییر اشباع
  async adjustSaturation(imageUrl: string, value: number): Promise<string> {
    return this.applyFilterToImage(imageUrl, (data) => {
      for (let i = 0; i < data.length; i += 4) {
        const gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
        data[i] = Math.min(255, Math.max(0, gray + value * (data[i] - gray)));
        data[i + 1] = Math.min(255, Math.max(0, gray + value * (data[i + 1] - gray)));
        data[i + 2] = Math.min(255, Math.max(0, gray + value * (data[i + 2] - gray)));
      }
    });
  }

  // تغییر دما
  async adjustTemperature(imageUrl: string, value: number): Promise<string> {
    return this.applyFilterToImage(imageUrl, (data) => {
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, Math.max(0, data[i] + value * 50));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] - value * 50));
      }
    });
  }

  // اعمال فیلترهای آماده (grayscale, sepia, invert) - متد اصلی برای استفاده در کامپوننت‌ها
  async applyFilter(imageUrl: string, filterName: string): Promise<string> {
    const filters: Record<string, (data: Uint8ClampedArray) => void> = {
      normal: (data) => {},
      grayscale: (data) => {
        for (let i = 0; i < data.length; i += 4) {
          const gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
          data[i] = data[i + 1] = data[i + 2] = gray;
        }
      },
      sepia: (data) => {
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
          data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
          data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
        }
      },
      invert: (data) => {
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i];
          data[i + 1] = 255 - data[i + 1];
          data[i + 2] = 255 - data[i + 2];
        }
      },
      clarendon: (data) => {
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 1.2);
          data[i + 1] = Math.min(255, data[i + 1] * 1.1);
          data[i + 2] = Math.min(255, data[i + 2] * 1.05);
        }
      },
      gingham: (data) => {
        for (let i = 0; i < data.length; i += 4) {
          const gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
          data[i] = Math.min(255, gray + 20);
          data[i + 1] = Math.min(255, gray + 10);
          data[i + 2] = Math.min(255, gray);
        }
      },
      moon: (data) => {
        for (let i = 0; i < data.length; i += 4) {
          const gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
          data[i] = gray;
          data[i + 1] = gray;
          data[i + 2] = gray;
          data[i] = Math.min(255, data[i] * 1.1);
          data[i + 1] = Math.min(255, data[i + 1] * 1.05);
        }
      },
      lark: (data) => {
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 1.2);
          data[i + 1] = Math.min(255, data[i + 1] * 1.15);
          data[i + 2] = Math.min(255, data[i + 2] * 1.1);
        }
      },
      reyes: (data) => {
        for (let i = 0; i < data.length; i += 4) {
          const gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
          data[i] = Math.min(255, gray * 0.9);
          data[i + 1] = Math.min(255, gray * 0.85);
          data[i + 2] = Math.min(255, gray * 0.8);
        }
      },
    };

    const filter = filters[filterName];
    if (!filter || filterName === "normal") return imageUrl;

    return this.applyFilterToImage(imageUrl, filter);
  }

  // اعمال فیلتر با تنظیمات پیشرفته (روشنایی، کنتراست، اشباع، دما)
  async applyAdvancedFilter(
    imageUrl: string,
    settings: { brightness: number; contrast: number; saturation: number; temperature: number }
  ): Promise<string> {
    let result = imageUrl;
    
    if (settings.brightness !== 0) {
      result = await this.adjustBrightness(result, settings.brightness / 100);
    }
    if (settings.contrast !== 0) {
      result = await this.adjustContrast(result, settings.contrast / 100);
    }
    if (settings.saturation !== 0) {
      result = await this.adjustSaturation(result, settings.saturation / 100);
    }
    if (settings.temperature !== 0) {
      result = await this.adjustTemperature(result, settings.temperature / 100);
    }
    
    return result;
  }

  // برش تصویر
  async crop(imageUrl: string, area: CropArea): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;
      img.crossOrigin = "anonymous";
      
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = area.width;
        canvas.height = area.height;
        const ctx = canvas.getContext("2d");
        
        if (!ctx) {
          reject(new Error("Cannot get canvas context"));
          return;
        }
        
        ctx.drawImage(img, area.x, area.y, area.width, area.height, 0, 0, area.width, area.height);
        resolve(canvas.toDataURL("image/webp"));
      };
      
      img.onerror = () => reject(new Error("Failed to load image"));
    });
  }

  // تغییر ابعاد
  async resize(imageUrl: string, width: number, height: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;
      img.crossOrigin = "anonymous";
      
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        
        if (!ctx) {
          reject(new Error("Cannot get canvas context"));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/webp"));
      };
      
      img.onerror = () => reject(new Error("Failed to load image"));
    });
  }

  // چرخش تصویر
  async rotate(imageUrl: string, degrees: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;
      img.crossOrigin = "anonymous";
      
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const rad = (degrees * Math.PI) / 180;
        const sin = Math.abs(Math.sin(rad));
        const cos = Math.abs(Math.cos(rad));
        
        canvas.width = img.width * cos + img.height * sin;
        canvas.height = img.width * sin + img.height * cos;
        
        const ctx = canvas.getContext("2d");
        
        if (!ctx) {
          reject(new Error("Cannot get canvas context"));
          return;
        }
        
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rad);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        resolve(canvas.toDataURL("image/webp"));
      };
      
      img.onerror = () => reject(new Error("Failed to load image"));
    });
  }
}

export const imageEditorService = ImageEditorService.getInstance();