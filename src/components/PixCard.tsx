import { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const PixCard = () => {
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
    <Card className="bg-card/90 backdrop-blur-md border-border/50 px-4 py-3 shadow-lg">
      <div className="flex items-center gap-3">
        {/* Offer Badge */}
        <div className="flex items-center gap-1.5 text-primary">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="font-medium text-xs">
            Oferta Especial
          </span>
        </div>

        <div className="w-px h-4 bg-border" />

        {/* PIX Info */}
        <div className="flex items-center gap-2">
          <code className="font-mono text-xs font-semibold text-foreground bg-muted px-2 py-1 rounded">
            {pixKey}
          </code>
          <Button 
            onClick={copyPixKey} 
            size="sm"
            variant="default"
            className="gap-1.5 h-7 text-xs font-medium"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? "Copiado!" : "Copiar"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
