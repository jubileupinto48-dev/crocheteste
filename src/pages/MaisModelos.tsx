import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CustomVideoPlayer } from "@/components/CustomVideoPlayer";
import { VideoCard } from "@/components/VideoCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { useFavorites } from "@/hooks/use-favorites";

const customThumbnails: Record<string, string> = {
  // Conjunto Rosas
  "1165896656?h=71c1d6054e": "/thumbnails/conjunto rosas.jpg",
  // Top Estrela Brasil
  "1165908076?h=3b842fbf9d": "/thumbnails/S-Vp3QiN1Tk-HD.jpg",
  // Conjunto Franja
  "1165823586?h=95ae5df629": "/thumbnails/CONJUNTO FRANJAS.png",
  "1165823379?h=de1eeffff5": "/thumbnails/CONJUNTO FRANJAS.png",
  // Conjunto Square
  "1165896871?h=f4895dbef0": "/thumbnails/Square.jpg",
  // Cropped Duda
  "1165825953?h=b67785daa5": "/thumbnails/CROPPED DUDA.png",
  // Cropped Lola
  "1165828668?h=95dd4603c4": "/thumbnails/CROPPED LOLA.png",
  // Conjunto Cali
  "1165828774?h=0add065419": "/thumbnails/CONJJUNTO CALI.png",
  "1165828605?h=58d11062d4": "/thumbnails/CONJJUNTO CALI.png",
  "1165828438?h=456ae1cdb5": "/thumbnails/CONJJUNTO CALI.png",
  "1165828229?h=4acb08a378": "/thumbnails/CONJJUNTO CALI.png",
  // Calça Correntinha
  "1165823422?h=3bad21440c": "/thumbnails/CALÇA CORRENTINHA.png",
  // Conjunto Lore
  "1165827131?h=c55fa2bddb": "/thumbnails/VESTIDO LORE.png",
  "1165827332?h=75278547ee": "/thumbnails/VESTIDO LORE.png",
  "1165824975?h=29ac896d60": "/thumbnails/VESTIDO LORE.png",
  // Saia Laura
  "1165823777?h=2148619f8b": "/thumbnails/SAIA LAURA.png",
  // Conjunto Gabi
  "1165823492?h=049b68c02a": "/thumbnails/CONJUNTO GABI.png",
  "1165823953?h=6133197ea0": "/thumbnails/CONJUNTO GABI.png",
  "1165823551?h=e845f3f59b": "/thumbnails/CONJUNTO GABI.png",
  // Macacão Grassi
  "1165828975?h=b2f003a62f": "/thumbnails/MACACÃO GRASSI.png",
  "1165829345?h=67f801752d": "/thumbnails/MACACÃO GRASSI.png",
  // Calça Tela
  "1165823210?h=b5372b698b": "/thumbnails/CALÇA TELA.png",
  // Conjunto com Paetê Acrílico
  "1165823127?h=80846c06c2": "/thumbnails/CONJUNTO PAETE.png",
  // Cropped Ana Clara
  "1165823296?h=588db44c04": "/thumbnails/CROPPED ANNA CLARA.png",
  // Suéter Sofia
  "1165829840?h=bda1e8e5be": "/thumbnails/SUÉTER SOFIA.png",
  "1165828330?h=b9b9868fd2": "/thumbnails/SUÉTER SOFIA.png",
  // Conjunto Lisi
  "1165825489?h=4953414a7c": "/thumbnails/CONJUNTO LISI.png",
  "1165825673?h=fb8f804677": "/thumbnails/CONJUNTO LISI.png",
  // Biquíni Eva
  "1165826908?h=cf3b0678ab": "/thumbnails/BIQUINI EVA.png",
  // Saia Amanda
  "1165826996?h=639389fcf0": "/thumbnails/SAIA AMANDA.png",
  // Saia Nina
  "1165825423?h=8cfc5ddc23": "/thumbnails/SAIA NINA.png",
  // Conjunto Letícia
  "1165867234?h=6e2eed84e2": "/thumbnails/CONJUNTO LETICIA.png",
  // Sousplato Girafa
  "1165898764?h=290f75b513": "/thumbnails/sousplate.jpg",
  // Saida Tereza
  "1165899713?h=063db9139d": "/thumbnails/tereza.jpg",
  // Saida Shirley
  "1165908374?h=954ee77336": "/thumbnails/XReZUJvzft0-HD.jpg",
  // Saida Renata
  "1165899950?h=65fb9d0fc3": "/thumbnails/renata.jpg",
  // Saida Betania
  "1165900227?h=ab8c1eb8e3": "/thumbnails/betania.jpg",
  // Saida Midi
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
  // Biquini Rendado
  "1165415971?h=dd327a58fb": "/thumbnails/fKLX4pMjmck-HD.jpg",
  // Conjunto Crochê Brilho
  "1165902686?h=192b4bb0cb": "/thumbnails/conjunto brilho.jpg",
  // Conjunto Praiana
  "1165902854?h=c106849f13": "/thumbnails/Praiana.jpg",
  // Conjunto Camila
  "1165905050?h=ddfb626d58": "/thumbnails/camila.jpg",
  // Calça Thais
  "1165905314?h=0abf93f051": "/thumbnails/calça thais.jpg",
  // Saida Brasil
  "1165908138?h=11ec544581": "/thumbnails/DxUeSn4p-Rg-HD.jpg",
  // Biquini Tomara que Caia
  "1165416602?h=239fa20e43": "/thumbnails/vrCyt1O4SjU-HD.jpg",
  // Top Brasil
  "1165908193?h=44ce060d5e": "/thumbnails/IRnqSP9VCsg-HD.jpg",
  // === Novos vídeos do módulo de vestidos ===
  // Conjunto Zelly
  "1166455028": "/thumbnails/DOURADO QUADRADO (1).png",
  "1166455627": "/thumbnails/DOURADO QUADRADO (1).png",
  "1166455708": "/thumbnails/DOURADO QUADRADO (1).png",
  // Cropped Livia
  "1166455527": "/thumbnails/DOURADO QUADRADO (6).png",
  // Conjunto Renata
  "1166454958": "/thumbnails/CONJUNTO RENATA.png",
  "1166454814": "/thumbnails/CONJUNTO RENATA.png",
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
  // Conjunto Suri
  "1166451943": "/thumbnails/DOURADO QUADRADO (8).png",
  "1166452358": "/thumbnails/DOURADO QUADRADO (8).png",
  "1166451783": "/thumbnails/DOURADO QUADRADO (8).png",
  "1166452111": "/thumbnails/DOURADO QUADRADO (8).png",
  // Conjunto Tamiris
  "1166455789": "/thumbnails/VERDE QUADRADO (3).png",
  "1166456097": "/thumbnails/VERDE QUADRADO (3).png",
  // Cropped Amari
  "1166456178": "/thumbnails/VERDE QUADRADO (4).png",
  // Cropped Tati
  "1166456612": "/thumbnails/VERDE QUADRADO.png",
};

const getVideoThumbnail = (videoId: string, platform?: string) => {
  if (customThumbnails[videoId]) return customThumbnails[videoId];
  if (platform === "vimeo") return `https://vumbnail.com/${videoId.split('?')[0]}.jpg`;
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
};

const MaisModelos = () => {
  const isMobile = useIsMobile();

  const videos_raw = [
    { id: 1, title: "Conjunto Rosas", videoId: "1165896656?h=71c1d6054e", project: "Conjunto Rosas", part: null, platform: "vimeo" as const },
    { id: 2, title: "Top Estrela Brasil", videoId: "1165908076?h=3b842fbf9d", project: "Top Estrela Brasil", part: null, platform: "vimeo" as const },
    { id: 3, title: "Conjunto Franja - Parte 1", videoId: "1165823586?h=95ae5df629", project: "Conjunto Franja", part: 1, platform: "vimeo" as const },
    { id: 4, title: "Conjunto Franja - Parte 2", videoId: "1165823379?h=de1eeffff5", project: "Conjunto Franja", part: 2, platform: "vimeo" as const },
    { id: 5, title: "Conjunto Square", videoId: "1165896871?h=f4895dbef0", project: "Conjunto Square", part: null, platform: "vimeo" as const },
    { id: 6, title: "Cropped Duda", videoId: "1165825953?h=b67785daa5", project: "Cropped Duda", part: null, platform: "vimeo" as const },
    { id: 7, title: "Cropped Lola", videoId: "1165828668?h=95dd4603c4", project: "Cropped Lola", part: null, platform: "vimeo" as const },
    { id: 8, title: "Conjunto Cali - Parte 1", videoId: "1165828774?h=0add065419", project: "Conjunto Cali", part: 1, platform: "vimeo" as const },
    { id: 9, title: "Conjunto Cali - Parte 2", videoId: "1165828605?h=58d11062d4", project: "Conjunto Cali", part: 2, platform: "vimeo" as const },
    { id: 10, title: "Conjunto Cali - Parte 3", videoId: "1165828438?h=456ae1cdb5", project: "Conjunto Cali", part: 3, platform: "vimeo" as const },
    { id: 11, title: "Conjunto Cali - Parte 4", videoId: "1165828229?h=4acb08a378", project: "Conjunto Cali", part: 4, platform: "vimeo" as const },
    { id: 12, title: "Calça Correntinha", videoId: "1165823422?h=3bad21440c", project: "Calça Correntinha", part: null, platform: "vimeo" as const },
    { id: 13, title: "Conjunto Lore - Parte 1", videoId: "1165827131?h=c55fa2bddb", project: "Conjunto Lore", part: 1, platform: "vimeo" as const },
    { id: 14, title: "Conjunto Lore - Parte 2", videoId: "1165827332?h=75278547ee", project: "Conjunto Lore", part: 2, platform: "vimeo" as const },
    { id: 15, title: "Conjunto Lore - Parte 3", videoId: "1165824975?h=29ac896d60", project: "Conjunto Lore", part: 3, platform: "vimeo" as const },
    { id: 16, title: "Saia Laura", videoId: "1165823777?h=2148619f8b", project: "Saia Laura", part: null, platform: "vimeo" as const },
    { id: 17, title: "Conjunto Gabi - Parte 1", videoId: "1165823492?h=049b68c02a", project: "Conjunto Gabi", part: 1, platform: "vimeo" as const },
    { id: 18, title: "Conjunto Gabi - Parte 2", videoId: "1165823953?h=6133197ea0", project: "Conjunto Gabi", part: 2, platform: "vimeo" as const },
    { id: 19, title: "Conjunto Gabi - Dica Extra", videoId: "1165823551?h=e845f3f59b", project: "Conjunto Gabi", part: 3, platform: "vimeo" as const },
    { id: 20, title: "Macacão Grassi - Parte 1", videoId: "1165828975?h=b2f003a62f", project: "Macacão Grassi", part: 1, platform: "vimeo" as const },
    { id: 21, title: "Macacão Grassi - Parte 2", videoId: "1165829345?h=67f801752d", project: "Macacão Grassi", part: 2, platform: "vimeo" as const },
    { id: 22, title: "Calça Tela", videoId: "1165823210?h=b5372b698b", project: "Calça Tela", part: null, platform: "vimeo" as const },
    { id: 23, title: "Conjunto com Paetê Acrílico", videoId: "1165823127?h=80846c06c2", project: "Conjunto com Paetê Acrílico", part: null, platform: "vimeo" as const },
    { id: 24, title: "Cropped Ana Clara", videoId: "1165823296?h=588db44c04", project: "Cropped Ana Clara", part: null, platform: "vimeo" as const },
    { id: 25, title: "Suéter Sofia - Parte 1", videoId: "1165829840?h=bda1e8e5be", project: "Suéter Sofia", part: 1, platform: "vimeo" as const },
    { id: 26, title: "Suéter Sofia - Parte 2", videoId: "1165828330?h=b9b9868fd2", project: "Suéter Sofia", part: 2, platform: "vimeo" as const },
    { id: 27, title: "Conjunto Lisi - Parte 1", videoId: "1165825489?h=4953414a7c", project: "Conjunto Lisi", part: 1, platform: "vimeo" as const },
    { id: 28, title: "Conjunto Lisi - Parte 2", videoId: "1165825673?h=fb8f804677", project: "Conjunto Lisi", part: 2, platform: "vimeo" as const },
    { id: 29, title: "Biquíni Eva", videoId: "1165826908?h=cf3b0678ab", project: "Biquíni Eva", part: null, platform: "vimeo" as const },
    { id: 30, title: "Saia Amanda", videoId: "1165826996?h=639389fcf0", project: "Saia Amanda", part: null, platform: "vimeo" as const },
    { id: 31, title: "Saia Nina", videoId: "1165825423?h=8cfc5ddc23", project: "Saia Nina", part: null, platform: "vimeo" as const },
    { id: 32, title: "Conjunto Letícia", videoId: "1165867234?h=6e2eed84e2", project: "Conjunto Letícia", part: null, platform: "vimeo" as const },
    { id: 33, title: "Sousplato Girafa", videoId: "1165898764?h=290f75b513", project: "Sousplato Girafa", part: null, platform: "vimeo" as const },
    { id: 34, title: "Saida Tereza", videoId: "1165899713?h=063db9139d", project: "Saida Tereza", part: null, platform: "vimeo" as const },
    { id: 35, title: "Saida Shirley", videoId: "1165908374?h=954ee77336", project: "Saida Shirley", part: null, platform: "vimeo" as const },
    { id: 36, title: "Saida Renata", videoId: "1165899950?h=65fb9d0fc3", project: "Saida Renata", part: null, platform: "vimeo" as const },
    { id: 37, title: "Saida Betania", videoId: "1165900227?h=ab8c1eb8e3", project: "Saida Betania", part: null, platform: "vimeo" as const },
    { id: 38, title: "Saida Midi", videoId: "1165900453?h=3a7d240268", project: "Saida Midi", part: null, platform: "vimeo" as const },
    { id: 39, title: "Cropped Garden", videoId: "1165900701?h=fc8686d056", project: "Cropped Garden", part: null, platform: "vimeo" as const },
    { id: 40, title: "Corset de Crochê", videoId: "1165900912?h=25ab81c66e", project: "Corset de Crochê", part: null, platform: "vimeo" as const },
    { id: 41, title: "Corset Angel", videoId: "1165901257?h=ba7889f004", project: "Corset Angel", part: null, platform: "vimeo" as const },
    { id: 42, title: "Corset em V", videoId: "1165901491?h=5bf59bc49e", project: "Corset em V", part: null, platform: "vimeo" as const },
    { id: 43, title: "Conjunto Tereza", videoId: "1165901832?h=5c0b941af2", project: "Conjunto Tereza", part: null, platform: "vimeo" as const },
    { id: 44, title: "Conjunto Tardezinha", videoId: "1165902033?h=67a0e24c41", project: "Conjunto Tardezinha", part: null, platform: "vimeo" as const },
    { id: 45, title: "Biquini Rendado", videoId: "1165415971?h=dd327a58fb", project: "Biquini Rendado", part: null, platform: "vimeo" as const },
    { id: 46, title: "Conjunto de Crochê Brilho", videoId: "1165902686?h=192b4bb0cb", project: "Conjunto Crochê Brilho", part: null, platform: "vimeo" as const },
    { id: 47, title: "Conjunto Praiana", videoId: "1165902854?h=c106849f13", project: "Conjunto Praiana", part: null, platform: "vimeo" as const },
    { id: 48, title: "Conjunto Camila", videoId: "1165905050?h=ddfb626d58", project: "Conjunto Camila", part: null, platform: "vimeo" as const },
    { id: 49, title: "Calça Thais", videoId: "1165905314?h=0abf93f051", project: "Calça Thais", part: null, platform: "vimeo" as const },
    { id: 50, title: "Saida Brasil", videoId: "1165908138?h=11ec544581", project: "Saida Brasil", part: null, platform: "vimeo" as const },
    { id: 51, title: "Biquini Tomara que Caia", videoId: "1165416602?h=239fa20e43", project: "Biquini Tomara que Caia", part: null, platform: "vimeo" as const },
    { id: 52, title: "Top Brasil", videoId: "1165908193?h=44ce060d5e", project: "Top Brasil", part: null, platform: "vimeo" as const },
    // === Novos vídeos do módulo de vestidos ===
    { id: 53, title: "Conjunto Zelly - Parte 1", videoId: "1166455028", project: "Conjunto Zelly", part: 1, platform: "vimeo" as const },
    { id: 54, title: "Conjunto Zelly - Parte 2", videoId: "1166455627", project: "Conjunto Zelly", part: 2, platform: "vimeo" as const },
    { id: 55, title: "Conjunto Zelly - Parte 3", videoId: "1166455708", project: "Conjunto Zelly", part: 3, platform: "vimeo" as const },
    { id: 56, title: "Cropped Livia", videoId: "1166455527", project: "Cropped Livia", part: null, platform: "vimeo" as const },
    { id: 57, title: "Conjunto Renata - Parte 1", videoId: "1166454958", project: "Conjunto Renata", part: 1, platform: "vimeo" as const },
    { id: 58, title: "Conjunto Renata - Parte 2", videoId: "1166454814", project: "Conjunto Renata", part: 2, platform: "vimeo" as const },
    { id: 59, title: "Conjunto Íris - Parte 1", videoId: "1166453580", project: "Conjunto Íris", part: 1, platform: "vimeo" as const },
    { id: 60, title: "Conjunto Íris - Parte 2", videoId: "1166453263", project: "Conjunto Íris", part: 2, platform: "vimeo" as const },
    { id: 61, title: "Conjunto Salles - Parte 1", videoId: "1166454066", project: "Conjunto Salles", part: 1, platform: "vimeo" as const },
    { id: 62, title: "Conjunto Salles - Parte 2", videoId: "1166453471", project: "Conjunto Salles", part: 2, platform: "vimeo" as const },
    { id: 63, title: "Conjunto Salles - Parte 3", videoId: "1166453995", project: "Conjunto Salles", part: 3, platform: "vimeo" as const },
    { id: 64, title: "Conjunto Scheila - Parte 1", videoId: "1166453825", project: "Conjunto Scheila", part: 1, platform: "vimeo" as const },
    { id: 65, title: "Conjunto Scheila - Parte 2", videoId: "1166453931", project: "Conjunto Scheila", part: 2, platform: "vimeo" as const },
    { id: 66, title: "Cropped Angel", videoId: "1166453227", project: "Cropped Angel", part: null, platform: "vimeo" as const },
    { id: 67, title: "Cropped Anitta", videoId: "1166452434", project: "Cropped Anitta", part: null, platform: "vimeo" as const },
    { id: 68, title: "Cropped Maré", videoId: "1166452773", project: "Cropped Maré", part: null, platform: "vimeo" as const },
    { id: 69, title: "Conjunto Suri - Parte 1", videoId: "1166451943", project: "Conjunto Suri", part: 1, platform: "vimeo" as const },
    { id: 70, title: "Conjunto Suri - Parte 2", videoId: "1166452358", project: "Conjunto Suri", part: 2, platform: "vimeo" as const },
    { id: 71, title: "Conjunto Suri - Parte 3", videoId: "1166451783", project: "Conjunto Suri", part: 3, platform: "vimeo" as const },
    { id: 72, title: "Conjunto Suri - Parte 4", videoId: "1166452111", project: "Conjunto Suri", part: 4, platform: "vimeo" as const },
    { id: 73, title: "Conjunto Tamiris - Parte 1", videoId: "1166455789", project: "Conjunto Tamiris", part: 1, platform: "vimeo" as const },
    { id: 74, title: "Conjunto Tamiris - Parte 2", videoId: "1166456097", project: "Conjunto Tamiris", part: 2, platform: "vimeo" as const },
    { id: 75, title: "Cropped Amari", videoId: "1166456178", project: "Cropped Amari", part: null, platform: "vimeo" as const },
    { id: 76, title: "Cropped Tati", videoId: "1166456612", project: "Cropped Tati", part: null, platform: "vimeo" as const },
  ];

  const videos = videos_raw;

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProject, setFilterProject] = useState("all");
  const { isFavorite, toggleFavorite } = useFavorites();

  const uniqueProjects = [...new Set(videos.map(v => v.project))].sort();

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          video.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = filterProject === "all" || video.project === filterProject;
    return matchesSearch && matchesProject;
  });

  const handleVideoSelect = (index: number) => {
    const actualIndex = videos.findIndex(v => v.id === filteredVideos[index].id);
    setCurrentVideoIndex(actualIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentVideo = videos[currentVideoIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6 hover:bg-accent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar aos Módulos
          </Button>
        </Link>

        {/* Player Principal */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="animate-fade-in">
            <div className={isMobile ? "aspect-[4/3] sm:aspect-video" : ""}>
              <CustomVideoPlayer
                videoId={currentVideo.videoId}
                title={currentVideo.title}
                platform={currentVideo.platform}
                autoplay={true}
                showPixMessage={false}
                customThumbnail={getVideoThumbnail(currentVideo.videoId, currentVideo.platform)}
              />
            </div>
            <div className="flex gap-3 mt-2">
              <Button variant="outline" onClick={handlePrevious} disabled={currentVideoIndex === 0} className="flex-1">
                <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
              </Button>
              <Button variant="outline" size="icon"
                onClick={() => toggleFavorite({ videoId: currentVideo.videoId, title: currentVideo.title, thumbnail: getVideoThumbnail(currentVideo.videoId, currentVideo.platform), module: "Modelos Adulto", modulePath: "/mais-modelos" })}
                className={`shrink-0 ${isFavorite(currentVideo.videoId) ? 'text-primary border-primary/50 bg-primary/10' : ''}`}
                aria-label="Favoritar"
              >
                <Heart className={`h-4 w-4 ${isFavorite(currentVideo.videoId) ? 'fill-current' : ''}`} />
              </Button>
              <Button onClick={handleNext} disabled={currentVideoIndex === videos.length - 1} className="flex-1">
                Próximo <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Todas as Aulas */}
        <section className="animate-fade-in">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Todas as Aulas ({videos.length})</h2>
            <p className="text-muted-foreground">Clique em qualquer aula para assistir</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6 max-w-2xl mx-auto">
            <Input placeholder="Buscar aula ou projeto..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="h-10" />
            <Select value={filterProject} onValueChange={setFilterProject}>
              <SelectTrigger className="h-10 sm:w-[220px]">
                <SelectValue placeholder="Filtrar por projeto" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                <SelectItem value="all">Todos os projetos</SelectItem>
                {uniqueProjects.map(project => (
                  <SelectItem key={project} value={project}>{project}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredVideos.map((video, index) => {
              const actualIndex = videos.findIndex(v => v.id === video.id);
              return (
                <div key={video.id} className="animate-fade-in" style={{ animationDelay: `${Math.min(index, 10) * 0.03}s` }}>
                  <VideoCard
                    title={video.title}
                    duration={video.part ? `Parte ${video.part}` : "Completo"}
                    thumbnail={getVideoThumbnail(video.videoId, video.platform)}
                    videoNumber={video.id}
                    isActive={actualIndex === currentVideoIndex}
                    isFavorite={isFavorite(video.videoId)}
                    onToggleFavorite={() => toggleFavorite({ videoId: video.videoId, title: video.title, thumbnail: getVideoThumbnail(video.videoId, video.platform), module: "Modelos Adulto", modulePath: "/mais-modelos" })}
                    onClick={() => handleVideoSelect(index)}
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* Sobre */}
        <div className="max-w-4xl mx-auto mt-10">
          <Card className="shadow-card">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Sobre esta Aula</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Neste tutorial completo, você aprenderá todas as técnicas necessárias para 
                criar este lindo {currentVideo.project.toLowerCase()}. Siga o passo a passo com atenção e tire 
                suas dúvidas nos comentários.
              </p>
              <div className="mb-6">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">IA</span>
                  Visualização do Projeto
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-medium">Resultado Final</p>
                    <div className="relative overflow-hidden rounded-lg border border-border bg-muted/30">
                      <img 
                        src={getVideoThumbnail(currentVideo.videoId, currentVideo.platform)} 
                        alt={`Preview do ${currentVideo.project}`}
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-accent/20 border border-accent rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">Materiais Necessários:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Linha de sua preferência (quantidade varia por projeto)</li>
                  <li>• Agulha de crochê adequada para a linha</li>
                  <li>• Tesoura e agulha de tapeçaria</li>
                  <li>• Marcadores de ponto (opcional)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MaisModelos;
