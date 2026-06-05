"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Camera, 
  Image as ImageIcon, 
  Smile, 
  Send, 
  X,
  Type,
 
  Link2,
 
  Brush,
  Contrast,
  Sun,
  Droplet,
  Thermometer,
  RotateCw,
  FlipHorizontal,
 
} from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { convertToWebP, applyFilter, addTextToImage } from "../utils/image.utils";

interface CreateStoryProps {
  onSuccess?: () => void;
}

interface TextLayer {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontFamily: string;
  rotation: number;
}

interface LinkItem {
  url: string;
  title: string;
  displayType: "button" | "text" | "swipe";
}

const fonts = ["Arial", "Vazir", "Tahoma", "B Nazanin", "Yekan"];
const colors = ["#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#FF69B4"];
const stickers = ["❤️", "🎉", "🔥", "✨", "⭐", "🎨", "📸", "🎵", "🏆", "💯"];

export default function CreateStory({ onSuccess }: CreateStoryProps) {
  const [storyImage, setStoryImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [textLayers, setTextLayers] = useState<TextLayer[]>([]);
  const [backgroundColor, setBackgroundColor] = useState("#6366f1");
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "text" | "stickers" | "music" | "links">("edit");
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [filter, setFilter] = useState("normal");
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [link, setLink] = useState<LinkItem | null>(null);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [musicTrack, setMusicTrack] = useState<string | null>(null);
  const [duration, setDuration] = useState(7);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // دوربین
  const [showCamera, setShowCamera] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      toast.error("دسترسی به دوربین امکان پذیر نیست");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/webp");
      setStoryImage(imageData);
      setOriginalImage(imageData);
      setShowCamera(false);
      stopCamera();
      toast.success("عکس گرفته شد");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const webpFile = await convertToWebP(file, 0.9);
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      setStoryImage(imageUrl);
      setOriginalImage(imageUrl);
      toast.success("تصویر استوری انتخاب شد و به WebP تبدیل شد");
    };
    reader.readAsDataURL(webpFile);
  };

  const handleTakePhoto = () => {
    setShowCamera(true);
    startCamera();
  };

  const applyImageEffects = async () => {
    if (!originalImage) return;
    
    const result = await applyFilter(originalImage, filter as any, {
      brightness: brightness / 100,
      contrast: contrast / 100,
      saturation: saturation / 100,
      temperature: temperature / 100,
    });
    setStoryImage(result);
  };

  useEffect(() => {
    if (originalImage) {
      applyImageEffects();
    }
  }, [brightness, contrast, saturation, temperature, filter]);

  const addTextLayer = () => {
    if (!text.trim()) return;
    
    const newLayer: TextLayer = {
      id: Date.now().toString(),
      text,
      x: 50,
      y: 50,
      fontSize: 32,
      color: "#FFFFFF",
      fontFamily: "Vazir",
      rotation: 0,
    };
    setTextLayers([...textLayers, newLayer]);
    setText("");
    toast.success("متن به استوری اضافه شد");
  };

  const removeTextLayer = (id: string) => {
    setTextLayers(textLayers.filter(layer => layer.id !== id));
  };

  const addSticker = (sticker: string) => {
    toast.success(`استیکر ${sticker} اضافه شد`);
    // در حالت واقعی، استیکر را روی استوری قرار می‌دهیم
  };

  const handleSubmit = async () => {
    if (!storyImage && !text && textLayers.length === 0) {
      toast.error("لطفاً حداقل یک تصویر یا متن برای استوری انتخاب کنید!");
      return;
    }

    setIsUploading(true);
    
    setTimeout(() => {
      setIsUploading(false);
      toast.success("استوری با موفقیت منتشر شد! 🎉");
      setStoryImage(null);
      setOriginalImage(null);
      setText("");
      setTextLayers([]);
      setLink(null);
      setMusicTrack(null);
      onSuccess?.();
    }, 1500);
  };

  const handleRemoveImage = () => {
    setStoryImage(null);
    setOriginalImage(null);
    toast.success("تصویر حذف شد");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
 
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white">
          ساخت استوری جدید
        </h2>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-1">
          بعد از 24 ساعت حذف می‌شود • {duration} ثانیه
        </p>
      </div>

   
      <div className="p-4">
     
        <div className="mb-4">
          <div 
            className="relative aspect-9/16 rounded-xl overflow-hidden mx-auto max-w-sm"
            style={{ backgroundColor: !storyImage ? backgroundColor : undefined }}
          >
            {storyImage ? (
              <>
                <Image
                  src={storyImage}
                  alt="Story preview"
                  fill
                  className="object-cover"
                  style={{ filter: getFilterStyle(filter) }}
                />
       
                {textLayers.map((layer) => (
                  <div
                    key={layer.id}
                    className="absolute cursor-move"
                    style={{
                      left: `${layer.x}%`,
                      top: `${layer.y}%`,
                      fontSize: `${layer.fontSize}px`,
                      color: layer.color,
                      fontFamily: layer.fontFamily,
                      transform: `rotate(${layer.rotation}deg)`,
                    }}
                  >
                    {layer.text}
                    <button
                      onClick={() => removeTextLayer(layer.id)}
                      className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full text-white text-[8px] flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
        
                <div className="absolute bottom-2 left-2 right-2">
                  <input
                    type="range"
                    min={3}
                    max={15}
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-4">
                {showCamera ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover rounded-xl"
                    />
                    <canvas ref={canvasRef} className="hidden" />
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                      <button
                        onClick={capturePhoto}
                        className="px-6 py-2 bg-blue-500 text-white rounded-full"
                      >
                        عکس بگیر
                      </button>
                      <button
                        onClick={() => {
                          setShowCamera(false);
                          stopCamera();
                        }}
                        className="px-6 py-2 bg-red-500 text-white rounded-full"
                      >
                        بستن
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Camera size={48} className="text-white/50 mb-2" />
                    <p className="text-white/80 text-sm text-center">
                      پیش‌نمایش استوری
                    </p>
                    {text && (
                      <p className="text-white text-center mt-4 font-semibold">
                        {text}
                      </p>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>

 
        {!showCamera && (
          <>
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveTab("edit")}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  activeTab === "edit"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Brush size={16} className="inline ml-1" />
                ادیت
              </button>
              <button
                onClick={() => setActiveTab("text")}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  activeTab === "text"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Type size={16} className="inline ml-1" />
                متن
              </button>
              <button
                onClick={() => setActiveTab("stickers")}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  activeTab === "stickers"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Smile size={16} className="inline ml-1" />
                استیکر
              </button>
            
              <button
                onClick={() => setActiveTab("links")}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  activeTab === "links"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Link2 size={16} className="inline ml-1" />
                لینک
              </button>
            </div>

   
            {activeTab === "edit" && storyImage && (
              <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400">فیلترها</label>
                  <div className="flex gap-2 mt-2 overflow-x-auto">
                    {["normal", "clarendon", "gingham", "moon", "lark", "reyes"].map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap ${
                          filter === f
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Sun size={14} /> روشنایی
                  </label>
                  <input
                    type="range"
                    min={-100}
                    max={100}
                    value={brightness}
                    onChange={(e) => setBrightness(parseInt(e.target.value))}
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
                    value={contrast}
                    onChange={(e) => setContrast(parseInt(e.target.value))}
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
                    value={saturation}
                    onChange={(e) => setSaturation(parseInt(e.target.value))}
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
                    value={temperature}
                    onChange={(e) => setTemperature(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400">زوم</label>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-2 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm">
                    <RotateCw size={16} /> چرخش
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm">
                    <FlipHorizontal size={16} /> آینه
                  </button>
                </div>
              </div>
            )}

      
            {activeTab === "text" && (
              <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="متن خود را وارد کنید..."
                  className="w-full p-3 bg-white dark:bg-gray-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
                
                <div className="flex gap-2 flex-wrap">
                  {fonts.map((font) => (
                    <button
                      key={font}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg text-xs"
                      style={{ fontFamily: font }}
                    >
                      {font}
                    </button>
                  ))}
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  {colors.map((c) => (
                    <button
                      key={c}
                      className="w-8 h-8 rounded-full transition-transform hover:scale-110"
                      style={{ backgroundColor: c }}
                      onClick={() => {/* تغییر رنگ */}}
                    />
                  ))}
                </div>
                
                <button
                  onClick={addTextLayer}
                  disabled={!text.trim()}
                  className="w-full py-2 bg-blue-500 text-white rounded-lg text-sm font-medium disabled:opacity-50"
                >
                  افزودن متن به استوری
                </button>
              </div>
            )}

     
            {activeTab === "stickers" && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="grid grid-cols-5 gap-3">
                  {stickers.map((sticker) => (
                    <button
                      key={sticker}
                      onClick={() => addSticker(sticker)}
                      className="text-3xl p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      {sticker}
                    </button>
                  ))}
                </div>
              </div>
            )}

        
            {activeTab === "music" && (
              <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium">آهنگ محبوب</p>
                    <p className="text-xs text-gray-500">خواننده نامشخص</p>
                  </div>
                  <button
                    onClick={() => setMusicTrack("track1")}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm"
                  >
                    افزودن
                  </button>
                </div>
                
                <div>
                  <label className="text-sm">بازه زمانی استوری</label>
                  <div className="flex gap-2 mt-1">
                    {[3, 5, 7, 10, 15].map((sec) => (
                      <button
                        key={sec}
                        onClick={() => setDuration(sec)}
                        className={`px-3 py-1 rounded-lg text-sm ${
                          duration === sec
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      >
                        {sec}s
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

       
            {activeTab === "links" && (
              <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                {link ? (
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium">{link.title}</p>
                      <p className="text-xs text-gray-500 truncate max-w-50">{link.url}</p>
                    </div>
                    <button
                      onClick={() => setLink(null)}
                      className="text-red-500"
                    >
                      حذف
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="url"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full p-3 bg-white dark:bg-gray-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={linkTitle}
                      onChange={(e) => setLinkTitle(e.target.value)}
                      placeholder="عنوان لینک (اختیاری)"
                      className="w-full p-3 bg-white dark:bg-gray-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select className="w-full p-3 bg-white dark:bg-gray-700 rounded-lg text-sm">
                      <option>نوع نمایش: دکمه</option>
                      <option>نوع نمایش: متن</option>
                      <option>نوع نمایش: کشویی</option>
                    </select>
                    <button
                      onClick={() => {
                        if (linkUrl) {
                          setLink({
                            url: linkUrl,
                            title: linkTitle || "لینک",
                            displayType: "button",
                          });
                          setLinkUrl("");
                          setLinkTitle("");
                          toast.success("لینک به استوری اضافه شد");
                        }
                      }}
                      className="w-full py-2 bg-blue-500 text-white rounded-lg text-sm font-medium"
                    >
                      افزودن لینک
                    </button>
                  </>
                )}
              </div>
            )}
          </>
        )}

   
        {!showCamera && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-2 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-colors"
            >
              <ImageIcon size={18} />
              <span>آپلود تصویر</span>
            </button>
            
            <button
              onClick={handleTakePhoto}
              className="flex items-center justify-center gap-2 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-colors"
            >
              <Camera size={18} />
              <span>گرفتن عکس</span>
            </button>
          </div>
        )}

        {/* دکمه انتشار */}
        {!showCamera && (
          <button
            onClick={handleSubmit}
            disabled={isUploading || (!storyImage && !text && textLayers.length === 0)}
            className="w-full mt-4 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>در حال انتشار...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>انتشار استوری</span>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
}

const getFilterStyle = (filter: string): string => {
  const filters: Record<string, string> = {
    clarendon: "contrast(1.2) brightness(1.1)",
    gingham: "sepia(0.2) brightness(1.05)",
    moon: "grayscale(1) contrast(1.1)",
    lark: "saturate(1.2) brightness(1.05)",
    reyes: "sepia(0.3) brightness(1.05) contrast(0.9)",
  };
  return filters[filter] || "none";
};