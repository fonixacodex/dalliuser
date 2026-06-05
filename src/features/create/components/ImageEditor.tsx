"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  RotateCw,
  X,
  Check,
  Sun,
  Contrast,
  Droplet,
  Thermometer,
} from "lucide-react";
import Image from "next/image";
import { imageEditorService } from "../services/imageEditor.service";

interface ImageEditorProps {
  imageUrl: string;
  onSave: (editedImage: string) => void;
  onClose: () => void;
}

export default function ImageEditor({ imageUrl, onSave, onClose }: ImageEditorProps) {
  const [editedImage, setEditedImage] = useState(imageUrl);
  const [activeTab, setActiveTab] = useState<"adjust" | "rotate">("adjust");
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  
  const applyEdits = useCallback(async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    let result = imageUrl;
    
    try {
      if (brightness !== 0) {
        result = await imageEditorService.adjustBrightness(result, brightness);
      }
      if (contrast !== 0) {
        result = await imageEditorService.adjustContrast(result, contrast);
      }
      if (saturation !== 0) {
        result = await imageEditorService.adjustSaturation(result, saturation);
      }
      if (temperature !== 0) {
        result = await imageEditorService.adjustTemperature(result, temperature);
      }
      
      setEditedImage(result);
    } catch (error) {
      console.error("Error applying edits:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [imageUrl, brightness, contrast, saturation, temperature, isProcessing]);

 
  useEffect(() => {
    const timer = setTimeout(() => {
      applyEdits();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [brightness, contrast, saturation, temperature, applyEdits]);

  const handleRotate = async () => {
    try {
      const rotated = await imageEditorService.rotate(editedImage, 90);
      setEditedImage(rotated);
    } catch (error) {
      console.error("Error rotating image:", error);
    }
  };

  const handleSave = () => {
    onSave(editedImage);
    onClose();
  };

  const handleReset = () => {
    setBrightness(0);
    setContrast(0);
    setSaturation(0);
    setTemperature(0);
    setEditedImage(imageUrl);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
        {/* هدر */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            ویرایش تصویر
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

 
        <div className="flex flex-col md:flex-row">
  
          <div className="w-full md:w-72 p-4 border-l border-gray-200 dark:border-gray-800">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab("adjust")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "adjust"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                تنظیمات
              </button>
              <button
                onClick={() => setActiveTab("rotate")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "rotate"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                چرخش
              </button>
            </div>

            {activeTab === "adjust" && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Sun size={14} /> روشنایی
                  </label>
                  <input
                    type="range"
                    min={-1}
                    max={1}
                    step={0.01}
                    value={brightness}
                    onChange={(e) => setBrightness(parseFloat(e.target.value))}
                    className="w-full mt-1 accent-blue-500"
                  />
                  <div className="text-right text-xs text-gray-400 mt-1">
                    {Math.round(brightness * 100)}%
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Contrast size={14} /> کنتراست
                  </label>
                  <input
                    type="range"
                    min={-1}
                    max={1}
                    step={0.01}
                    value={contrast}
                    onChange={(e) => setContrast(parseFloat(e.target.value))}
                    className="w-full mt-1 accent-blue-500"
                  />
                  <div className="text-right text-xs text-gray-400 mt-1">
                    {Math.round(contrast * 100)}%
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Droplet size={14} /> اشباع
                  </label>
                  <input
                    type="range"
                    min={-1}
                    max={1}
                    step={0.01}
                    value={saturation}
                    onChange={(e) => setSaturation(parseFloat(e.target.value))}
                    className="w-full mt-1 accent-blue-500"
                  />
                  <div className="text-right text-xs text-gray-400 mt-1">
                    {Math.round(saturation * 100)}%
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Thermometer size={14} /> دما
                  </label>
                  <input
                    type="range"
                    min={-1}
                    max={1}
                    step={0.01}
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full mt-1 accent-blue-500"
                  />
                  <div className="text-right text-xs text-gray-400 mt-1">
                    {Math.round(temperature * 100)}%
                  </div>
                </div>
              </div>
            )}

            {activeTab === "rotate" && (
              <div className="space-y-3">
                <button
                  onClick={handleRotate}
                  className="w-full py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <RotateCw size={16} /> چرخش ۹۰ درجه
                </button>
              </div>
            )}

            <div className="flex gap-2 mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={handleReset}
                className="flex-1 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                ریست
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm flex items-center justify-center gap-1 transition-colors"
              >
                <Check size={16} /> اعمال
              </button>
            </div>
          </div>

 
          <div className="flex-1 p-4 flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 min-h-[400px]">
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-500 mt-2">در حال اعمال...</p>
              </div>
            ) : (
              <div className="relative max-h-[60vh] max-w-full">
                <Image
                  src={editedImage}
                  alt="Editing"
                  width={500}
                  height={500}
                  className="object-contain rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}