import { useState } from "react";
import { Copy, Check, Smartphone, Flame, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const UrgentPixHeader = () => {
  const [copied, setCopied] = useState(false);
  const [spotsLeft] = useState(5);
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

  return (
    <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Urgency Message */}
          <div className="flex items-center gap-3 animate-pulse">
            <Flame className="w-5 h-5 text-yellow-200" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm md:text-base">
                🔥 OFERTA ESPECIAL - SOMENTE HOJE!
              </span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Últimas {spotsLeft} vagas
              </span>
            </div>
          </div>

          {/* PIX Info */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">Pix:</span>
              <code className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded">{pixKey}</code>
              <span className="text-white/80 text-xs hidden md:inline">(Lucas Morone)</span>
            </div>
            <Button 
              onClick={copyPixKey} 
              size="sm"
              className="gap-1.5 bg-white text-orange-600 hover:bg-white/90 font-semibold shadow-lg h-7 text-xs"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copiado!" : "Copiar"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
