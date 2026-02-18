import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import { useState, useRef, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
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
    id: "raquel",
    title: "Vestido Raquel",
    thumbnail: "https://res.cloudinary.com/dzetm6plq/image/upload/v1771383895/VEERDE_VERTICAL_1_wzahng.png",
    videoId: "1165877185?h=ce49de91b5",
  },
  {
    id: "4",
    title: "Vestido Decote V",
    thumbnail: "https://res.cloudinary.com/dzetm6plq/image/upload/v1770811985/fKqxGw4yvUY-HD_vwgf93.jpg",
    videoId: "um0S-AKW1Bw",
  },
  {
    id: "5",
    title: "Vestido Ciganinha",
    thumbnail: "https://res.cloudinary.com/dzetm6plq/image/upload/v1770811985/Design_sem_nome_br7dpp.png",
    videoId: "2QG0PHbGUsI",
  },
  {
    id: "star",
    title: "Top Estrela Brasil",
    thumbnail: "https://res.cloudinary.com/dzetm6plq/image/upload/v1771307351/S-Vp3QiN1Tk-HD_td6d0k.jpg",
    videoId: "eULL4c7GCAs",
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
    id: "anaclara",
    title: "Vestido Ana Clara",
    thumbnail: "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305380/ana_clara_isprr9.jpg",
    videoId: "7C6SfLQmt8Y",
  },
  {
    id: "mocambique",
    title: "Vestido Moçambique",
    thumbnail: "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305379/mo%C3%A7ambique_wvuoup.jpg",
    videoId: "L1krqeffIvw",
  },
  {
    id: "virginia",
    title: "Vestido Virginia",
    thumbnail: "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381439/VESTIDO_VIRGINIA_y1pnbp.png",
    videoId: "1165822436?h=73db5fd949",
  },
  {
    id: "franjas",
    title: "Conjunto Franjas",
    thumbnail: "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381443/CONJUNTO_FRANJAS_j12exw.png",
    videoId: "1165823586?h=95ae5df629",
  },
  {
    id: "lola",
    title: "Cropped Lola",
    thumbnail: "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381441/CROPPED_LOLA_hht4ad.png",
    videoId: "1165828668?h=95dd4603c4",
  },
  {
    id: "anapaula",
    title: "Vestido Ana Paula",
    thumbnail: "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381439/VESTIDO_ANA_PAULA_cqjakj.png",
    videoId: "1165825235?h=e65562ca75",
  },
  {
    id: "melmaia",
    title: "Saída Mel Maia",
    thumbnail: "https://res.cloudinary.com/dzetm6plq/image/upload/v1771381441/SAIDA_MEL_MAIA_o6g04n.png",
    videoId: "1165822238?h=798063ee5e",
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
  const [api, setApi] = useState<CarouselApi>();
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Retoma o autoplay 5s após o usuário parar de interagir
  useEffect(() => {
    if (!api) return;

    const autoplayPlugin = api.plugins()?.autoplay as any;
    if (!autoplayPlugin) return;

    const onStop = () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => {
        autoplayPlugin.play();
      }, 5000);
    };

    api.on("autoplay:stop", onStop);

    return () => {
      api.off("autoplay:stop", onStop);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [api]);

  const handlePlay = (videoId: string) => {
    navigate(`/vestidos-croche?video=${encodeURIComponent(videoId)}&autoplay=true`);
  };

  return (
    <div className="relative">
      {/* Carousel */}
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
            playOnInit: true,
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
