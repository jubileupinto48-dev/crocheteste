import { useState, useEffect } from "react";
import { Copy, Check, Lock, Star, Users, Gift, Zap, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PIX_KEY = "21965328868";
const DELAY_MS = 2.5 * 60 * 1000; // 2 minutos e meio

const bonuses = [
  {
    icon: <Lock className="w-4 h-4 text-amber-400" />,
    label: "Acesso vitalício a todos os módulos",
  },
  {
    icon: <Gift className="w-4 h-4 text-emerald-400" />,
    label: "+2000 Modelos e Receitas em PDF",
  },
  {
    icon: <Users className="w-4 h-4 text-sky-400" />,
    label: "Grupo VIP no WhatsApp com a Josi",
  },
  {
    icon: <Zap className="w-4 h-4 text-violet-400" />,
    label: "Atualizações gratuitas para sempre",
  },
  {
    icon: <Star className="w-4 h-4 text-yellow-400" />,
    label: "Certificado de conclusão do curso",
  },
  {
    icon: <ShieldCheck className="w-4 h-4 text-rose-400" />,
    label: "Suporte direto para tirar dúvidas",
  },
];

export const PixModal = () => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Não mostra modal se acesso já foi liberado
  const acessoLiberado = new URLSearchParams(window.location.search).get("acesso") === "liberado";

  useEffect(() => {
    if (acessoLiberado) return;

    const timer = setTimeout(() => {
      const carousel = document.getElementById("carousel-destaque");
      if (carousel) {
        carousel.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setTimeout(() => setOpen(true), 600);
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, [acessoLiberado]);

  const copyPix = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    toast({
      title: "Chave PIX copiada!",
      description: "Agora é só colar no seu banco e confirmar o pagamento.",
      duration: 3000,
    });
    setTimeout(() => setCopied(false), 2500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Overlay semitransparente — pointer-events-none para permitir scroll no fundo */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px] pointer-events-none" />

      {/* Modal compacto */}
      <div className="relative w-full sm:max-w-sm bg-card/95 border border-border sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-y-auto max-h-[90dvh] animate-scale-in">

        {/* Barra gradiente */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-pink-400 to-purple-500" />

        <div className="px-4 pt-4 pb-5 space-y-3">

          {/* Headline */}
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-primary/15 text-primary text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              <Zap className="w-3 h-3" />
              Acesso Quase Completo
            </div>
            <h2 className="text-base font-extrabold text-foreground leading-tight">
              Você já viu que o conteúdo é real! 🎉
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Confirme via PIX e desbloqueie acesso <span className="text-foreground font-semibold">vitalício</span> + bônus:
            </p>
          </div>

          {/* Bonus list — compacto em 2 colunas */}
          <div className="bg-muted/40 rounded-xl p-3 grid grid-cols-2 gap-1.5">
            {bonuses.map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="shrink-0">{b.icon}</div>
                <span className="text-[11px] text-foreground/85 font-medium leading-tight">{b.label}</span>
              </div>
            ))}
          </div>

          {/* PIX */}
          <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl px-3 py-2.5 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] text-pink-400/80 font-bold uppercase tracking-wider">Chave PIX</p>
              <p className="text-sm font-bold text-foreground tracking-wide">{PIX_KEY}</p>
              <p className="text-[10px] text-muted-foreground">Gabrielle Tavares</p>
            </div>
            <button
              onClick={copyPix}
              className="flex items-center gap-1.5 bg-pink-500 hover:bg-pink-400 active:bg-pink-600 text-white font-bold text-xs px-3 py-2 rounded-lg transition-colors shrink-0 shadow"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copiado!" : "Copiar"}
            </button>
          </div>

          <p className="text-center text-[11px] text-muted-foreground">
            Após o pagamento, confirmação em até <span className="text-foreground font-medium">2 minutos</span>.
          </p>

        </div>
      </div>
    </div>
  );
};
