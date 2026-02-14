import { useState, useEffect } from "react";
import { Play, X, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

// Custom thumbnails for videos whose YouTube thumbnails are unavailable
const customThumbnails: Record<string, string> = {
  "wa2xHd3ghg8": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770812425/SCgWr3Kv-pI-HD_ruuvgs.jpg",
  "MqT6DfpAGfE": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770812425/SCgWr3Kv-pI-HD_ruuvgs.jpg",
  "T3mKfEMGzpE": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770812425/SCgWr3Kv-pI-HD_ruuvgs.jpg",
  "7Ry1SQfBs-A": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770811985/fKqxGw4yvUY-HD_vwgf93.jpg",
  "2QG0PHbGUsI": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770811985/Design_sem_nome_br7dpp.png",
  "y9C56mdmG6A": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770812329/_EEt2dLuozA-SD_t33uvg.jpg",
  "4y5JnM6CAKE": "https://res.cloudinary.com/dzetm6plq/image/upload/v1770812329/Ia19Yf-H08g-HD_qd4m2h.jpg",
  "CNe-elk8zm4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771108167/XuuJvrgxk-8-HD_a5fzw6.jpg",
  "QmMtlJu0cTI": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107928/aUpmBpUUsTQ-HD_nczglp.jpg",
  "cCFOGukAh-Y": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107928/aUpmBpUUsTQ-HD_nczglp.jpg",
  "1q8PAEcytMk": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107928/aUpmBpUUsTQ-HD_nczglp.jpg",
  "MV86APDdJrE": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/Pxiscx0QsCE-HD_vgc3vg.jpg",
  "WPavNu7xI_o": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/Pxiscx0QsCE-HD_vgc3vg.jpg",
  "esZk0CWJPxw": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/VGPjnFo7eF4-HD_rxgvqu.jpg",
  "RFPdFNMXSxo": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/VGPjnFo7eF4-HD_rxgvqu.jpg",
  "d1DB5J1cHmk": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/VGPjnFo7eF4-HD_rxgvqu.jpg",
  "3GLLTdColiE": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/0AIYUTWzx9I-HD_oi4jxm.jpg",
  "Mx4tkT0Qyew": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/0AIYUTWzx9I-HD_oi4jxm.jpg",
  "g4oWC8uHiY4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/0AIYUTWzx9I-HD_oi4jxm.jpg",
  "RWGTCFU8GjM": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/0AIYUTWzx9I-HD_oi4jxm.jpg",
  "23pELsHCpw0": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107928/ufx3WuaI9OA-HD_eqphem.jpg",
  "kEfX4uBE8_w": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107928/e7ud56CxnFg-HD_zkxaox.jpg",
  "QMuwadztjHk": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/vSmgk4ZLpnk-HD_pi9wvu.jpg",
  "qTFQF2JuxMY": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107928/Kyx_qC1X7n8-HD_htvsx9.jpg",
  "fm3XUSkCy3c": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/D-bwdXeer-g-HD_uilfaz.jpg",
  "5zNb43Hi7MQ": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/D-bwdXeer-g-HD_uilfaz.jpg",
  "kUM9BDOY2B4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/D-bwdXeer-g-HD_uilfaz.jpg",
  "7BuqNEXwXKw": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/751Ukhdt-ek-HD_oxpxw3.jpg",
  "rhmemKGV9N8": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771107929/751Ukhdt-ek-HD_oxpxw3.jpg",
  "P0Emfo_2qsU": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771108164/v-BUiu4uwg4-HD_waluwn.jpg",
  "o0Txp_D4c1M": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771108164/F-9MR785gNY-HD_kikzd5.jpg",
  "gF4LIZrQIQw": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771108164/F-9MR785gNY-HD_kikzd5.jpg",
  "IXkkWfjBD_A": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771108168/yZUAkvXZ4jc-HD_epymh7.jpg",
  "W6NReaWkX-4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771108168/Byf4O1RD65s-HD_fvvbon.jpg",
  "vygTLCKLTyI": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771108168/ymNF5gXSCg0-HD_o5bvp3.jpg",
  "vhJm0SkK0pI": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771108168/ymNF5gXSCg0-HD_o5bvp3.jpg",
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
  const [showingPixOverlay, setShowingPixOverlay] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const { toast } = useToast();

  // Reset PIX overlay when video changes
  useEffect(() => {
    setShowingPixOverlay(false);
    setPixCopied(false);
  }, [videoId]);

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
    if (showPixMessage) {
      setShowingPixOverlay(true);
      return;
    }
    if (autoplay) {
      setIsPlayingInline(true);
    } else {
      setIsPlayingModal(true);
    }
  };

  const handleCloseModal = () => {
    setIsPlayingModal(false);
  };

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
          
          {/* Play Button - only show when NOT showing PIX overlay */}
          {!showingPixOverlay && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-destructive/90 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-destructive animate-pulse-slow">
                <Play className="w-5 h-5 md:w-6 md:h-6 text-white fill-current ml-0.5" />
              </div>
            </div>
          )}

          {/* PIX Overlay - appears on top when user clicks play */}
          {showingPixOverlay && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-8 text-center z-10 animate-fade-in">
              <p className="text-white text-sm md:text-lg font-medium leading-relaxed max-w-md mb-4 md:mb-6">
                Me envie o comprovante no WhatsApp para a liberação imediata dos vídeos ❤️
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20 mb-3 md:mb-4">
                <p className="text-white/80 text-xs md:text-sm mb-1">Pix: Celular</p>
                <code className="font-mono text-base md:text-xl font-bold text-white">{pixKey}</code>
                <p className="text-white/70 text-xs md:text-sm mt-1">Lucas Morone (Meu filho)</p>
              </div>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  copyPixKey();
                }}
                size="sm"
                className="gap-2 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 active:scale-95"
              >
                {pixCopied ? <Check className="w-4 h-4 animate-scale-in" /> : <Copy className="w-4 h-4" />}
                {pixCopied ? "Copiado!" : "Copiar Chave PIX"}
              </Button>
            </div>
          )}

          {/* Title Overlay - only show when NOT showing PIX overlay */}
          {!showingPixOverlay && (
            <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-center">
              <h3 className="text-white text-xs md:text-sm font-medium drop-shadow-lg line-clamp-2">
                {title}
              </h3>
              <p className="text-white/60 text-[10px] md:text-xs mt-0.5">
                Clique para assistir
              </p>
            </div>
          )}
        </div>
      </Card>
    </>
  );
};
