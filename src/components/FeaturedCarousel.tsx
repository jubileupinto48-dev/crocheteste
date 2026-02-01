import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
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

// Ordem: Destaque 1, Destaque 4, Destaque 5, Destaque 6, Destaque 7
const featuredVideos: FeaturedVideo[] = [
  {
    id: "1",
    title: "Vestido Longo de Crochê",
    thumbnail: "https://img.youtube.com/vi/wa2xHd3ghg8/maxresdefault.jpg",
    videoId: "wa2xHd3ghg8",
  },
  {
    id: "4",
    title: "Vestido Decote V",
    thumbnail: "https://img.youtube.com/vi/7Ry1SQfBs-A/maxresdefault.jpg",
    videoId: "7Ry1SQfBs-A",
  },
  {
    id: "5",
    title: "Vestido Ciganina",
    thumbnail: "https://img.youtube.com/vi/2QG0PHbGUsI/maxresdefault.jpg",
    videoId: "2QG0PHbGUsI",
  },
  {
    id: "6",
    title: "Vestido Luxo",
    thumbnail: "https://img.youtube.com/vi/y9C56mdmG6A/maxresdefault.jpg",
    videoId: "y9C56mdmG6A",
  },
  {
    id: "7",
    title: "Vestido Cleópatra",
    thumbnail: "https://img.youtube.com/vi/4y5JnM6CAKE/maxresdefault.jpg",
    videoId: "4y5JnM6CAKE",
  },
];

export const FeaturedCarousel = () => {
  const navigate = useNavigate();

  const handlePlay = (videoId: string) => {
    // Navega para o módulo com o vídeo selecionado em autoplay
    navigate(`/vestidos-croche?video=${videoId}&autoplay=true`);
  };

  return (
    <div className="relative">
      {/* Carousel */}
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2500,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
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
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-red-600/90 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600 animate-pulse-slow">
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
