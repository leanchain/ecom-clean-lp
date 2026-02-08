'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { ChevronDown, Video, ImageIcon, FileImage, FileVideo, Package } from 'lucide-react';

export interface MediaItem {
  type: 'image' | 'video' | 'featured_image' | 'featured_video' | 'detected_image' | 'detected_video';
  id: string | number;
  src: string;
  alt: string;
  path?: string;
  key?: string;
  data?: any;
}

interface MediaViewerProps {
  isOpen: boolean;
  onClose: () => void;
  mediaItems: MediaItem[];
  initialIndex?: number;
}

export const MediaViewer: React.FC<MediaViewerProps> = ({ isOpen, onClose, mediaItems, initialIndex = 0 }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(initialIndex);

  // Update selected index when initialIndex changes (with bounds checking)
  useEffect(() => {
    if (mediaItems.length > 0) {
      const validIndex = Math.min(Math.max(0, initialIndex), mediaItems.length - 1);
      setSelectedImageIndex(validIndex);
    }
  }, [initialIndex, mediaItems.length]);

  // Reset to first item when modal opens (with bounds checking)
  useEffect(() => {
    if (isOpen && mediaItems.length > 0) {
      const validIndex = Math.min(Math.max(0, initialIndex), mediaItems.length - 1);
      setSelectedImageIndex(validIndex);
    }
  }, [isOpen, initialIndex, mediaItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !mediaItems.length) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : mediaItems.length - 1));
          break;
        case 'ArrowRight':
          e.preventDefault();
          setSelectedImageIndex((prev) => (prev < mediaItems.length - 1 ? prev + 1 : 0));
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, mediaItems.length, onClose]);

  // Ensure selectedImageIndex is always valid
  useEffect(() => {
    if (mediaItems.length > 0 && selectedImageIndex >= mediaItems.length) {
      setSelectedImageIndex(mediaItems.length - 1);
    } else if (mediaItems.length > 0 && selectedImageIndex < 0) {
      setSelectedImageIndex(0);
    }
  }, [mediaItems.length, selectedImageIndex]);

  if (!mediaItems.length) return null;

  const currentMedia = mediaItems[selectedImageIndex];

  // Safety check - ensure currentMedia exists
  if (!currentMedia) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] max-w-7xl max-h-[95vh] p-0 overflow-hidden bg-background border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          {/* Minimal info overlay */}
          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between text-foreground/80">
            <div className="flex items-center gap-2 text-sm">
              {currentMedia.type === 'detected_video' && <Video className="h-4 w-4" />}
              {currentMedia.type === 'detected_image' && <FileImage className="h-4 w-4" />}
              {currentMedia.type === 'featured_video' && <Video className="h-4 w-4" />}
              {currentMedia.type === 'featured_image' && <ImageIcon className="h-4 w-4" />}
              {currentMedia.type === 'video' && <Video className="h-4 w-4" />}
              {currentMedia.type === 'image' && <ImageIcon className="h-4 w-4" />}
              <span className="text-xs font-medium">
                {currentMedia.type === 'detected_video' && 'Detected Video'}
                {currentMedia.type === 'detected_image' && 'Detected Image'}
                {currentMedia.type === 'featured_video' && 'Featured Video'}
                {currentMedia.type === 'featured_image' && 'Featured Image'}
                {currentMedia.type === 'video' && 'Video'}
                {currentMedia.type === 'image' && 'Image'}
              </span>
              {currentMedia.path && <span className="text-xs opacity-60">• {currentMedia.path}</span>}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs">
                {selectedImageIndex + 1} / {mediaItems.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0 text-foreground/80 hover:text-foreground hover:bg-[var(--surface-subtle)]/60"
              >
                ✕
              </Button>
            </div>
          </div>

          {/* Main Media Display */}
          <div className="relative bg-background flex items-center justify-center min-h-[80vh] max-h-[85vh]">
            {currentMedia.type.includes('video') ? (
              <video
                src={currentMedia.src}
                controls
                autoPlay
                muted
                playsInline
                preload="metadata"
                className="max-w-full max-h-full object-contain"
                poster={currentMedia.type === 'featured_video' ? currentMedia.src : undefined}
              >
                <source src={currentMedia.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={currentMedia.src}
                alt={currentMedia.alt}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling!.classList.remove('hidden');
                }}
              />
            )}

            {/* Fallback for broken images */}
            <div className="hidden max-w-full max-h-full flex items-center justify-center bg-[var(--surface-subtle)] text-foreground">
              <div className="text-center">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground">Media Unavailable</p>
                <p className="text-sm text-muted-foreground mt-2 max-w-md break-all">{currentMedia.src}</p>
              </div>
            </div>

            {/* Navigation arrows */}
            {mediaItems.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : mediaItems.length - 1))}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/90 hover:bg-[var(--surface-subtle)]/60 text-foreground rounded-full p-3 transition-all duration-200 shadow-xl backdrop-blur-sm border border-border/60"
                >
                  <ChevronDown className="h-6 w-6 rotate-90" />
                </button>
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev < mediaItems.length - 1 ? prev + 1 : 0))}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/90 hover:bg-[var(--surface-subtle)]/60 text-foreground rounded-full p-3 transition-all duration-200 shadow-xl backdrop-blur-sm border border-border/60"
                >
                  <ChevronDown className="h-6 w-6 -rotate-90" />
                </button>
              </>
            )}
          </div>

          {/* Minimal Thumbnail Navigation */}
          {mediaItems.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 border border-border/60">
              <div className="flex gap-1">
                {mediaItems.map((media, index) => (
                  <div
                    key={index}
                    className={`relative flex-shrink-0 cursor-pointer transition-all duration-200 rounded overflow-hidden ${
                      index === selectedImageIndex ? 'ring-2 ring-primary/50' : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    {media.type.includes('video') ? (
                      <div className="w-12 h-12 bg-[var(--surface-subtle)] flex items-center justify-center">
                        <Video className="h-4 w-4 text-foreground" />
                      </div>
                    ) : (
                      <img
                        src={media.src}
                        alt={media.alt}
                        className="w-12 h-12 object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling!.classList.remove('hidden');
                        }}
                      />
                    )}
                    <div className="hidden w-12 h-12 bg-[var(--surface-subtle)] flex items-center justify-center">
                      <FileImage className="h-4 w-4 text-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </Dialog>
  );
};

export default MediaViewer;
