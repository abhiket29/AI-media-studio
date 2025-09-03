'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Palette, RotateCcw } from 'lucide-react';
import { FilterPreset } from '@/types/editor';

interface FilterPanelProps {
  onFilterApply: (filter: FilterPreset['values']) => void;
  onReset: () => void;
}

const filterPresets: FilterPreset[] = [
  {
    id: 'vintage',
    name: 'Vintage',
    preview: '🎞️',
    values: { brightness: 10, contrast: 20, saturation: -30, sepia: true }
  },
  {
    id: 'dramatic',
    name: 'Dramatic',
    preview: '🎭',
    values: { brightness: -10, contrast: 40, saturation: 10 }
  },
  {
    id: 'cool',
    name: 'Cool',
    preview: '❄️',
    values: { brightness: 5, contrast: 10, saturation: -10 }
  },
  {
    id: 'warm',
    name: 'Warm',
    preview: '🌅',
    values: { brightness: 15, contrast: 10, saturation: 20 }
  },
  {
    id: 'bw',
    name: 'Black & White',
    preview: '⚪',
    values: { grayscale: true, contrast: 20 }
  },
  {
    id: 'soft',
    name: 'Soft',
    preview: '✨',
    values: { brightness: 20, blur: 1, saturation: -10 }
  }
];

export function FilterPanel({ onFilterApply, onReset }: FilterPanelProps) {
  const [currentValues, setCurrentValues] = useState({
    brightness: [0],
    contrast: [0],
    saturation: [0],
    blur: [0]
  });

  const handleSliderChange = (key: string, value: number[]) => {
    const newValues = { ...currentValues, [key]: value };
    setCurrentValues(newValues);
    
    const filterValues = {
      brightness: newValues.brightness[0],
      contrast: newValues.contrast[0],
      saturation: newValues.saturation[0],
      blur: newValues.blur[0]
    };
    
    onFilterApply(filterValues);
  };

  const applyPreset = (preset: FilterPreset) => {
    const values = preset.values;
    setCurrentValues({
      brightness: [values.brightness || 0],
      contrast: [values.contrast || 0],
      saturation: [values.saturation || 0],
      blur: [values.blur || 0]
    });
    onFilterApply(values);
  };

  const resetFilters = () => {
    setCurrentValues({
      brightness: [0],
      contrast: [0],
      saturation: [0],
      blur: [0]
    });
    onReset();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-blue-600" />
          Filters & Effects
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filter Presets */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Quick Presets</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {filterPresets.map((preset) => (
              <Button
                key={preset.id}
                variant="outline"
                size="sm"
                onClick={() => applyPreset(preset)}
                className="flex flex-col items-center gap-1 h-auto p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <span className="text-lg">{preset.preview}</span>
                <span className="text-xs">{preset.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Manual Controls */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Manual Adjustments</Label>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-xs">Brightness</Label>
                <Badge variant="outline" className="text-xs">
                  {currentValues.brightness[0]}
                </Badge>
              </div>
              <Slider
                value={currentValues.brightness}
                onValueChange={(value) => handleSliderChange('brightness', value)}
                min={-100}
                max={100}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-xs">Contrast</Label>
                <Badge variant="outline" className="text-xs">
                  {currentValues.contrast[0]}
                </Badge>
              </div>
              <Slider
                value={currentValues.contrast}
                onValueChange={(value) => handleSliderChange('contrast', value)}
                min={-100}
                max={100}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-xs">Saturation</Label>
                <Badge variant="outline" className="text-xs">
                  {currentValues.saturation[0]}
                </Badge>
              </div>
              <Slider
                value={currentValues.saturation}
                onValueChange={(value) => handleSliderChange('saturation', value)}
                min={-100}
                max={100}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-xs">Blur</Label>
                <Badge variant="outline" className="text-xs">
                  {currentValues.blur[0]}px
                </Badge>
              </div>
              <Slider
                value={currentValues.blur}
                onValueChange={(value) => handleSliderChange('blur', value)}
                min={0}
                max={10}
                step={0.5}
              />
            </div>
          </div>
        </div>

        <Button 
          onClick={resetFilters}
          variant="outline" 
          size="sm" 
          className="w-full"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset All Filters
        </Button>
      </CardContent>
    </Card>
  );
}