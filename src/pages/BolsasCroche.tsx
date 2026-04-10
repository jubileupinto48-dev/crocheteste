import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ShoppingBag, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { VideoCard } from "@/components/VideoCard";
import { Input } from "@/components/ui/input";
import { useFavorites } from "@/hooks/use-favorites";

const BolsasCroche = () => {
  const videos = [
    { id: 1, title: "Bag Gringa de Crochê - Versão Atualizada", duration: "35 min", thumbnail: "/thumbnails/bolsa-1d4ZOvxMTMM6IzyhusTn1ilTGUCaQWzjI.jpg", driveId: "1d4ZOvxMTMM6IzyhusTn1ilTGUCaQWzjI", category: "Bag Gringa" },
    { id: 2, title: "Bolsa de Crochê com Fio de Malha", duration: "40 min", thumbnail: "/thumbnails/bolsa-1cZTA03xROF2R64HXEhavjYwhzm78ylk2.jpg", driveId: "1cZTA03xROF2R64HXEhavjYwhzm78ylk2", category: "Bolsa de Ombro" },
    { id: 3, title: "Bolsa de Ombro de Crochê - Modelo 1", duration: "38 min", thumbnail: "/thumbnails/bolsa-1d4ZOvxMTMM6IzyhusTn1ilTGUCaQWzjI.jpg", driveId: "1d4ZOvxMTMM6IzyhusTn1ilTGUCaQWzjI", category: "Bolsa de Ombro" },
    { id: 4, title: "Bolsa de Ombro de Crochê - Modelo 2", duration: "42 min", thumbnail: "/thumbnails/bolsa-1cZTA03xROF2R64HXEhavjYwhzm78ylk2.jpg", driveId: "1cZTA03xROF2R64HXEhavjYwhzm78ylk2", category: "Bolsa de Ombro" },
    { id: 5, title: "Bolsa Fácil de Crochê", duration: "30 min", thumbnail: "/thumbnails/bolsa-1d4ZOvxMTMM6IzyhusTn1ilTGUCaQWzjI.jpg", driveId: "1d4ZOvxMTMM6IzyhusTn1ilTGUCaQWzjI", category: "Bolsa Fácil" },
    { id: 6, title: "Clutch de Crochê - Modelo 1", duration: "28 min", thumbnail: "/thumbnails/bolsa-1cZTA03xROF2R64HXEhavjYwhzm78ylk2.jpg", driveId: "1cZTA03xROF2R64HXEhavjYwhzm78ylk2", category: "Clutch" },
    { id: 7, title: "Clutch de Crochê - Modelo 2", duration: "32 min", thumbnail: "/thumbnails/bolsa-1d4ZOvxMTMM6IzyhusTn1ilTGUCaQWzjI.jpg", driveId: "1d4ZOvxMTMM6IzyhusTn1ilTGUCaQWzjI", category: "Clutch" },
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
          <ShoppingBag className="w-8 h-8 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Bolsas de Crochê</h1>
          <p className="text-muted-foreground text-lg">Crie acessórios únicos que combinam estilo e funcionalidade</p>
        </div>

        {/* Player Principal */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="animate-fade-in">
            <VideoPlayer videoId={videos[currentVideoIndex].driveId} title={videos[currentVideoIndex].title} platform="gdrive" />
            <div className="flex gap-3 mt-2">
              <Button variant="outline" onClick={handlePrevious} disabled={currentVideoIndex === 0} className="flex-1">
                <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
              </Button>
              <Button
                variant="outline" size="icon"
                onClick={() => toggleFavorite({ videoId: videos[currentVideoIndex].driveId, title: videos[currentVideoIndex].title, thumbnail: videos[currentVideoIndex].thumbnail, module: "Bolsas de Crochê", modulePath: "/bolsas-croche" })}
                className={`shrink-0 ${isFavorite(videos[currentVideoIndex].driveId) ? 'text-primary border-primary/50 bg-primary/10' : ''}`}
                aria-label="Favoritar"
              >
                <Heart className={`h-4 w-4 ${isFavorite(videos[currentVideoIndex].driveId) ? 'fill-current' : ''}`} />
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
                    isFavorite={isFavorite(video.driveId)}
                    onToggleFavorite={() => toggleFavorite({ videoId: video.driveId, title: video.title, thumbnail: video.thumbnail, module: "Bolsas de Crochê", modulePath: "/bolsas-croche" })}
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
                Nossa coleção de bolsas oferece desde modelos básicos até designs sofisticados. 
                Aprenda técnicas especiais de estruturação, forros, fechos e alças para criar 
                peças profissionais que podem ser usadas ou vendidas.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center bg-accent/20 rounded-xl p-4">
                  <div className="text-2xl font-bold text-primary mb-1">7+</div>
                  <p className="text-sm text-muted-foreground">Vídeos</p>
                </div>
                <div className="text-center bg-accent/20 rounded-xl p-4">
                  <div className="text-2xl font-bold text-primary mb-1">5</div>
                  <p className="text-sm text-muted-foreground">Categorias</p>
                </div>
                <div className="text-center bg-accent/20 rounded-xl p-4">
                  <div className="text-2xl font-bold text-primary mb-1">∞</div>
                  <p className="text-sm text-muted-foreground">Possibilidades</p>
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

export default BolsasCroche;
