export type AspectRatio = "1:1" | "16:9" | "4:5" | "9:16";
export type FilterType = "normal" | "clarendon" | "gingham" | "moon" | "lark" | "reyes" | "juno" | "slumber" | "crema" | "ludwig" | "aden" | "perpetua";

export interface Filter {
  name: string;
  value: FilterType;
  style: string;
}

export interface ImageEditSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  temperature: number;
  vignette: number;
}

export interface StoryText {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontFamily: string;
  rotation: number;
}

export interface PostSettings {
  disableComments: boolean;
  disableLikes: boolean;
  allowSharing: boolean;
  ageRestriction: boolean;
}

export interface LinkItem {
  url: string;
  title: string;
  displayType: "button" | "text" | "swipe";
}