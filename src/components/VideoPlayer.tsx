import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

interface VideoPlayerProps {
  videoId: string;
  title: string;
  platform?: "youtube" | "vimeo" | "gdrive";
}

export const VideoPlayer = ({ videoId, title, platform = "youtube" }: VideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const getEmbedUrl = () => {
    if (platform === "youtube") {
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&controls=1`;
    }
    if (platform === "gdrive") {
      return `https://drive.google.com/file/d/${videoId}/preview`;
    }
    return `https://player.vimeo.com/video/${videoId}`;
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
      </div>
    </Card>
  );
};
