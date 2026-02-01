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
    <Card className="bg-card/90 backdrop-blur-md border-border/50 p-6 md:p-8 shadow-xl">
      <div className="flex flex-col items-center gap-4">
        {/* Offer Badge */}
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold text-base md:text-lg">
            Oferta Especial
          </span>
        </div>

        {/* PIX Info */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-sm text-muted-foreground">Chave PIX:</span>
          <code className="font-mono text-lg md:text-xl font-bold text-foreground bg-muted px-4 py-2 rounded-lg">
            {pixKey}
          </code>
          <Button 
            onClick={copyPixKey} 
            size="lg"
            variant="default"
            className="gap-2 font-semibold"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copiado!" : "Copiar Chave PIX"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
