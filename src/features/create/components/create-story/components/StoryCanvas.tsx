'use client';

import React, { useRef, useEffect } from 'react';
import { Stage, Layer, Image, Text, Transformer } from 'react-konva';
import { useStoryStore } from '../store/storyStore';
import type Konva from 'konva';

interface StoryCanvasProps {
  onStageReady?: (stage: Konva.Stage) => void;
}

export const StoryCanvas: React.FC<StoryCanvasProps> = ({ onStageReady }) => {
  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const { layers, selectedLayerId, selectLayer, updateLayer, stageSize } = useStoryStore();

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

  const handleLayerClick = (id: string) => {
    selectLayer(id);
  };

  const handleTransformEnd = (id: string, node: Konva.Node) => {
    updateLayer(id, {
      x: node.x(),
      y: node.y(),
      scaleX: node.scaleX(),
      scaleY: node.scaleY(),
      rotation: node.rotation(),
    });
  };

  const handleDragEnd = (id: string, e: Konva.KonvaEventObject<DragEvent>) => {
    updateLayer(id, {
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    // Deselect when clicking on empty area
    if (e.target === e.target.getStage()) {
      selectLayer(null);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-900 rounded-lg overflow-hidden shadow-xl">
      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        onClick={handleStageClick}
        onTap={handleStageClick}
        className="bg-white"
      >
        <Layer>
          {layers.map((layer) => {
            if (layer.type === 'image' || layer.type === 'sticker') {
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
                  onTransformEnd={(e) => handleTransformEnd(layer.id, e.target)}
                />
              );
            }
            
            if (layer.type === 'text') {
              return (
                <Text
                  key={layer.id}
                  id={layer.id}
                  text={layer.text}
                  x={layer.x}
                  y={layer.y}
                  fontSize={layer.fontSize}
                  fontFamily={layer.fontFamily}
                  fill={layer.fill}
                  width={layer.width}
                  scaleX={layer.scaleX}
                  scaleY={layer.scaleY}
                  rotation={layer.rotation}
                  draggable
                  align="center"
                  verticalAlign="middle"
                  offsetX={layer.width / 2}
                  offsetY={layer.fontSize / 2}
                  onClick={() => handleLayerClick(layer.id)}
                  onTap={() => handleLayerClick(layer.id)}
                  onDragEnd={(e) => handleDragEnd(layer.id, e)}
                  onTransformEnd={(e) => handleTransformEnd(layer.id, e.target)}
                />
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
              'top-left',
              'top-right',
              'bottom-left',
              'bottom-right',
            ]}
          />
        </Layer>
      </Stage>
    </div>
  );
};
