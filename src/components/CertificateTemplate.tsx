import { forwardRef } from "react";

interface CertificateTemplateProps {
  name: string;
  completionDate: string;
}

export const CertificateTemplate = forwardRef<HTMLDivElement, CertificateTemplateProps>(
  ({ name, completionDate }, ref) => {
    return (
      <div
        ref={ref}
        className="certificate-root w-[1123px] h-[794px] relative overflow-hidden"
        style={{ 
          fontFamily: "'Georgia', serif",
          backgroundColor: "#fff0f0",
        }}
      >
        {/* Gradient background layers instead of CSS gradient (html2canvas compatible) */}
        <div className="absolute inset-0" style={{ backgroundColor: "#fff5f5" }} />
        <div className="absolute inset-0" style={{ backgroundColor: "#ffe4e6", opacity: 0.5 }} />
        <div className="absolute top-0 right-0 w-1/2 h-full" style={{ backgroundColor: "#fef3c7", opacity: 0.3 }} />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2" style={{ backgroundColor: "#fed7aa", opacity: 0.3 }} />
        {/* Decorative yarn/crochet pattern borders */}
        <div className="absolute inset-0">
          {/* Wavy border pattern - top */}
          <svg className="absolute top-0 left-0 w-full h-16" viewBox="0 0 1123 64" preserveAspectRatio="none">
            <path d="M0,32 Q50,0 100,32 T200,32 T300,32 T400,32 T500,32 T600,32 T700,32 T800,32 T900,32 T1000,32 T1100,32 L1123,32 L1123,0 L0,0 Z" fill="#f9a8d4" opacity="0.4"/>
            <path d="M0,48 Q50,16 100,48 T200,48 T300,48 T400,48 T500,48 T600,48 T700,48 T800,48 T900,48 T1000,48 T1100,48" stroke="#fb923c" strokeWidth="3" fill="none" opacity="0.5"/>
          </svg>
          
          {/* Wavy border pattern - bottom */}
          <svg className="absolute bottom-0 left-0 w-full h-16 rotate-180" viewBox="0 0 1123 64" preserveAspectRatio="none">
            <path d="M0,32 Q50,0 100,32 T200,32 T300,32 T400,32 T500,32 T600,32 T700,32 T800,32 T900,32 T1000,32 T1100,32 L1123,32 L1123,0 L0,0 Z" fill="#f9a8d4" opacity="0.4"/>
            <path d="M0,48 Q50,16 100,48 T200,48 T300,48 T400,48 T500,48 T600,48 T700,48 T800,48 T900,48 T1000,48 T1100,48" stroke="#fb923c" strokeWidth="3" fill="none" opacity="0.5"/>
          </svg>
        </div>

        {/* Decorative corner flowers/yarn balls */}
        <div className="absolute top-6 left-6 w-24 h-24">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-300 to-pink-400 opacity-60 absolute top-0 left-0" />
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 opacity-60 absolute top-8 left-8" />
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-200 to-rose-300 opacity-70 absolute top-2 left-12" />
        </div>
        
        <div className="absolute top-6 right-6 w-24 h-24">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-300 to-orange-400 opacity-60 absolute top-0 right-0" />
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 opacity-60 absolute top-8 right-8" />
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 opacity-70 absolute top-2 right-12" />
        </div>
        
        <div className="absolute bottom-6 left-6 w-24 h-24">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-300 to-rose-400 opacity-60 absolute bottom-0 left-0" />
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 opacity-60 absolute bottom-6 left-10" />
        </div>
        
        <div className="absolute bottom-6 right-6 w-24 h-24">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-300 to-pink-400 opacity-60 absolute bottom-0 right-0" />
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 opacity-60 absolute bottom-6 right-10" />
        </div>

        {/* Inner decorative border */}
        <div className="absolute inset-8 border-2 border-pink-300/50 rounded-3xl" />
        <div className="absolute inset-10 border border-orange-300/40 rounded-2xl" style={{ borderStyle: 'dashed' }} />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-20">
          {/* Logo and Header */}
          <div className="flex items-center gap-6 mb-4">
            <img
              src="/thumbnails/logo-crochedajosi.png"
              alt="Crochê da Josi Logo"
              className="w-20 h-20 object-contain"
              crossOrigin="anonymous"
            />
            <div className="text-center">
              <div className="text-pink-600 text-lg tracking-[0.2em] uppercase mb-1" style={{ fontFamily: "'Georgia', serif" }}>
                Crochê da Josi
              </div>
              <h1 className="text-4xl font-bold tracking-wide" style={{
                color: "#be185d",
              }}>
                CERTIFICADO
              </h1>
            </div>
            <img
              src="/thumbnails/logo-crochedajosi.png"
              alt="Crochê da Josi Logo"
              className="w-20 h-20 object-contain"
              crossOrigin="anonymous"
            />
          </div>

          <div className="text-orange-500 text-lg tracking-widest uppercase mb-6">
            de Conclusão
          </div>

          {/* Decorative Line */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-pink-400 rounded-full" />
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-pink-400 to-orange-400" />
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-400 to-amber-400" />
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-pink-400 to-orange-400" />
            <div className="w-20 h-0.5 bg-gradient-to-l from-transparent via-orange-400 to-orange-400 rounded-full" />
          </div>

          {/* Main Text */}
          <p className="text-pink-700 text-xl mb-3">
            Certificamos com muito carinho que
          </p>

          {/* Name */}
          <div className="relative mb-4">
            <h2 className="text-3xl font-bold px-8 py-2" style={{ 
              color: "#9f1239",
            }}>
              {name || "Nome do Aluno"}
            </h2>
            <div style={{ height: 2, borderTop: "2px solid rgba(236, 72, 153, 0.5)", margin: "0 auto" }} />
          </div>

          {/* Description */}
          <p className="text-pink-800/80 text-lg text-center max-w-2xl mb-6 leading-relaxed">
            concluiu com êxito e dedicação o curso de{" "}
            <span className="font-semibold text-orange-600">Crochê Completo</span>,
            com carga horária total de{" "}
            <span className="font-semibold text-orange-600">80 horas</span>,
            demonstrando amor e habilidade no desenvolvimento de técnicas artesanais.
          </p>

          {/* Heart decoration */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-pink-400 text-xl">♥</span>
            <span className="text-orange-400 text-lg">♥</span>
            <span className="text-pink-400 text-xl">♥</span>
          </div>

          {/* Date */}
          <div className="text-center mb-8">
            <p className="text-pink-600 text-lg">
              Concluído em{" "}
              <span className="font-semibold text-orange-600">{completionDate}</span>
            </p>
          </div>

          {/* Signature Area */}
          <div className="flex items-end gap-20">
            <div className="text-center">
              <img
                src="/thumbnails/assinatura.png"
                alt="Assinatura"
                crossOrigin="anonymous"
                style={{ height: 64, margin: "0 auto 12px auto", objectFit: "contain" }}
              />
              <div style={{ width: 220, height: 0, borderTop: "1.5px solid rgba(194, 24, 91, 0.55)", margin: "0 auto 8px auto" }} />
              <p className="text-pink-700 text-sm font-medium">Josi Morone</p>
              <p className="text-orange-500 text-xs">Instrutora</p>
            </div>
            <div className="text-center">
              <img
                src="/thumbnails/assinatura.png"
                alt="Assinatura"
                crossOrigin="anonymous"
                style={{ height: 64, margin: "0 auto 12px auto", objectFit: "contain" }}
              />
              <div style={{ width: 220, height: 0, borderTop: "1.5px solid rgba(194, 24, 91, 0.55)", margin: "0 auto 8px auto" }} />
              <p className="text-pink-700 text-sm font-medium">Crochê da Josi</p>
              <p className="text-orange-500 text-xs">Escola de Artesanato</p>
            </div>
          </div>
        </div>

        {/* Cute seal/badge */}
        <div className="absolute bottom-14 right-20 w-20 h-20 rounded-full flex items-center justify-center" style={{
          background: "linear-gradient(135deg, #fecdd3, #fed7aa)",
          boxShadow: "0 4px 12px rgba(236, 72, 153, 0.3)"
        }}>
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-pink-400/60 flex items-center justify-center">
            <div className="text-center">
              <div className="text-pink-600 text-[9px] font-bold uppercase tracking-wider">Feito com</div>
              <div className="text-orange-500 text-lg">♥</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CertificateTemplate.displayName = "CertificateTemplate";
