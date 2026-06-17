'use client';

import React, { useRef } from 'react';
import { useStoryStore } from '../store/storyStore';
import { createImageLayer, createTextLayer } from '../utils';
import { 
  ImageIcon, 
  TypeIcon, 
  ArrowUpIcon, 
  ArrowDownIcon, 
  Trash2Icon,
  PaletteIcon,
} from 'lucide-react';

// Instagram-style color palette
const INSTAGRAM_COLORS = [
  { name: 'White', value: '#ffffff', hex: '#ffffff' },
  { name: 'Light Gray', value: '#f5f5f5', hex: '#f5f5f5' },
  { name: 'Gray', value: '#8e8e93', hex: '#8e8e93' },
  { name: 'Black', value: '#000000', hex: '#000000' },
  { name: 'Red', value: '#ff3b30', hex: '#ff3b30' },
  { name: 'Orange', value: '#ff9500', hex: '#ff9500' },
  { name: 'Yellow', value: '#ffcc00', hex: '#ffcc00' },
  { name: 'Green', value: '#34c759', hex: '#34c759' },
  { name: 'Mint', value: '#00c7be', hex: '#00c7be' },
  { name: 'Teal', value: '#30b0c7', hex: '#30b0c7' },
  { name: 'Cyan', value: '#32ade6', hex: '#32ade6' },
  { name: 'Blue', value: '#007aff', hex: '#007aff' },
  { name: 'Indigo', value: '#5856d6', hex: '#5856d6' },
  { name: 'Purple', value: '#af52de', hex: '#af52de' },
  { name: 'Pink', value: '#ff2d55', hex: '#ff2d55' },
  { name: 'Brown', value: '#a2845e', hex: '#a2845e' },
];

export const Toolbar: React.FC = () => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const canvasColorPickerRef = useRef<HTMLInputElement>(null);
  const textColorPickerRef = useRef<HTMLInputElement>(null);
  
  const {
    addLayer,
    deleteLayer,
    bringForward,
    sendBackward,
    selectedLayerId,
    layers,
    updateLayer,
    stageSize,
    canvasBackgroundColor,
    setCanvasBackgroundColor,
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

  const handleTextColorChange = (color: string) => {
    if (selectedLayerId && selectedLayer?.type === 'text') {
      updateLayer(selectedLayerId, { fill: color });
    }
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedLayerId && selectedLayer?.type === 'text') {
      updateLayer(selectedLayerId, { fontSize: parseInt(e.target.value, 10) });
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-gray-800 to-gray-900 border-t border-gray-700/50">
      {/* Main toolbar */}
      <div className="flex items-center justify-center p-4 gap-4">
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
          className="flex flex-col items-center gap-2 cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all">
            <ImageIcon className="w-7 h-7 text-white" />
          </div>
          <span className="text-xs text-gray-300 font-medium">Image</span>
        </label>

        <button
          onClick={handleAddText}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all">
            <TypeIcon className="w-7 h-7 text-white" />
          </div>
          <span className="text-xs text-gray-300 font-medium">Text</span>
        </button>
      </div>

      {/* Canvas Background Color - Always visible */}
      <div className="border-t border-gray-700/50 p-4 bg-gray-800/50">
        <div className="bg-gray-700/50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <PaletteIcon className="w-4 h-4 text-gray-300" />
            <label className="text-xs text-gray-300 font-medium">
              Canvas Background
            </label>
          </div>
          <div className="grid grid-cols-8 gap-2">
            {INSTAGRAM_COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => setCanvasBackgroundColor(color.value)}
                className={`h-10 rounded-lg border-2 transition-all ${
                  canvasBackgroundColor === color.value
                    ? 'border-blue-400 scale-110 shadow-lg'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {color.value === '#ffffff' && (
                  <div className="w-full h-full border border-gray-400 rounded-md"></div>
                )}
              </button>
            ))}
          </div>
          
          {/* Color Picker */}
          <div className="mt-3 flex items-center gap-2">
            <input
              ref={canvasColorPickerRef}
              type="color"
              value={canvasBackgroundColor}
              onChange={(e) => setCanvasBackgroundColor(e.target.value)}
              className="w-12 h-10 rounded-lg cursor-pointer border-2 border-gray-600"
            />
            <span className="text-xs text-gray-400 font-mono">{canvasBackgroundColor}</span>
          </div>
        </div>
      </div>

      {/* Layer controls - shown when a layer is selected */}
      {selectedLayerId && (
        <div className="border-t border-gray-700/50 p-4 space-y-4 bg-gray-800/50">
          {/* Common controls for all layers */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSendBackward}
              className="flex-1 px-3 py-2.5 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
            >
              <ArrowDownIcon className="w-4 h-4 text-white" />
              <span className="text-xs text-white font-medium">Send Back</span>
            </button>

            <button
              onClick={handleBringForward}
              className="flex-1 px-3 py-2.5 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
            >
              <ArrowUpIcon className="w-4 h-4 text-white" />
              <span className="text-xs text-white font-medium">Bring Front</span>
            </button>

            <button
              onClick={handleDelete}
              className="px-3 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg flex items-center justify-center transition-all shadow-md hover:shadow-lg"
            >
              <Trash2Icon className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Text-specific controls */}
          {selectedLayer?.type === 'text' && (
            <div className="space-y-4">
              {/* Font Size */}
              <div className="bg-gray-700/50 p-3 rounded-lg">
                <label className="text-xs text-gray-300 font-medium block mb-2">
                  Font Size
                </label>
                <input
                  type="range"
                  min="16"
                  max="120"
                  step="2"
                  value={selectedLayer.fontSize}
                  onChange={handleFontSizeChange}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Small</span>
                  <span className="font-semibold text-blue-400">{selectedLayer.fontSize}px</span>
                  <span>Large</span>
                </div>
              </div>

              {/* Text Color */}
              <div className="bg-gray-700/50 p-3 rounded-lg">
                <label className="text-xs text-gray-300 font-medium block mb-2">
                  Text Color
                </label>
                <div className="grid grid-cols-8 gap-2">
                  {INSTAGRAM_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => handleTextColorChange(color.value)}
                      className={`h-10 rounded-lg border-2 transition-all ${
                        selectedLayer.fill === color.value
                          ? 'border-blue-400 scale-110 shadow-lg'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {color.value === '#ffffff' && (
                        <div className="w-full h-full border border-gray-400 rounded-md"></div>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Color Picker */}
                <div className="mt-3 flex items-center gap-2">
                  <input
                    ref={textColorPickerRef}
                    type="color"
                    value={selectedLayer.fill}
                    onChange={(e) => handleTextColorChange(e.target.value)}
                    className="w-12 h-10 rounded-lg cursor-pointer border-2 border-gray-600"
                  />
                  <span className="text-xs text-gray-400 font-mono">{selectedLayer.fill}</span>
                </div>
              </div>

              <div className="text-xs text-gray-400 text-center py-2 bg-gray-700/30 rounded-lg">
                💡 Double-click text on canvas to edit • Drag corners to resize
              </div>
            </div>
          )}

          {/* Image-specific hint */}
          {selectedLayer?.type === 'image' && (
            <div className="text-xs text-gray-400 text-center py-2 bg-gray-700/30 rounded-lg">
              💡 Drag corners to resize • Drag to move • Pinch to rotate
            </div>
          )}
        </div>
      )}
    </div>
  );
};
