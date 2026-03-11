import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { VideoCard } from "@/components/VideoCard";
import { Input } from "@/components/ui/input";
import vestidosInfantis from "@/assets/vestidos-infantis.jpg";
import { useFavorites } from "@/hooks/use-favorites";

const VestidosInfantis = () => {
  const videos = [
    { id: 1, title: "Roupinha Infantil - Aula 1", duration: "Vídeo completo", thumbnail: "https://drive.google.com/thumbnail?id=13wBbHiOR_8_oLPWJ3HmoqIPdHFueK6jy", driveId: "13wBbHiOR_8_oLPWJ3HmoqIPdHFueK6jy", category: "Roupinha" },
    { id: 2, title: "Roupinha Infantil - Aula 2", duration: "Vídeo completo", thumbnail: "https://drive.google.com/thumbnail?id=15yQAl2f_wZIf8FVzeM8ldSmHybKVzGSI", driveId: "15yQAl2f_wZIf8FVzeM8ldSmHybKVzGSI", category: "Roupinha" },
    { id: 3, title: "Roupinha Infantil - Aula 3", duration: "Vídeo completo", thumbnail: "https://drive.google.com/thumbnail?id=1O5WB357pXITJ-RfE_KBTWpPn7V6qGkgw", driveId: "1O5WB357pXITJ-RfE_KBTWpPn7V6qGkgw", category: "Roupinha" },
    { id: 4, title: "Roupinha Infantil - Aula 4", duration: "Vídeo completo", thumbnail: "https://drive.google.com/thumbnail?id=14iLA_ysURYK8n38sxk0G311YJtAt3oRt", driveId: "14iLA_ysURYK8n38sxk0G311YJtAt3oRt", category: "Roupinha" },
    { id: 5, title: "Roupinha Infantil - Aula 5", duration: "Vídeo completo", thumbnail: "https://drive.google.com/thumbnail?id=1bPnhgs5N8KRusKlvQPueqym2w0Y8z8jP", driveId: "1bPnhgs5N8KRusKlvQPueqym2w0Y8z8jP", category: "Roupinha" },
    { id: 6, title: "Roupinha Infantil - Aula 6", duration: "Vídeo completo", thumbnail: "https://drive.google.com/thumbnail?id=16ufU8MytgqyPr4Fo7pzAdOO0dRz6LaTa", driveId: "16ufU8MytgqyPr4Fo7pzAdOO0dRz6LaTa", category: "Roupinha" },
    { id: 7, title: "Roupinha Infantil - Aula 7", duration: "Vídeo completo", thumbnail: "https://drive.google.com/thumbnail?id=1QqFa2gsQKtDOX3GsgNL0FWl-5zDTbl1Y", driveId: "1QqFa2gsQKtDOX3GsgNL0FWl-5zDTbl1Y", category: "Roupinha" },
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 6;
  const { isFavorite, toggleFavorite } = useFavorites();

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const paginatedVideos = filteredVideos.slice(startIndex, startIndex + videosPerPage);

  const handleVideoSelect = (index: number) => {
    const actualIndex = videos.findIndex(v => v.id === paginatedVideos[index].id);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6 hover:bg-accent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar aos Módulos
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-primary fill-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Roupinhas Infantil
          </h1>
          <p className="text-muted-foreground text-lg">
            Coleção especial de roupinhas adoráveis para bebês e crianças
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Player Principal */}
          <div className="lg:col-span-2 space-y-6">
            <div className="animate-fade-in">
              <VideoPlayer
                videoId={videos[currentVideoIndex].driveId}
                title={videos[currentVideoIndex].title}
                platform="gdrive"
              />
            </div>

            <Card className="shadow-card animate-scale-in">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        Aula {currentVideoIndex + 1} de {videos.length}
                      </span>
                      <span className="bg-accent/50 text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {videos[currentVideoIndex].category}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {videos[currentVideoIndex].title}
                    </h2>
                    <p className="text-muted-foreground">
                      Duração: {videos[currentVideoIndex].duration}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentVideoIndex === 0}
                    className="flex-1"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Anterior
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={currentVideoIndex === videos.length - 1}
                    className="flex-1"
                  >
                    Próximo
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Mobile Video List */}
            <div className="lg:hidden">
              <Card className="shadow-card animate-fade-in">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Todas as Aulas ({videos.length})
                  </h3>
                  <Input
                    placeholder="Buscar aula..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="mb-4"
                  />
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {paginatedVideos.map((video, index) => {
                      const actualIndex = videos.findIndex(v => v.id === video.id);
                      return (
                        <VideoCard
                          key={video.id}
                          title={video.title}
                          duration={video.duration}
                          thumbnail={video.thumbnail}
                          videoNumber={video.id}
                          isActive={actualIndex === currentVideoIndex}
                          isFavorite={isFavorite(video.driveId)}
                          onToggleFavorite={() => toggleFavorite({ videoId: video.driveId, title: video.title, thumbnail: video.thumbnail, module: "Roupinhas Infantil", modulePath: "/vestidos-infantis" })}
                          onClick={() => handleVideoSelect(index)}
                        />
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sobre esta Aula */}
            <Card className="shadow-card animate-fade-in">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Sobre esta Coleção
                </h3>
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

          {/* Desktop Video List */}
          <div className="hidden lg:block lg:col-span-1">
            <Card className="sticky top-8 shadow-card animate-fade-in">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Todas as Aulas ({videos.length})
                </h3>

                <Input
                  placeholder="Buscar aula..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="mb-4"
                />

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {paginatedVideos.map((video, index) => {
                    const actualIndex = videos.findIndex(v => v.id === video.id);
                    return (
                      <div key={video.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                        <VideoCard
                          title={video.title}
                          duration={video.duration}
                          thumbnail={video.thumbnail}
                          videoNumber={video.id}
                          isActive={actualIndex === currentVideoIndex}
                          isFavorite={isFavorite(video.driveId)}
                          onToggleFavorite={() => toggleFavorite({ videoId: video.driveId, title: video.title, thumbnail: video.thumbnail, module: "Roupinhas Infantil", modulePath: "/vestidos-infantis" })}
                          onClick={() => handleVideoSelect(index)}
                        />
                      </div>
                    );
                  })}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Página {currentPage} de {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Atualizações feitas diariamente! 🥰🙏
          </p>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: hsl(var(--muted));
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary));
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary) / 0.8);
        }
      `}</style>
    </div>
  );
};

export default VestidosInfantis;
