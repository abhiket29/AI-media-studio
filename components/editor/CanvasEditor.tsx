'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Share2, Undo, Redo } from 'lucide-react';
import { FilterPreset, WatermarkConfig } from '@/types/editor';
import { toast } from 'sonner';

interface CanvasEditorProps {
  imageUrl: string | null;
  filters: FilterPreset['values'];
  watermark: WatermarkConfig | null;
  className?: string;
}

export function CanvasEditor({ 
  imageUrl, 
  filters, 
  watermark,
  className 
}: CanvasEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);

  // Load image
  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setOriginalImage(img);
    };
    img.src = imageUrl;
  }, [imageUrl]);

  // Apply filters and watermark
  useEffect(() => {
    if (!originalImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = originalImage.width;
    canvas.height = originalImage.height;

    // Apply filters
    let filterString = '';
    if (filters.brightness !== undefined) {
      filterString += `brightness(${100 + filters.brightness}%) `;
    }
    if (filters.contrast !== undefined) {
      filterString += `contrast(${100 + filters.contrast}%) `;
    }
    if (filters.saturation !== undefined) {
      filterString += `saturate(${100 + filters.saturation}%) `;
    }
    if (filters.blur) {
      filterString += `blur(${filters.blur}px) `;
    }
    if (filters.grayscale) {
      filterString += 'grayscale(100%) ';
    }
    if (filters.sepia) {
      filterString += 'sepia(100%) ';
    }

    ctx.filter = filterString;
    ctx.drawImage(originalImage, 0, 0);

    // Reset filter for watermark
    ctx.filter = 'none';

    // Apply watermark
    if (watermark && watermark.text) {
      ctx.font = `${watermark.size}px Arial`;
      ctx.fillStyle = watermark.color;
      ctx.globalAlpha = watermark.opacity;

      const metrics = ctx.measureText(watermark.text);
      let x, y;

      switch (watermark.position) {
        case 'top-left':
          x = 20;
          y = watermark.size + 20;
          break;
        case 'top-right':
          x = canvas.width - metrics.width - 20;
          y = watermark.size + 20;
          break;
        case 'center':
          x = (canvas.width - metrics.width) / 2;
          y = (canvas.height + watermark.size) / 2;
          break;
        case 'bottom-left':
          x = 20;
          y = canvas.height - 20;
          break;
        case 'bottom-right':
        default:
          x = canvas.width - metrics.width - 20;
          y = canvas.height - 20;
          break;
      }

      ctx.fillText(watermark.text, x, y);
      ctx.globalAlpha = 1;
    }
  }, [originalImage, filters, watermark]);

  const handleDownload = async () => {
    if (!canvasRef.current) return;

    setIsProcessing(true);
    try {
      const canvas = canvasRef.current;
      const link = document.createElement('a');
      link.download = 'edited-image.png';
      link.href = canvas.toDataURL();
      link.click();
      toast.success('Image downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download image');
      console.error('Download error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShare = async () => {
    if (!canvasRef.current) return;

    setIsProcessing(true);
    try {
      const canvas = canvasRef.current;
      canvas.toBlob(async (blob) => {
        if (blob && navigator.share) {
          const file = new File([blob], 'edited-image.png', { type: 'image/png' });
          await navigator.share({
            files: [file],
            title: 'Check out my edited image!',
          });
          toast.success('Image shared successfully!');
        } else {
          // Fallback: copy to clipboard
          const item = new ClipboardItem({ 'image/png': blob! });
          await navigator.clipboard.write([item]);
          toast.success('Image copied to clipboard!');
        }
        setIsProcessing(false);
      });
    } catch (error) {
      toast.error('Failed to share image');
      console.error('Share error:', error);
      setIsProcessing(false);
    }
  };

  if (!imageUrl) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p className="text-lg font-medium">No image selected</p>
            <p className="text-sm">Upload an image or generate one with AI to get started</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Canvas Editor</h3>
            <div className="flex gap-2">
              <Button
                onClick={handleDownload}
                disabled={isProcessing}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                onClick={handleShare}
                disabled={isProcessing}
                size="sm"
                variant="outline"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto"
              style={{ display: 'block', margin: '0 auto' }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}