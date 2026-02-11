import { useState } from "react";
import { Play, X, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

// Custom thumbnails for videos whose YouTube thumbnails are unavailable
const customThumbnails: Record<string, string> = {
  "wa2xHd3ghg8": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770812425/SCgWr3Kv-pI-HD_ruuvgs.jpg",
  "7Ry1SQfBs-A": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770811985/fKqxGw4yvUY-HD_vwgf93.jpg",
  "2QG0PHbGUsI": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770811985/Design_sem_nome_br7dpp.png",
  "y9C56mdmG6A": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770812329/_EEt2dLuozA-SD_t33uvg.jpg",
  "4y5JnM6CAKE": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770812329/Ia19Yf-H08g-HD_qd4m2h.jpg",
};

interface CustomVideoPlayerProps {
  videoId: string;
  title: string;
  platform?: "youtube" | "vimeo" | "gdrive";
  autoplay?: boolean;
  showPixMessage?: boolean;
}

export const CustomVideoPlayer = ({ videoId, title, platform = "youtube", autoplay = false, showPixMessage = false }: CustomVideoPlayerProps) => {
  const [isPlayingInline, setIsPlayingInline] = useState(autoplay && !showPixMessage);
  const [isPlayingModal, setIsPlayingModal] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const { toast } = useToast();

  const pixKey = "21965328868";

  const getThumbnailUrl = () => {
    if (customThumbnails[videoId]) {
      return customThumbnails[videoId];
    }
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

  const copyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
    setPixCopied(true);
    toast({
      title: "Chave PIX copiada!",
      description: "A chave foi copiada para a área de transferência.",
    });
    setTimeout(() => setPixCopied(false), 2000);
  };

  const handlePlay = () => {
    if (showPixMessage) return; // Don't play if showing PIX message
    if (autoplay) {
      setIsPlayingInline(true);
    } else {
      setIsPlayingModal(true);
    }
  };

  const handleCloseModal = () => {
    setIsPlayingModal(false);
  };

  // PIX message overlay inside the player frame
  if (showPixMessage) {
    return (
      <Card className="overflow-hidden shadow-card">
        <div className="relative aspect-video md:aspect-video aspect-[4/3] bg-black">
          {/* Background thumbnail with blur */}
          <img
            src={getThumbnailUrl()}
            alt={title}
            className="w-full h-full object-cover opacity-30 blur-sm"
          />
          {/* PIX Message Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8 text-center">
            <p className="text-white text-sm md:text-lg font-medium leading-relaxed max-w-md mb-4 md:mb-6">
              Me envie o comprovante no WhatsApp para a liberação imediata dos vídeos ❤️
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20 mb-3 md:mb-4">
              <p className="text-white/80 text-xs md:text-sm mb-1">Pix: Celular</p>
              <code className="font-mono text-base md:text-xl font-bold text-white">{pixKey}</code>
              <p className="text-white/70 text-xs md:text-sm mt-1">Lucas Morone (Meu filho)</p>
            </div>
            <Button
              onClick={copyPixKey}
              size="sm"
              className="gap-2 font-medium"
            >
              {pixCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {pixCopied ? "Copiado!" : "Copiar Chave PIX"}
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Inline playing mode
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
      {/* Video Modal Overlay */}
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
              if (platform === "youtube" && !customThumbnails[videoId]) {
                e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-destructive/90 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-destructive animate-pulse-slow">
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
