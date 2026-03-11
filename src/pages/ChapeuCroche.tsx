import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Crown, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { VideoCard } from "@/components/VideoCard";
import { Input } from "@/components/ui/input";
import { useFavorites } from "@/hooks/use-favorites";

const ChapeuCroche = () => {
  const videos = [
    // Bucket Hat
    { id: 1, title: "Bucket Hat de Inverno em Crochê - Fio Lã Mollet", duration: "35 min", thumbnail: "https://drive.google.com/thumbnail?id=18BehOZT6V6o0LOZwezDf80WMGrOOeYiF", driveId: "18BehOZT6V6o0LOZwezDf80WMGrOOeYiF", category: "Bucket Hat" },
    
    // Chapéu Infantil
    { id: 2, title: "Chapéu de Crochê Infantil", duration: "28 min", thumbnail: "https://drive.google.com/thumbnail?id=1z4IpQGUOGESZ7tg-tNwxc3Y_HiHJ9RVU", driveId: "1z4IpQGUOGESZ7tg-tNwxc3Y_HiHJ9RVU", category: "Chapéu Infantil" },
    
    // Outros modelos
    { id: 3, title: "Chapéu Infantil - Modelo 2", duration: "30 min", thumbnail: "https://drive.google.com/thumbnail?id=18BehOZT6V6o0LOZwezDf80WMGrOOeYiF", driveId: "18BehOZT6V6o0LOZwezDf80WMGrOOeYiF", category: "Chapéu Infantil" },
    { id: 4, title: "Chapéu Branco de Crochê", duration: "32 min", thumbnail: "https://drive.google.com/thumbnail?id=1z4IpQGUOGESZ7tg-tNwxc3Y_HiHJ9RVU", driveId: "1z4IpQGUOGESZ7tg-tNwxc3Y_HiHJ9RVU", category: "Chapéu" },
    { id: 5, title: "Chapéu de Morango Infantil", duration: "38 min", thumbnail: "https://drive.google.com/thumbnail?id=18BehOZT6V6o0LOZwezDf80WMGrOOeYiF", driveId: "18BehOZT6V6o0LOZwezDf80WMGrOOeYiF", category: "Chapéu Infantil" },
    { id: 6, title: "Chapéu Verde Infantil", duration: "25 min", thumbnail: "https://drive.google.com/thumbnail?id=1z4IpQGUOGESZ7tg-tNwxc3Y_HiHJ9RVU", driveId: "1z4IpQGUOGESZ7tg-tNwxc3Y_HiHJ9RVU", category: "Chapéu Infantil" },
    { id: 7, title: "Touca Olaf de Crochê", duration: "42 min", thumbnail: "https://drive.google.com/thumbnail?id=18BehOZT6V6o0LOZwezDf80WMGrOOeYiF", driveId: "18BehOZT6V6o0LOZwezDf80WMGrOOeYiF", category: "Touca" },
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
            <Crown className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Chapéus de Crochê
          </h1>
          <p className="text-muted-foreground text-lg">
            Modelos lindos de chapéus, bucket hats e toucas para todas as idades
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
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite({ videoId: videos[currentVideoIndex].driveId, title: videos[currentVideoIndex].title, thumbnail: videos[currentVideoIndex].thumbnail, module: "Chapéus de Crochê", modulePath: "/chapeu-croche" })}
                    className={`shrink-0 ml-2 ${isFavorite(videos[currentVideoIndex].driveId) ? 'text-primary' : 'text-muted-foreground'}`}
                    aria-label="Favoritar"
                  >
                    <Heart className={`h-5 w-5 ${isFavorite(videos[currentVideoIndex].driveId) ? 'fill-current' : ''}`} />
                  </Button>
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
                          onToggleFavorite={() => toggleFavorite({ videoId: video.driveId, title: video.title, thumbnail: video.thumbnail, module: "Chapéus de Crochê", modulePath: "/chapeu-croche" })}
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
                  Descubra como fazer lindos chapéus de crochê, desde bucket hats modernos até 
                  toucas divertidas para as crianças. Cada modelo vem com instruções detalhadas 
                  para diferentes tamanhos e idades.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center bg-accent/20 rounded-xl p-4">
                    <div className="text-2xl font-bold text-primary mb-1">7+</div>
                    <p className="text-sm text-muted-foreground">Vídeos</p>
                  </div>
                  <div className="text-center bg-accent/20 rounded-xl p-4">
                    <div className="text-2xl font-bold text-primary mb-1">4</div>
                    <p className="text-sm text-muted-foreground">Categorias</p>
                  </div>
                  <div className="text-center bg-accent/20 rounded-xl p-4">
                    <div className="text-2xl font-bold text-primary mb-1">HD</div>
                    <p className="text-sm text-muted-foreground">Qualidade</p>
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
                          onToggleFavorite={() => toggleFavorite({ videoId: video.driveId, title: video.title, thumbnail: video.thumbnail, module: "Chapéus de Crochê", modulePath: "/chapeu-croche" })}
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

export default ChapeuCroche;
