import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";
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

const allFeaturedVideos: FeaturedVideo[] = [
  {
    id: "1",
    title: "Vestido Longo de Crochê",
    thumbnail: "https://res.cloudinary.com/dzetm6plq/image/upload/v1770812425/SCgWr3Kv-pI-HD_ruuvgs.jpg",
    videoId: "wa2xHd3ghg8",
  },
  {
    id: "4",
    title: "Vestido Decote V",
    thumbnail: "https://res.cloudinary.com/dzetm6plq/image/upload/v1770811985/fKqxGw4yvUY-HD_vwgf93.jpg",
    videoId: "7Ry1SQfBs-A",
  },
  {
    id: "star",
    title: "Top Estrela Brasil",
    thumbnail: "https://res.cloudinary.com/dzetm6plq/image/upload/v1771307351/S-Vp3QiN1Tk-HD_td6d0k.jpg",
    videoId: "eULL4c7GCAs",
  },
  {
    id: "5",
    title: "Vestido Ciganinha",
    thumbnail: "https://res.cloudinary.com/dzetm6plq/image/upload/v1770811985/Design_sem_nome_br7dpp.png",
    videoId: "2QG0PHbGUsI",
  },
  {
    id: "6",
    title: "Vestido Luxo",
    thumbnail: "https://res.cloudinary.com/dzetm6plq/image/upload/v1770812329/_EEt2dLuozA-SD_t33uvg.jpg",
    videoId: "Y1GzUp7eomU",
  },
  {
    id: "7",
    title: "Vestido Cleópatra",
    thumbnail: "https://res.cloudinary.com/dzetm6plq/image/upload/v1770812329/Ia19Yf-H08g-HD_qd4m2h.jpg",
    videoId: "BZmo7SG6Bhw",
  },
  {
    id: "8",
    title: "Biquini Tomara que Caia",
    thumbnail: "https://res.cloudinary.com/dzetm6plq/image/upload/v1771286572/vrCyt1O4SjU-HD_nti0w1.jpg",
    videoId: "45dtXS7wZJ8",
  },
  {
    id: "sereia",
    title: "Vestido Sereia",
    thumbnail: "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305377/Sereia_nqhrmj.jpg",
    videoId: "nwxsLI9augM",
  },
  {
    id: "anaclara",
    title: "Vestido Ana Clara",
    thumbnail: "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305380/ana_clara_isprr9.jpg",
    videoId: "7C6SfLQmt8Y",
  },
  {
    id: "concha",
    title: "Vestido Concha",
    thumbnail: "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305379/Conchas_sobfyn.jpg",
    videoId: "PW5hDw2nUtU",
  },
  {
    id: "mocambique",
    title: "Vestido Moçambique",
    thumbnail: "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305379/mo%C3%A7ambique_wvuoup.jpg",
    videoId: "L1krqeffIvw",
  },
  {
    id: "sousplato",
    title: "Sousplato Girafa",
    thumbnail: "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/sousplate_u8qesy.jpg",
    videoId: "ap1OEUJZ-S4",
  },
  {
    id: "praiana",
    title: "Conjunto Praiana",
    thumbnail: "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/Praiana_r8wcy2.jpg",
    videoId: "8-7-TAnZeTI",
  },
];

// Shuffle array using Fisher-Yates, keeping first three fixed (Vestido Longo + Decote V + Top Estrela)
function shuffleCarousel(videos: FeaturedVideo[]): FeaturedVideo[] {
  const fixed = videos.slice(0, 3);
  const rest = videos.slice(3);
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  return [...fixed, ...rest];
}

export const FeaturedCarousel = () => {
  const navigate = useNavigate();
  const [shuffledVideos] = useState(() => shuffleCarousel(allFeaturedVideos));

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
          {shuffledVideos.map((video) => (
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
        
        <CarouselPrevious className="left-2 md:left-4 bg-black/60 hover:bg-black/80 border-white/20 text-white shadow-lg" />
        <CarouselNext className="right-2 md:right-4 bg-black/60 hover:bg-black/80 border-white/20 text-white shadow-lg" />
      </Carousel>

      {/* Carousel Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {shuffledVideos.map((video) => (
          <div
            key={video.id}
            className="w-2 h-2 rounded-full bg-primary/30 transition-colors"
          />
        ))}
      </div>
    </div>
  );
};
