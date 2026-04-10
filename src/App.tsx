import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { Header } from "./components/Header";
import { PixModal } from "./components/PixModal";
import { WelcomeModal } from "./components/WelcomeModal";
import { Suspense, lazy } from "react";
import Index from "./pages/Index";

// Lazy load all secondary pages — split into separate chunks
const VestidosCroche   = lazy(() => import("./pages/VestidosCroche"));
const ModelosReceitas  = lazy(() => import("./pages/ModelosReceitas"));
const CursoCompleto    = lazy(() => import("./pages/CursoCompleto"));
const VestidosInfantis = lazy(() => import("./pages/VestidosInfantis"));
const SapatinhosCroche = lazy(() => import("./pages/SapatinhosCroche"));
const BolsasCroche     = lazy(() => import("./pages/BolsasCroche"));
const Certificado      = lazy(() => import("./pages/Certificado"));
const MaisModelos      = lazy(() => import("./pages/MaisModelos"));
const ChapeuCroche     = lazy(() => import("./pages/ChapeuCroche"));
const Favoritos        = lazy(() => import("./pages/Favoritos"));
const NotFound         = lazy(() => import("./pages/NotFound"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: 'hsl(330 20% 7%)' }}>
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: 'hsl(322 62% 65%)', borderTopColor: 'transparent' }}
      />
      <p className="text-sm font-semibold" style={{ color: 'hsl(322 40% 55%)' }}>Carregando...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <PixModal />
        <WelcomeModal />
        <div className="pt-16">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/"                  element={<Index />} />
              <Route path="/vestidos-croche"   element={<VestidosCroche />} />
              <Route path="/modelos-receitas"  element={<ModelosReceitas />} />
              <Route path="/curso-completo"    element={<CursoCompleto />} />
              <Route path="/vestidos-infantis" element={<VestidosInfantis />} />
              <Route path="/sapatinhos-croche" element={<SapatinhosCroche />} />
              <Route path="/bolsas-croche"     element={<BolsasCroche />} />
              <Route path="/certificado"       element={<Certificado />} />
              <Route path="/mais-modelos"      element={<MaisModelos />} />
              <Route path="/chapeu-croche"     element={<ChapeuCroche />} />
              <Route path="/favoritos"         element={<Favoritos />} />
              <Route path="*"                  element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
