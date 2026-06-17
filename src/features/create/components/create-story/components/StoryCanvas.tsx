"use client";

import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Image, Text, Transformer, Group } from "react-konva";
import { useStoryStore } from "../store/storyStore";
import type Konva from "konva";
import type { KonvaEventObject } from "konva/lib/Node";

interface StoryCanvasProps {
  onStageReady?: (stage: Konva.Stage) => void;
}

export const StoryCanvas: React.FC<StoryCanvasProps> = ({ onStageReady }) => {
  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [textareaValue, setTextareaValue] = useState("");
  const [textareaPosition, setTextareaPosition] = useState({ x: 0, y: 0 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const {
    layers,
    selectedLayerId,
    selectLayer,
    updateLayer,
    stageSize,
    canvasBackgroundColor,
  } = useStoryStore();

  useEffect(() => {
    if (stageRef.current && onStageReady) {
      onStageReady(stageRef.current);
    }
  }, [onStageReady]);

  useEffect(() => {
    if (!transformerRef.current) return;

    const transformer = transformerRef.current;
    const stage = stageRef.current;

    if (!selectedLayerId || !stage) {
      transformer.nodes([]);
      return;
    }

    const selectedNode = stage.findOne(`#${selectedLayerId}`);
    if (selectedNode) {
      transformer.nodes([selectedNode]);
      transformer.getLayer()?.batchDraw();
    } else {
      transformer.nodes([]);
    }
  }, [selectedLayerId, layers]);

  const handleTextDblClick = (layer: any) => {
    const stage = stageRef.current;
    if (!stage) return;

    setEditingTextId(layer.id);
    setTextareaValue(layer.text);

    // Calculate textarea position
    const textNode = stage.findOne(`#${layer.id}`) as Konva.Node;
    if (textNode) {
      const absolutePosition = textNode.getAbsolutePosition();
      const stageBox = stage.container().getBoundingClientRect();
      
      setTextareaPosition({
        x: stageBox.left + absolutePosition.x - (layer.width * layer.scaleX) / 2,
        y: stageBox.top + absolutePosition.y - (layer.fontSize * layer.scaleY) / 2,
      });
    }

    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.select();
    }, 10);
  };

  const handleTextareaBlur = () => {
    if (editingTextId) {
      updateLayer(editingTextId, { text: textareaValue });
      setEditingTextId(null);
    }
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTextareaBlur();
    }
    if (e.key === 'Escape') {
      setEditingTextId(null);
    }
  };

  const handleLayerClick = (id: string) => {
    selectLayer(id);
  };

  const handleTransformEnd = (id: string, e: KonvaEventObject<Event>) => {
    const node = e.target;
    updateLayer(id, {
      x: node.x(),
      y: node.y(),
      scaleX: node.scaleX(),
      scaleY: node.scaleY(),
      rotation: node.rotation(),
    });
  };

  const handleDragEnd = (id: string, e: KonvaEventObject<DragEvent>) => {
    updateLayer(id, {
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleStageClick = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    // Deselect when clicking on empty area
    if (e.target === e.target.getStage()) {
      selectLayer(null);
    }
  };

  return (
    <>
    <div className="flex items-center justify-center bg-gray-900 rounded-lg overflow-hidden shadow-xl">
      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        onClick={handleStageClick}
        onTap={handleStageClick}
        style={{ backgroundColor: canvasBackgroundColor }}
      >
        <Layer>
          {layers.map((layer) => {
            if (layer.type === "image") {
              return (
                <Image
                  key={layer.id}
                  id={layer.id}
                  image={layer.image || undefined}
                  x={layer.x}
                  y={layer.y}
                  width={layer.width}
                  height={layer.height}
                  scaleX={layer.scaleX}
                  scaleY={layer.scaleY}
                  rotation={layer.rotation}
                  draggable
                  offsetX={layer.width / 2}
                  offsetY={layer.height / 2}
                  onClick={() => handleLayerClick(layer.id)}
                  onTap={() => handleLayerClick(layer.id)}
                  onDragEnd={(e) => handleDragEnd(layer.id, e)}
                  onTransformEnd={(e) => handleTransformEnd(layer.id, e)}
                />
              );
            }

            if (layer.type === "text") {
              const isEditing = editingTextId === layer.id;
              
              return (
                <Group
                  key={layer.id}
                  id={layer.id}
                  x={layer.x}
                  y={layer.y}
                  scaleX={layer.scaleX}
                  scaleY={layer.scaleY}
                  rotation={layer.rotation}
                  draggable
                  offsetX={layer.width / 2}
                  offsetY={layer.fontSize / 2}
                  onClick={() => handleLayerClick(layer.id)}
                  onTap={() => handleLayerClick(layer.id)}
                  onDblClick={() => handleTextDblClick(layer)}
                  onDblTap={() => handleTextDblClick(layer)}
                  onDragEnd={(e) => handleDragEnd(layer.id, e)}
                  onTransformEnd={(e) => handleTransformEnd(layer.id, e)}
                  opacity={isEditing ? 0.5 : 1}
                >
                  <Text
                    text={layer.text}
                    width={layer.width}
                    fontSize={layer.fontSize}
                    fontFamily={layer.fontFamily}
                    fill={layer.fill}
                    align="center"
                    verticalAlign="middle"
                  />
                </Group>
              );
            }

            return null;
          })}

          <Transformer
            ref={transformerRef}
            boundBoxFunc={(oldBox, newBox) => {
              // Limit minimum size
              if (newBox.width < 20 || newBox.height < 20) {
                return oldBox;
              }
              return newBox;
            }}
            enabledAnchors={[
              "top-left",
              "top-right",
              "bottom-left",
              "bottom-right",
            ]}
          />
        </Layer>
      </Stage>
    </div>

      {/* Floating textarea for text editing */}
      {editingTextId && (
        <textarea
          ref={textareaRef}
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
          onBlur={handleTextareaBlur}
          onKeyDown={handleTextareaKeyDown}
          style={{
            position: 'fixed',
            left: `${textareaPosition.x}px`,
            top: `${textareaPosition.y}px`,
            fontSize: '16px',
            padding: '8px',
            border: '2px solid #3b82f6',
            borderRadius: '4px',
            outline: 'none',
            background: 'white',
            color: 'black',
            resize: 'none',
            minWidth: '200px',
            minHeight: '40px',
            zIndex: 1000,
            fontFamily: 'Arial',
          }}
          rows={3}
          placeholder="Enter text..."
        />
      )}
    </>
  );
};
