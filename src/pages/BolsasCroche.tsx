import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import bolsasCroche from "@/assets/bolsas-croche.jpg";

const BolsasCroche = () => {
  const categories = [
    {
      title: "Bolsas de Mão",
      description: "Modelos elegantes para eventos e dia a dia",
      models: 32,
      trending: true
    },
    {
      title: "Bolsas de Praia",
      description: "Designs práticos e estilosos para o verão",
      models: 28
    },
    {
      title: "Mochilas",
      description: "Versáteis e confortáveis para qualquer ocasião",
      models: 24
    },
    {
      title: "Carteiras",
      description: "Pequenas e charmosas para seus essenciais",
      models: 36
    },
    {
      title: "Clutches",
      description: "Sofisticadas para ocasiões especiais",
      models: 18
    },
    {
      title: "Necessaires",
      description: "Práticas para organização e viagens",
      models: 22
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
              <ShoppingBag className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Bolsas de Crochê
            </h1>
            <p className="text-muted-foreground text-lg">
              Crie acessórios únicos que combinam estilo e funcionalidade
            </p>
          </div>

          <div className="relative mb-12 animate-scale-in">
            <img
              src={bolsasCroche}
              alt="Bolsas de Crochê"
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-card"
            />
          </div>

          <Card className="mb-12 shadow-card animate-fade-in">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Transforme Fios em Acessórios Incríveis
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Nossa coleção de bolsas oferece desde modelos básicos até designs sofisticados. 
                Aprenda técnicas especiais de estruturação, forros, fechos e alças para criar 
                peças profissionais que podem ser usadas ou vendidas.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-primary">160+</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Modelos</h4>
                  <p className="text-sm text-muted-foreground">Diversos estilos</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-primary">45</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Vídeos</h4>
                  <p className="text-sm text-muted-foreground">Tutoriais completos</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-primary">12</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Técnicas</h4>
                  <p className="text-sm text-muted-foreground">Especializadas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold text-foreground mb-6 animate-fade-in">
            Categorias de Bolsas
          </h2>

          <div className="grid md:grid-cols-2 gap-6 animate-scale-in">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="shadow-card hover-lift cursor-pointer group relative overflow-hidden"
              >
                {category.trending && (
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium shadow-soft">
                    Em Alta
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">
                      {category.models} modelos
                    </span>
                    <Button variant="ghost" size="sm" className="group-hover:bg-accent">
                      Explorar
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

export default BolsasCroche;
