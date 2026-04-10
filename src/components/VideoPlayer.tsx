import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { Volume2 } from "lucide-react";

interface VideoPlayerProps {
  videoId: string;
  title: string;
  platform?: "youtube" | "vimeo" | "gdrive";
}

export const VideoPlayer = ({ videoId, title, platform = "youtube" }: VideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showUnmute, setShowUnmute] = useState(false);

  // Detecta mobile
  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile && platform === "vimeo") {
      setShowUnmute(true);
    }
  }, [platform]);

  const getEmbedUrl = () => {
    if (platform === "youtube") {
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&controls=1`;
    }
    if (platform === "gdrive") {
      return `https://drive.google.com/file/d/${videoId}/preview`;
    }
    // Vimeo: parse hash se existir (formato "id?h=hash")
    const [baseId, hashPart] = videoId.split('?h=');
    let url = `https://player.vimeo.com/video/${baseId}?autopause=0&transparent=0`;
    if (hashPart) url += `&h=${hashPart}`;
    return url;
  };

  return (
    <Card className="overflow-hidden shadow-card">
      <div className="relative aspect-video bg-muted">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Skeleton className="w-full h-full" />
          </div>
        )}
        <iframe
          src={getEmbedUrl()}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          onLoad={() => setIsLoading(false)}
        />

        {/* Overlay "Toque para ativar o som" — apenas mobile Vimeo */}
        {showUnmute && !isLoading && (
          <button
            onClick={() => setShowUnmute(false)}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold text-white transition-all active:scale-95 z-10"
            style={{
              background: 'linear-gradient(135deg, hsl(322 62% 50%), hsl(280 50% 45%))',
              boxShadow: '0 4px 20px hsl(322 62% 30% / 0.5)',
            }}
          >
            <Volume2 className="w-4 h-4" />
            Toque para ativar o som
          </button>
        )}
      </div>
    </Card>
  );
};
