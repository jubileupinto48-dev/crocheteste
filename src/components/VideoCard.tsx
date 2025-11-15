import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, Clock } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoCardProps {
  title: string;
  duration: string;
  thumbnail: string;
  videoNumber: number;
  isActive?: boolean;
  onClick: () => void;
}

export const VideoCard = ({ 
  title, 
  duration, 
  thumbnail, 
  videoNumber, 
  isActive = false,
  onClick 
}: VideoCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card 
      className={`overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg group ${
        isActive ? 'ring-2 ring-primary shadow-lg' : 'hover:ring-1 hover:ring-primary/50'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-video overflow-hidden bg-muted">
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
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <PlayCircle className="w-16 h-16 text-white" />
          </div>
          {isActive && (
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
              Assistindo
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
            }`}>
              {videoNumber}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`font-medium leading-tight mb-1 line-clamp-2 ${
                isActive ? 'text-primary' : 'text-foreground'
              }`}>
                {title}
              </h4>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{duration}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
