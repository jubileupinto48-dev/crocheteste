import { ModuleCard } from "@/components/ModuleCard";
import vestidosCroche from "@/assets/vestidos-croche-new.png";
import modelosReceitas from "@/assets/modelos-receitas.jpg";
import cursoCompleto from "@/assets/curso-completo.jpg";
import vestidosInfantis from "@/assets/vestidos-infantis.jpg";
import sapatinhosCroche from "@/assets/sapatinhos-croche.jpg";
import bolsasCroche from "@/assets/bolsas-croche.jpg";
import certificado from "@/assets/certificado.jpg";
import maisModelos from "@/assets/mais-modelos.jpg";
import heroBackground from "@/assets/hero-background.png";
import { Sparkles, ChevronDown, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const pixKey = "21965328868";

  const copyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    toast({
      title: "Chave PIX copiada!",
      description: "A chave foi copiada para a área de transferência.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const modules = [
    {
      id: 1,
      title: "Vestidos de Crochê",
      description: "Modelos exclusivos de vestidos artesanais com receitas detalhadas.",
      image: vestidosCroche,
      link: "/vestidos-croche",
      badge: "Novidade"
    },
    {
      id: 2,
      title: "Mini Curso para Iniciante",
      description: "Aprenda do zero com técnicas fundamentais de crochê passo a passo.",
      image: cursoCompleto,
      link: "/curso-completo",
      badge: "Iniciante"
    },
    {
      id: 3,
      title: "+2000 Modelos e Receitas",
      description: "Acesso completo a mais de 2000 modelos e receitas em PDF para todos os níveis.",
      image: modelosReceitas,
      link: "/modelos-receitas",
      badge: "Popular"
    },
    {
      id: 4,
      title: "Roupinhas Infantil",
      description: "Coleção especial de roupinhas adoráveis para bebês e crianças.",
      image: vestidosInfantis,
      link: "/vestidos-infantis"
    },
    {
      id: 5,
      title: "Sapatinhos de Crochê",
      description: "Modelos adoráveis de sapatinhos e botinhas para os pequenos.",
      image: sapatinhosCroche,
      link: "/sapatinhos-croche"
    },
    {
      id: 6,
      title: "Chapéus de Crochê",
      description: "Bucket hats, toucas e chapéus lindos para todas as idades.",
      image: maisModelos,
      link: "/chapeu-croche",
      badge: "Novo"
    },
    {
      id: 7,
      title: "Bolsas de Crochê",
      description: "Designs modernos e elegantes de bolsas, carteiras e acessórios.",
      image: bolsasCroche,
      link: "/bolsas-croche"
    },
    {
      id: 8,
      title: "Modelos Adulto",
      description: "Croppeds, biquínis, tops e peças estilosas para você arrasar.",
      image: maisModelos,
      link: "/mais-modelos"
    },
    {
      id: 9,
      title: "Emitir Certificado",
      description: "Clique aqui para emitir seu certificado de conclusão do curso.",
      image: certificado,
      link: "/certificado",
      badge: "Certificado"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Hero Section - Netflix Style */}
      <section className="relative flex items-start justify-center overflow-hidden pt-[25px]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
        
        {/* Content */}
        <div className="relative z-10 text-center px-6 animate-fade-in max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
            <Sparkles className="w-7 h-7 md:w-10 md:h-10 text-primary flex-shrink-0" />
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg leading-tight">
              Crochê da Josi
            </h1>
          </div>
          <p className="text-white/80 text-base md:text-xl lg:text-2xl mb-4 md:mb-6 font-light leading-relaxed">
            Sua área exclusiva de conteúdos
          </p>
          <h2 className="text-lg md:text-2xl lg:text-3xl font-medium text-white/90 leading-snug px-2 mb-6">
            Acesse sua área de membros abaixo
          </h2>
          
          {/* Scroll Indicator */}
          <div className="animate-bounce mb-6">
            <ChevronDown className="w-8 h-8 md:w-10 md:h-10 text-white/60 mx-auto" />
          </div>

          {/* PIX Section - Compact */}
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md mb-8">
            <span className="text-sm text-muted-foreground">PIX:</span>
            <code className="font-mono font-semibold text-foreground">{pixKey}</code>
            <Button 
              onClick={copyPixKey} 
              variant="ghost"
              size="sm"
              className="h-7 px-2 gap-1 text-xs"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copiado" : "Copiar"}
            </Button>
          </div>
          
          {/* Módulos section inside hero */}
          <div className="text-center animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md mb-2">
              Módulos Disponíveis
            </h2>
            <p className="text-white/80 text-base max-w-2xl mx-auto mb-6">
              Explore todos os módulos e comece sua jornada criativa
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-scale-in">
          {modules.map((module, index) => (
            <div
              key={module.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ModuleCard
                title={module.title}
                description={module.description}
                image={module.image}
                link={module.link}
                badge={module.badge}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20 bg-card/30">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p className="text-sm">
            © {new Date().getFullYear()} Crochê da Josi - Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
