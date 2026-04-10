import { useState } from "react";
import { ModuleCard } from "@/components/ModuleCard";
import certificado from "@/assets/certificado.jpg";
import moduloCroppeds from "@/assets/modulo-croppeds-thumbnail.jpg";
import { Copy, Check, BookOpen, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { useToast } from "@/hooks/use-toast";
import { FavoritesSection } from "@/components/FavoritesSection";

const Index = () => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const pixKey = "21965328868";
  const acessoLiberado = new URLSearchParams(window.location.search).get("acesso") === "liberado";

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
      image: "/thumbnails/vestidos-croche-thumb.jpg",
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
      title: "Roupinhas Infantil",
      description: "Coleção especial de roupinhas adoráveis para bebês e crianças.",
      image: "/thumbnails/modulo-infantil-thumb.jpg",
      link: "/vestidos-infantis",
    },
    {
      id: 4,
      title: "Mini Curso para Iniciante",
      description: "Aprenda do zero com técnicas fundamentais de crochê passo a passo.",
      image: "/thumbnails/modulo-iniciante-thumb.jpg",
      link: "/curso-completo",
      badge: "Iniciante",
    },
    {
      id: 5,
      title: "+2000 Modelos e Receitas",
      description: "Acesso completo a mais de 2000 modelos e receitas em PDF para todos os níveis.",
      image: "/thumbnails/modulo-receitas-thumb.jpg",
      link: "/modelos-receitas",
      badge: "Popular",
    },
    {
      id: 6,
      title: "Sapatinhos de Crochê",
      description: "Modelos adoráveis de sapatinhos e botinhas para os pequenos.",
      image: "/thumbnails/modulo-sapatinhos-thumb.jpg",
      link: "/sapatinhos-croche",
    },
    {
      id: 7,
      title: "Chapéus de Crochê",
      description: "Bucket hats, toucas e chapéus lindos para todas as idades.",
      image: "/thumbnails/modulo-chapeus-thumb.jpg",
      link: "/chapeu-croche",
      badge: "Novo",
    },
    {
      id: 8,
      title: "Bolsas de Crochê",
      description: "Designs modernos e elegantes de bolsas, carteiras e acessórios.",
      image: "/thumbnails/modulo-bolsas-thumb.jpg",
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
      {!acessoLiberado && (
        <div style={{ background: 'hsl(322 40% 15% / 0.5)', borderBottom: '1px solid hsl(322 40% 25% / 0.4)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'hsl(322 40% 25% / 0.5)' }}
              >
                <span className="text-xs" style={{ color: 'hsl(322 62% 72%)' }}>⚡</span>
              </div>
              <p className="text-sm text-center sm:text-left" style={{ color: 'hsl(20 15% 80%)' }}>
                <span className="font-bold" style={{ color: 'hsl(322 62% 72%)' }}>Pagamento pendente</span>
                {" "}— Gostou do conteúdo? Apoie a Josi e confirme seu acesso via PIX.
              </p>
            </div>
            <button
              onClick={copyPixKey}
              className="flex items-center gap-2 shrink-0 font-bold text-sm px-4 py-2 rounded-xl transition-all duration-200 shadow-sm"
              style={{
                background: 'linear-gradient(135deg, hsl(322 62% 60%), hsl(280 50% 52%))',
                color: 'white',
              }}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copiado!" : "Copiar Chave PIX"}
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-14">

        {/* Welcome */}
        <section className="animate-fade-in">
          <div className="flex items-end gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-2"
                style={{ color: 'hsl(322 55% 62%)', letterSpacing: '0.14em' }}
              >
                ✦ Bem-vinda de volta
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground"
                style={{ letterSpacing: '-0.02em', lineHeight: 1.2 }}
              >
                Seu ateliê de crochê
                <span className="block italic" style={{ color: 'hsl(322 55% 70%)' }}>
                  te espera, Aluna!
                </span>
              </h1>
              <p className="mt-3 text-base" style={{ color: 'hsl(330 8% 52%)' }}>
                Todos os seus conteúdos disponíveis abaixo. Bons estudos!
              </p>
            </div>
          </div>
          {/* Decorative yarn divider */}
          <div className="mt-8 flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, hsl(322 40% 30% / 0.6), transparent)' }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'hsl(322 40% 45%)' }}>
              ✦ ✦ ✦
            </span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, hsl(322 40% 30% / 0.6))' }} />
          </div>
        </section>

        {/* Featured Videos — Carousel */}
        <section id="carousel-destaque" className="animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-7 rounded-full" style={{ background: 'linear-gradient(180deg, hsl(322 62% 65%), hsl(280 50% 55%))' }} />
            <div className="flex-1 min-w-0">
              <h2 className="font-display text-xl font-semibold text-foreground" style={{ letterSpacing: '-0.01em' }}>
                Vestidos em Destaque
              </h2>
              <p className="text-sm mt-0.5" style={{ color: 'hsl(330 8% 46%)' }}>
                Navegue pelo carrossel e clique para assistir
              </p>
            </div>
            <Link
              to="/vestidos-croche"
              className="shrink-0 text-sm font-bold transition-colors duration-200"
              style={{ color: 'hsl(322 55% 65%)' }}
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
            <div className="w-1 h-7 rounded-full" style={{ background: 'linear-gradient(180deg, hsl(322 62% 65%), hsl(280 50% 55%))' }} />
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2" style={{ letterSpacing: '-0.01em' }}>
                <BookOpen className="w-5 h-5" style={{ color: 'hsl(322 55% 65%)' }} />
                Todos os Módulos
              </h2>
              <p className="text-sm mt-0.5" style={{ color: 'hsl(330 8% 46%)' }}>
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
      <footer style={{ borderTop: '1px solid hsl(330 14% 16%)', marginTop: '2rem' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ color: 'hsl(330 8% 42%)' }}
        >
          <div className="flex items-center gap-3">
            <img
              src="/thumbnails/logo-crochedajosi.png"
              alt="Crochê da Josi"
              className="h-10 w-auto"
              style={{ filter: 'drop-shadow(0 1px 4px hsl(322 40% 30% / 0.3))' }}
            />
            <span className="text-xs" style={{ color: 'hsl(322 40% 50%)' }}>Feito com carinho ✦</span>
          </div>
          <p className="text-xs text-center" style={{ color: 'hsl(330 8% 38%)' }}>
            © {new Date().getFullYear()} Crochê da Josi — Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
