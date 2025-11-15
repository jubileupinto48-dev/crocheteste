import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, PlayCircle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import vestidosCroche from "@/assets/vestidos-croche.jpg";

const VestidosCroche = () => {
  const lessons = [
    { id: 1, title: "Introdução aos Vestidos de Crochê", duration: "15 min", type: "video" },
    { id: 2, title: "Materiais e Ferramentas Necessárias", duration: "10 min", type: "video" },
    { id: 3, title: "Receita: Vestido Clássico", duration: "45 min", type: "receita" },
    { id: 4, title: "Técnicas de Acabamento", duration: "20 min", type: "video" },
    { id: 5, title: "Receita: Vestido Floral", duration: "50 min", type: "receita" },
    { id: 6, title: "Dicas de Personalização", duration: "12 min", type: "video" }
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

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-card mb-8 animate-fade-in">
              <img
                src={vestidosCroche}
                alt="Vestidos de Crochê"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="animate-scale-in">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Vestidos de Crochê
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Aprenda a criar vestidos únicos e elegantes usando técnicas profissionais de crochê. 
                Este módulo inclui receitas detalhadas, vídeos passo a passo e dicas exclusivas para 
                criar peças que encantam.
              </p>

              <div className="bg-accent/20 border border-accent rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  O que você vai aprender:
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Técnicas fundamentais para vestidos de crochê</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Como escolher os melhores materiais</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Receitas exclusivas passo a passo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Acabamentos profissionais</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8 shadow-card animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl">Conteúdo do Módulo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      className="w-full text-left p-4 rounded-lg bg-secondary/50 hover:bg-accent transition-all duration-200 group"
                    >
                      <div className="flex items-start gap-3">
                        {lesson.type === "video" ? (
                          <PlayCircle className="w-5 h-5 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                        ) : (
                          <BookOpen className="w-5 h-5 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {lesson.title}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {lesson.duration}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VestidosCroche;
