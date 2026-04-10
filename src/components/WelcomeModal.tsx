import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

export const WelcomeModal = () => {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [salvo, setSalvo] = useState(false);

  const hostname = window.location.hostname;
  const isPaidSubdomain =
    hostname !== "crochedajosi.com" &&
    hostname !== "www.crochedajosi.com" &&
    hostname !== "localhost" &&
    hostname !== "127.0.0.1";

  useEffect(() => {
    if (!isPaidSubdomain) return;
    if (sessionStorage.getItem("boas-vindas-modal")) return;
    const timer = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(timer);
  }, [isPaidSubdomain]);

  const handleSalvar = () => {
    if (nome.trim()) {
      localStorage.setItem("alunaName", nome.trim());
    }
    sessionStorage.setItem("boas-vindas-modal", "1");
    setSalvo(true);
    setTimeout(() => setOpen(false), 1800);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-fade-in"
        style={{ background: "hsl(330 20% 9%)", border: "1px solid hsl(322 40% 28%)" }}
      >
        {/* Top gradient bar */}
        <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, hsl(322 62% 60%), hsl(280 50% 55%))" }} />

        <div className="px-6 py-7 flex flex-col items-center gap-4 text-center">

          {/* Icon */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: "hsl(322 40% 18%)" }}
          >
            <Heart className="w-7 h-7 fill-current" style={{ color: "hsl(322 62% 70%)" }} />
          </div>

          {/* Title */}
          {!salvo ? (
            <>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "hsl(322 50% 60%)" }}>
                  Seja muito bem-vinda!
                </p>
                <h2 className="font-display text-xl font-semibold" style={{ color: "hsl(20 18% 93%)" }}>
                  Obrigada pelo seu pagamento 💖
                </h2>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: "hsl(330 8% 55%)" }}>
                  Seu acesso vitalício está liberado! Antes de começar, nos diga seu nome:
                </p>
              </div>

              <input
                type="text"
                placeholder="Digite seu nome aqui..."
                value={nome}
                onChange={e => setNome(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSalvar()}
                autoFocus
                className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all"
                style={{
                  background: "hsl(330 16% 13%)",
                  border: "1px solid hsl(322 35% 28%)",
                  color: "hsl(20 18% 93%)",
                }}
              />

              <button
                onClick={handleSalvar}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all active:scale-95"
                style={{ background: "linear-gradient(135deg, hsl(322 62% 58%), hsl(280 50% 52%))" }}
              >
                Entrar na Área de Membros ✨
              </button>

              <button
                onClick={handleSalvar}
                className="text-xs"
                style={{ color: "hsl(330 8% 40%)" }}
              >
                Pular por agora
              </button>
            </>
          ) : (
            <div className="py-4">
              <p className="text-lg font-semibold" style={{ color: "hsl(322 62% 78%)" }}>
                Bem-vinda{nome ? `, ${nome}` : ""}! 🎉
              </p>
              <p className="text-sm mt-1" style={{ color: "hsl(330 8% 55%)" }}>
                Bons estudos e boas agulhadas! 🧶
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
