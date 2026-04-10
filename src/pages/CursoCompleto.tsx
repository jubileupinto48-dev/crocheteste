import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Award, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { CustomVideoPlayer } from "@/components/CustomVideoPlayer";
import { VideoCard } from "@/components/VideoCard";
import { useState } from "react";
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
    { id: 1, title: "Como pegar na agulha", duration: "3 min", videoId: "1167451333", category: "Técnicas Básicas", completed: false, platform: "vimeo" },
    { id: 2, title: "Como fazer Correntinha", duration: "7 min", videoId: "1167451433", category: "Técnicas Básicas", completed: false, platform: "vimeo" },
    { id: 3, title: "Como fazer Ponto Baixissimo", duration: "5 min", videoId: "1167451668", category: "Técnicas Básicas", completed: false, platform: "vimeo" },
    { id: 4, title: "Como fazer Ponto Baixo", duration: "5 min", videoId: "1167451940", category: "Técnicas Básicas", completed: false, platform: "vimeo" },
    { id: 5, title: "Ponto Meio Alto", duration: "4 min", videoId: "1167452177", category: "Técnicas Básicas", completed: false, platform: "vimeo" },
    { id: 6, title: "Ponto Alto", duration: "4 min", videoId: "1167452407", category: "Técnicas Básicas", completed: false, platform: "vimeo" },
    { id: 7, title: "Ponto Fantasia", duration: "7 min", videoId: "1167452622", category: "Técnicas Básicas", completed: false, platform: "vimeo" },
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
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const { isFavorite, toggleFavorite } = useFavorites();

  const categories = ["Técnicas Básicas", "Materiais", "Dicas"];
  
  const completedCount = videos.filter(v => v.completed).length;
  const totalProgress = (completedCount / videos.length) * 100;

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || video.category === filterCategory;
    return matchesSearch && matchesCategory;
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

  const getThumbnail = (video: typeof videos[0]) => {
    if (video.platform === "gdrive") return `/thumbnails/ini-gd-thumb.jpg`;
    if (video.platform === "vimeo") return `https://vumbnail.com/${video.videoId}.jpg`;
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

        {/* Barra de Progresso */}
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

        {/* Player Principal */}
        <div className="max-w-4xl mx-auto space-y-6 mb-10">
          <div className="animate-fade-in">
            <div className={isMobile ? "aspect-[4/3] sm:aspect-video" : ""}>
              <CustomVideoPlayer
                videoId={currentVideo.videoId}
                title={currentVideo.title}
                platform={currentVideo.platform || "youtube"}
                autoplay={true}
              />
            </div>

            <div className="flex gap-3 mt-2">
              <Button variant="outline" onClick={handlePrevious} disabled={currentVideoIndex === 0} className="flex-1">
                <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleFavorite({ videoId: currentVideo.videoId, title: currentVideo.title, thumbnail: getThumbnail(currentVideo), module: "Mini Curso para Iniciante", modulePath: "/curso-completo" })}
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
                    <Award className="mr-2 h-5 w-5" /> Emitir Certificado
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Todas as Aulas - Full Width */}
        <section className="animate-fade-in">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Todas as Aulas ({videos.length})
            </h2>
            <p className="text-muted-foreground">Clique em qualquer aula para assistir</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6 max-w-2xl mx-auto">
            <Input
              placeholder="Buscar aula..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10"
            />
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="h-10 sm:w-[220px]">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredVideos.map((video, index) => {
              const actualIndex = videos.findIndex(v => v.id === video.id);
              return (
                <div key={video.id} className="animate-fade-in" style={{ animationDelay: `${Math.min(index, 10) * 0.03}s` }}>
                  <VideoCard
                    title={video.title}
                    duration={video.duration}
                    thumbnail={getThumbnail(video)}
                    videoNumber={video.id}
                    isActive={actualIndex === currentVideoIndex}
                    isFavorite={isFavorite(video.videoId)}
                    onToggleFavorite={() => toggleFavorite({ videoId: video.videoId, title: video.title, thumbnail: getThumbnail(video), module: "Mini Curso para Iniciante", modulePath: "/curso-completo" })}
                    onClick={() => handleVideoSelect(index)}
                  />
                </div>
              );
            })}
          </div>
        </section>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Atualizações feitas diariamente! 🥰🙏
          </p>
        </div>
      </div>
    </div>
  );
};

export default CursoCompleto;
