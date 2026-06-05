"use client";

import { useState } from "react";
import { AspectRatio, FilterType, ImageEditSettings } from "../types/create.types";
import { cropToAspectRatio, applyFilter } from "../utils/image.utils";

export const useImageEditor = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("1:1");
  const [filter, setFilter] = useState<FilterType>("normal");
  const [zoom, setZoom] = useState(1);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [vignette, setVignette] = useState(0);

  const loadImage = (imageUrl: string) => {
    setOriginalImage(imageUrl);
    setEditedImage(imageUrl);
  };

  const updateEditedImage = (newImage: string) => {
    setEditedImage(newImage);
  };

  const updateAspectRatio = async (ratio: AspectRatio) => {
    if (!editedImage) return;
    setAspectRatio(ratio);
    const cropped = await cropToAspectRatio(editedImage, ratio, zoom);
    setEditedImage(cropped);
  };

  const updateFilter = async (newFilter: FilterType) => {
    if (!originalImage) return;
    setFilter(newFilter);
    const filtered = await applyFilter(originalImage, newFilter, {
      brightness: brightness / 100,
      contrast: contrast / 100,
      saturation: saturation / 100,
      temperature: temperature / 100,
    });
    setEditedImage(filtered);
  };

  const updateBrightness = async (value: number) => {
    setBrightness(value);
    if (originalImage) {
      const filtered = await applyFilter(originalImage, filter, {
        brightness: value / 100,
        contrast: contrast / 100,
        saturation: saturation / 100,
        temperature: temperature / 100,
      });
      setEditedImage(filtered);
    }
  };

  const updateContrast = async (value: number) => {
    setContrast(value);
    if (originalImage) {
      const filtered = await applyFilter(originalImage, filter, {
        brightness: brightness / 100,
        contrast: value / 100,
        saturation: saturation / 100,
        temperature: temperature / 100,
      });
      setEditedImage(filtered);
    }
  };

  const updateSaturation = async (value: number) => {
    setSaturation(value);
    if (originalImage) {
      const filtered = await applyFilter(originalImage, filter, {
        brightness: brightness / 100,
        contrast: contrast / 100,
        saturation: value / 100,
        temperature: temperature / 100,
      });
      setEditedImage(filtered);
    }
  };

  const updateTemperature = async (value: number) => {
    setTemperature(value);
    if (originalImage) {
      const filtered = await applyFilter(originalImage, filter, {
        brightness: brightness / 100,
        contrast: contrast / 100,
        saturation: saturation / 100,
        temperature: value / 100,
      });
      setEditedImage(filtered);
    }
  };

  const updateZoom = (newZoom: number) => {
    setZoom(newZoom);
  };

  const resetEdits = () => {
    setBrightness(0);
    setContrast(0);
    setSaturation(0);
    setTemperature(0);
    setVignette(0);
    setFilter("normal");
    if (originalImage) {
      setEditedImage(originalImage);
    }
  };

  const settings = {
    brightness,
    contrast,
    saturation,
    temperature,
    vignette,
  };

  return {
    originalImage,
    editedImage,
    aspectRatio,
    filter,
    zoom,
    settings,
    loadImage,
    updateEditedImage,
    updateAspectRatio,
    updateFilter,
    updateBrightness,
    updateContrast,
    updateSaturation,
    updateTemperature,
    updateZoom,
    resetEdits,
  };
};