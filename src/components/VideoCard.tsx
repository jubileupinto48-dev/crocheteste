import { PlayCircle, Clock, Heart } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoCardProps {
  title: string;
  duration: string;
  thumbnail: string;
  videoNumber: number;
  isActive?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent) => void;
  onImageReady?: () => void;
  onClick: () => void;
}

export const VideoCard = ({
  title,
  duration,
  thumbnail,
  videoNumber,
  isActive = false,
  isFavorite = false,
  onToggleFavorite,
  onImageReady,
  onClick
}: VideoCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="overflow-hidden cursor-pointer transition-all duration-300 group rounded-2xl"
      style={{
        background: 'hsl(330 16% 10.5%)',
        border: isActive
          ? '1.5px solid hsl(322 50% 45%)'
          : '1px solid hsl(330 14% 16%)',
        boxShadow: isActive
          ? '0 0 0 3px hsl(322 62% 65% / 0.12), 0 4px 20px hsl(330 30% 4% / 0.5)'
          : '0 2px 12px hsl(330 30% 4% / 0.5)',
      }}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden bg-muted" style={{ aspectRatio: '16/9' }}>
        {!imageLoaded && (
          <Skeleton className="absolute inset-0" />
        )}
        <img
          src={thumbnail}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => {
            setImageLoaded(true);
            onImageReady?.();
          }}
          onError={() => {
            setImageLoaded(true);
            onImageReady?.();
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'hsl(330 30% 4% / 0.45)' }}
        >
          <PlayCircle className="w-14 h-14 text-white drop-shadow-lg" />
        </div>

        {/* Active badge */}
        {isActive && (
          <div
            className="absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-full"
            style={{
              background: 'linear-gradient(135deg, hsl(322 62% 62%), hsl(280 50% 55%))',
              color: 'white',
            }}
          >
            Assistindo
          </div>
        )}

        {/* Favorite button */}
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(e);
            }}
            className={`absolute top-2 left-2 p-1.5 rounded-full transition-all duration-200 ${
              isFavorite ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
            style={{
              background: isFavorite
                ? 'linear-gradient(135deg, hsl(322 62% 62%), hsl(280 50% 55%))'
                : 'hsl(330 30% 4% / 0.5)',
              color: 'white',
            }}
            aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
            style={{
              background: isActive
                ? 'linear-gradient(135deg, hsl(322 62% 62%), hsl(280 50% 55%))'
                : 'hsl(330 13% 17%)',
              color: isActive ? 'white' : 'hsl(330 8% 52%)',
            }}
          >
            {videoNumber}
          </div>
          <div className="flex-1 min-w-0">
            <h4
              className="font-semibold leading-snug mb-1 line-clamp-2 text-sm transition-colors duration-200"
              style={{ color: isActive ? 'hsl(322 55% 72%)' : 'hsl(20 18% 88%)' }}
            >
              {title}
            </h4>
            <div className="flex items-center gap-1 text-xs" style={{ color: 'hsl(330 8% 42%)' }}>
              <Clock className="w-3 h-3" />
              <span>{duration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
