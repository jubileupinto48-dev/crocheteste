import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Imagens dos módulos
import modelos2000 from "@/assets/modelos-receitas/modelos-2000.jpg";
import roupasInfantis from "@/assets/modelos-receitas/roupas-infantis.jpg";
import bolsasMochilas from "@/assets/modelos-receitas/bolsas-mochilas.jpg";
import todasReceitas from "@/assets/modelos-receitas/todas-receitas.jpg";
import modelosDiversificados from "@/assets/modelos-receitas/modelos-diversificados.jpg";
import modelosEspeciais from "@/assets/modelos-receitas/modelos-especiais.jpg";

interface ModuloItem {
  id: string;
  name: string;
  url: string;
  description: string;
  images: string[]; // Array de imagens para o carrossel
}

const ModelosReceitas = () => {
  const modulos: ModuloItem[] = [
    { 
      id: "1",
      name: "+2000 MODELOS", 
      url: "https://drive.google.com/drive/folders/1KfInA9XDh1hu-MJN5bfxKKQYA2mSJSa1",
      description: "Acesso a mais de 2000 modelos exclusivos em PDF",
      images: [modelos2000]
    },
    { 
      id: "2",
      name: "RECEITAS ROUPAS INFANTIS", 
      url: "https://drive.google.com/drive/folders/1zhSu5deN1u0-pWXtsgkF3zzS4AgStLPt",
      description: "Receitas completas de roupinhas infantis",
      images: [roupasInfantis]
    },
    { 
      id: "3",
      name: "BOLSAS E MOCHILAS", 
      url: "https://drive.google.com/drive/folders/1oZOb9pmaGRZq2sOuk7BHOgYIia2aqAuK",
      description: "Modelos de bolsas, mochilas e acessórios",
      images: [bolsasMochilas]
    },
    { 
      id: "4",
      name: "TODAS AS RECEITAS", 
      url: "https://drive.google.com/drive/folders/1RFWmrjiWBZYuX4KX8bHnB__fFYkZi0RI",
      description: "Coleção completa de todas as receitas disponíveis",
      images: [todasReceitas]
    },
    { 
      id: "5",
      name: "VÁRIOS MODELOS DIVERSIFICADOS", 
      url: "https://drive.google.com/drive/folders/15lHDk8fMxgeUVrkLqxLo-IcP3DQ0_EV_",
      description: "Modelos variados e diversificados para todos os gostos",
      images: [modelosDiversificados]
    },
    { 
      id: "6",
      name: "MODELOS ESPECIAIS", 
      url: "https://drive.google.com/drive/folders/15lHDk8fMxgeUVrkLqxLo-IcP3DQ0_EV_",
      description: "Seleção especial de modelos únicos",
      images: [modelosEspeciais]
    },
  ];

  const ImageCarousel = ({ images, name }: { images: string[]; name: string }) => {
    if (images.length === 0) {
      // Placeholder quando não há imagens
      return (
        <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <ImageIcon className="w-12 h-12 text-primary/40 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Imagem em breve</p>
          </div>
        </div>
      );
    }

    return (
      <Carousel
        opts={{ align: "start", loop: true }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={image}
                  alt={`${name} - Imagem ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-2 bg-background/80 hover:bg-background" />
            <CarouselNext className="right-2 bg-background/80 hover:bg-background" />
          </>
        )}
      </Carousel>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6 hover:bg-accent/20">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar aos Módulos
          </Button>
        </Link>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              +2000 Modelos e Receitas
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Biblioteca completa com milhares de modelos e receitas exclusivas em PDF
            </p>
          </div>

          {/* Grid de Módulos - 2 colunas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {modulos.map((modulo, index) => (
              <a
                key={modulo.id}
                href={modulo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="h-full overflow-hidden hover-lift shadow-card group cursor-pointer transition-all border-border/50 hover:border-primary/50 bg-card">
                  <CardContent className="p-0">
                    {/* Área da Imagem/Carrossel */}
                    <div className="relative">
                      <ImageCarousel images={modulo.images} name={modulo.name} />
                      
                      {/* Badge de acesso */}
                      <div className="absolute top-3 right-3">
                        <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-lg">
                          <ExternalLink className="w-3 h-3" />
                          Acessar
                        </div>
                      </div>
                    </div>

                    {/* Conteúdo do Card */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                        {modulo.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {modulo.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-card/50 px-4 py-2 rounded-full border border-border/50">
              <span className="text-sm text-muted-foreground">
                Atualizações feitas diariamente! 🥰🙏
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelosReceitas;
