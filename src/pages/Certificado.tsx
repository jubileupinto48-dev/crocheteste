import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Award, Download, Eye, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useRef } from "react";
import { CertificateTemplate } from "@/components/CertificateTemplate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useToast } from "@/hooks/use-toast";

const Certificado = () => {
  const [name, setName] = useState("");
  const [completionDate, setCompletionDate] = useState(
    new Date().toLocaleDateString('pt-BR')
  );
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleGeneratePDF = async () => {
    if (!name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, preencha seu nome completo.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setShowPreview(true);

    // Wait for render
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
      if (certificateRef.current) {
        const canvas = await html2canvas(certificateRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: null,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: "a4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Certificado_${name.replace(/\s+/g, "_")}.pdf`);

        toast({
          title: "Certificado gerado!",
          description: "O download do PDF foi iniciado.",
        });
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Erro ao gerar certificado",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePreview = () => {
    if (!name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, preencha seu nome completo para visualizar.",
        variant: "destructive",
      });
      return;
    }
    setShowPreview(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6 hover:bg-accent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar aos Módulos
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4">
              <Award className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Emitir Certificado
            </h1>
            <p className="text-muted-foreground text-lg">
              Parabéns por concluir o curso! Preencha seus dados e gere seu certificado oficial
            </p>
          </div>

          <Card className="mb-8 shadow-card animate-fade-in">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Dados para o Certificado
              </h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-base">Nome Completo *</Label>
                  <Input
                    id="name"
                    placeholder="Digite seu nome completo (como aparecerá no certificado)"
                    className="mt-2 h-12"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="date" className="text-base">Data de Conclusão</Label>
                  <Input
                    id="date"
                    type="date"
                    className="mt-2 h-12"
                    value={completionDate.split('/').reverse().join('-')}
                    onChange={(e) => {
                      const date = new Date(e.target.value + 'T12:00:00');
                      setCompletionDate(date.toLocaleDateString('pt-BR'));
                    }}
                  />
                </div>

                <div className="bg-accent/20 border border-accent rounded-xl p-6 mt-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    Informações do Certificado
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex justify-between">
                      <span>Curso:</span>
                      <span className="font-medium text-foreground">Crochê Completo</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Carga Horária:</span>
                      <span className="font-medium text-foreground">80 horas</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Data de Conclusão:</span>
                      <span className="font-medium text-foreground">{completionDate}</span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4 animate-scale-in mb-8">
            <Button 
              size="lg" 
              variant="outline"
              className="h-14 text-base"
              onClick={handlePreview}
            >
              <Eye className="mr-2 h-5 w-5" />
              Visualizar Certificado
            </Button>
            <Button 
              size="lg" 
              className="shadow-soft h-14 text-base"
              onClick={handleGeneratePDF}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Download className="mr-2 h-5 w-5" />
              )}
              {isGenerating ? "Gerando..." : "Gerar e Baixar PDF"}
            </Button>
          </div>

          {/* Certificate Preview */}
          {showPreview && (
            <Card className="mb-8 shadow-card animate-fade-in overflow-hidden">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-4 text-center">
                  Prévia do Certificado
                </h3>
                <div className="overflow-x-auto flex justify-center">
                  <div className="transform scale-[0.35] md:scale-50 origin-top">
                    <CertificateTemplate
                      ref={certificateRef}
                      name={name}
                      completionDate={completionDate}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Hidden certificate for PDF generation */}
          {!showPreview && (
            <div className="fixed -left-[9999px] top-0">
              <CertificateTemplate
                ref={certificateRef}
                name={name}
                completionDate={completionDate}
              />
            </div>
          )}

          <Card className="shadow-card animate-fade-in">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-3">
                Sobre o Certificado
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Certificado digital em alta qualidade (PDF)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Design profissional e elegante</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Pronto para impressão em tamanho A4</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Personalizado com seu nome e data de conclusão</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Certificado;
