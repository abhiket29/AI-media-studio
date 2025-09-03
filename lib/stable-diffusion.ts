export interface GenerationRequest {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  steps?: number;
  guidance?: number;
}

export const generateImage = async (request: GenerationRequest): Promise<string> => {
  // This is a mock implementation - replace with actual Stable Diffusion API
  // For demo purposes, we'll return a placeholder
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg');
    }, 2000);
  });
};

export const applyAIFilter = async (imageUrl: string, filter: string): Promise<string> => {
  // Mock AI filter application
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(imageUrl); // In real implementation, return processed image
    }, 1500);
  });
};

export const removeBackground = async (imageUrl: string): Promise<string> => {
  // Mock background removal
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(imageUrl); // In real implementation, return image with background removed
    }, 3000);
  });
};