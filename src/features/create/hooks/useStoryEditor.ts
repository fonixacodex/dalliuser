"use client";

import { useState, useCallback } from "react";
import { imageEditorService } from "../services/imageEditor.service";

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

interface StorySettings {
  duration: number;
  allowComments: boolean;
  allowSharing: boolean;
  saveToGallery: boolean;
}

export const useStoryEditor = () => {
  const [image, setImage] = useState<string | null>(null);
  const [textLayers, setTextLayers] = useState<TextLayer[]>([]);
  const [settings, setSettings] = useState<StorySettings>({
    duration: 7,
    allowComments: true,
    allowSharing: true,
    saveToGallery: false,
  });
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("normal");

  const loadImage = (imageUrl: string) => {
    setImage(imageUrl);
  };

  const addTextLayer = (layer: Omit<TextLayer, "id">) => {
    const newLayer = { ...layer, id: Date.now().toString() };
    setTextLayers([...textLayers, newLayer]);
  };

  const updateTextLayer = (id: string, updates: Partial<TextLayer>) => {
    setTextLayers((prev) =>
      prev.map((layer) => (layer.id === id ? { ...layer, ...updates } : layer))
    );
  };

  const removeTextLayer = (id: string) => {
    setTextLayers((prev) => prev.filter((layer) => layer.id !== id));
  };

  const applyEdits = useCallback(async () => {
    if (!image) return null;

    let result = image;

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
    if (selectedFilter !== "normal") {
      result = await imageEditorService.applyFilter(result, selectedFilter);
    }

    return result;
  }, [image, brightness, contrast, saturation, temperature, selectedFilter]);

  const resetEdits = () => {
    setBrightness(0);
    setContrast(0);
    setSaturation(0);
    setTemperature(0);
    setSelectedFilter("normal");
  };

  const updateSettings = (newSettings: Partial<StorySettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return {
    image,
    textLayers,
    settings,
    brightness,
    contrast,
    saturation,
    temperature,
    selectedFilter,
    loadImage,
    addTextLayer,
    updateTextLayer,
    removeTextLayer,
    applyEdits,
    resetEdits,
    updateSettings,
    setBrightness,
    setContrast,
    setSaturation,
    setTemperature,
    setSelectedFilter,
  };
};