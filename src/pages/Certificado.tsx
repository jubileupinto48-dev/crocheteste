import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Award, Download, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import certificado from "@/assets/certificado.jpg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Certificado = () => {
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
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4">
              <Award className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Emitir Certificado
            </h1>
            <p className="text-muted-foreground text-lg">
              Parabéns por concluir o curso! Emita seu certificado oficial
            </p>
          </div>

          <div className="relative mb-12 animate-scale-in">
            <img
              src={certificado}
              alt="Certificado"
              className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-card"
            />
          </div>

          <Card className="mb-8 shadow-card animate-fade-in">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Dados para o Certificado
              </h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-base">Nome Completo</Label>
                  <Input
                    id="name"
                    placeholder="Digite seu nome completo"
                    className="mt-2 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="cpf" className="text-base">CPF</Label>
                  <Input
                    id="cpf"
                    placeholder="000.000.000-00"
                    className="mt-2 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-base">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="mt-2 h-12"
                  />
                </div>

                <div className="bg-accent/20 border border-accent rounded-xl p-6 mt-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    Informações do Certificado
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex justify-between">
                      <span>Curso:</span>
                      <span className="font-medium text-foreground">Crochê Completo</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Carga Horária:</span>
                      <span className="font-medium text-foreground">80 horas</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Data de Conclusão:</span>
                      <span className="font-medium text-foreground">
                        {new Date().toLocaleDateString('pt-BR')}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span>Código de Validação:</span>
                      <span className="font-medium text-foreground font-mono">
                        CRC-{Math.random().toString(36).substring(2, 10).toUpperCase()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4 animate-scale-in">
            <Button size="lg" className="shadow-soft h-14 text-base">
              <Download className="mr-2 h-5 w-5" />
              Gerar e Baixar Certificado
            </Button>
            <Button size="lg" variant="outline" className="h-14 text-base">
              <Share2 className="mr-2 h-5 w-5" />
              Compartilhar nas Redes
            </Button>
          </div>

          <Card className="mt-8 shadow-card animate-fade-in">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-3">
                Sobre o Certificado
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Certificado digital em alta qualidade (PDF)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Reconhecido nacionalmente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Código de validação único para verificação online</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Pode ser impresso em tamanho A4</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Certificado;
