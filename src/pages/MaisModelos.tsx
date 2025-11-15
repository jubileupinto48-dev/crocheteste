import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import maisModelos from "@/assets/mais-modelos.jpg";

const MaisModelos = () => {
  const collections = [
    {
      title: "Amigurumis",
      description: "Personagens fofos e criativos para todas as idades",
      models: 185,
      featured: true
    },
    {
      title: "Decoração para Casa",
      description: "Itens decorativos para deixar seu lar ainda mais acolhedor",
      models: 120
    },
    {
      title: "Mantas e Cobertores",
      description: "Peças confortáveis para todas as estações",
      models: 95
    },
    {
      title: "Tapetes",
      description: "Designs variados para todos os ambientes",
      models: 78
    },
    {
      title: "Biquínis e Tops",
      description: "Moda praia moderna e estilosa",
      models: 62
    },
    {
      title: "Sousplats e Jogos Americanos",
      description: "Elegância para sua mesa",
      models: 54
    },
    {
      title: "Toalhas e Barrados",
      description: "Detalhes que fazem a diferença",
      models: 68
    },
    {
      title: "Acessórios Diversos",
      description: "Cachecóis, tiaras, presilhas e muito mais",
      models: 142
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

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              + Modelos de Crochê
            </h1>
            <p className="text-muted-foreground text-lg">
              Explore centenas de outros modelos para expandir suas criações
            </p>
          </div>

          <div className="relative mb-12 animate-scale-in">
            <img
              src={maisModelos}
              alt="Mais Modelos"
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-card"
            />
          </div>

          <Card className="mb-12 shadow-card animate-fade-in">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  804+ Modelos Adicionais
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  Uma variedade incrível de projetos para você explorar e criar
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">185</div>
                    <div className="text-sm text-muted-foreground">Amigurumis</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">120</div>
                    <div className="text-sm text-muted-foreground">Decoração</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">142</div>
                    <div className="text-sm text-muted-foreground">Acessórios</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">357</div>
                    <div className="text-sm text-muted-foreground">Outros</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold text-foreground mb-6 animate-fade-in">
            Todas as Categorias
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-scale-in">
            {collections.map((collection, index) => (
              <Card
                key={index}
                className={`shadow-card hover-lift cursor-pointer group ${
                  collection.featured ? 'ring-2 ring-primary/50' : ''
                }`}
              >
                <CardContent className="p-6">
                  {collection.featured && (
                    <div className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mb-3">
                      <Sparkles className="w-3 h-3" />
                      Destaque
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {collection.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">
                      {collection.models} modelos
                    </span>
                    <Button variant="ghost" size="sm" className="group-hover:bg-accent">
                      Ver Todos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="shadow-card inline-block">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Novos Modelos Toda Semana!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Cadastre-se para receber notificações de novos conteúdos
                </p>
                <Button size="lg" className="shadow-soft">
                  Ativar Notificações
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaisModelos;
