// سرویس آپلود فایل‌ها

export interface UploadOptions {
  onProgress?: (progress: number) => void;
  onSuccess?: (url: string) => void;
  onError?: (error: Error) => void;
}

export interface UploadResult {
  url: string;
  fileId: string;
  size: number;
  type: string;
}

class UploadService {
  private static instance: UploadService;

  static getInstance(): UploadService {
    if (!UploadService.instance) {
      UploadService.instance = new UploadService();
    }
    return UploadService.instance;
  }

 
  async uploadFile(file: File, options?: UploadOptions): Promise<UploadResult> {
    const formData = new FormData();
    formData.append("file", file);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable && options?.onProgress) {
          const progress = (e.loaded / e.total) * 100;
          options.onProgress(progress);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          const result = JSON.parse(xhr.responseText);
          const uploadResult: UploadResult = {
            url: result.url,
            fileId: result.id,
            size: file.size,
            type: file.type,
          };
          options?.onSuccess?.(uploadResult.url);
          resolve(uploadResult);
        } else {
          const error = new Error("Upload failed");
          options?.onError?.(error);
          reject(error);
        }
      });

      xhr.addEventListener("error", () => {
        const error = new Error("Network error");
        options?.onError?.(error);
        reject(error);
      });

      xhr.open("POST", "/api/upload");
      xhr.send(formData);
    });
  }

 
  async uploadMultipleFiles(
    files: File[],
    onFileProgress?: (index: number, progress: number) => void
  ): Promise<UploadResult[]> {
    const results: UploadResult[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const result = await this.uploadFile(files[i], {
        onProgress: (progress) => onFileProgress?.(i, progress),
      });
      results.push(result);
    }
    
    return results;
  }

 
  async uploadAsWebP(file: File, quality: number = 0.8): Promise<UploadResult> {
    const webpFile = await this.convertToWebP(file, quality);
    return this.uploadFile(webpFile);
  }

 
  private async convertToWebP(file: File, quality: number): Promise<File> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const webpFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".webp"), {
                  type: "image/webp",
                });
                resolve(webpFile);
              } else {
                reject(new Error("Conversion failed"));
              }
            },
            "image/webp",
            quality
          );
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  }
}

export const uploadService = UploadService.getInstance();