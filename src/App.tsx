import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VestidosCroche from "./pages/VestidosCroche";
import ModelosReceitas from "./pages/ModelosReceitas";
import CursoCompleto from "./pages/CursoCompleto";
import VestidosInfantis from "./pages/VestidosInfantis";
import SapatinhosCroche from "./pages/SapatinhosCroche";
import BolsasCroche from "./pages/BolsasCroche";
import Certificado from "./pages/Certificado";
import MaisModelos from "./pages/MaisModelos";
import ChapeuCroche from "./pages/ChapeuCroche";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vestidos-croche" element={<VestidosCroche />} />
          <Route path="/modelos-receitas" element={<ModelosReceitas />} />
          <Route path="/curso-completo" element={<CursoCompleto />} />
          <Route path="/vestidos-infantis" element={<VestidosInfantis />} />
          <Route path="/sapatinhos-croche" element={<SapatinhosCroche />} />
          <Route path="/bolsas-croche" element={<BolsasCroche />} />
          <Route path="/certificado" element={<Certificado />} />
          <Route path="/mais-modelos" element={<MaisModelos />} />
          <Route path="/chapeu-croche" element={<ChapeuCroche />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
