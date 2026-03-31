import { useState } from "react";
import { ModuleCard } from "@/components/ModuleCard";
import certificado from "@/assets/certificado.jpg";
import moduloCroppeds from "@/assets/modulo-croppeds-thumbnail.jpg";
import { Copy, Check, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { useToast } from "@/hooks/use-toast";
import { FavoritesSection } from "@/components/FavoritesSection";

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
      duration: 3000,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const modules = [
    {
      id: 1,
      title: "Vestidos de Crochê",
      description: "Acesse todas as aulas exclusivas de vestidos de crochê com passo a passo completo.",
      image: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773516061/Design_sem_nome_3_kiedr8.png",
      link: "/vestidos-croche",
      badge: "Destaque",
    },
    {
      id: 2,
      title: "Croppeds, Biquínis, Conjuntos",
      description: "Croppeds, biquínis, tops e peças estilosas para você arrasar.",
      image: moduloCroppeds,
      link: "/mais-modelos",
    },
    {
      id: 3,
      title: "Mini Curso para Iniciante",
      description: "Aprenda do zero com técnicas fundamentais de crochê passo a passo.",
      image: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773050451/WhatsApp_Image_2026-03-09_at_07.00.01_xsovpz.jpg",
      link: "/curso-completo",
      badge: "Iniciante",
    },
    {
      id: 4,
      title: "+2000 Modelos e Receitas",
      description: "Acesso completo a mais de 2000 modelos e receitas em PDF para todos os níveis.",
      image: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773050457/WhatsApp_Image_2026-03-09_at_07.00.02_dio5vz.jpg",
      link: "/modelos-receitas",
      badge: "Popular",
    },
    {
      id: 5,
      title: "Roupinhas Infantil",
      description: "Coleção especial de roupinhas adoráveis para bebês e crianças.",
      image: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773050458/WhatsApp_Image_2026-03-09_at_07.00.02_1_llwiwx.jpg",
      link: "/vestidos-infantis",
    },
    {
      id: 6,
      title: "Sapatinhos de Crochê",
      description: "Modelos adoráveis de sapatinhos e botinhas para os pequenos.",
      image: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773050476/WhatsApp_Image_2026-03-09_at_07.00.02_2_bcm2vq.jpg",
      link: "/sapatinhos-croche",
    },
    {
      id: 7,
      title: "Chapéus de Crochê",
      description: "Bucket hats, toucas e chapéus lindos para todas as idades.",
      image: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773050477/WhatsApp_Image_2026-03-09_at_07.00.02_3_t6jlp8.jpg",
      link: "/chapeu-croche",
      badge: "Novo",
    },
    {
      id: 8,
      title: "Bolsas de Crochê",
      description: "Designs modernos e elegantes de bolsas, carteiras e acessórios.",
      image: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773050479/WhatsApp_Image_2026-03-09_at_07.00.02_4_eorhcd.jpg",
      link: "/bolsas-croche",
    },
    {
      id: 9,
      title: "Emitir Certificado",
      description: "Clique aqui para emitir seu certificado de conclusão do curso.",
      image: certificado,
      link: "/certificado",
      badge: "Certificado",
    },
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* PIX Notification Banner */}
      <div className="bg-amber-500/8 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
              <span className="text-amber-400 text-xs">⚡</span>
            </div>
            <p className="text-sm text-foreground/80 text-center sm:text-left">
              <span className="font-semibold text-amber-400">Pagamento pendente</span>
              {" "}— Gostou do conteúdo? Apoie a Josi e confirme seu acesso via PIX.
            </p>
          </div>
          <button
            onClick={copyPixKey}
            className="flex items-center gap-2 shrink-0 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-black font-semibold text-sm px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copiado!" : "Copiar Chave PIX"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-14">

        {/* Welcome */}
        <section className="animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-1">
            Bem-vinda! 👋
          </h1>
          <p className="text-muted-foreground text-base">
            Aqui estão todos os seus conteúdos disponíveis. Bons estudos!
          </p>
        </section>

        {/* Featured Videos — Carousel */}
        <section className="animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-primary rounded-full shrink-0" />
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-foreground">Vestidos em Destaque</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Navegue pelo carrossel e clique para assistir
              </p>
            </div>
            <Link
              to="/vestidos-croche"
              className="shrink-0 text-sm text-primary font-semibold hover:underline"
            >
              Ver todos →
            </Link>
          </div>
          <FeaturedCarousel />
        </section>

        {/* Favorites */}
        <FavoritesSection />

        {/* All Modules */}
        <section className="animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-primary rounded-full shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Todos os Módulos
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {modules.length} módulos disponíveis — clique para acessar
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {modules.map((module, index) => (
              <div
                key={module.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.06}s` }}
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
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">J</span>
            </div>
            <span className="font-semibold text-foreground/70">Crochê da Josi</span>
          </div>
          <p>© {new Date().getFullYear()} Crochê da Josi — Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
