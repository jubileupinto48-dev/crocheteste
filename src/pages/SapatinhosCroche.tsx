import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Baby, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { VideoCard } from "@/components/VideoCard";
import { Input } from "@/components/ui/input";
import { useFavorites } from "@/hooks/use-favorites";

const SapatinhosCroche = () => {
  const videos = [
    { id: 1, title: "Sapatinho de Crochê para Bebê - Fácil e Delicado", duration: "25 min", thumbnail: "/thumbnails/sap-193LuNFt8kfcH33VcU0z7zZOJrZ9ajSwf.jpg", driveId: "193LuNFt8kfcH33VcU0z7zZOJrZ9ajSwf", category: "Sapatinho Menina" },
    { id: 2, title: "Sapatinho de Crochê RN - Saída de Maternidade", duration: "30 min", thumbnail: "/thumbnails/sap-14DkXx42ghiGOfknP3cDQjrUqp6v8pN6I.jpg", driveId: "14DkXx42ghiGOfknP3cDQjrUqp6v8pN6I", category: "Sapatinho Menina" },
    { id: 3, title: "Sapatilha de Crochê para Bebê - Muito Fácil", duration: "28 min", thumbnail: "/thumbnails/sap2-1Ld77T6QQc4vADvAeulHlFN6D0Nltre_y.jpg", driveId: "1Ld77T6QQc4vADvAeulHlFN6D0Nltre_y", category: "Sandalinha" },
    { id: 4, title: "Sapatinho de Crochê para Bebê - Tamanho 10cm", duration: "22 min", thumbnail: "/thumbnails/sap2-1TKrQJzB1KeJ_mstEKtqAHuFDMG5yck6O.jpg", driveId: "1TKrQJzB1KeJ_mstEKtqAHuFDMG5yck6O", category: "Sandalinha" },
    { id: 5, title: "Botinha de Crochê para Bebê - Ursinho", duration: "25 min", thumbnail: "/thumbnails/sap-1J8cz1ywtljN0b5ggIjkWy7aB25WShQKL.jpg", driveId: "1J8cz1ywtljN0b5ggIjkWy7aB25WShQKL", category: "Botinha" },
    { id: 6, title: "Botinha para Iniciantes - Saída de Maternidade", duration: "32 min", thumbnail: "/thumbnails/sap2-1kT2ZAYHJt4Ztdq6N5gG27hMX0OngQYTT.jpg", driveId: "1kT2ZAYHJt4Ztdq6N5gG27hMX0OngQYTT", category: "Botinha" },
    { id: 7, title: "Sapatinho de Crochê Unissex", duration: "28 min", thumbnail: "/thumbnails/sap-1F6HTu027kEVX73U4zk7FSrRQHpThu1-C.jpg", driveId: "1F6HTu027kEVX73U4zk7FSrRQHpThu1-C", category: "Sapatinho Fechado" },
    { id: 8, title: "Sapatinho Estilo Crocs - Tutorial Completo 10cm", duration: "40 min", thumbnail: "/thumbnails/sap2-1X-RTGw7Bc8SvdxycEzQY1-aIINT_OpY0.jpg", driveId: "1X-RTGw7Bc8SvdxycEzQY1-aIINT_OpY0", category: "Sapatinho Fechado" },
    { id: 9, title: "Tênis de Crochê para Bebê - Tam 9cm", duration: "38 min", thumbnail: "/thumbnails/sap-1GDcK_t8pzY8nhG9RGvb9YfTpX4X5O2UY.jpg", driveId: "1GDcK_t8pzY8nhG9RGvb9YfTpX4X5O2UY", category: "Tênis" },
    { id: 10, title: "Tênis Tipo All Star - Sapatinho de Crochê", duration: "45 min", thumbnail: "/thumbnails/sap2-1QzvUSSDvol9K9YYnWHYtLxIgB5r8HDhh.jpg", driveId: "1QzvUSSDvol9K9YYnWHYtLxIgB5r8HDhh", category: "Tênis" },
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

        <div className="text-center mb-8 animate-fade-in">
          <Baby className="w-8 h-8 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Sapatinhos de Crochê</h1>
          <p className="text-muted-foreground text-lg">Modelos adoráveis para os pequenos passos dos seus bebês</p>
        </div>

        {/* Player */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="animate-fade-in">
            <VideoPlayer videoId={videos[currentVideoIndex].driveId} title={videos[currentVideoIndex].title} platform="gdrive" />
            <div className="flex gap-3 mt-2">
              <Button variant="outline" onClick={handlePrevious} disabled={currentVideoIndex === 0} className="flex-1">
                <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
              </Button>
              <Button variant="outline" size="icon"
                onClick={() => toggleFavorite({ videoId: videos[currentVideoIndex].driveId, title: videos[currentVideoIndex].title, thumbnail: videos[currentVideoIndex].thumbnail, module: "Sapatinhos de Crochê", modulePath: "/sapatinhos-croche" })}
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
                    onToggleFavorite={() => toggleFavorite({ videoId: video.driveId, title: video.title, thumbnail: video.thumbnail, module: "Sapatinhos de Crochê", modulePath: "/sapatinhos-croche" })}
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
                Aprenda a confeccionar sapatinhos irresistíveis para bebês e crianças. Cada modelo 
                vem com instruções detalhadas de medidas, pontos especiais e dicas para garantir o 
                conforto e segurança dos pequenos.
              </p>
              <div className="bg-accent/20 border border-accent rounded-xl p-4">
                <h4 className="font-semibold text-foreground mb-3">Inclui:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2"><span className="text-primary">✓</span><span className="text-muted-foreground">Tabela de medidas por idade</span></div>
                  <div className="flex items-center gap-2"><span className="text-primary">✓</span><span className="text-muted-foreground">Solas reforçadas</span></div>
                  <div className="flex items-center gap-2"><span className="text-primary">✓</span><span className="text-muted-foreground">Aplicações e detalhes</span></div>
                  <div className="flex items-center gap-2"><span className="text-primary">✓</span><span className="text-muted-foreground">Ajustes personalizados</span></div>
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

export default SapatinhosCroche;
