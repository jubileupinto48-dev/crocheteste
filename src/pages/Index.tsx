import { useState } from "react";
import { ModuleCard } from "@/components/ModuleCard";
import certificado from "@/assets/certificado.jpg";
import { ArrowRight, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FavoritesSection } from "@/components/FavoritesSection";
const Index = () => {
  const [copied, setCopied] = useState(false);
  const {
    toast
  } = useToast();
  const pixKey = "21965328868";
  const copyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    toast({
      title: "Chave PIX copiada!",
      description: "A chave foi copiada para a área de transferência.",
      duration: 3000
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // Outros módulos
  const modules = [{
    id: 2,
    title: "Mini Curso para Iniciante",
    description: "Aprenda do zero com técnicas fundamentais de crochê passo a passo.",
    image: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773050451/WhatsApp_Image_2026-03-09_at_07.00.01_xsovpz.jpg",
    link: "/curso-completo",
    badge: "Iniciante"
  }, {
    id: 3,
    title: "+2000 Modelos e Receitas",
    description: "Acesso completo a mais de 2000 modelos e receitas em PDF para todos os níveis.",
    image: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773050457/WhatsApp_Image_2026-03-09_at_07.00.02_dio5vz.jpg",
    link: "/modelos-receitas",
    badge: "Popular"
  }, {
    id: 4,
    title: "Roupinhas Infantil",
    description: "Coleção especial de roupinhas adoráveis para bebês e crianças.",
    image: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773050458/WhatsApp_Image_2026-03-09_at_07.00.02_1_llwiwx.jpg",
    link: "/vestidos-infantis"
  }, {
    id: 5,
    title: "Sapatinhos de Crochê",
    description: "Modelos adoráveis de sapatinhos e botinhas para os pequenos.",
    image: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773050476/WhatsApp_Image_2026-03-09_at_07.00.02_2_bcm2vq.jpg",
    link: "/sapatinhos-croche"
  }, {
    id: 6,
    title: "Chapéus de Crochê",
    description: "Bucket hats, toucas e chapéus lindos para todas as idades.",
    image: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773050477/WhatsApp_Image_2026-03-09_at_07.00.02_3_t6jlp8.jpg",
    link: "/chapeu-croche",
    badge: "Novo"
  }, {
    id: 7,
    title: "Bolsas de Crochê",
    description: "Designs modernos e elegantes de bolsas, carteiras e acessórios.",
    image: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773050479/WhatsApp_Image_2026-03-09_at_07.00.02_4_eorhcd.jpg",
    link: "/bolsas-croche"
  }, {
    id: 8,
    title: "Modelos Adulto",
    description: "Croppeds, biquínis, tops e peças estilosas para você arrasar.",
    image: "https://res.cloudinary.com/dmwuhogih/image/upload/v1773050611/WhatsApp_Image_2026-03-09_at_07.03.15_sbj7tw.jpg",
    link: "/mais-modelos"
  }, {
    id: 9,
    title: "Emitir Certificado",
    description: "Clique aqui para emitir seu certificado de conclusão do curso.",
    image: certificado,
    link: "/certificado",
    badge: "Certificado"
  }];
  return <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full">
        {/* Background Image - different for mobile vs desktop */}
        <div className="relative w-full">
          <img src="https://res.cloudinary.com/dmwuhogih/image/upload/v1773049980/197ab283-abea-4bbf-9704-f02052746307_bm4fgp.jpg" alt="Acesse o material abaixo" className="w-full h-auto block md:hidden" />
          <img src="https://res.cloudinary.com/dmwuhogih/image/upload/v1773106265/Design_sem_nome_1_qppawg_huebc0.png" alt="Acesse o material abaixo" className="w-full h-auto hidden md:block" />
        </div>
      </section>

      {/* PIX Button - positioned above gradient */}
      <div className="relative z-30 -mt-20 pb-4 flex justify-center">
        <Button onClick={copyPixKey} className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-full shadow-lg">
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          {copied ? "Copiado!" : "Copiar Chave PIX"}
        </Button>
      </div>

      {/* Gradient overlay between hero and main - positioned to cover the junction */}
      <div className="relative z-20 -mt-4 h-16 bg-gradient-to-t from-background from-50% to-transparent pointer-events-none" />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-0 md:py-0">

        {/* Featured Module - Carousel */}
        <section className="mb-0 animate-fade-in">
          <div className="text-center mb-6">
            <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-3">
              ⭐ Videos em Destaque
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Vestidos de Crochê
            </h2>
            <p className="text-muted-foreground">
              Clique para assistir ou navegue pelo carrossel
            </p>
          </div>
          
          <FeaturedCarousel />
          
          {/* Link to full module */}
          <div className="text-center mt-6">
            <Link to="/vestidos-croche" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline group">
              <span>Ver todos os vídeos do módulo</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Favorites Section */}
        <FavoritesSection />

        {/* Other Modules Section */}
        <section className="animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 py-0 mt-[10px] my-[20px]">
              Mais Módulos
            </h2>
            <p className="text-muted-foreground">
              Clique em cada card para acessar o conteúdo completo
            </p>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {modules.map((module, index) => <div key={module.id} className="animate-fade-in" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <ModuleCard title={module.title} description={module.description} image={module.image} link={module.link} badge={module.badge} />
              </div>)}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20 bg-card/30">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p className="text-sm">
            © {new Date().getFullYear()} Crochê da Josi - Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>;
};
export default Index;