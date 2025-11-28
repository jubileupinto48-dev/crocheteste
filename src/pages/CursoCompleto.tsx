import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Award, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { VideoPlayer } from "@/components/VideoPlayer";
import { VideoCard } from "@/components/VideoCard";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CursoCompleto = () => {
  const videos = [
    // Técnicas Básicas
    { id: 1, title: "Introdução ao Crochê", duration: "15 min", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", videoId: "dQw4w9WgXcQ", category: "Técnicas Básicas", completed: true },
    { id: 2, title: "Materiais e Ferramentas", duration: "12 min", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", videoId: "dQw4w9WgXcQ", category: "Técnicas Básicas", completed: true },
    { id: 3, title: "Ponto Corrente", duration: "18 min", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", videoId: "dQw4w9WgXcQ", category: "Técnicas Básicas", completed: true },
    { id: 4, title: "Ponto Baixo", duration: "20 min", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", videoId: "dQw4w9WgXcQ", category: "Técnicas Básicas", completed: false },
    { id: 5, title: "Ponto Alto", duration: "22 min", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", videoId: "dQw4w9WgXcQ", category: "Técnicas Básicas", completed: false },
    
    // Técnicas Intermediárias
    { id: 6, title: "Aumentos e Diminuições", duration: "25 min", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", videoId: "dQw4w9WgXcQ", category: "Técnicas Intermediárias", completed: false },
    { id: 7, title: "Trabalho em Círculo", duration: "28 min", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", videoId: "dQw4w9WgXcQ", category: "Técnicas Intermediárias", completed: false },
    { id: 8, title: "Mudança de Cores", duration: "20 min", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", videoId: "dQw4w9WgXcQ", category: "Técnicas Intermediárias", completed: false },
    { id: 9, title: "Pontos Fantasia", duration: "30 min", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", videoId: "dQw4w9WgXcQ", category: "Técnicas Intermediárias", completed: false },
    { id: 10, title: "Leitura de Gráficos", duration: "26 min", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", videoId: "dQw4w9WgXcQ", category: "Técnicas Intermediárias", completed: false },
    
    // Projetos Práticos
    { id: 11, title: "Projeto 1: Porta Copos", duration: "35 min", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", videoId: "dQw4w9WgXcQ", category: "Projetos Práticos", completed: false },
    { id: 12, title: "Projeto 2: Sousplat", duration: "40 min", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", videoId: "dQw4w9WgXcQ", category: "Projetos Práticos", completed: false },
    { id: 13, title: "Projeto 3: Toalha de Mesa", duration: "45 min", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", videoId: "dQw4w9WgXcQ", category: "Projetos Práticos", completed: false },
    { id: 14, title: "Projeto 4: Almofada", duration: "38 min", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", videoId: "dQw4w9WgXcQ", category: "Projetos Práticos", completed: false },
    { id: 15, title: "Projeto 5: Bolsa Simples", duration: "42 min", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", videoId: "dQw4w9WgXcQ", category: "Projetos Práticos", completed: false },
    
    // Técnicas Avançadas
    { id: 16, title: "Tapete Redondo", duration: "50 min", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", videoId: "dQw4w9WgXcQ", category: "Técnicas Avançadas", completed: false },
    { id: 17, title: "Apliques e Bordados", duration: "32 min", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", videoId: "dQw4w9WgXcQ", category: "Técnicas Avançadas", completed: false },
    { id: 18, title: "Acabamentos Profissionais", duration: "28 min", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", videoId: "dQw4w9WgXcQ", category: "Técnicas Avançadas", completed: false },
    { id: 19, title: "Cálculo de Material", duration: "24 min", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", videoId: "dQw4w9WgXcQ", category: "Técnicas Avançadas", completed: false },
    { id: 20, title: "Dicas de Vendas", duration: "30 min", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", videoId: "dQw4w9WgXcQ", category: "Técnicas Avançadas", completed: false },
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = ["Técnicas Básicas", "Técnicas Intermediárias", "Projetos Práticos", "Técnicas Avançadas"];
  
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
                <h2 className="text-2xl font-bold text-foreground mb-1">Curso Completo + Certificado</h2>
                <p className="text-muted-foreground">Do básico ao avançado com certificação profissional</p>
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
              <VideoPlayer
                videoId={videos[currentVideoIndex].videoId}
                title={videos[currentVideoIndex].title}
                platform="youtube"
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
                      {videos[currentVideoIndex].completed && (
                        <Award className="w-5 h-5 text-primary" />
                      )}
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

            {/* Apostila para Download */}
            <Card className="shadow-card border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Apostila do Curso</h3>
                    <p className="text-muted-foreground text-sm">
                      Material completo para acompanhar as aulas (PDF - 125 páginas)
                    </p>
                  </div>
                  <Button className="shadow-soft">
                    <Download className="mr-2 h-4 w-4" />
                    Baixar Apostila
                  </Button>
                </div>
              </CardContent>
            </Card>

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
            <Card className="sticky top-8 shadow-card animate-fade-in">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Todas as Aulas ({videos.length})
                </h3>

                {/* Filtros */}
                <div className="space-y-3 mb-4">
                  <Input
                    placeholder="Buscar aula..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-10"
                  />
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
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

                {/* Lista com scroll organizada por categoria */}
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {filterCategory === "all" ? (
                    categories.map(category => {
                      const categoryVideos = filteredVideos.filter(v => v.category === category);
                      if (categoryVideos.length === 0) return null;
                      
                      return (
                        <div key={category} className="space-y-2">
                          <h4 className="font-semibold text-sm text-foreground sticky top-0 bg-background py-2 border-b border-border">
                            {category}
                          </h4>
                          {categoryVideos.map((video, index) => {
                            const actualIndex = videos.findIndex(v => v.id === video.id);
                            return (
                              <div key={video.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                                <VideoCard
                                  title={video.title}
                                  duration={video.duration}
                                  thumbnail={video.thumbnail}
                                  videoNumber={video.id}
                                  isActive={actualIndex === currentVideoIndex}
                                  onClick={() => handleVideoSelect(filteredVideos.findIndex(v => v.id === video.id))}
                                />
                              </div>
                            );
                          })}
                        </div>
                      );
                    })
                  ) : (
                    filteredVideos.map((video, index) => {
                      const actualIndex = videos.findIndex(v => v.id === video.id);
                      return (
                        <div key={video.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                          <VideoCard
                            title={video.title}
                            duration={video.duration}
                            thumbnail={video.thumbnail}
                            videoNumber={video.id}
                            isActive={actualIndex === currentVideoIndex}
                            onClick={() => handleVideoSelect(index)}
                          />
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
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
