'use client';

import React, { useRef } from 'react';
import { useStoryStore } from '../store/storyStore';
import { createImageLayer, createTextLayer, createStickerLayer } from '../utils';
import { 
  ImageIcon, 
  TypeIcon, 
  StickerIcon, 
  ArrowUpIcon, 
  ArrowDownIcon, 
  Trash2Icon,
  PaletteIcon,
} from 'lucide-react';

export const Toolbar: React.FC = () => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const stickerInputRef = useRef<HTMLInputElement>(null);
  const {
    addLayer,
    deleteLayer,
    bringForward,
    sendBackward,
    selectedLayerId,
    layers,
    updateLayer,
    stageSize,
  } = useStoryStore();

  const selectedLayer = layers.find((l) => l.id === selectedLayerId);

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const imageLayer = await createImageLayer(file, stageSize.width, stageSize.height);
      addLayer(imageLayer);
    } catch (error) {
      console.error('Failed to load image:', error);
    }
    
    // Reset input
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const handleAddText = () => {
    const textLayer = createTextLayer(stageSize.width, stageSize.height);
    addLayer(textLayer);
  };

  const handleAddSticker = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const stickerLayer = await createStickerLayer(file, stageSize.width, stageSize.height);
      addLayer(stickerLayer);
    } catch (error) {
      console.error('Failed to load sticker:', error);
    }
    
    // Reset input
    if (stickerInputRef.current) {
      stickerInputRef.current.value = '';
    }
  };

  const handleDelete = () => {
    if (selectedLayerId) {
      deleteLayer(selectedLayerId);
    }
  };

  const handleBringForward = () => {
    if (selectedLayerId) {
      bringForward(selectedLayerId);
    }
  };

  const handleSendBackward = () => {
    if (selectedLayerId) {
      sendBackward(selectedLayerId);
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedLayerId && selectedLayer?.type === 'text') {
      updateLayer(selectedLayerId, { fill: e.target.value });
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedLayerId && selectedLayer?.type === 'text') {
      updateLayer(selectedLayerId, { text: e.target.value });
    }
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedLayerId && selectedLayer?.type === 'text') {
      updateLayer(selectedLayerId, { fontSize: parseInt(e.target.value, 10) });
    }
  };

  return (
    <div className="w-full bg-gray-800 border-t border-gray-700">
      {/* Main toolbar */}
      <div className="flex items-center justify-around p-4 gap-2">
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={handleAddImage}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs text-gray-300">Image</span>
        </label>

        <button
          onClick={handleAddText}
          className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity"
        >
          <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
            <TypeIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs text-gray-300">Text</span>
        </button>

        <input
          ref={stickerInputRef}
          type="file"
          accept="image/png,image/gif"
          onChange={handleAddSticker}
          className="hidden"
          id="sticker-upload"
        />
        <label
          htmlFor="sticker-upload"
          className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
            <StickerIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs text-gray-300">Sticker</span>
        </label>
      </div>

      {/* Layer controls - shown when a layer is selected */}
      {selectedLayerId && (
        <div className="border-t border-gray-700 p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handleSendBackward}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowDownIcon className="w-4 h-4 text-white" />
              <span className="text-sm text-white">Send Back</span>
            </button>

            <button
              onClick={handleBringForward}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowUpIcon className="w-4 h-4 text-white" />
              <span className="text-sm text-white">Bring Front</span>
            </button>

            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center transition-colors"
            >
              <Trash2Icon className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Text-specific controls */}
          {selectedLayer?.type === 'text' && (
            <div className="space-y-2">
              <input
                type="text"
                value={selectedLayer.text}
                onChange={handleTextChange}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                placeholder="Enter text..."
              />
              
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="text-xs text-gray-400 block mb-1">Font Size</label>
                  <input
                    type="range"
                    min="12"
                    max="120"
                    value={selectedLayer.fontSize}
                    onChange={handleFontSizeChange}
                    className="w-full"
                  />
                  <span className="text-xs text-gray-300">{selectedLayer.fontSize}px</span>
                </div>
                
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={selectedLayer.fill}
                      onChange={handleColorChange}
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <PaletteIcon className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
