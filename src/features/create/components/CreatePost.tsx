"use client";

import { useState, useRef } from "react";
import { 
  Image as ImageIcon, 
  Send, 
  ChevronLeft,
  ChevronRight,
  Edit3,
  Sun,
  Contrast,
  Droplet,
  Thermometer
} from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import AspectRatioSelector from "./AspectRatioSelector";
import ImageFilters from "./ImageFilters";
import SettingsPanel from "./SettingsPanel";
import { useImageEditor } from "../hooks/useImageEditor";
import { convertToWebP, addTextToImage } from "../utils/image.utils";
import { PostSettings } from "../types/create.types";

export default function CreatePost() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [postSettings, setPostSettings] = useState<PostSettings>({
    disableComments: false,
    disableLikes: false,
    allowSharing: true,
    ageRestriction: false,
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { 
    editedImage, 
    aspectRatio, 
    filter, 
    settings,
    loadImage, 
    updateAspectRatio, 
    updateFilter,
    updateBrightness,
    updateContrast,
    updateSaturation,
    updateTemperature,
  } = useImageEditor();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    for (const file of files) {
      const webpFile = await convertToWebP(file, 0.8);
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setSelectedImages(prev => [...prev, imageUrl]);
        if (selectedImages.length === 0) {
          loadImage(imageUrl);
        }
      };
      reader.readAsDataURL(webpFile);
    }
    toast.success(`${files.length} تصویر با فرمت WebP آماده شد`);
  };

  const handleSubmit = async () => {
    if (selectedImages.length === 0) {
      toast.error("لطفاً حداقل یک تصویر انتخاب کنید!");
      return;
    }

    setIsUploading(true);
    
    setTimeout(() => {
      setIsUploading(false);
      toast.success("پست با موفقیت منتشر شد! 🎉");
      setSelectedImages([]);
      setCaption("");
      setLocation("");
      setHashtags("");
    }, 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white ">ایجاد پست جدید</h2>
      </div>

      <div className="p-4">
       {selectedImages.length === 0 ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors border-2 border-dashed"
          >
            <ImageIcon size={48} className="text-gray-400 mb-2" />
            <p className="text-gray-500 text-sm">برای آپلود کلیک کنید</p>
            <p className="text-gray-400 text-xs">حداکثر 10 تصویر • تبدیل خودکار به WebP</p>
          </div>
        ) : (
          <>
         
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setShowEditor(!showEditor)}
                className="flex-1 py-2 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg text-sm flex items-center justify-center gap-2"
              >
                <Edit3 size={16} />
                ادیت تصویر
              </button>
            </div>

  
            {showEditor && (
              <div className="mb-4 space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <AspectRatioSelector selected={aspectRatio} onChange={updateAspectRatio} />
                <ImageFilters selected={filter} onChange={updateFilter} />
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <Sun size={14} /> روشنایی
                    </label>
                    <input
                      type="range"
                      min={-100}
                      max={100}
                      value={settings.brightness}
                      onChange={(e) => updateBrightness(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <Contrast size={14} /> کنتراست
                    </label>
                    <input
                      type="range"
                      min={-100}
                      max={100}
                      value={settings.contrast}
                      onChange={(e) => updateContrast(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <Droplet size={14} /> اشباع
                    </label>
                    <input
                      type="range"
                      min={-100}
                      max={100}
                      value={settings.saturation}
                      onChange={(e) => updateSaturation(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <Thermometer size={14} /> دما
                    </label>
                    <input
                      type="range"
                      min={-100}
                      max={100}
                      value={settings.temperature}
                      onChange={(e) => updateTemperature(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            )}

  
            <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden mb-4">
              <Image
                src={editedImage || selectedImages[currentImageIndex]}
                alt="Preview"
                fill
                className="object-cover"
              />
              
              {selectedImages.length > 1 && (
                <>
                  {currentImageIndex > 0 && (
                    <button 
                      onClick={() => setCurrentImageIndex(prev => prev - 1)} 
                      className="absolute left-2 top-1/2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft size={20} className="text-white" />
                    </button>
                  )}
                  {currentImageIndex < selectedImages.length - 1 && (
                    <button 
                      onClick={() => setCurrentImageIndex(prev => prev + 1)} 
                      className="absolute right-2 top-1/2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight size={20} className="text-white" />
                    </button>
                  )}
                </>
              )}
              
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/50 rounded-full text-white text-xs">
                {currentImageIndex + 1} / {selectedImages.length}
              </div>
            </div>
          </>
        )}
        
        <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
        {selectedImages.length > 0 && (
          <div className="space-y-4">
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value.slice(0, 200))}
              placeholder="درباره این پست بنویسید... (حداکثر 200 کاراکتر)"
              rows={3}
              className="w-full p-3 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="text-right text-xs text-gray-400">{caption.length}/200</div>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="موقعیت مکانی (اختیاری)"
              className="w-full p-3 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="هشتگ‌ها (مثال: #عکاسی #سفر)"
              className="w-full p-3 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />

            <SettingsPanel settings={postSettings} onChange={setPostSettings} />

            <button
              onClick={handleSubmit}
              disabled={isUploading}
              className="w-full py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-50 hover:opacity-90 transition-opacity"
            >
              {isUploading ? "در حال انتشار..." : "انتشار پست"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}