export interface EditorTool {
  id: string;
  name: string;
  icon: string;
  category: 'generate' | 'edit' | 'enhance' | 'export';
}

export interface MediaAsset {
  id: string;
  url: string;
  type: 'image' | 'video';
  name: string;
  size: number;
  createdAt: Date;
}

export interface FilterPreset {
  id: string;
  name: string;
  preview: string;
  values: {
    brightness?: number;
    contrast?: number;
    saturation?: number;
    blur?: number;
    sepia?: boolean;
    grayscale?: boolean;
  };
}

export interface WatermarkConfig {
  text: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  opacity: number;
  size: number;
  color: string;
}