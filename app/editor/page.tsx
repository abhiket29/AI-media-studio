'use client';

import React, { useState } from 'react';
import { FileUpload } from '@/components/editor/FileUpload';
import { AIGenerator } from '@/components/editor/AIGenerator';
import { FilterPanel } from '@/components/editor/FilterPanel';
import { WatermarkPanel } from '@/components/editor/WatermarkPanel';
import { BackgroundRemover } from '@/components/editor/BackgroundRemover';
import { CanvasEditor } from '@/components/editor/CanvasEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wand2, Upload, Palette, Type, Scissors, Image } from 'lucide-react';
import { FilterPreset, WatermarkConfig } from '@/types/editor';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { toast } from 'sonner';

export default function EditorPage() {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [appliedFilters, setAppliedFilters] = useState<FilterPreset['values']>({});
  const [currentWatermark, setCurrentWatermark] = useState<WatermarkConfig | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      // For demo purposes, we'll use a local URL
      const imageUrl = URL.createObjectURL(file);
      setCurrentImage(imageUrl);
      toast.success('File uploaded successfully!');
    } catch (error) {
      toast.error('Upload failed. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageGenerated = (imageUrl: string) => {
    setCurrentImage(imageUrl);
    // Reset filters and watermark when new image is loaded
    setAppliedFilters({});
    setCurrentWatermark(null);
  };

  const handleFilterApply = (filters: FilterPreset['values']) => {
    setAppliedFilters(filters);
  };

  const handleFilterReset = () => {
    setAppliedFilters({});
  };

  const handleWatermarkApply = (config: WatermarkConfig) => {
    setCurrentWatermark(config);
  };

  const handleWatermarkRemove = () => {
    setCurrentWatermark(null);
  };

  const handleBackgroundRemoved = (processedUrl: string) => {
    setCurrentImage(processedUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            AI Media Studio
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Create, edit, and enhance your images with AI-powered tools
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              AI Generation
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Professional Editing
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Export & Share
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Tools */}
          <div className="lg:col-span-1 space-y-6">
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload" className="flex items-center gap-1 text-xs">
                  <Upload className="w-3 h-3" />
                  Upload
                </TabsTrigger>
                <TabsTrigger value="generate" className="flex items-center gap-1 text-xs">
                  <Wand2 className="w-3 h-3" />
                  AI Generate
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Upload className="w-5 h-5 text-blue-600" />
                      Upload Media
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FileUpload
                      onFileUpload={handleFileUpload}
                      acceptedTypes={['image/*']}
                      maxSize={10 * 1024 * 1024}
                    />
                    {isUploading && (
                      <div className="mt-4 text-center text-sm text-gray-500">
                        Uploading...
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="generate" className="mt-4">
                <AIGenerator onImageGenerated={handleImageGenerated} />
              </TabsContent>
            </Tabs>

            {/* Editing Tools */}
            <Tabs defaultValue="filters" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="filters" className="flex items-center gap-1 text-xs">
                  <Palette className="w-3 h-3" />
                  Filters
                </TabsTrigger>
                <TabsTrigger value="watermark" className="flex items-center gap-1 text-xs">
                  <Type className="w-3 h-3" />
                  Text
                </TabsTrigger>
                <TabsTrigger value="background" className="flex items-center gap-1 text-xs">
                  <Scissors className="w-3 h-3" />
                  Remove BG
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="filters" className="mt-4">
                <FilterPanel
                  onFilterApply={handleFilterApply}
                  onReset={handleFilterReset}
                />
              </TabsContent>
              
              <TabsContent value="watermark" className="mt-4">
                <WatermarkPanel
                  onWatermarkApply={handleWatermarkApply}
                  onWatermarkRemove={handleWatermarkRemove}
                />
              </TabsContent>
              
              <TabsContent value="background" className="mt-4">
                <BackgroundRemover
                  imageUrl={currentImage}
                  onBackgroundRemoved={handleBackgroundRemoved}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Panel - Canvas Editor */}
          <div className="lg:col-span-2">
            <CanvasEditor
              imageUrl={currentImage}
              filters={appliedFilters}
              watermark={currentWatermark}
              className="h-fit"
            />
          </div>
        </div>

        {/* Features Overview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Wand2 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">AI Generation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Create stunning images from text prompts using advanced AI models
            </p>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Palette className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Professional Filters</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Apply beautiful filters and adjustments with real-time preview
            </p>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Scissors className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold mb-2">Background Removal</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Remove backgrounds automatically with AI-powered precision
            </p>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Image className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Export & Share</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Download in multiple formats or share directly to social media
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}