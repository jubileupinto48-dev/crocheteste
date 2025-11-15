import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import modelosReceitas from "@/assets/modelos-receitas.jpg";

const ModelosReceitas = () => {
  const categories = [
    { name: "Vestidos", count: 350 },
    { name: "Blusas", count: 280 },
    { name: "Bolsas", count: 220 },
    { name: "Acessórios", count: 310 },
    { name: "Decoração", count: 190 },
    { name: "Amigurumis", count: 450 },
    { name: "Infantil", count: 290 },
    { name: "Bebê", count: 210 }
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
              Biblioteca completa com milhares de modelos e receitas exclusivas
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
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Pesquisar modelos, receitas, técnicas..."
                  className="pl-10 h-12 text-base"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4 animate-scale-in">
            {categories.map((category, index) => (
              <Card
                key={category.name}
                className="hover-lift shadow-card group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        {category.count} modelos disponíveis
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <span className="font-bold">{category.count}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="shadow-soft">
              Ver Todos os Modelos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelosReceitas;
