'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image, Video, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  acceptedTypes?: string[];
  maxSize?: number;
  className?: string;
}

export function FileUpload({
  onFileUpload,
  acceptedTypes = ['image/*', 'video/*'],
  maxSize = 10 * 1024 * 1024, // 10MB
  className,
}: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize,
    multiple: false,
  });

  const getIcon = () => {
    if (acceptedTypes.includes('image/*')) return <Image className="w-12 h-12" />;
    if (acceptedTypes.includes('video/*')) return <Video className="w-12 h-12" />;
    return <FileText className="w-12 h-12" />;
  };

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8',
        'flex flex-col items-center justify-center cursor-pointer transition-all duration-200',
        'hover:border-purple-500 hover:bg-purple-50/10 dark:hover:bg-purple-900/10',
        'min-h-[200px] bg-gray-50/50 dark:bg-gray-800/50',
        isDragActive && 'border-purple-500 bg-purple-50/20 dark:bg-purple-900/20',
        isDragReject && 'border-red-500 bg-red-50/20 dark:bg-red-900/20',
        className
      )}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center space-y-4">
        <div className={cn(
          'p-4 rounded-full transition-colors',
          isDragActive ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/50' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
        )}>
          {isDragActive ? <Upload className="w-12 h-12" /> : getIcon()}
        </div>
        
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            {isDragActive ? 'Drop your file here' : 'Upload your media'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Drag & drop or click to browse
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            Supports images and videos up to {Math.round(maxSize / (1024 * 1024))}MB
          </p>
        </div>
      </div>
    </div>
  );
}