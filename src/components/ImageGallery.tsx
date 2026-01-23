import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

const ImageGallery = ({ images, productName }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainImageError, setMainImageError] = useState(false);
  const [thumbnailErrors, setThumbnailErrors] = useState<Set<number>>(new Set());

  const handleThumbnailError = (index: number) => {
    setThumbnailErrors((prev) => new Set(prev).add(index));
  };

  const validImages = images.filter((_, i) => !thumbnailErrors.has(i));

  return (
    <div className="space-y-4">
      <div className="aspect-square border-2 border-border bg-secondary flex items-center justify-center p-8">
        {images[selectedIndex] && !mainImageError ? (
          <img
            src={images[selectedIndex]}
            alt={productName}
            className="max-h-full max-w-full object-contain"
            onError={() => setMainImageError(true)}
          />
        ) : (
          <div className="text-muted-foreground text-center">
            <div className="text-8xl mb-4">🛞</div>
            <span>No Image Available</span>
          </div>
        )}
      </div>

      {validImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            !thumbnailErrors.has(index) && (
              <button
                key={index}
                onClick={() => {
                  setSelectedIndex(index);
                  setMainImageError(false);
                }}
                className={cn(
                  "flex-shrink-0 w-20 h-20 border-2 bg-secondary flex items-center justify-center p-2 transition-all",
                  selectedIndex === index
                    ? "border-foreground shadow-sm"
                    : "border-border hover:border-muted-foreground"
                )}
              >
                <img
                  src={image}
                  alt={`${productName} view ${index + 1}`}
                  className="max-h-full max-w-full object-contain"
                  onError={() => handleThumbnailError(index)}
                />
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
