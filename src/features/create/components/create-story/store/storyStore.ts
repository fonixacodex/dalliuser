import { create } from 'zustand';

export type LayerType = 'image' | 'text';

export interface Transform {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
}

export interface ImageLayer extends Transform {
  id: string;
  type: 'image';
  imageUrl: string;
  image: HTMLImageElement | null;
  width: number;
  height: number;
}

export interface TextLayer extends Transform {
  id: string;
  type: 'text';
  text: string;
  fontSize: number;
  fontFamily: string;
  fill: string;
  width: number;
}

export type Layer = ImageLayer | TextLayer;

interface StoryState {
  layers: Layer[];
  selectedLayerId: string | null;
  stageSize: { width: number; height: number };
  isEditingText: boolean;
  editingLayerId: string | null;
  canvasBackgroundColor: string;
  
  // Actions
  addLayer: (layer: Layer) => void;
  updateLayer: (id: string, updates: Partial<Layer>) => void;
  deleteLayer: (id: string) => void;
  selectLayer: (id: string | null) => void;
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;
  clearSelection: () => void;
  resetLayerTransform: (id: string) => void;
  startEditingText: (id: string) => void;
  stopEditingText: () => void;
  setCanvasBackgroundColor: (color: string) => void;
}

export const useStoryStore = create<StoryState>((set) => ({
  layers: [],
  selectedLayerId: null,
  stageSize: { width: 360, height: 640 }, // 9:16 aspect ratio
  isEditingText: false,
  editingLayerId: null,
  canvasBackgroundColor: '#ffffff',
  
  addLayer: (layer) => {
    set((state) => ({
      layers: [...state.layers, layer],
      selectedLayerId: layer.id,
    }));
  },
  
  updateLayer: (id, updates) => {
    set((state) => ({
      layers: state.layers.map((layer) =>
        layer.id === id ? { ...layer, ...updates } as Layer : layer
      ),
    }));
  },
  
  deleteLayer: (id) => {
    set((state) => ({
      layers: state.layers.filter((layer) => layer.id !== id),
      selectedLayerId: state.selectedLayerId === id ? null : state.selectedLayerId,
    }));
  },
  
  selectLayer: (id) => {
    set({ selectedLayerId: id });
  },
  
  clearSelection: () => {
    set({ selectedLayerId: null });
  },
  
  bringForward: (id) => {
    set((state) => {
      const index = state.layers.findIndex((layer) => layer.id === id);
      if (index === -1 || index === state.layers.length - 1) return state;
      
      const newLayers = [...state.layers];
      [newLayers[index], newLayers[index + 1]] = [newLayers[index + 1], newLayers[index]];
      
      return { layers: newLayers };
    });
  },
  
  sendBackward: (id) => {
    set((state) => {
      const index = state.layers.findIndex((layer) => layer.id === id);
      if (index === -1 || index === 0) return state;
      
      const newLayers = [...state.layers];
      [newLayers[index], newLayers[index - 1]] = [newLayers[index - 1], newLayers[index]];
      
      return { layers: newLayers };
    });
  },
  
  resetLayerTransform: (id) => {
    set((state) => ({
      layers: state.layers.map((layer) => {
        if (layer.id !== id) return layer;
        
        return {
          ...layer,
          x: state.stageSize.width / 2,
          y: state.stageSize.height / 2,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
        } as Layer;
      }),
    }));
  },
  
  startEditingText: (id) => {
    set({ isEditingText: true, editingLayerId: id });
  },
  
  stopEditingText: () => {
    set({ isEditingText: false, editingLayerId: null });
  },
  
  setCanvasBackgroundColor: (color) => {
    set({ canvasBackgroundColor: color });
  },
}));
