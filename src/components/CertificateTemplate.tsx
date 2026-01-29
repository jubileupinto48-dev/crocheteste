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
        className="w-[1123px] h-[794px] bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 relative overflow-hidden"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        {/* Decorative Border */}
        <div className="absolute inset-4 border-4 border-amber-700/30 rounded-lg" />
        <div className="absolute inset-6 border-2 border-amber-600/20 rounded-lg" />
        
        {/* Corner Decorations */}
        <div className="absolute top-8 left-8 w-20 h-20 border-l-4 border-t-4 border-amber-700/40 rounded-tl-xl" />
        <div className="absolute top-8 right-8 w-20 h-20 border-r-4 border-t-4 border-amber-700/40 rounded-tr-xl" />
        <div className="absolute bottom-8 left-8 w-20 h-20 border-l-4 border-b-4 border-amber-700/40 rounded-bl-xl" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-r-4 border-b-4 border-amber-700/40 rounded-br-xl" />

        {/* Decorative Pattern Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-2 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-16">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-amber-700 text-lg tracking-[0.3em] uppercase mb-2">
              Crochê da Josi
            </div>
            <h1 className="text-5xl font-bold text-amber-900 tracking-wide mb-2">
              CERTIFICADO
            </h1>
            <div className="text-amber-600 text-lg tracking-widest uppercase">
              de Conclusão
            </div>
          </div>

          {/* Decorative Line */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-amber-600" />
            <div className="w-3 h-3 rotate-45 bg-amber-600" />
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-amber-600" />
          </div>

          {/* Main Text */}
          <p className="text-amber-800 text-xl mb-4">
            Certificamos que
          </p>

          {/* Name */}
          <div className="relative mb-6">
            <h2 className="text-4xl font-bold text-amber-900 tracking-wide px-8 py-2">
              {name || "Nome do Aluno"}
            </h2>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
          </div>

          {/* Description */}
          <p className="text-amber-800 text-lg text-center max-w-2xl mb-8 leading-relaxed">
            concluiu com êxito o curso de{" "}
            <span className="font-semibold text-amber-900">Crochê Completo</span>,
            com carga horária total de{" "}
            <span className="font-semibold text-amber-900">80 horas</span>,
            demonstrando dedicação e habilidades no desenvolvimento de técnicas artesanais.
          </p>

          {/* Date */}
          <div className="text-center mb-10">
            <p className="text-amber-700 text-lg">
              Concluído em{" "}
              <span className="font-semibold text-amber-900">{completionDate}</span>
            </p>
          </div>

          {/* Signature Area */}
          <div className="flex items-end gap-24">
            <div className="text-center">
              <div className="w-48 h-px bg-amber-700 mb-2" />
              <p className="text-amber-800 text-sm font-medium">Josi Morone</p>
              <p className="text-amber-600 text-xs">Instrutora</p>
            </div>
            <div className="text-center">
              <div className="w-48 h-px bg-amber-700 mb-2" />
              <p className="text-amber-800 text-sm font-medium">Crochê da Josi</p>
              <p className="text-amber-600 text-xs">Escola de Artesanato</p>
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-2 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
        
        {/* Seal/Badge */}
        <div className="absolute bottom-12 right-16 w-24 h-24 rounded-full border-4 border-amber-700/50 flex items-center justify-center bg-amber-50">
          <div className="text-center">
            <div className="text-amber-800 text-[10px] font-bold uppercase tracking-wider">Certificado</div>
            <div className="text-amber-600 text-[8px] uppercase">Oficial</div>
          </div>
        </div>
      </div>
    );
  }
);

CertificateTemplate.displayName = "CertificateTemplate";
