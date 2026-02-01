import { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const UrgentPixHeader = () => {
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

  return (
    <div className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 md:gap-6 h-10">
          {/* Offer Badge */}
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium text-xs md:text-sm text-foreground">
              Oferta Especial
            </span>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-4 bg-border" />

          {/* PIX Info */}
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-xs text-muted-foreground hidden sm:inline">Pix:</span>
            <code className="font-mono text-xs md:text-sm font-semibold text-foreground bg-muted px-2 py-0.5 rounded">
              {pixKey}
            </code>
            <Button 
              onClick={copyPixKey} 
              size="sm"
              variant="default"
              className="gap-1.5 h-7 text-xs font-medium"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span className="hidden sm:inline">{copied ? "Copiado!" : "Copiar"}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
