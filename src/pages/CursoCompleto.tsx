import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Award, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import cursoCompleto from "@/assets/curso-completo.jpg";
import { Progress } from "@/components/ui/progress";

const CursoCompleto = () => {
  const modules = [
    { title: "Fundamentos do Crochê", lessons: 12, progress: 100, completed: true },
    { title: "Técnicas Intermediárias", lessons: 15, progress: 75, completed: false },
    { title: "Projetos Práticos", lessons: 18, progress: 30, completed: false },
    { title: "Técnicas Avançadas", lessons: 14, progress: 0, completed: false },
    { title: "Projeto Final", lessons: 8, progress: 0, completed: false }
  ];

  const totalProgress = modules.reduce((acc, mod) => acc + mod.progress, 0) / modules.length;

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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Curso Completo + Certificado
            </h1>
            <p className="text-muted-foreground text-lg">
              Do básico ao avançado com certificação profissional
            </p>
          </div>

          <div className="relative mb-12 animate-scale-in">
            <img
              src={cursoCompleto}
              alt="Curso Completo"
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-card"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in">
            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">67 Aulas</h3>
                <p className="text-sm text-muted-foreground">Conteúdo completo</p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Certificado</h3>
                <p className="text-sm text-muted-foreground">Reconhecimento oficial</p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">5.842 Alunas</h3>
                <p className="text-sm text-muted-foreground">Comunidade ativa</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8 shadow-card animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-foreground">Seu Progresso</h3>
                <span className="text-2xl font-bold text-primary">{Math.round(totalProgress)}%</span>
              </div>
              <Progress value={totalProgress} className="h-3" />
            </CardContent>
          </Card>

          <div className="space-y-4 animate-fade-in">
            {modules.map((module, index) => (
              <Card
                key={index}
                className={`shadow-card hover-lift cursor-pointer group ${
                  module.completed ? "border-primary/50" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {module.title}
                    </h3>
                    {module.completed && (
                      <Award className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <span>{module.lessons} aulas</span>
                    <span>{module.progress}% concluído</span>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>

          {totalProgress >= 80 && (
            <div className="mt-12 text-center">
              <Link to="/certificado">
                <Button size="lg" className="shadow-soft">
                  <Award className="mr-2 h-5 w-5" />
                  Emitir Certificado
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CursoCompleto;
