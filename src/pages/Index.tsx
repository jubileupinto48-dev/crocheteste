import { useState, useEffect } from "react";
import { ModuleCard } from "@/components/ModuleCard";
import certificado from "@/assets/certificado.jpg";
import moduloCroppeds from "@/assets/modulo-croppeds-thumbnail.jpg";
import { Copy, Check, BookOpen, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { useToast } from "@/hooks/use-toast";
import { FavoritesSection } from "@/components/FavoritesSection";

const COUNTDOWN_SECONDS = 10 * 60; // 10 minutes

const Index = () => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_SECONDS);
  const { toast } = useToast();
  const pixKey = "21965328868";
  const acessoLiberado = new URLSearchParams(window.location.search).get("acesso") === "liberado";

  useEffect(() => {
    if (acessoLiberado) return;
    const interval = setInterval(() => {
      setTimeLeft(t => t > 0 ? t - 1 : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [acessoLiberado]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return { m, sec };
  };

  const { m, sec } = formatTime(timeLeft);

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

          {/* WhatsApp Group CTA — abaixo do Certificado */}
          <div className="mt-6 animate-fade-in">
            <a
              href="https://chat.whatsapp.com/GSRWW9KHlTYH41ZJ3D3AWt?mode=gi_t"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-base transition-all duration-200 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #25d366, #128c7e)',
                color: 'white',
                boxShadow: '0 4px 20px hsl(145 70% 35% / 0.35)',
              }}
            >
              <MessageCircle className="w-6 h-6" />
              Entrar no Grupo Exclusivo do WhatsApp 🎉
            </a>
            <p className="text-center text-xs mt-2" style={{ color: 'hsl(330 8% 42%)' }}>
              Acesso aos bônus, novidades e suporte direto com a Josi
            </p>
          </div>
        </section>
      </main>

      {/* PIX Banner — acima do rodapé, apenas se pagamento pendente */}
      {!acessoLiberado && (
        <div className="mx-4 mb-4 rounded-2xl overflow-hidden"
          style={{ border: '1px solid hsl(322 40% 28% / 0.5)', background: 'hsl(322 35% 11% / 0.9)' }}
        >
          <div className="px-5 py-5 flex flex-col gap-4">
            {/* Header row */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'hsl(322 40% 20%)' }}
              >
                <span className="text-base">⚡</span>
              </div>
              <div>
                <p className="text-sm font-bold leading-tight" style={{ color: 'hsl(322 62% 78%)' }}>
                  Pagamento pendente
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'hsl(20 12% 65%)' }}>
                  Gabrielle Tavares (Minha Filha)
                </p>
              </div>
            </div>

            {/* Message */}
            <p className="text-sm leading-relaxed font-medium" style={{ color: 'hsl(20 10% 82%)' }}>
              Gostou do conteúdo? confirme seu pix para eu te enviar todos os bônus e acesso vitalício! 🙏💖
            </p>

            {/* Countdown */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="rounded-xl px-3 py-2 min-w-[52px] text-center"
                  style={{ background: 'hsl(322 30% 8%)', border: '1px solid hsl(322 40% 28%)' }}
                >
                  <span className="font-mono font-extrabold text-2xl leading-none"
                    style={{ color: timeLeft < 60 ? 'hsl(0 80% 65%)' : 'hsl(322 62% 78%)' }}
                  >{m}</span>
                  <p className="text-[9px] font-semibold uppercase tracking-wider mt-0.5"
                    style={{ color: 'hsl(322 30% 50%)' }}>min</p>
                </div>
                <span className="font-extrabold text-2xl" style={{ color: 'hsl(322 50% 65%)' }}>:</span>
                <div className="rounded-xl px-3 py-2 min-w-[52px] text-center"
                  style={{ background: 'hsl(322 30% 8%)', border: '1px solid hsl(322 40% 28%)' }}
                >
                  <span className="font-mono font-extrabold text-2xl leading-none"
                    style={{ color: timeLeft < 60 ? 'hsl(0 80% 65%)' : 'hsl(322 62% 78%)' }}
                  >{sec}</span>
                  <p className="text-[9px] font-semibold uppercase tracking-wider mt-0.5"
                    style={{ color: 'hsl(322 30% 50%)' }}>seg</p>
                </div>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider"
                style={{ color: 'hsl(38 90% 60%)' }}
              >
                ⏰ Valor promocional apenas Hoje!
              </p>
            </div>

            {/* PIX key display */}
            <div className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{ background: 'hsl(322 30% 8%)', border: '1px solid hsl(322 30% 22%)' }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                  style={{ color: 'hsl(322 40% 55%)' }}
                >
                  Chave PIX (Celular)
                </p>
                <p className="text-base font-mono font-bold tracking-wide"
                  style={{ color: 'hsl(322 62% 78%)' }}
                >
                  {pixKey}
                </p>
              </div>
            </div>

            {/* Copy button — full width on mobile */}
            <button
              onClick={copyPixKey}
              className="w-full flex items-center justify-center gap-2 font-bold text-sm py-3.5 rounded-xl transition-all duration-200"
              style={{
                background: copied
                  ? 'hsl(142 60% 35%)'
                  : 'linear-gradient(135deg, hsl(322 62% 60%), hsl(280 50% 52%))',
                color: 'white',
                animation: copied ? 'none' : 'pix-pulse 2.5s ease-in-out infinite',
              }}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? "Chave copiada!" : "Copiar Chave PIX"}
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid hsl(330 14% 16%)', marginTop: '0' }}>
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
