import { useState, useEffect, useRef } from "react";
import { Play, X, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

// Custom thumbnails for videos whose YouTube thumbnails are unavailable
const customThumbnails: Record<string, string> = {
  // Vestido Longo de Crochê (1, 2, 3) + Vestido Decote V
  "1165908032?h=4e8257a515": "/thumbnails/ozGPS_H5J44-HD.jpg",
  "1165906778?h=ca85d54254": "/thumbnails/ozGPS_H5J44-HD.jpg",
  "1165907172?h=5916a23185": "/thumbnails/ozGPS_H5J44-HD.jpg",
  "1165903186?h=bb7c0e0908": "/thumbnails/ozGPS_H5J44-HD.jpg",
  // Vestido Ciganinha
  "1165905541?h=441d91f0bc": "/thumbnails/ra2ZISYUD0c-HD.jpg",
  // Vestido Luxo
  "1165412197?h=0fa29c051a": "/thumbnails/_EEt2dLuozA-SD.jpg",
  // Vestido Cleópatra
  "1165896182?h=2ff4b53004": "/thumbnails/Ia19Yf-H08g-HD.jpg",
  // Biquini Rendado
  "1165415971?h=dd327a58fb": "/thumbnails/fKLX4pMjmck-HD.jpg",
  // Biquini Tomara que Caia
  "1165416602?h=239fa20e43": "/thumbnails/vrCyt1O4SjU-HD.jpg",
  // Conjunto Square
  "1165896871?h=f4895dbef0": "/thumbnails/Square.jpg",
  // Vestido Sereia
  "1165908266?h=61b6de8549": "/thumbnails/Sereia.jpg",
  // Vestido Ana Clara
  "1165898325?h=5af0c2457f": "/thumbnails/ana clara.jpg",
  // Vestido Camila
  "1165897115?h=2e6bdf5c09": "/thumbnails/vestido camila.jpg",
  // Vestido Concha
  "1165897327?h=bf84e16cb9": "/thumbnails/Conchas.jpg",
  // Vestido Darlene
  "1165907603?h=bccb08fbbc": "/thumbnails/darlene.jpg",
  // Vestido Crochê Saída
  "1165897423?h=6d46bec5f5": "/thumbnails/Vestido Crochê Saida.jpg",
  // Vestido Evelyne
  "1165897740?h=21a8c932d8": "/thumbnails/Evelyne.jpg",
  // Vestido Flávia
  "1165897922?h=83924a6988": "/thumbnails/Vestido Flavia.jpg",
  // Vestido Noiva Longo
  "1165417274?h=8e8af3b41e": "/thumbnails/Longo Noiva.jpg",
  // Vestido Moçambique
  "1165898928?h=ce0edc64ab": "/thumbnails/moçambique.jpg",
  // Vestido Raira
  "1165899486?h=7759bd5d46": "/thumbnails/CONJUNTO RENATA (5).png",
  // Sousplato Girafa
  "1165898764?h=290f75b513": "/thumbnails/sousplate.jpg",
  // Saída Tereza
  "1165899713?h=063db9139d": "/thumbnails/tereza.jpg",
  // Saída Shirley
  "1165908374?h=954ee77336": "/thumbnails/XReZUJvzft0-HD.jpg",
  // Saída Renata
  "1165899950?h=65fb9d0fc3": "/thumbnails/renata.jpg",
  // Saída Betânia
  "1165900227?h=ab8c1eb8e3": "/thumbnails/betania.jpg",
  // Saída Mídi
  "1165900453?h=3a7d240268": "/thumbnails/saia midi.png",
  // Cropped Garden
  "1165900701?h=fc8686d056": "/thumbnails/Gardeen.jpg",
  // Corset de Crochê
  "1165900912?h=25ab81c66e": "/thumbnails/corset de croche.jpg",
  // Corset Angel
  "1165901257?h=ba7889f004": "/thumbnails/corset angel.jpg",
  // Corset em V
  "1165901491?h=5bf59bc49e": "/thumbnails/corset em v.jpg",
  // Conjunto Tereza
  "1165901832?h=5c0b941af2": "/thumbnails/Conjunto Tereeza.jpg",
  // Conjunto Tardezinha
  "1165902033?h=67a0e24c41": "/thumbnails/tardezinha.jpg",
  // Conjunto Rosas
  "1165896656?h=71c1d6054e": "/thumbnails/conjunto rosas.jpg",
  // Conjunto Crochê Brilho
  "1165902686?h=192b4bb0cb": "/thumbnails/conjunto brilho.jpg",
  // Conjunto Praiana
  "1165902854?h=c106849f13": "/thumbnails/Praiana.jpg",
  // Conjunto Camila
  "1165905050?h=ddfb626d58": "/thumbnails/camila.jpg",
  // Macacão (YouTube)
  "lG2KfsR4pts": "/thumbnails/macacão.jpg",
  // Calça Thais
  "1165905314?h=0abf93f051": "/thumbnails/calça thais.jpg",
  // Saída Brasil
  "1165908138?h=11ec544581": "/thumbnails/DxUeSn4p-Rg-HD.jpg",
  // Top Estrela Brasil
  "1165908076?h=3b842fbf9d": "/thumbnails/S-Vp3QiN1Tk-HD.jpg",
  // Top Brasil
  "1165908193?h=44ce060d5e": "/thumbnails/IRnqSP9VCsg-HD.jpg",
  // === VIMEO THUMBNAILS ===
  // Vestido Raquel
  "1165877185?h=ce49de91b5": "/thumbnails/VEERDE VERTICAL (1).png",
  // Vestido Virginia
  "1165822436?h=73db5fd949": "/thumbnails/VESTIDO VIRGINIA.png",
  "1165822491?h=426a5c76b5": "/thumbnails/VESTIDO VIRGINIA.png",
  // Vestido Angel
  "1165822536?h=494836d768": "/thumbnails/VESTIDO ANGEL.png",
  "1165822336?h=b2524c1a00": "/thumbnails/VESTIDO ANGEL.png",
  "1165822633?h=9a932be1b8": "/thumbnails/VESTIDO ANGEL.png",
  // Saída Mel Maia
  "1165822238?h=798063ee5e": "/thumbnails/SAIDA MEL MAIA.png",
  "1165822696?h=58d1366209": "/thumbnails/SAIDA MEL MAIA.png",
  // Vestido Maria
  "1165822301?h=88af25dec4": "/thumbnails/VESTIDO MARIA.png",
  "1165822154?h=5ec6b1f8af": "/thumbnails/VESTIDO MARIA.png",
  "1165822389?h=7d4dceda8d": "/thumbnails/VESTIDO MARIA.png",
  // Vestido Juliana Paes
  "1165823703?h=f2563c95af": "/thumbnails/VESTIDO JULIANA PAES.png",
  "1165823637?h=be2694c569": "/thumbnails/VESTIDO JULIANA PAES.png",
  "1165823010?h=773cd6f91e": "/thumbnails/VESTIDO JULIANA PAES.png",
  "1165824039?h=b270eff1a3": "/thumbnails/VESTIDO JULIANA PAES.png",
  // Calça Correntinha
  "1165823422?h=3bad21440c": "/thumbnails/CALÇA CORRENTINHA.png",
  // Calça Tela
  "1165823210?h=b5372b698b": "/thumbnails/CALÇA TELA.png",
  // Conjunto Paetê
  "1165823127?h=80846c06c2": "/thumbnails/CONJUNTO PAETE.png",
  // Cropped Anna Clara
  "1165823296?h=588db44c04": "/thumbnails/CROPPED ANNA CLARA.png",
  // Conjunto Gabi
  "1165823492?h=049b68c02a": "/thumbnails/CONJUNTO GABI.png",
  "1165823953?h=6133197ea0": "/thumbnails/CONJUNTO GABI.png",
  "1165823551?h=e845f3f59b": "/thumbnails/CONJUNTO GABI.png",
  // Conjunto Franjas
  "1165823586?h=95ae5df629": "/thumbnails/CONJUNTO FRANJAS.png",
  "1165823379?h=de1eeffff5": "/thumbnails/CONJUNTO FRANJAS.png",
  // Saia Laura
  "1165823777?h=2148619f8b": "/thumbnails/SAIA LAURA.png",
  // Vestido Patricia
  "1165823890?h=8a3a44f1d3": "/thumbnails/VESTIDO PATRICIA.png",
  "1165823819?h=d5bbc1ab0f": "/thumbnails/VESTIDO PATRICIA.png",
  // Vestido Sophia
  "1165826517?h=288eec92f1": "/thumbnails/VESTIDO SOPHIA.png",
  // Vestido Moana
  "1165826035?h=8dbfaef2b0": "/thumbnails/VESTIDO MOANA.png",
  // Vestido Vanessa
  "1165827065?h=0540e2af34": "/thumbnails/VESTIDO VANESSA.png",
  "1165826296?h=8c5f4f7cfb": "/thumbnails/VESTIDO VANESSA.png",
  "1165826387?h=9cf52087de": "/thumbnails/VESTIDO VANESSA.png",
  // Vestido Vanda
  "1165826807?h=56f86f1de4": "/thumbnails/VESTIDO VANDA.png",
  // Biquíni Eva
  "1165826908?h=cf3b0678ab": "/thumbnails/BIQUINI EVA.png",
  // Saia Amanda
  "1165826996?h=639389fcf0": "/thumbnails/SAIA AMANDA.png",
  // Vestido Bel
  "1165826717?h=fd78660abf": "/thumbnails/VESTIDO BEL.png",
  "1165826152?h=d563f325dc": "/thumbnails/VESTIDO BEL.png",
  // Cropped Duda
  "1165825953?h=b67785daa5": "/thumbnails/CROPPED DUDA.png",
  // Vestido Marina
  "1165826240?h=bb6309f319": "/thumbnails/VESTIDO MARINA.png",
  "1165825869?h=8858cf55a6": "/thumbnails/VESTIDO MARINA.png",
  // Vestido Ana Paula
  "1165825235?h=e65562ca75": "/thumbnails/VESTIDO ANA PAULA.png",
  "1165825126?h=78b247f600": "/thumbnails/VESTIDO ANA PAULA.png",
  "1165825817?h=a8a15760a4": "/thumbnails/VESTIDO ANA PAULA.png",
  // Conjunto Lisi
  "1165825489?h=4953414a7c": "/thumbnails/CONJUNTO LISI.png",
  "1165825673?h=fb8f804677": "/thumbnails/CONJUNTO LISI.png",
  // Saia Nina
  "1165825423?h=8cfc5ddc23": "/thumbnails/SAIA NINA.png",
  // Vestido Ana
  "1165825582?h=f833fa35d1": "/thumbnails/VESTIDO ANA.png",
  // Vestido Yara
  "1165825327?h=6fcce5e502": "/thumbnails/VESTIDO YARA.png",
  "1165825757?h=00739caa67": "/thumbnails/VESTIDO YARA.png",
  // Conjunto Letícia
  "1165867234?h=6e2eed84e2": "/thumbnails/CONJUNTO LETICIA.png",
  // Conjunto Lore
  "1165827131?h=c55fa2bddb": "/thumbnails/VESTIDO LORE.png",
  "1165827332?h=75278547ee": "/thumbnails/VESTIDO LORE.png",
  "1165824975?h=29ac896d60": "/thumbnails/VESTIDO LORE.png",
  // Vestido Nala
  "1165828828?h=a4c932ccd4": "/thumbnails/VESTIDO NALA.png",
  "1165829077?h=2e1fffbb63": "/thumbnails/VESTIDO NALA.png",
  // Macacão Grassi
  "1165828975?h=b2f003a62f": "/thumbnails/MACACÃO GRASSI.png",
  "1165829345?h=67f801752d": "/thumbnails/MACACÃO GRASSI.png",
  // Suéter Sofia
  "1165829840?h=bda1e8e5be": "/thumbnails/SUÉTER SOFIA.png",
  "1165828330?h=b9b9868fd2": "/thumbnails/SUÉTER SOFIA.png",
  // Vestido Larissa
  "1165829701?h=c3dde6b38a": "/thumbnails/VESTIDO LARISSA.png",
  "1165829124?h=f7f7193ac1": "/thumbnails/VESTIDO LARISSA.png",
  "1165829571?h=8d15bdff7a": "/thumbnails/VESTIDO LARISSA.png",
  // Cropped Lola
  "1165828668?h=95dd4603c4": "/thumbnails/CROPPED LOLA.png",
  // Conjunto Cali
  "1165828774?h=0add065419": "/thumbnails/CONJJUNTO CALI.png",
  "1165828605?h=58d11062d4": "/thumbnails/CONJJUNTO CALI.png",
  "1165828438?h=456ae1cdb5": "/thumbnails/CONJJUNTO CALI.png",
  "1165828229?h=4acb08a378": "/thumbnails/CONJJUNTO CALI.png",
  // Vestido Patricia Poeta
  "1166455223": "/thumbnails/ROSA VERTICAL (1).png",
  "1166455407": "/thumbnails/ROSA VERTICAL (1).png",
  "1166455304": "/thumbnails/ROSA VERTICAL (1).png",
  // Conjunto Zelly
  "1166455028": "/thumbnails/DOURADO QUADRADO (1).png",
  "1166455627": "/thumbnails/DOURADO QUADRADO (1).png",
  "1166455708": "/thumbnails/DOURADO QUADRADO (1).png",
  // Cropped Livia
  "1166455527": "/thumbnails/DOURADO QUADRADO (6).png",
  // Vestido Alice
  "1166454267": "/thumbnails/DOURADO QUADRADO (2).png",
  "1166454162": "/thumbnails/DOURADO QUADRADO (2).png",
  // Conjunto Renata
  "1166454958": "/thumbnails/CONJUNTO RENATA.png",
  "1166454814": "/thumbnails/CONJUNTO RENATA.png",
  // Vestido Lari
  "1166454494": "/thumbnails/DOURADO QUADRADO (3).png",
  "1166454409": "/thumbnails/DOURADO QUADRADO (3).png",
  "1166454722": "/thumbnails/DOURADO QUADRADO (3).png",
  // Vestido Nay
  "1166454610": "/thumbnails/VERDE QUADRADO (1).png",
  "1166454887": "/thumbnails/VERDE QUADRADO (1).png",
  // Conjunto Íris
  "1166453580": "/thumbnails/CONJUNTO RENATA (1).png",
  "1166453263": "/thumbnails/CONJUNTO RENATA (1).png",
  // Conjunto Salles
  "1166454066": "/thumbnails/DOURADO QUADRADO (4).png",
  "1166453471": "/thumbnails/DOURADO QUADRADO (4).png",
  "1166453995": "/thumbnails/DOURADO QUADRADO (4).png",
  // Conjunto Scheila
  "1166453825": "/thumbnails/CONJUNTO RENATA (2).png",
  "1166453931": "/thumbnails/CONJUNTO RENATA (2).png",
  // Cropped Angel
  "1166453227": "/thumbnails/DOURADO QUADRADO (7).png",
  // Cropped Anitta
  "1166452434": "/thumbnails/DOURADO QUADRADO (5).png",
  // Cropped Maré
  "1166452773": "/thumbnails/CONJUNTO RENATA (3).png",
  // Vestido Estrella
  "1166452653": "/thumbnails/CONJUNTO RENATA (4).png",
  "1166453163": "/thumbnails/CONJUNTO RENATA (4).png",
  // Vestido Lore (4 partes)
  "1166452912": "/thumbnails/VESTIDO LORE.png",
  "1166452540": "/thumbnails/VESTIDO LORE.png",
  "1166453001": "/thumbnails/VESTIDO LORE.png",
  "1166453073": "/thumbnails/VESTIDO LORE.png",
  // Vestido Gaia
  "1166452269": "/thumbnails/CONJUNTO RENATA (6).png",
  "1166452022": "/thumbnails/CONJUNTO RENATA (6).png",
  // Vestido Yasmin
  "1166451870": "/thumbnails/CONJUNTO RENATA (7).png",
  "1166452191": "/thumbnails/CONJUNTO RENATA (7).png",
  "1166451669": "/thumbnails/CONJUNTO RENATA (7).png",
  // Conjunto Suri
  "1166451943": "/thumbnails/DOURADO QUADRADO (8).png",
  "1166452358": "/thumbnails/DOURADO QUADRADO (8).png",
  "1166451783": "/thumbnails/DOURADO QUADRADO (8).png",
  "1166452111": "/thumbnails/DOURADO QUADRADO (8).png",
  // Vestido Lorena
  "1166451621": "/thumbnails/lore.jpg",
  "1166451567": "/thumbnails/lore.jpg",
  "1166451424": "/thumbnails/lore.jpg",
  "1166451198": "/thumbnails/lore.jpg",
  "1166451470": "/thumbnails/lore.jpg",
  // Saída Rayssa
  "1166450959": "/thumbnails/CONJUNTO RENATA (8).png",
  "1166451252": "/thumbnails/CONJUNTO RENATA (8).png",
  // Vestido Sol
  "1166451054": "/thumbnails/VEERDE VERTICAL.png",
  "1166451321": "/thumbnails/VEERDE VERTICAL.png",
  "1166451140": "/thumbnails/VEERDE VERTICAL.png",
  // Vestido Abacaxi
  "1166450255": "/thumbnails/CONJUNTO RENATA (9).png",
  "1166450136": "/thumbnails/CONJUNTO RENATA (9).png",
  // Vestido Bella
  "1166450761": "/thumbnails/CONJUNTO RENATA (10).png",
  "1166450392": "/thumbnails/CONJUNTO RENATA (10).png",
  "1166450675": "/thumbnails/CONJUNTO RENATA (10).png",
  // Vestido e Cropped Julia
  "1166450034": "/thumbnails/VERDE QUADRADO (2).png",
  "1166456882": "/thumbnails/VERDE QUADRADO (2).png",
  // Vestido Brunnet
  "1166456663": "/thumbnails/CONJUNTO RENATA (11).png",
  "1166450509": "/thumbnails/CONJUNTO RENATA (11).png",
  "1166450892": "/thumbnails/CONJUNTO RENATA (11).png",
  // Conjunto Tamiris
  "1166455789": "/thumbnails/VERDE QUADRADO (3).png",
  "1166456097": "/thumbnails/VERDE QUADRADO (3).png",
  // Cropped Amari
  "1166456178": "/thumbnails/VERDE QUADRADO (4).png",
  // Cropped Tati
  "1166456612": "/thumbnails/VERDE QUADRADO.png",
  // Vestido Dubai
  "1166456435": "/thumbnails/ROSA VERTICAL.png",
  // Vestido Laís
  "1166456340": "/thumbnails/DOURADO VERTICAL.png",
  "1166456535": "/thumbnails/DOURADO VERTICAL.png",
  "1166456240": "/thumbnails/DOURADO VERTICAL.png",
};

interface CustomVideoPlayerProps {
  videoId: string;
  title: string;
  platform?: "youtube" | "vimeo" | "gdrive";
  autoplay?: boolean;
  showPixMessage?: boolean;
  customThumbnail?: string;
}

export const CustomVideoPlayer = ({ videoId, title, platform = "youtube", autoplay = false, showPixMessage = false, customThumbnail }: CustomVideoPlayerProps) => {
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const iframeContainerRef = useRef<HTMLDivElement>(null);
  const [isPlayingModal, setIsPlayingModal] = useState(false);
  const [showingPixOverlay, setShowingPixOverlay] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const { toast } = useToast();

  // Reset states when video changes
  useEffect(() => {
    setShowingPixOverlay(false);
    setPixCopied(false);
    setIsPlayingInline(false);
    setIsPlayingModal(false);
  }, [videoId]);

  const pixKey = "21965328868";

  const getThumbnailUrl = () => {
    if (customThumbnail) {
      return customThumbnail;
    }
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
    const separator = videoId.includes('?') ? '&' : '?';
    return `https://player.vimeo.com/video/${videoId}${separator}autoplay=1`;
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

  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handlePlay = () => {
    setIsPlayingInline(true);
    setIframeLoaded(false);
  };

  const handleCloseModal = () => {
    setIsPlayingModal(false);
  };

  // Inline playing mode
  if (isPlayingInline) {
    return (
      <Card className="overflow-hidden shadow-card">
        <div ref={iframeContainerRef} className="relative aspect-video bg-black">
          {/* Loading indicator */}
          {!iframeLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black z-10">
              <div className="w-10 h-10 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
              <p className="text-white/70 text-sm font-medium">Carregando, aguarde...</p>
            </div>
          )}
          <iframe
            src={getEmbedUrl()}
            title={title}
            className={`w-full h-full transition-opacity duration-300 ${iframeLoaded ? "opacity-100" : "opacity-0"}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIframeLoaded(true)}
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
            loading="eager"
            onLoad={() => setThumbnailLoaded(true)}
            onError={(e) => {
              if (platform === "youtube" && !customThumbnail && !customThumbnails[videoId]) {
                e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-destructive/90 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-destructive animate-pulse-slow">
              <Play className="w-5 h-5 md:w-6 md:h-6 text-white fill-current ml-0.5" />
            </div>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-center">
            <h3 className="text-white text-xs md:text-sm font-medium drop-shadow-lg line-clamp-2">
              {title}
            </h3>
            <p className="text-white/60 text-[10px] md:text-xs mt-0.5">
              Clique para assistir
            </p>
          </div>
        </div>
      </Card>
    </>
  );
};
