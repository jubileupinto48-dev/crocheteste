import { useState } from "react";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface CustomVideoPlayerProps {
  videoId: string;
  title: string;
  platform?: "youtube" | "vimeo" | "gdrive";
  autoplay?: boolean;
}

export const CustomVideoPlayer = ({ videoId, title, platform = "youtube", autoplay = false }: CustomVideoPlayerProps) => {
  // Se autoplay=true, começa com vídeo inline (não modal)
  const [isPlayingInline, setIsPlayingInline] = useState(autoplay);
  const [isPlayingModal, setIsPlayingModal] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

  const getThumbnailUrl = () => {
    if (platform === "youtube") {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    if (platform === "gdrive") {
      return `https://drive.google.com/thumbnail?id=${videoId}&sz=w1280`;
    }
    return `https://vumbnail.com/${videoId}.jpg`;
  };

  const getEmbedUrl = () => {
    if (platform === "youtube") {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1`;
    }
    if (platform === "gdrive") {
      return `https://drive.google.com/file/d/${videoId}/preview`;
    }
    return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
  };

  const handlePlay = () => {
    // Abre modal somente se não estiver em modo autoplay
    if (autoplay) {
      setIsPlayingInline(true);
    } else {
      setIsPlayingModal(true);
    }
  };

  const handleCloseModal = () => {
    setIsPlayingModal(false);
  };

  // Se estiver em modo inline (autoplay ou clicou em play com autoplay ativo)
  if (isPlayingInline) {
    return (
      <Card className="overflow-hidden shadow-card">
        <div className="relative aspect-video bg-black">
          <iframe
            src={getEmbedUrl()}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Card>
    );
  }

  return (
    <>
      {/* Video Modal Overlay - somente para modo não-autoplay */}
      {isPlayingModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:bg-white/20 z-10"
              onClick={handleCloseModal}
            >
              <X className="w-6 h-6" />
            </Button>
            <iframe
              src={getEmbedUrl()}
              title={title}
              className="w-full h-full rounded-xl shadow-2xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Thumbnail with Play Button */}
      <Card className="overflow-hidden shadow-card">
        <div 
          className="relative aspect-video md:aspect-video aspect-[4/3] bg-muted cursor-pointer group"
          onClick={handlePlay}
        >
          {!thumbnailLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Skeleton className="w-full h-full" />
            </div>
          )}
          <img
            src={getThumbnailUrl()}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              thumbnailLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={() => setThumbnailLoaded(true)}
            onError={(e) => {
              // Fallback to hqdefault if maxresdefault doesn't exist
              if (platform === "youtube") {
                e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-red-600/90 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600 animate-pulse-slow">
              <Play className="w-5 h-5 md:w-6 md:h-6 text-white fill-current ml-0.5" />
            </div>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-center">
            <h3 className="text-white text-xs md:text-sm font-medium drop-shadow-lg line-clamp-2">
              {title}
            </h3>
            <p className="text-white/60 text-[10px] md:text-xs mt-0.5">
              Clique para assistir
            </p>
          </div>
        </div>
      </Card>
    </>
  );
};
