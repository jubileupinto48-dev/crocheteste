import { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const PixCard = () => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const pixKey = "21965328868";
  const pixName = "Lucas Morone (Meu filho)";

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
    <Card className="bg-black/60 backdrop-blur-sm border-white/20 px-5 py-4 shadow-lg">
      <div className="flex flex-col items-center gap-3">
        {/* Header */}
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="w-4 h-4" />
          <span className="font-semibold text-sm">Chave PIX: Celular</span>
        </div>

        {/* Name */}
        <p className="text-white/90 text-sm font-medium">
          Nome: {pixName}
        </p>

        {/* PIX Key */}
        <code className="font-mono text-base font-bold text-white bg-white/10 px-4 py-2 rounded-lg">
          {pixKey}
        </code>

        {/* Copy Button */}
        <Button 
          onClick={copyPixKey} 
          size="sm"
          variant="default"
          className="gap-2 font-medium"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copiado!" : "Copiar Chave PIX"}
        </Button>
      </div>
    </Card>
  );
};
