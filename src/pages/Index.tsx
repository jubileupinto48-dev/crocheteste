import { ModuleCard } from "@/components/ModuleCard";
import vestidosCroche from "@/assets/vestidos-croche.jpg";
import modelosReceitas from "@/assets/modelos-receitas.jpg";
import cursoCompleto from "@/assets/curso-completo.jpg";
import vestidosInfantis from "@/assets/vestidos-infantis.jpg";
import sapatinhosCroche from "@/assets/sapatinhos-croche.jpg";
import bolsasCroche from "@/assets/bolsas-croche.jpg";
import certificado from "@/assets/certificado.jpg";
import maisModelos from "@/assets/mais-modelos.jpg";
import { Sparkles } from "lucide-react";

const Index = () => {
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
      {/* Header */}
      <header className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-7 h-7 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Crochê da Josi
            </h1>
          </div>
          <p className="text-center text-muted-foreground mt-2 text-sm md:text-base">
            Sua área exclusiva de conteúdos
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Bem-vinda à Área de Membros
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore todos os módulos disponíveis e comece sua jornada criativa
          </p>
        </div>

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
