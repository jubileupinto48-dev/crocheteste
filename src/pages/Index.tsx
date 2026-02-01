import { ModuleCard } from "@/components/ModuleCard";
import certificado from "@/assets/certificado.jpg";
import { Sparkles, ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { UrgentPixHeader } from "@/components/UrgentPixHeader";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Smartphone, Copy, Check, Play } from "lucide-react";
const Index = () => {

  // Outros módulos
  const modules = [
    {
      id: 2,
      title: "Mini Curso para Iniciante",
      description: "Aprenda do zero com técnicas fundamentais de crochê passo a passo.",
      image: "https://res.cloudinary.com/dzetm6plq/image/upload/v1769589237/ChatGPT_Image_21_de_jan._de_2026_18_39_04_ktuyey.webp",
      link: "/curso-completo",
      badge: "Iniciante"
    },
    {
      id: 3,
      title: "+2000 Modelos e Receitas",
      description: "Acesso completo a mais de 2000 modelos e receitas em PDF para todos os níveis.",
      image: "https://res.cloudinary.com/dzetm6plq/image/upload/v1769589285/ChatGPT_Image_21_de_jan._de_2026_18_45_10_u80nde.webp",
      link: "/modelos-receitas",
      badge: "Popular"
    },
    {
      id: 4,
      title: "Roupinhas Infantil",
      description: "Coleção especial de roupinhas adoráveis para bebês e crianças.",
      image: "https://res.cloudinary.com/dzetm6plq/image/upload/v1769589307/ChatGPT_Image_21_de_jan._de_2026_18_56_22_eobbgv.webp",
      link: "/vestidos-infantis"
    },
    {
      id: 5,
      title: "Sapatinhos de Crochê",
      description: "Modelos adoráveis de sapatinhos e botinhas para os pequenos.",
      image: "https://res.cloudinary.com/dzetm6plq/image/upload/v1769589329/ChatGPT_Image_21_de_jan._de_2026_18_58_52_psqfqs.webp",
      link: "/sapatinhos-croche"
    },
    {
      id: 6,
      title: "Chapéus de Crochê",
      description: "Bucket hats, toucas e chapéus lindos para todas as idades.",
      image: "https://res.cloudinary.com/dzetm6plq/image/upload/v1769589391/ChatGPT_Image_21_de_jan._de_2026_18_54_42_szutmx.webp",
      link: "/chapeu-croche",
      badge: "Novo"
    },
    {
      id: 7,
      title: "Bolsas de Crochê",
      description: "Designs modernos e elegantes de bolsas, carteiras e acessórios.",
      image: "https://res.cloudinary.com/dzetm6plq/image/upload/v1769589485/ChatGPT_Image_21_de_jan._de_2026_18_52_57_ib52kw.webp",
      link: "/bolsas-croche"
    },
    {
      id: 8,
      title: "Modelos Adulto",
      description: "Croppeds, biquínis, tops e peças estilosas para você arrasar.",
      image: "https://res.cloudinary.com/dzetm6plq/image/upload/v1769589503/ChatGPT_Image_21_de_jan._de_2026_18_50_05_qj04ps.webp",
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
      {/* Urgent PIX Header */}
      <UrgentPixHeader />

      {/* Hero Section */}
      <section className="relative flex items-start justify-center overflow-hidden pt-[25px]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(https://res.cloudinary.com/dzetm6plq/image/upload/v1769728044/Que_a_integridade_e_a_retid%C3%A3o_me_protejam_porque_a_minha_esperan%C3%A7a_esta_em_ti_-_Salmos_2521_ow6jcl.png)` }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
        
        {/* Content */}
        <div className="relative z-10 text-center px-6 animate-fade-in max-w-3xl mx-auto pb-8">
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
          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 md:w-10 md:h-10 text-white/60 mx-auto" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        
        {/* Featured Module - Carousel */}
        <section className="mb-12 animate-fade-in">
          <div className="text-center mb-6">
            <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-3">
              ⭐ Módulo em Destaque
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
            <Link 
              to="/vestidos-croche" 
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline group"
            >
              <span>Ver todos os vídeos do módulo</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Other Modules Section */}
        <section className="animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Mais Módulos
            </h2>
            <p className="text-muted-foreground">
              Clique em cada card para acessar o conteúdo completo
            </p>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
    </div>
  );
};

export default Index;
