'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { HexColorPicker } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Type, Palette } from 'lucide-react';
import { WatermarkConfig } from '@/types/editor';

interface WatermarkPanelProps {
  onWatermarkApply: (config: WatermarkConfig) => void;
  onWatermarkRemove: () => void;
}

export function WatermarkPanel({ onWatermarkApply, onWatermarkRemove }: WatermarkPanelProps) {
  const [config, setConfig] = useState<WatermarkConfig>({
    text: 'Watermark',
    position: 'bottom-right',
    opacity: 0.7,
    size: 24,
    color: '#ffffff'
  });

  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleConfigChange = (key: keyof WatermarkConfig, value: any) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
  };

  const applyWatermark = () => {
    onWatermarkApply(config);
  };

  const removeWatermark = () => {
    onWatermarkRemove();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Type className="w-5 h-5 text-green-600" />
          Watermark
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="watermark-text">Watermark Text</Label>
          <Input
            id="watermark-text"
            value={config.text}
            onChange={(e) => handleConfigChange('text', e.target.value)}
            placeholder="Enter watermark text"
          />
        </div>

        <div className="space-y-2">
          <Label>Position</Label>
          <Select
            value={config.position}
            onValueChange={(value) => handleConfigChange('position', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="top-left">Top Left</SelectItem>
              <SelectItem value="top-right">Top Right</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="bottom-left">Bottom Left</SelectItem>
              <SelectItem value="bottom-right">Bottom Right</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Opacity: {Math.round(config.opacity * 100)}%</Label>
          <Slider
            value={[config.opacity]}
            onValueChange={(value) => handleConfigChange('opacity', value[0])}
            min={0.1}
            max={1}
            step={0.1}
          />
        </div>

        <div className="space-y-2">
          <Label>Size: {config.size}px</Label>
          <Slider
            value={[config.size]}
            onValueChange={(value) => handleConfigChange('size', value[0])}
            min={12}
            max={72}
            step={2}
          />
        </div>

        <div className="space-y-2">
          <Label>Color</Label>
          <Popover open={showColorPicker} onOpenChange={setShowColorPicker}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <div
                  className="w-4 h-4 rounded border"
                  style={{ backgroundColor: config.color }}
                />
                {config.color.toUpperCase()}
                <Palette className="w-4 h-4 ml-auto" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <HexColorPicker
                color={config.color}
                onChange={(color) => handleConfigChange('color', color)}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={applyWatermark} className="flex-1">
            Apply Watermark
          </Button>
          <Button onClick={removeWatermark} variant="outline">
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}