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

// Pool completo de projetos do módulo de vestidos — 1 representante por projeto com thumbnail única
const allModuleVideos: FeaturedVideo[] = [
  // Ordem prioritária definida
  { id: "longo", title: "Vestido Longo de Crochê", thumbnail: "/thumbnails/vestido-longo-thumb.jpg", videoId: "1165908032?h=4e8257a515" },
  { id: "raquel", title: "Vestido Raquel", thumbnail: "/thumbnails/VEERDE VERTICAL (1).png", videoId: "1165877185?h=ce49de91b5" },
  { id: "anapaula", title: "Vestido Ana Paula", thumbnail: "/thumbnails/VESTIDO ANA PAULA.png", videoId: "1165825235?h=e65562ca75" },
  { id: "decotev", title: "Vestido Decote V", thumbnail: "/thumbnails/ozGPS_H5J44-HD.jpg", videoId: "1165903186?h=bb7c0e0908" },
  { id: "renata", title: "Saída Renata", thumbnail: "/thumbnails/renata.jpg", videoId: "1165899950?h=65fb9d0fc3" },
  { id: "corsetangel", title: "Corset Angel", thumbnail: "/thumbnails/corset angel.jpg", videoId: "1165901257?h=ba7889f004" },
  { id: "grassi", title: "Macacão Grassi", thumbnail: "/thumbnails/MACACÃO GRASSI.png", videoId: "1165828975?h=b2f003a62f" },
  { id: "corset", title: "Corset de Crochê", thumbnail: "/thumbnails/corset de croche.jpg", videoId: "1165900912?h=25ab81c66e" },
  { id: "sereia", title: "Vestido Sereia", thumbnail: "/thumbnails/Sereia.jpg", videoId: "1165908266?h=61b6de8549" },
  { id: "biquini", title: "Biquíni Tomara que Caia", thumbnail: "/thumbnails/vrCyt1O4SjU-HD.jpg", videoId: "1165416602?h=239fa20e43" },
  { id: "anaclara", title: "Vestido Ana Clara", thumbnail: "/thumbnails/ana clara.jpg", videoId: "1165898325?h=5af0c2457f" },
  { id: "flavia", title: "Vestido Flávia", thumbnail: "/thumbnails/Vestido Flavia.jpg", videoId: "1165897922?h=83924a6988" },
  { id: "mocambique", title: "Vestido Moçambique", thumbnail: "/thumbnails/moçambique.jpg", videoId: "1165898928?h=ce0edc64ab" },
  { id: "midi", title: "Saia Mídi", thumbnail: "/thumbnails/saia midi.png", videoId: "1165900453?h=3a7d240268" },
  // Restante na ordem original
  { id: "ciganinha", title: "Vestido Ciganinha", thumbnail: "/thumbnails/ra2ZISYUD0c-HD.jpg", videoId: "1165905541?h=441d91f0bc" },
  { id: "luxo", title: "Vestido Luxo", thumbnail: "/thumbnails/_EEt2dLuozA-SD.jpg", videoId: "1165412197?h=0fa29c051a" },
  { id: "cleopatra", title: "Vestido Cleópatra", thumbnail: "/thumbnails/Ia19Yf-H08g-HD.jpg", videoId: "1165896182?h=2ff4b53004" },
  { id: "rosas", title: "Conjunto Rosas", thumbnail: "/thumbnails/conjunto rosas.jpg", videoId: "1165896656?h=71c1d6054e" },
  { id: "estrela", title: "Top Estrela Brasil", thumbnail: "/thumbnails/S-Vp3QiN1Tk-HD.jpg", videoId: "1165908076?h=3b842fbf9d" },
  { id: "square", title: "Conjunto Square", thumbnail: "/thumbnails/Square.jpg", videoId: "1165896871?h=f4895dbef0" },
  { id: "camila", title: "Vestido Camila", thumbnail: "/thumbnails/vestido camila.jpg", videoId: "1165897115?h=2e6bdf5c09" },
  { id: "concha", title: "Vestido Concha", thumbnail: "/thumbnails/Conchas.jpg", videoId: "1165897327?h=bf84e16cb9" },
  { id: "darlene", title: "Vestido Darlene", thumbnail: "/thumbnails/darlene.jpg", videoId: "1165907603?h=bccb08fbbc" },
  { id: "saida", title: "Vestido Crochê Saída", thumbnail: "/thumbnails/Vestido Crochê Saida.jpg", videoId: "1165897423?h=6d46bec5f5" },
  { id: "evelyne", title: "Vestido Evelyne", thumbnail: "/thumbnails/Evelyne.jpg", videoId: "1165897740?h=21a8c932d8" },
  { id: "noiva", title: "Vestido Noiva Longo", thumbnail: "/thumbnails/Longo Noiva.jpg", videoId: "1165417274?h=8e8af3b41e" },
  { id: "tereza", title: "Saída Tereza", thumbnail: "/thumbnails/tereza.jpg", videoId: "1165899713?h=063db9139d" },
  { id: "betania", title: "Saída Betânia", thumbnail: "/thumbnails/betania.jpg", videoId: "1165900227?h=ab8c1eb8e3" },
  { id: "garden", title: "Cropped Garden", thumbnail: "/thumbnails/Gardeen.jpg", videoId: "1165900701?h=fc8686d056" },
  { id: "corsetv", title: "Corset em V", thumbnail: "/thumbnails/corset em v.jpg", videoId: "1165901491?h=5bf59bc49e" },
  { id: "conjtereza", title: "Conjunto Tereza", thumbnail: "/thumbnails/Conjunto Tereeza.jpg", videoId: "1165901832?h=5c0b941af2" },
  { id: "tardezinha", title: "Conjunto Tardezinha", thumbnail: "/thumbnails/tardezinha.jpg", videoId: "1165902033?h=67a0e24c41" },
  { id: "brilho", title: "Conjunto Brilho", thumbnail: "/thumbnails/conjunto brilho.jpg", videoId: "1165902686?h=192b4bb0cb" },
  { id: "praiana", title: "Conjunto Praiana", thumbnail: "/thumbnails/Praiana.jpg", videoId: "1165902854?h=c106849f13" },
  { id: "conjcamila", title: "Conjunto Camila", thumbnail: "/thumbnails/camila.jpg", videoId: "1165905050?h=ddfb626d58" },
  { id: "topbrasil", title: "Top Brasil", thumbnail: "/thumbnails/IRnqSP9VCsg-HD.jpg", videoId: "1165908193?h=44ce060d5e" },
  { id: "saidabrasil", title: "Saída Brasil", thumbnail: "/thumbnails/DxUeSn4p-Rg-HD.jpg", videoId: "1165908138?h=11ec544581" },
  { id: "virginia", title: "Vestido Virginia", thumbnail: "/thumbnails/VESTIDO VIRGINIA.png", videoId: "1165822436?h=73db5fd949" },
  { id: "angel", title: "Vestido Angel", thumbnail: "/thumbnails/VESTIDO ANGEL.png", videoId: "1165822536?h=494836d768" },
  { id: "melmaia", title: "Saída Mel Maia", thumbnail: "/thumbnails/SAIDA MEL MAIA.png", videoId: "1165822238?h=798063ee5e" },
  { id: "franjas", title: "Conjunto Franjas", thumbnail: "/thumbnails/CONJUNTO FRANJAS.png", videoId: "1165823586?h=95ae5df629" },
  { id: "maria", title: "Vestido Maria", thumbnail: "/thumbnails/VESTIDO MARIA.png", videoId: "1165822301?h=88af25dec4" },
  { id: "duda", title: "Cropped Duda", thumbnail: "/thumbnails/CROPPED DUDA.png", videoId: "1165825953?h=b67785daa5" },
  { id: "nala", title: "Vestido Nala", thumbnail: "/thumbnails/VESTIDO NALA.png", videoId: "1165828828?h=a4c932ccd4" },
  { id: "lola", title: "Cropped Lola", thumbnail: "/thumbnails/CROPPED LOLA.png", videoId: "1165828668?h=95dd4603c4" },
  { id: "sophia", title: "Vestido Sophia", thumbnail: "/thumbnails/VESTIDO SOPHIA.png", videoId: "1165826517?h=288eec92f1" },
  { id: "julianapaes", title: "Vestido Juliana Paes", thumbnail: "/thumbnails/VESTIDO JULIANA PAES.png", videoId: "1165823703?h=f2563c95af" },
  { id: "cali", title: "Conjunto Cali", thumbnail: "/thumbnails/CONJJUNTO CALI.png", videoId: "1165828774?h=0add065419" },
  { id: "moana", title: "Vestido Moana", thumbnail: "/thumbnails/VESTIDO MOANA.png", videoId: "1165826035?h=8dbfaef2b0" },
  { id: "larissa", title: "Vestido Larissa", thumbnail: "/thumbnails/VESTIDO LARISSA.png", videoId: "1165829701?h=c3dde6b38a" },
  { id: "vanessa", title: "Vestido Vanessa", thumbnail: "/thumbnails/VESTIDO VANESSA.png", videoId: "1165827065?h=0540e2af34" },
  { id: "lore", title: "Conjunto Lore", thumbnail: "/thumbnails/VESTIDO LORE.png", videoId: "1165827131?h=c55fa2bddb" },
  { id: "bel", title: "Vestido Bel", thumbnail: "/thumbnails/VESTIDO BEL.png", videoId: "1165826717?h=fd78660abf" },
  { id: "gabi", title: "Conjunto Gabi", thumbnail: "/thumbnails/CONJUNTO GABI.png", videoId: "1165823492?h=049b68c02a" },
  { id: "yara", title: "Vestido Yara", thumbnail: "/thumbnails/VESTIDO YARA.png", videoId: "1165825327?h=6fcce5e502" },
  { id: "vanda", title: "Vestido Vanda", thumbnail: "/thumbnails/VESTIDO VANDA.png", videoId: "1165826807?h=56f86f1de4" },
  { id: "patricia", title: "Vestido Patricia", thumbnail: "/thumbnails/VESTIDO PATRICIA.png", videoId: "1165823890?h=8a3a44f1d3" },
  { id: "lisi", title: "Conjunto Lisi", thumbnail: "/thumbnails/CONJUNTO LISI.png", videoId: "1165825489?h=4953414a7c" },
  { id: "eva", title: "Biquíni Eva", thumbnail: "/thumbnails/BIQUINI EVA.png", videoId: "1165826908?h=cf3b0678ab" },
  { id: "amanda", title: "Saia Amanda", thumbnail: "/thumbnails/SAIA AMANDA.png", videoId: "1165826996?h=639389fcf0" },
  { id: "nina", title: "Saia Nina", thumbnail: "/thumbnails/SAIA NINA.png", videoId: "1165825423?h=8cfc5ddc23" },
  { id: "ana", title: "Vestido Ana", thumbnail: "/thumbnails/VESTIDO ANA.png", videoId: "1165825582?h=f833fa35d1" },
  { id: "marina", title: "Vestido Marina", thumbnail: "/thumbnails/VESTIDO MARINA.png", videoId: "1165826240?h=bb6309f319" },
  { id: "leticia", title: "Conjunto Letícia", thumbnail: "/thumbnails/CONJUNTO LETICIA.png", videoId: "1165867234?h=6e2eed84e2" },
  { id: "poetapatricia", title: "Vestido Patricia Poeta", thumbnail: "/thumbnails/ROSA VERTICAL (1).png", videoId: "1166455223" },
  { id: "zelly", title: "Conjunto Zelly", thumbnail: "/thumbnails/DOURADO QUADRADO (1).png", videoId: "1166455028" },
  { id: "alice", title: "Vestido Alice", thumbnail: "/thumbnails/DOURADO QUADRADO (2).png", videoId: "1166454267" },
  { id: "conjrenata", title: "Conjunto Renata", thumbnail: "/thumbnails/CONJUNTO RENATA.png", videoId: "1166454958" },
  { id: "lari", title: "Vestido Lari", thumbnail: "/thumbnails/DOURADO QUADRADO (3).png", videoId: "1166454494" },
  { id: "nay", title: "Vestido Nay", thumbnail: "/thumbnails/VERDE QUADRADO (1).png", videoId: "1166454610" },
  { id: "iris", title: "Conjunto Íris", thumbnail: "/thumbnails/CONJUNTO RENATA (1).png", videoId: "1166453580" },
  { id: "salles", title: "Conjunto Salles", thumbnail: "/thumbnails/DOURADO QUADRADO (4).png", videoId: "1166454066" },
  { id: "scheila", title: "Conjunto Scheila", thumbnail: "/thumbnails/CONJUNTO RENATA (2).png", videoId: "1166453825" },
  { id: "estrella", title: "Vestido Estrella", thumbnail: "/thumbnails/CONJUNTO RENATA (4).png", videoId: "1166452653" },
  { id: "lorena", title: "Vestido Lorena", thumbnail: "/thumbnails/lore.jpg", videoId: "1166451621" },
  { id: "sol", title: "Vestido Sol", thumbnail: "/thumbnails/VEERDE VERTICAL.png", videoId: "1166451054" },
  { id: "dubai", title: "Vestido Dubai", thumbnail: "/thumbnails/ROSA VERTICAL.png", videoId: "1166456435" },
  { id: "lais", title: "Vestido Laís", thumbnail: "/thumbnails/DOURADO VERTICAL.png", videoId: "1166456340" },
  { id: "shirley", title: "Saída Shirley", thumbnail: "/thumbnails/XReZUJvzft0-HD.jpg", videoId: "1165908374?h=954ee77336" },
  { id: "bella", title: "Vestido Bella", thumbnail: "/thumbnails/CONJUNTO RENATA (10).png", videoId: "1166450761" },
  { id: "brunnet", title: "Vestido Brunnet", thumbnail: "/thumbnails/CONJUNTO RENATA (11).png", videoId: "1166456663" },
];

export const FeaturedCarousel = () => {
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi>();
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Para o autoplay durante interação e retoma após 5s de inatividade
  useEffect(() => {
    if (!api) return;

    const autoplayPlugin = api.plugins()?.autoplay as any;
    if (!autoplayPlugin) return;

    const scheduleResume = () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => {
        autoplayPlugin.play();
      }, 3500);
    };

    // Para quando o usuário começa a arrastar
    const onPointerDown = () => {
      autoplayPlugin.stop();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };

    // Agenda retomada quando solta
    const onPointerUp = () => {
      scheduleResume();
    };

    const onSettle = () => {
      if (!autoplayPlugin.isPlaying()) {
        scheduleResume();
      }
    };

    const rootNode = api.rootNode();
    rootNode.addEventListener("pointerdown", onPointerDown);
    rootNode.addEventListener("pointerup", onPointerUp);
    api.on("settle", onSettle);

    return () => {
      rootNode.removeEventListener("pointerdown", onPointerDown);
      rootNode.removeEventListener("pointerup", onPointerUp);
      api.off("settle", onSettle);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [api]);

  const handlePlay = (video: FeaturedVideo) => {
    // Parse videoId: "1165908032?h=4e8257a515" → ?video=...&h=...
    const [baseId, hashPart] = video.videoId.split('?h=');
    const params = new URLSearchParams({ video: baseId });
    if (hashPart) params.set('h', hashPart);
    navigate(`/vestidos-croche?${params.toString()}`);
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
          {allModuleVideos.map((video) => (
            <CarouselItem key={video.id} className="pl-2 md:pl-4 basis-full md:basis-4/5 lg:basis-3/4">
              <div
                className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group shadow-xl"
                onClick={() => handlePlay(video)}
              >
                {/* Thumbnail */}
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
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
        {allModuleVideos.map((video) => (
          <div
            key={video.id}
            className="w-2 h-2 rounded-full bg-primary/30 transition-colors"
          />
        ))}
      </div>
    </div>
  );
};