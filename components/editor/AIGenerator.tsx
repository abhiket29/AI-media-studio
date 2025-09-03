'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wand2, Download, Loader2 } from 'lucide-react';
import { generateImage, GenerationRequest } from '@/lib/stable-diffusion';
import { toast } from 'sonner';

interface AIGeneratorProps {
  onImageGenerated: (imageUrl: string) => void;
}

export function AIGenerator({ onImageGenerated }: AIGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [dimensions, setDimensions] = useState('512x512');
  const [steps, setSteps] = useState([20]);
  const [guidance, setGuidance] = useState([7.5]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    try {
      const [width, height] = dimensions.split('x').map(Number);
      
      const request: GenerationRequest = {
        prompt: prompt.trim(),
        negativePrompt: negativePrompt.trim() || undefined,
        width,
        height,
        steps: steps[0],
        guidance: guidance[0],
      };

      const imageUrl = await generateImage(request);
      setGeneratedImage(imageUrl);
      toast.success('Image generated successfully!');
    } catch (error) {
      toast.error('Failed to generate image');
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseImage = () => {
    if (generatedImage) {
      onImageGenerated(generatedImage);
      toast.success('Image added to editor');
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-purple-600" />
          AI Image Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="prompt">Prompt</Label>
          <Textarea
            id="prompt"
            placeholder="A beautiful sunset over mountains, digital art, highly detailed..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="negative-prompt">Negative Prompt (Optional)</Label>
          <Input
            id="negative-prompt"
            placeholder="blurry, low quality, distorted..."
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Dimensions</Label>
            <Select value={dimensions} onValueChange={setDimensions}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="512x512">Square (512×512)</SelectItem>
                <SelectItem value="768x512">Landscape (768×512)</SelectItem>
                <SelectItem value="512x768">Portrait (512×768)</SelectItem>
                <SelectItem value="1024x1024">Large Square (1024×1024)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Steps: {steps[0]}</Label>
            <Slider
              value={steps}
              onValueChange={setSteps}
              min={10}
              max={50}
              step={1}
              className="mt-2"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Guidance Scale: {guidance[0]}</Label>
          <Slider
            value={guidance}
            onValueChange={setGuidance}
            min={1}
            max={20}
            step={0.5}
            className="mt-2"
          />
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating || !prompt.trim()}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Image
            </>
          )}
        </Button>

        {generatedImage && (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={generatedImage}
                alt="Generated image"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleUseImage} className="flex-1">
                Use in Editor
              </Button>
              <Button variant="outline" asChild>
                <a href={generatedImage} download="generated-image.png">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </a>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}