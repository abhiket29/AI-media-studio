'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Scissors, Download } from 'lucide-react';
import { removeBackground } from '@/lib/stable-diffusion';
import { toast } from 'sonner';

interface BackgroundRemoverProps {
  imageUrl: string | null;
  onBackgroundRemoved: (processedUrl: string) => void;
}

export function BackgroundRemover({ imageUrl, onBackgroundRemoved }: BackgroundRemoverProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const handleRemoveBackground = async () => {
    if (!imageUrl) {
      toast.error('Please select an image first');
      return;
    }

    setIsProcessing(true);
    try {
      const processedUrl = await removeBackground(imageUrl);
      setProcessedImage(processedUrl);
      onBackgroundRemoved(processedUrl);
      toast.success('Background removed successfully!');
    } catch (error) {
      toast.error('Failed to remove background');
      console.error('Background removal error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scissors className="w-5 h-5 text-orange-600" />
          Background Removal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Remove the background from your image using AI. This works best with clear subjects and distinct backgrounds.
        </p>

        <Button
          onClick={handleRemoveBackground}
          disabled={!imageUrl || isProcessing}
          className="w-full bg-orange-600 hover:bg-orange-700"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Scissors className="w-4 h-4 mr-2" />
              Remove Background
            </>
          )}
        </Button>

        {processedImage && (
          <div className="space-y-3">
            <div className="relative">
              <img
                src={processedImage}
                alt="Background removed"
                className="w-full rounded-lg shadow-lg"
                style={{ 
                  background: 'repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 20px 20px' 
                }}
              />
            </div>
            <Button
              asChild
              variant="outline"
              className="w-full"
            >
              <a href={processedImage} download="background-removed.png">
                <Download className="w-4 h-4 mr-2" />
                Download Result
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}