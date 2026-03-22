import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CustomVideoPlayer } from "@/components/CustomVideoPlayer";
import { useIsMobile } from "@/hooks/use-mobile";
import { VideoCard } from "@/components/VideoCard";
import { Input } from "@/components/ui/input";
import { useFavorites } from "@/hooks/use-favorites";

const VestidosInfantis = () => {
  const isMobile = useIsMobile();
  const videos = [
    { id: 1, title: "Roupinha Infantil - Aula 1", duration: "Vídeo completo", thumbnail: "https://drive.google.com/thumbnail?id=13wBbHiOR_8_oLPWJ3HmoqIPdHFueK6jy", videoId: "13wBbHiOR_8_oLPWJ3HmoqIPdHFueK6jy", platform: "gdrive" as const },
    { id: 2, title: "Roupinha Infantil - Aula 2", duration: "Vídeo completo", thumbnail: "https://drive.google.com/thumbnail?id=15yQAl2f_wZIf8FVzeM8ldSmHybKVzGSI", videoId: "15yQAl2f_wZIf8FVzeM8ldSmHybKVzGSI", platform: "gdrive" as const },
    { id: 3, title: "Roupinha Infantil - Aula 3", duration: "Vídeo completo", thumbnail: "https://drive.google.com/thumbnail?id=1O5WB357pXITJ-RfE_KBTWpPn7V6qGkgw", videoId: "1O5WB357pXITJ-RfE_KBTWpPn7V6qGkgw", platform: "gdrive" as const },
    { id: 4, title: "Roupinha Infantil - Aula 4", duration: "Vídeo completo", thumbnail: "https://drive.google.com/thumbnail?id=14iLA_ysURYK8n38sxk0G311YJtAt3oRt", videoId: "14iLA_ysURYK8n38sxk0G311YJtAt3oRt", platform: "gdrive" as const },
    { id: 5, title: "Roupinha Infantil - Aula 5", duration: "Vídeo completo", thumbnail: "https://drive.google.com/thumbnail?id=1bPnhgs5N8KRusKlvQPueqym2w0Y8z8jP", videoId: "1bPnhgs5N8KRusKlvQPueqym2w0Y8z8jP", platform: "gdrive" as const },
    { id: 6, title: "Roupinha Infantil - Aula 6", duration: "Vídeo completo", thumbnail: "https://drive.google.com/thumbnail?id=16ufU8MytgqyPr4Fo7pzAdOO0dRz6LaTa", videoId: "16ufU8MytgqyPr4Fo7pzAdOO0dRz6LaTa", platform: "gdrive" as const },
    { id: 7, title: "Roupinha Infantil - Aula 7", duration: "Vídeo completo", thumbnail: "https://drive.google.com/thumbnail?id=1QqFa2gsQKtDOX3GsgNL0FWl-5zDTbl1Y", videoId: "1QqFa2gsQKtDOX3GsgNL0FWl-5zDTbl1Y", platform: "gdrive" as const },
    { id: 8, title: "Roupinha Infantil - Aula 8", duration: "Vídeo completo", thumbnail: "https://img.youtube.com/vi/EJQXSPohZqc/hqdefault.jpg", videoId: "EJQXSPohZqc", platform: "youtube" as const },
    { id: 9, title: "Roupinha Infantil - Aula 9", duration: "Vídeo completo", thumbnail: "https://img.youtube.com/vi/N_jQNWk-cVc/hqdefault.jpg", videoId: "N_jQNWk-cVc", platform: "youtube" as const },
    { id: 10, title: "Roupinha Infantil - Aula 10", duration: "Vídeo completo", thumbnail: "https://img.youtube.com/vi/ScUQH35_1sg/hqdefault.jpg", videoId: "ScUQH35_1sg", platform: "youtube" as const },
    { id: 11, title: "Roupinha Infantil - Aula 11", duration: "Vídeo completo", thumbnail: "https://img.youtube.com/vi/k2ugSEGPnFo/hqdefault.jpg", videoId: "k2ugSEGPnFo", platform: "youtube" as const },
    { id: 12, title: "Roupinha Infantil - Aula 12", duration: "Vídeo completo", thumbnail: "https://img.youtube.com/vi/RhIdNOeYNr0/hqdefault.jpg", videoId: "RhIdNOeYNr0", platform: "youtube" as const },
    { id: 13, title: "Roupinha Infantil - Aula 13", duration: "Vídeo completo", thumbnail: "https://img.youtube.com/vi/jLWHtdpcrOk/hqdefault.jpg", videoId: "jLWHtdpcrOk", platform: "youtube" as const },
    { id: 14, title: "Roupinha Infantil - Aula 14", duration: "Vídeo completo", thumbnail: "https://img.youtube.com/vi/mrncZFKciLA/hqdefault.jpg", videoId: "mrncZFKciLA", platform: "youtube" as const },
    { id: 15, title: "Roupinha Infantil - Aula 15", duration: "Vídeo completo", thumbnail: "https://img.youtube.com/vi/yvcuyrS9Bg0/hqdefault.jpg", videoId: "yvcuyrS9Bg0", platform: "youtube" as const },
    { id: 16, title: "Roupinha Infantil - Aula 16", duration: "Vídeo completo", thumbnail: "https://img.youtube.com/vi/OFb9kJNmJmA/hqdefault.jpg", videoId: "OFb9kJNmJmA", platform: "youtube" as const },
    { id: 17, title: "Roupinha Infantil - Aula 17", duration: "Vídeo completo", thumbnail: "https://img.youtube.com/vi/fk_BMbrKSW0/hqdefault.jpg", videoId: "fk_BMbrKSW0", platform: "youtube" as const },
    { id: 18, title: "Roupinha Infantil - Aula 18", duration: "Vídeo completo", thumbnail: "https://img.youtube.com/vi/5fTTx6za8ws/hqdefault.jpg", videoId: "5fTTx6za8ws", platform: "youtube" as const },
    { id: 19, title: "Roupinha Infantil - Aula 19", duration: "Vídeo completo", thumbnail: "https://img.youtube.com/vi/iYpLXKpVJJw/hqdefault.jpg", videoId: "iYpLXKpVJJw", platform: "youtube" as const },
    { id: 20, title: "Roupinha Infantil - Aula 20", duration: "Vídeo completo", thumbnail: "https://img.youtube.com/vi/Od8OXgIRm_A/hqdefault.jpg", videoId: "Od8OXgIRm_A", platform: "youtube" as const },
    { id: 21, title: "Roupinha Infantil - Aula 21", duration: "Vídeo completo", thumbnail: "https://img.youtube.com/vi/6JOFC9xUwA4/hqdefault.jpg", videoId: "6JOFC9xUwA4", platform: "youtube" as const },
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVideoSelect = (index: number) => {
    const actualIndex = videos.findIndex(v => v.id === filteredVideos[index].id);
    setCurrentVideoIndex(actualIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6 hover:bg-accent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar aos Módulos
          </Button>
        </Link>

        <div className="text-center mb-8 animate-fade-in">
          <Heart className="w-8 h-8 text-primary fill-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Roupinhas Infantil</h1>
          <p className="text-muted-foreground text-lg">Coleção especial de roupinhas adoráveis para bebês e crianças</p>
        </div>

        {/* Player */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="animate-fade-in">
            <div className={isMobile ? "aspect-[4/3] sm:aspect-video" : ""}>
              <CustomVideoPlayer
                videoId={videos[currentVideoIndex].videoId}
                title={videos[currentVideoIndex].title}
                platform={videos[currentVideoIndex].platform}
                autoplay={true}
                showPixMessage={false}
                customThumbnail={videos[currentVideoIndex].thumbnail}
              />
            </div>
            <div className="flex gap-3 mt-2">
              <Button variant="outline" onClick={handlePrevious} disabled={currentVideoIndex === 0} className="flex-1">
                <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
              </Button>
              <Button variant="outline" size="icon"
                onClick={() => toggleFavorite({ videoId: videos[currentVideoIndex].videoId, title: videos[currentVideoIndex].title, thumbnail: videos[currentVideoIndex].thumbnail, module: "Roupinhas Infantil", modulePath: "/vestidos-infantis" })}
                className={`shrink-0 ${isFavorite(videos[currentVideoIndex].videoId) ? 'text-primary border-primary/50 bg-primary/10' : ''}`}
                aria-label="Favoritar"
              >
                <Heart className={`h-4 w-4 ${isFavorite(videos[currentVideoIndex].videoId) ? 'fill-current' : ''}`} />
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
          <div className="max-w-2xl mx-auto mb-6">
            <Input placeholder="Buscar aula..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="h-10" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredVideos.map((video, index) => {
              const actualIndex = videos.findIndex(v => v.id === video.id);
              return (
                <div key={video.id} className="animate-fade-in" style={{ animationDelay: `${Math.min(index, 10) * 0.03}s` }}>
                  <VideoCard
                    title={video.title} duration={video.duration} thumbnail={video.thumbnail}
                    videoNumber={video.id} isActive={actualIndex === currentVideoIndex}
                    isFavorite={isFavorite(video.videoId)}
                    onToggleFavorite={() => toggleFavorite({ videoId: video.videoId, title: video.title, thumbnail: video.thumbnail, module: "Roupinhas Infantil", modulePath: "/vestidos-infantis" })}
                    onClick={() => handleVideoSelect(index)}
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* Sobre */}
        <div className="max-w-4xl mx-auto mt-10">
          <Card className="shadow-card animate-fade-in">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Sobre esta Coleção</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nossa coleção de roupinhas infantis foi cuidadosamente desenvolvida pensando no conforto, 
                segurança e beleza. Cada modelo inclui receitas detalhadas com instruções específicas para 
                diferentes tamanhos e idades.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-foreground">Fios Adequados</h4>
                    <p className="text-sm text-muted-foreground">Materiais seguros e confortáveis</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-foreground">Tamanhos Variados</h4>
                    <p className="text-sm text-muted-foreground">Do recém-nascido até 6 anos</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">Atualizações feitas diariamente! 🥰🙏</p>
        </div>
      </div>
    </div>
  );
};

export default VestidosInfantis;
