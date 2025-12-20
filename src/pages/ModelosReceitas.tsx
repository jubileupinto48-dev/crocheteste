import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";
import modelosReceitas from "@/assets/modelos-receitas.jpg";

const ModelosReceitas = () => {
  const driveLinks = [
    { 
      name: "+2000 MODELOS", 
      url: "https://drive.google.com/drive/folders/1KfInA9XDh1hu-MJN5bfxKKQYA2mSJSa1",
      description: "Acesso a mais de 2000 modelos exclusivos em PDF"
    },
    { 
      name: "RECEITAS ROUPAS INFANTIS", 
      url: "https://drive.google.com/drive/folders/1zhSu5deN1u0-pWXtsgkF3zzS4AgStLPt",
      description: "Receitas completas de roupinhas infantis"
    },
    { 
      name: "BOLSAS E MOCHILAS", 
      url: "https://drive.google.com/drive/folders/1oZOb9pmaGRZq2sOuk7BHOgYIia2aqAuK",
      description: "Modelos de bolsas, mochilas e acessórios"
    },
    { 
      name: "TODAS AS RECEITAS", 
      url: "https://drive.google.com/drive/folders/1RFWmrjiWBZYuX4KX8bHnB__fFYkZi0RI",
      description: "Coleção completa de todas as receitas disponíveis"
    },
    { 
      name: "VÁRIOS MODELOS DIVERSIFICADOS", 
      url: "https://drive.google.com/drive/folders/15lHDk8fMxgeUVrkLqxLo-IcP3DQ0_EV_?usp=sharing",
      description: "Modelos variados e diversificados para todos os gostos"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6 hover:bg-accent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar aos Módulos
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              +2000 Modelos e Receitas
            </h1>
            <p className="text-muted-foreground text-lg">
              Biblioteca completa com milhares de modelos e receitas exclusivas em PDF
            </p>
          </div>

          <div className="relative mb-12 animate-scale-in">
            <img
              src={modelosReceitas}
              alt="Modelos e Receitas"
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-card"
            />
          </div>

          <Card className="mb-8 shadow-card animate-fade-in">
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground mb-6">
                👇 Só dar um toque nos links abaixo para ver os modelos em PDF! 👇
              </p>
            </CardContent>
          </Card>

          <div className="space-y-4 animate-scale-in">
            {driveLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card
                  className="hover-lift shadow-card group cursor-pointer animate-fade-in transition-all hover:border-primary/50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <FolderOpen className="w-7 h-7" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {link.name}
                        </h3>
                        <p className="text-muted-foreground mt-1 text-sm">
                          {link.description}
                        </p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Atualizações feitas diariamente! 🥰🙏
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelosReceitas;
