import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { CustomVideoPlayer } from "@/components/CustomVideoPlayer";
import { VideoCard } from "@/components/VideoCard";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { useFavorites } from "@/hooks/use-favorites";


interface VideoItem {
  id: number;
  title: string;
  duration: string;
  videoId: string;
  category: string;
  completed: boolean;
  platform?: "youtube" | "gdrive" | "vimeo";
}

const CursoCompleto = () => {
  const videos: VideoItem[] = [
    // Novos vídeos do YouTube
    { id: 1, title: "Como pegar na agulha", duration: "3 min", videoId: "1167451333", category: "Técnicas Básicas", completed: false, platform: "vimeo" },
    { id: 2, title: "Como fazer Correntinha", duration: "7 min", videoId: "1167451433", category: "Técnicas Básicas", completed: false, platform: "vimeo" },
    { id: 3, title: "Como fazer Ponto Baixissimo", duration: "5 min", videoId: "1167451668", category: "Técnicas Básicas", completed: false, platform: "vimeo" },
    { id: 4, title: "Como fazer Ponto Baixo", duration: "5 min", videoId: "1167451940", category: "Técnicas Básicas", completed: false, platform: "vimeo" },
    { id: 5, title: "Ponto Meio Alto", duration: "4 min", videoId: "1167452177", category: "Técnicas Básicas", completed: false, platform: "vimeo" },
    { id: 6, title: "Ponto Alto", duration: "4 min", videoId: "1167452407", category: "Técnicas Básicas", completed: false, platform: "vimeo" },
    { id: 7, title: "Ponto Fantasia", duration: "7 min", videoId: "1167452622", category: "Técnicas Básicas", completed: false, platform: "vimeo" },
    // Vídeos existentes (Google Drive convertidos para manter compatibilidade)
    { id: 8, title: "Como fazer a emenda nos Squares #3", duration: "15 min", videoId: "1aZx397mYYgkX1jUuUO3dEzlf-0hEjWUI", category: "Técnicas Básicas", completed: false, platform: "gdrive" },
    { id: 9, title: "Como fazer um círculo com ponto alto", duration: "12 min", videoId: "1aZx397mYYgkX1jUuUO3dEzlf-0hEjWUI", category: "Técnicas Básicas", completed: false, platform: "gdrive" },
    { id: 10, title: "Como segurar a agulha de crochê", duration: "10 min", videoId: "1aZx397mYYgkX1jUuUO3dEzlf-0hEjWUI", category: "Técnicas Básicas", completed: false, platform: "gdrive" },
    { id: 11, title: "Ponto Alto de Crochê", duration: "18 min", videoId: "1aZx397mYYgkX1jUuUO3dEzlf-0hEjWUI", category: "Técnicas Básicas", completed: false, platform: "gdrive" },
    { id: 12, title: "Ponto Baixo de Crochê", duration: "15 min", videoId: "1aZx397mYYgkX1jUuUO3dEzlf-0hEjWUI", category: "Técnicas Básicas", completed: false, platform: "gdrive" },
    { id: 13, title: "Ponto de Picô de Crochê", duration: "12 min", videoId: "1aZx397mYYgkX1jUuUO3dEzlf-0hEjWUI", category: "Técnicas Básicas", completed: false, platform: "gdrive" },
    { id: 14, title: "Linhas e Barbantes de Crochê", duration: "20 min", videoId: "1aZx397mYYgkX1jUuUO3dEzlf-0hEjWUI", category: "Materiais", completed: false, platform: "gdrive" },
    { id: 15, title: "Dicas para Iniciantes", duration: "25 min", videoId: "1aZx397mYYgkX1jUuUO3dEzlf-0hEjWUI", category: "Dicas", completed: false, platform: "gdrive" },
  ];

  const isMobile = useIsMobile();
  const videoListRef = useRef<HTMLDivElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const videosPerPage = 4;

  const categories = ["Técnicas Básicas", "Materiais", "Dicas"];
  
  const completedCount = videos.filter(v => v.completed).length;
  const totalProgress = (completedCount / videos.length) * 100;

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || video.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

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

  const currentVideo = videos[currentVideoIndex];

  const getThumbnail = (video: typeof videos[0]) => {
    if (video.platform === "gdrive") {
      return `https://drive.google.com/thumbnail?id=${video.videoId}&sz=w640`;
    }
    if (video.platform === "vimeo") {
      return `https://vumbnail.com/${video.videoId}.jpg`;
    }
    return `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
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

        {/* Barra de Progresso no Topo */}
        <Card className="mb-8 shadow-card animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Mini Curso para Iniciante</h2>
                <p className="text-muted-foreground">Aprenda do zero com técnicas fundamentais</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary mb-1">{Math.round(totalProgress)}%</div>
                <p className="text-sm text-muted-foreground">{completedCount} de {videos.length} aulas</p>
              </div>
            </div>
            <Progress value={totalProgress} className="h-3" />
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Player Principal */}
          <div className="lg:col-span-2 space-y-6">
            <div className="animate-fade-in">
              <div className={isMobile ? "aspect-[4/3] sm:aspect-video" : ""}>
                <CustomVideoPlayer
                  videoId={currentVideo.videoId}
                  title={currentVideo.title}
                  platform={currentVideo.platform || "youtube"}
                  autoplay={true}
                />
              </div>

              {/* Botões de navegação abaixo do player */}
              <div className="flex gap-3 mt-2">
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
            </div>

            {totalProgress >= 80 && (
              <Card className="shadow-card border-primary/50 bg-primary/5">
                <CardContent className="p-6 text-center">
                  <Award className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">Parabéns!</h3>
                  <p className="text-muted-foreground mb-4">
                    Você completou {Math.round(totalProgress)}% do curso e já pode emitir seu certificado!
                  </p>
                  <Link to="/certificado">
                    <Button size="lg" className="shadow-soft">
                      <Award className="mr-2 h-5 w-5" />
                      Emitir Certificado
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Lista de Vídeos */}
          <div className="lg:col-span-1">
            <Card className="lg:sticky lg:top-8 shadow-card animate-fade-in">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Todas as Aulas ({videos.length})
                </h3>

                {/* Filtros */}
                <div className="space-y-3 mb-4">
                  <Input
                    placeholder="Buscar aula..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="h-10"
                  />
                  <Select value={filterCategory} onValueChange={(value) => {
                    setFilterCategory(value);
                    setCurrentPage(1);
                  }}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Filtrar por categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as categorias</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Lista com scroll */}
                <div ref={videoListRef} className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {paginatedVideos.map((video, index) => {
                    const actualIndex = videos.findIndex(v => v.id === video.id);
                    return (
                      <div key={video.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                        <VideoCard
                          title={video.title}
                          duration={video.duration}
                          thumbnail={getThumbnail(video)}
                          videoNumber={video.id}
                          isActive={actualIndex === currentVideoIndex}
                          onClick={() => handleVideoSelect(index)}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Paginação */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCurrentPage(p => Math.max(1, p - 1));
                        videoListRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
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
                      onClick={() => {
                        setCurrentPage(p => Math.min(totalPages, p + 1));
                        videoListRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
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

export default CursoCompleto;
