"use client";

import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { uploadService } from "../services/upload.service";

interface UseImageUploadOptions {
  maxFiles?: number;
  maxSize?: number; // bytes
  acceptedTypes?: string[];
  convertToWebP?: boolean;
  webpQuality?: number;
}

export const useImageUpload = (options: UseImageUploadOptions = {}) => {
  const {
    maxFiles = 10,
    maxSize = 10 * 1024 * 1024, // 10MB
    acceptedTypes = ["image/jpeg", "image/png", "image/webp", "image/heic"],
    convertToWebP = true,
    webpQuality = 0.8,
  } = options;

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);

  const validateFile = (file: File): boolean => {
    if (!acceptedTypes.includes(file.type)) {
      toast.error(`فرمت ${file.type} پشتیبانی نمی‌شود`);
      return false;
    }
    if (file.size > maxSize) {
      toast.error(`حجم فایل بیش از حد مجاز است (حداکثر ${maxSize / 1024 / 1024}MB)`);
      return false;
    }
    return true;
  };

  const addFiles = useCallback(
    async (newFiles: FileList | File[]) => {
      const fileArray = Array.from(newFiles);
      
      if (files.length + fileArray.length > maxFiles) {
        toast.error(`حداکثر ${maxFiles} فایل می‌توانید انتخاب کنید`);
        return;
      }

      const validFiles: File[] = [];
      const validPreviews: string[] = [];

      for (const file of fileArray) {
        if (validateFile(file)) {
          validFiles.push(file);
          
       
          const reader = new FileReader();
          const preview = await new Promise<string>((resolve) => {
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.readAsDataURL(file);
          });
          validPreviews.push(preview);
        }
      }

      setFiles((prev) => [...prev, ...validFiles]);
      setPreviews((prev) => [...prev, ...validPreviews]);
      setUploadProgress((prev) => [...prev, ...validFiles.map(() => 0)]);

      toast.success(`${validFiles.length} فایل با موفقیت اضافه شد`);
    },
    [files.length, maxFiles]
  );

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setUploadProgress((prev) => prev.filter((_, i) => i !== index));
    toast.success("فایل حذف شد");
  };

  const uploadFiles = useCallback(async () => {
    if (files.length === 0) {
      toast.error("هیچ فایلی برای آپلود وجود ندارد");
      return [];
    }

    setIsUploading(true);
    const results = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      try {
        let fileToUpload = file;
        
        if (convertToWebP && !file.type.includes("webp")) {
          // تبدیل به WebP در حال آپلود
          const webpBlob = await new Promise<Blob>((resolve) => {
            const reader = new FileReader();
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
                  (blob) => resolve(blob!),
                  "image/webp",
                  webpQuality
                );
              };
            };
            reader.readAsDataURL(file);
          });
          fileToUpload = new File([webpBlob], file.name.replace(/\.[^/.]+$/, ".webp"), {
            type: "image/webp",
          });
        }

        const result = await uploadService.uploadFile(fileToUpload, {
          onProgress: (progress) => {
            setUploadProgress((prev) => {
              const newProgress = [...prev];
              newProgress[i] = progress;
              return newProgress;
            });
          },
        });
        
        results.push(result);
      } catch (error) {
        toast.error(`خطا در آپلود فایل ${file.name}`);
        console.error(error);
      }
    }

    setIsUploading(false);
    toast.success(`${results.length} فایل با موفقیت آپلود شد`);
    return results;
  }, [files, convertToWebP, webpQuality]);

  const clearFiles = () => {
    setFiles([]);
    setPreviews([]);
    setUploadProgress([]);
  };

  return {
    files,
    previews,
    isUploading,
    uploadProgress,
    addFiles,
    removeFile,
    uploadFiles,
    clearFiles,
    fileCount: files.length,
  };
};