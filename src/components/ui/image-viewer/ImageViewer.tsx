import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '../dialog';
import { Button } from '../button';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react';

interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{
    url: string;
    name: string;
  }>;
  initialIndex?: number;
}

export const ImageViewer = ({
  isOpen,
  onClose,
  images = [],
  initialIndex = 0
}: ImageViewerProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  React.useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // If there are no images, don't render the dialog
  if (!images || images.length === 0) {
    return null;
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const currentImage = images[currentIndex];

  // If current image is invalid, don't render the dialog
  if (!currentImage || !currentImage.url) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-black/90">
        <DialogTitle className="sr-only">Image Viewer</DialogTitle>
        <div className="relative flex items-center justify-center w-full h-full min-h-[400px]">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={onClose}
          >
            <XIcon className="w-6 h-6" />
          </Button>

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 text-white hover:bg-white/20"
                onClick={handlePrevious}
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 text-white hover:bg-white/20"
                onClick={handleNext}
              >
                <ChevronRightIcon className="w-6 h-6" />
              </Button>
            </>
          )}

          {/* Image */}
          <div className="flex flex-col items-center gap-4 p-6">
            <img
              src={currentImage.url}
              alt={currentImage.name}
              className="max-w-full max-h-[70vh] object-contain"
            />
            <div className="text-white text-sm">
              {currentImage.name}
              {images.length > 1 && (
                <span className="ml-2 text-gray-400">
                  ({currentIndex + 1} of {images.length})
                </span>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};