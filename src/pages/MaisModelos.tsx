import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { CustomVideoPlayer } from "@/components/CustomVideoPlayer";
import { VideoCard } from "@/components/VideoCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";

const customThumbnails: Record<string, string> = {
  "XMJm74FZSlk": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305380/conjunto_rosas_otscb3.jpg",
  "eULL4c7GCAs": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771307351/S-Vp3QiN1Tk-HD_td6d0k.jpg",
  "a4lixrXFbRA": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305380/Square_lcapbv.jpg",
  "F5rSrKqmnn8": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305377/tereza_fyt2v7.jpg",
  "SqZwxKEdwro": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771306716/iU1sYamfIVk-HD_ibcrxn.jpg",
  "Ukk510YlxvI": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305379/renata_h8xajx.jpg",
  "dCUvTg-IxkE": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/betania_xcfpnn.jpg",
  "n0uIvqvmLWY": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/Gardeen_bydvt2.jpg",
  "9ciFxAnLzqw": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305379/corset_de_croche_ngaefh.jpg",
  "MWEsludGR4A": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305379/corset_angel_g6z2jg.jpg",
  "oO-1-Bx2_k4": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/corset_em_v_kwwode.jpg",
  "-Dqpc_vBDcE": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/Conjunto_svaxry.jpg",
  "8G8KSbtb9AA": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305380/tardezinha_ogtoie.jpg",
  "NCqCYKbRFHc": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771286793/fKLX4pMjmck-SD_bnzvlf.jpg",
  "t4PHjsA531c": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305379/conjunto_brilho_hrkbp0.jpg",
  "8-7-TAnZeTI": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/Praiana_r8wcy2.jpg",
  "fqfFgB0VDE8": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/camila_euvcxi.jpg",
  "lG2KfsR4pts": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771305378/macac%C3%A3o_qidwbc.jpg",
  "45dtXS7wZJ8": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771286572/vrCyt1O4SjU-HD_nti0w1.jpg",
  "AkMPZPYJxwY": "https://res.cloudinary.com/dzetm6plq/image/upload/v1771307351/IRnqSP9VCsg-HD_ixsndz.jpg",
};

const getVideoThumbnail = (videoId: string) => {
  return customThumbnails[videoId] || `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
};

const MaisModelos = () => {
  const isMobile = useIsMobile();

  const videos = [
    { id: 1, title: "Conjunto Rosas", videoId: "XMJm74FZSlk", project: "Conjunto Rosas", part: null },
    { id: 2, title: "Top Estrela Brasil", videoId: "eULL4c7GCAs", project: "Top Estrela Brasil", part: null },
    { id: 3, title: "Conjunto Square", videoId: "a4lixrXFbRA", project: "Conjunto Square", part: null },
    { id: 4, title: "Saida Tereza", videoId: "F5rSrKqmnn8", project: "Saida Tereza", part: null },
    { id: 5, title: "Saida Shirley", videoId: "SqZwxKEdwro", project: "Saida Shirley", part: null },
    { id: 6, title: "Saida Renata", videoId: "Ukk510YlxvI", project: "Saida Renata", part: null },
    { id: 7, title: "Saida Betania", videoId: "dCUvTg-IxkE", project: "Saida Betania", part: null },
    { id: 8, title: "Cropped Garden", videoId: "n0uIvqvmLWY", project: "Cropped Garden", part: null },
    { id: 9, title: "Corset de Crochê", videoId: "9ciFxAnLzqw", project: "Corset de Crochê", part: null },
    { id: 10, title: "Corset Angel", videoId: "MWEsludGR4A", project: "Corset Angel", part: null },
    { id: 11, title: "Corset em V", videoId: "oO-1-Bx2_k4", project: "Corset em V", part: null },
    { id: 12, title: "Conjunto Tereza", videoId: "-Dqpc_vBDcE", project: "Conjunto Tereza", part: null },
    { id: 13, title: "Conjunto Tardezinha", videoId: "8G8KSbtb9AA", project: "Conjunto Tardezinha", part: null },
    { id: 14, title: "Biquini Rendado", videoId: "NCqCYKbRFHc", project: "Biquini Rendado", part: null },
    { id: 15, title: "Conjunto de Crochê Brilho", videoId: "t4PHjsA531c", project: "Conjunto Crochê Brilho", part: null },
    { id: 16, title: "Conjunto Praiana", videoId: "8-7-TAnZeTI", project: "Conjunto Praiana", part: null },
    { id: 17, title: "Conjunto Camila", videoId: "fqfFgB0VDE8", project: "Conjunto Camila", part: null },
    { id: 18, title: "Macacão Longo", videoId: "lG2KfsR4pts", project: "Macacão Longo", part: null },
    { id: 19, title: "Biquini Tomara que Caia", videoId: "45dtXS7wZJ8", project: "Biquini Tomara que Caia", part: null },
    { id: 20, title: "Top Brasil", videoId: "AkMPZPYJxwY", project: "Top Brasil", part: null },
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProject, setFilterProject] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const videoListRef = useRef<HTMLDivElement>(null);
  const videosPerPage = 8;

  const uniqueProjects = [...new Set(videos.map(v => v.project))].sort();

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          video.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = filterProject === "all" || video.project === filterProject;
    return matchesSearch && matchesProject;
  });

  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const paginatedVideos = filteredVideos.slice(startIndex, startIndex + videosPerPage);

  const handleVideoSelect = (index: number) => {
    const actualIndex = videos.findIndex(v => v.id === filteredVideos[startIndex + index].id);
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Player Principal + Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="animate-fade-in">
              <div className={isMobile ? "aspect-[4/3] sm:aspect-video" : ""}>
                <CustomVideoPlayer
                  videoId={currentVideo.videoId}
                  title={currentVideo.title}
                  platform="youtube"
                  autoplay={true}
                  showPixMessage={false}
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
          </div>

          {/* Lista de Vídeos */}
          <div className="lg:col-span-1 lg:row-span-2">
            <Card className="lg:sticky lg:top-8 shadow-card animate-fade-in">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Todas as Aulas ({videos.length})
                </h3>

                {/* Filtros */}
                <div className="space-y-3 mb-4">
                  <Input
                    placeholder="Buscar aula ou projeto..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="h-10"
                  />
                  <Select value={filterProject} onValueChange={(value) => {
                    setFilterProject(value);
                    setCurrentPage(1);
                  }}>
                    <SelectTrigger className="h-10">
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

                {/* Lista com scroll */}
                <div ref={videoListRef} className="space-y-3 max-h-[400px] lg:max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {paginatedVideos.map((video, index) => {
                    const actualIndex = videos.findIndex(v => v.id === video.id);
                    return (
                      <div key={video.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                        <VideoCard
                          title={video.title}
                          duration={video.part ? `Parte ${video.part}` : "Completo"}
                          thumbnail={getVideoThumbnail(video.videoId)}
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

          {/* Sobre esta Aula */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Sobre esta Aula
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Neste tutorial completo, você aprenderá todas as técnicas necessárias para 
                  criar este lindo {currentVideo.project.toLowerCase()}. Siga o passo a passo com atenção e tire 
                  suas dúvidas nos comentários.
                </p>
                
                {/* Visualização do Projeto */}
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
                          src={getVideoThumbnail(currentVideo.videoId)} 
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

export default MaisModelos;
