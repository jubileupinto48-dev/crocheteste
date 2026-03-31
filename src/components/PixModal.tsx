import { useState, useEffect } from "react";
import { Copy, Check, Lock, Star, Users, Gift, Zap, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PIX_KEY = "21965328868";
const DELAY_MS = 4 * 60 * 1000; // 4 minutos
const SESSION_KEY = "pix_modal_shown";

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

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

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
      {/* Overlay — não fecha ao clicar */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full sm:max-w-md bg-card border border-border sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-y-auto max-h-[92dvh] animate-scale-in">

        {/* Header gradient bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-amber-400 to-orange-600" />

        {/* Content */}
        <div className="px-6 pt-6 pb-7 space-y-5">

          {/* Headline */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-primary/15 text-primary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              Acesso Quase Completo
            </div>
            <h2 className="text-xl font-extrabold text-foreground leading-tight">
              Você já viu que o conteúdo é real! 🎉
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Confirme seu pagamento via PIX e garanta seu acesso <span className="text-foreground font-semibold">vitalício</span> com todos os bônus abaixo:
            </p>
          </div>

          {/* Bonus list */}
          <div className="bg-muted/50 rounded-xl p-4 space-y-2.5">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
              O que você vai desbloquear:
            </p>
            {bonuses.map((b, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  {b.icon}
                </div>
                <span className="text-sm text-foreground/90 font-medium">{b.label}</span>
              </div>
            ))}
          </div>

          {/* PIX Section */}
          <div className="space-y-3">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] text-amber-400/80 font-semibold uppercase tracking-wider">Chave PIX</p>
                <p className="text-base font-bold text-foreground tracking-wide">{PIX_KEY}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">WhatsApp · Josi</p>
              </div>
              <button
                onClick={copyPix}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-black font-bold text-sm px-4 py-2.5 rounded-lg transition-colors shrink-0 shadow"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copiado!" : "Copiar"}
              </button>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Após o pagamento, você receberá a confirmação em até <span className="text-foreground font-medium">5 minutos</span>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
