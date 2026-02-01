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
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-red-600/90 flex items-center justify-center shadow-xl transform transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600 group-hover:shadow-red-500/40 group-hover:shadow-2xl animate-[pulse_3s_ease-in-out_infinite]">
                    <Play className="w-6 h-6 md:w-7 md:h-7 text-white fill-current ml-0.5" />
                  </div>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-center">
                  <h3 className="text-white text-sm md:text-lg font-semibold drop-shadow-lg">
                    {video.title}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm mt-0.5">
                    Clique para assistir
                  </p>
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
