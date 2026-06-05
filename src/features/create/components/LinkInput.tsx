"use client";

import { useState } from "react";
import { Link2, X, Check, Globe, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

interface LinkInputProps {
  onAdd: (link: { url: string; title: string; displayType: "button" | "text" | "swipe" }) => void;
  onRemove?: () => void;
  existingLink?: { url: string; title: string; displayType: string } | null;
}

export default function LinkInput({ onAdd, onRemove, existingLink }: LinkInputProps) {
  const [url, setUrl] = useState(existingLink?.url || "");
  const [title, setTitle] = useState(existingLink?.title || "");
  const [displayType, setDisplayType] = useState<"button" | "text" | "swipe">(
    existingLink?.displayType as any || "button"
  );
  const [isValid, setIsValid] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const validateUrl = async (inputUrl: string) => {
    setIsChecking(true);
    try {
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      const isValidFormat = urlPattern.test(inputUrl);
      
      if (isValidFormat) {
        setIsValid(true);
      } else {
        setIsValid(false);
        toast.error("آدرس نامعتبر است");
      }
    } catch (error) {
      setIsValid(false);
    } finally {
      setIsChecking(false);
    }
  };

  const handleAdd = () => {
    if (!url) {
      toast.error("لطفاً آدرس لینک را وارد کنید");
      return;
    }

    let finalUrl = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      finalUrl = "https://" + url;
    }

    onAdd({
      url: finalUrl,
      title: title || "لینک",
      displayType,
    });
    
    toast.success("لینک با موفقیت اضافه شد");
    setUrl("");
    setTitle("");
  };

  return (
    <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
      <div className="flex items-center gap-2">
        <Link2 size={18} className="text-blue-500" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          افزودن لینک به استوری
        </span>
      </div>

      {existingLink ? (
        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-gray-400" />
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {existingLink.title}
              </p>
            </div>
            <p className="text-xs text-gray-500 truncate">{existingLink.url}</p>
          </div>
          <button
            onClick={onRemove}
            className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <>
          <div className="relative">
            <Globe size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setIsValid(false);
              }}
              onBlur={() => url && validateUrl(url)}
              placeholder="https://example.com"
              className="w-full pr-9 pl-10 py-2.5 bg-white dark:bg-gray-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
            {isChecking && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {isValid && !isChecking && (
              <Check size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
            )}
          </div>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="عنوان لینک (اختیاری)"
            className="w-full p-2.5 bg-white dark:bg-gray-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-2">
            {(["button", "text", "swipe"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setDisplayType(type)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  displayType === type
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
              >
                {type === "button" && "دکمه"}
                {type === "text" && "متن"}
                {type === "swipe" && "کشویی"}
              </button>
            ))}
          </div>

          <button
            onClick={handleAdd}
            disabled={!url}
            className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ExternalLink size={16} />
            افزودن لینک
          </button>
        </>
      )}
    </div>
  );
}