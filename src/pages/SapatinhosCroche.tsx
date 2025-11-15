import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Baby } from "lucide-react";
import { Link } from "react-router-dom";
import sapatinhosCroche from "@/assets/sapatinhos-croche.jpg";

const SapatinhosCroche = () => {
  const styles = [
    { name: "Tênis Infantil", models: 24, difficulty: "Fácil" },
    { name: "Sandálias", models: 18, difficulty: "Fácil" },
    { name: "Sapatilhas", models: 22, difficulty: "Intermediário" },
    { name: "Botas", models: 15, difficulty: "Intermediário" },
    { name: "Chinelos", models: 12, difficulty: "Fácil" },
    { name: "Botinhas de Bebê", models: 28, difficulty: "Fácil" }
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
              <Baby className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Sapatinhos de Crochê
            </h1>
            <p className="text-muted-foreground text-lg">
              Modelos adoráveis para os pequenos passos dos seus bebês
            </p>
          </div>

          <div className="relative mb-12 animate-scale-in">
            <img
              src={sapatinhosCroche}
              alt="Sapatinhos de Crochê"
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-card"
            />
          </div>

          <Card className="mb-12 shadow-card animate-fade-in">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Coleção Completa de Sapatinhos
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Aprenda a confeccionar sapatinhos irresistíveis para bebês e crianças. Cada modelo 
                vem com instruções detalhadas de medidas, pontos especiais e dicas para garantir o 
                conforto e segurança dos pequenos.
              </p>
              
              <div className="bg-accent/20 border border-accent rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Inclui:</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-muted-foreground">Tabela de medidas por idade</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-muted-foreground">Solas reforçadas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-muted-foreground">Aplicações e detalhes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-muted-foreground">Ajustes personalizados</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold text-foreground mb-6 animate-fade-in">
            Estilos Disponíveis
          </h2>

          <div className="grid md:grid-cols-3 gap-4 animate-scale-in">
            {styles.map((style, index) => (
              <Card
                key={index}
                className="shadow-card hover-lift cursor-pointer group"
              >
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {style.name}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{style.models} modelos</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      style.difficulty === "Fácil" 
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}>
                      {style.difficulty}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="shadow-soft">
              Acessar Todos os Modelos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SapatinhosCroche;
