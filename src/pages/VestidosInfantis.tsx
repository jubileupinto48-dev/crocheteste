import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import vestidosInfantis from "@/assets/vestidos-infantis.jpg";

const VestidosInfantis = () => {
  const collections = [
    {
      title: "Recém-nascido (0-3 meses)",
      description: "Peças delicadas e confortáveis para os primeiros meses",
      models: 35
    },
    {
      title: "Bebês (3-12 meses)",
      description: "Vestidos encantadores para todas as estações",
      models: 48
    },
    {
      title: "Crianças (1-3 anos)",
      description: "Modelos divertidos e práticos para o dia a dia",
      models: 52
    },
    {
      title: "Infantil (4-6 anos)",
      description: "Designs modernos para meninas estilosas",
      models: 41
    }
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

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-primary fill-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Vestidos Infantis
            </h1>
            <p className="text-muted-foreground text-lg">
              Coleção especial de vestidos adoráveis para bebês e crianças
            </p>
          </div>

          <div className="relative mb-12 animate-scale-in">
            <img
              src={vestidosInfantis}
              alt="Vestidos Infantis"
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-card"
            />
          </div>

          <Card className="mb-12 shadow-card animate-fade-in">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Sobre esta Coleção
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nossa coleção de vestidos infantis foi cuidadosamente desenvolvida pensando no conforto, 
                segurança e beleza. Cada modelo inclui receitas detalhadas com instruções específicas para 
                diferentes tamanhos e idades.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-foreground">Fios Adequados</h4>
                    <p className="text-sm text-muted-foreground">Recomendações de materiais seguros e confortáveis</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-foreground">Tamanhos Variados</h4>
                    <p className="text-sm text-muted-foreground">Do recém-nascido até 6 anos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-foreground">Fácil Ajuste</h4>
                    <p className="text-sm text-muted-foreground">Instruções para adaptar ao crescimento</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-foreground">Designs Encantadores</h4>
                    <p className="text-sm text-muted-foreground">Modelos que as crianças adoram</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 animate-scale-in">
            {collections.map((collection, index) => (
              <Card
                key={index}
                className="shadow-card hover-lift cursor-pointer group"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {collection.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">
                      {collection.models} modelos
                    </span>
                    <Button variant="ghost" size="sm" className="group-hover:bg-accent">
                      Ver Modelos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VestidosInfantis;
