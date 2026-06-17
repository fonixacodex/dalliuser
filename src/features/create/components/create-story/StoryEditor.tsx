"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { StoryCanvas } from "./components/StoryCanvas";
import { Toolbar } from "./components/Toolbar";
import { useStoryStore } from "./store/storyStore";
import { exportStage } from "./utils";
import { ArrowLeftIcon, DownloadIcon, RotateCcwIcon } from "lucide-react";
import { useGesture } from "@use-gesture/react";
import type Konva from "konva";
import toast from "react-hot-toast";

export const StoryEditor: React.FC = () => {
  const stageRef = useRef<Konva.Stage | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const { selectedLayerId, updateLayer, resetLayerTransform, layers } =
    useStoryStore();

  const selectedLayer = layers.find((l) => l.id === selectedLayerId);

  // Track initial transform state for gestures
  const initialTransformRef = useRef<{
    scale: number;
    rotation: number;
    x: number;
    y: number;
  } | null>(null);

  const handleStageReady = useCallback((stage: Konva.Stage) => {
    stageRef.current = stage;
  }, []);

  // Mobile gesture handling with @use-gesture/react
  useGesture(
    {
      onPinchStart: () => {
        if (selectedLayerId && selectedLayer) {
          initialTransformRef.current = {
            scale: selectedLayer.scaleX,
            rotation: selectedLayer.rotation,
            x: selectedLayer.x,
            y: selectedLayer.y,
          };
        }
      },
      onPinch: ({ offset: [scale, angle] }) => {
        if (!selectedLayerId || !initialTransformRef.current) return;

        const newScale = initialTransformRef.current.scale * scale;
        const newRotation = initialTransformRef.current.rotation + angle;

        updateLayer(selectedLayerId, {
          scaleX: newScale,
          scaleY: newScale,
          rotation: newRotation,
        });
      },
      onPinchEnd: () => {
        initialTransformRef.current = null;
      },
    },
    {
      target: containerRef,
      eventOptions: { passive: false },
      pinch: {
        scaleBounds: { min: 0.1, max: 5 },
        rubberband: true,
      },
    },
  );

  // Double-tap to reset transform
  useEffect(() => {
    let lastTap = 0;
    const handleDoubleTap = () => {
      const now = Date.now();
      const timeSinceLast = now - lastTap;

      if (timeSinceLast < 300 && timeSinceLast > 0) {
        if (selectedLayerId) {
          resetLayerTransform(selectedLayerId);
          toast.success("Transform reset");
        }
      }

      lastTap = now;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("touchend", handleDoubleTap);
      return () => container.removeEventListener("touchend", handleDoubleTap);
    }
  }, [selectedLayerId, resetLayerTransform]);

  const handleExport = async () => {
    if (!stageRef.current) {
      toast.error("Canvas not ready");
      return;
    }

    setIsExporting(true);

    try {
      // Clear selection before export
      const stage = stageRef.current;
      const transformer = stage.findOne("Transformer") as
        | Konva.Transformer
        | undefined;
      if (transformer) {
        transformer.nodes([]);
        stage.batchDraw();
      }

      // Small delay to ensure transformer is hidden
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Export at high resolution (1080x1920)
      const dataURL = stage.toDataURL({
        pixelRatio: 3, // 360 * 3 = 1080, 640 * 3 = 1920
        mimeType: "image/png",
        quality: 1,
      });

      // Send to API
      const response = await fetch("/api/story-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: dataURL }),
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      toast.success("Story saved successfully!");
      console.log("Upload result:", result);

      // Also trigger download
      const link = document.createElement("a");
      link.download = `story-${Date.now()}.png`;
      link.href = dataURL;
      link.click();
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to save story");
    } finally {
      setIsExporting(false);
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700/50 p-4 flex items-center justify-between shadow-lg">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Story Editor</h1>

        <button
          onClick={handleExport}
          disabled={isExporting || layers.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-all text-sm font-medium shadow-lg disabled:shadow-none"
        >
          {isExporting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <DownloadIcon className="w-4 h-4" />
              <span>Save</span>
            </>
          )}
        </button>
      </div>

      {/* Canvas area */}
      <div
        className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        ref={containerRef}
      >
        <StoryCanvas onStageReady={handleStageReady} />
      </div>

      {/* Instructions */}
      <div className="px-4 py-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700/50">
        <p className="text-xs text-gray-300 text-center font-medium">
          {selectedLayerId
            ? "💡 Pinch to resize/rotate • Double-tap text to edit • Drag to move"
            : "✨ Add images and text from the toolbar below"}
        </p>
      </div>

      {/* Bottom toolbar */}
      <Toolbar />
    </>
  );
};
