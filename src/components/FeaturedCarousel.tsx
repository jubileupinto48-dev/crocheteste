import { useState } from "react";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface FeaturedVideo {
  id: string;
  title: string;
  thumbnail: string;
  videoId: string;
}

const featuredVideos: FeaturedVideo[] = [
  {
    id: "1",
    title: "Vestido Destaque 1",
    thumbnail: "https://img.youtube.com/vi/wa2xHd3ghg8/maxresdefault.jpg",
    videoId: "wa2xHd3ghg8",
  },
  {
    id: "2",
    title: "Vestido Destaque 2",
    thumbnail: "https://img.youtube.com/vi/MqT6DfpAGfE/maxresdefault.jpg",
    videoId: "MqT6DfpAGfE",
  },
  {
    id: "3",
    title: "Vestido Destaque 3",
    thumbnail: "https://img.youtube.com/vi/T3mKfEMGzpE/maxresdefault.jpg",
    videoId: "T3mKfEMGzpE",
  },
  {
    id: "4",
    title: "Vestido Destaque 4",
    thumbnail: "https://img.youtube.com/vi/7Ry1SQfBs-A/maxresdefault.jpg",
    videoId: "7Ry1SQfBs-A",
  },
];

export const FeaturedCarousel = () => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const handlePlay = (videoId: string) => {
    setPlayingVideo(videoId);
  };

  const handleClose = () => {
    setPlayingVideo(null);
  };

  return (
    <div className="relative">
      {/* Video Modal Overlay */}
      {playingVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div 
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:bg-white/20 z-10"
              onClick={handleClose}
            >
              <X className="w-6 h-6" />
            </Button>
            <iframe
              src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="Video Player"
              className="w-full h-full rounded-xl shadow-2xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Carousel */}
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {featuredVideos.map((video) => (
            <CarouselItem key={video.id} className="pl-2 md:pl-4 basis-full md:basis-4/5 lg:basis-3/4">
              <div 
                className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group shadow-xl"
                onClick={() => handlePlay(video.videoId)}
              >
                {/* Thumbnail */}
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to hqdefault if maxresdefault doesn't exist
                    e.currentTarget.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                  }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:bg-primary">
                    <Play className="w-10 h-10 md:w-12 md:h-12 text-primary-foreground fill-current ml-1" />
                  </div>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="text-white text-lg md:text-2xl font-bold drop-shadow-lg">
                    {video.title}
                  </h3>
                  <p className="text-white/80 text-sm md:text-base mt-1">
                    Clique para assistir
                  </p>
                </div>

                {/* Badge */}
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs md:text-sm font-semibold shadow-lg">
                  ⭐ Destaque
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="left-2 md:left-4 bg-white/90 hover:bg-white shadow-lg" />
        <CarouselNext className="right-2 md:right-4 bg-white/90 hover:bg-white shadow-lg" />
      </Carousel>

      {/* Carousel Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {featuredVideos.map((video) => (
          <div
            key={video.id}
            className="w-2 h-2 rounded-full bg-primary/30 transition-colors"
          />
        ))}
      </div>
    </div>
  );
};
