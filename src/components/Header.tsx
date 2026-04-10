import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Bell, BookOpen, Heart, Award, ChevronDown, Menu, X } from "lucide-react";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16"
      style={{ background: 'hsl(330 20% 8% / 0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid hsl(330 14% 18% / 0.8)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          {/* Yarn ball icon */}
          <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-md relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, hsl(322 62% 62%), hsl(280 50% 55%))' }}
          >
            {/* Stylized crochet hook / J letter */}
            <span className="font-display text-white font-bold text-base leading-none italic">J</span>
            <div className="absolute inset-0 rounded-full opacity-30"
              style={{ background: 'radial-gradient(circle at 35% 35%, white 0%, transparent 60%)' }}
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-foreground font-semibold text-[15px] tracking-tight italic"
              style={{ letterSpacing: '-0.01em' }}
            >
              Crochê da Josi
            </span>
            <span className="text-[9.5px] font-semibold tracking-[0.18em] uppercase"
              style={{ color: 'hsl(322 55% 62%)' }}
            >
              Área de Membros
            </span>
          </div>
        </Link>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-0.5">
          {[
            { to: "/", icon: BookOpen, label: "Meus Cursos" },
            { to: "/", icon: Heart, label: "Favoritos" },
            { to: "/certificado", icon: Award, label: "Certificado" },
          ].map(({ to, icon: Icon, label }) => (
            <Link
              key={label}
              to={to}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
              style={{ color: 'hsl(20 12% 70%)' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = 'hsl(20 18% 93%)';
                (e.currentTarget as HTMLElement).style.background = 'hsl(330 14% 16%)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'hsl(20 12% 70%)';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            className="p-2 rounded-full transition-colors duration-200"
            style={{ color: 'hsl(330 8% 46%)' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = 'hsl(20 18% 93%)';
              (e.currentTarget as HTMLElement).style.background = 'hsl(330 14% 16%)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'hsl(330 8% 46%)';
              (e.currentTarget as HTMLElement).style.background = 'transparent';
            }}
          >
            <Bell className="w-5 h-5" />
          </button>

          {/* User avatar dropdown — desktop */}
          <div className="relative hidden md:block" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full transition-all duration-200"
              style={{ color: 'hsl(20 18% 93%)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'hsl(330 14% 16%)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center shadow relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, hsl(322 62% 62%), hsl(280 50% 55%))' }}
              >
                <span className="font-display text-white font-semibold text-sm italic">A</span>
              </div>
              <span className="text-sm font-semibold">Aluna</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200`}
                style={{ color: 'hsl(330 8% 46%)', transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 rounded-xl shadow-2xl overflow-hidden"
                style={{ background: 'hsl(330 16% 12%)', border: '1px solid hsl(330 14% 20%)' }}
              >
                <div className="px-4 py-3" style={{ borderBottom: '1px solid hsl(330 14% 18%)' }}>
                  <p className="text-sm font-bold text-foreground font-display italic">Aluna</p>
                  <p className="text-xs mt-0.5" style={{ color: 'hsl(322 55% 62%)' }}>Membro ativo</p>
                </div>
                <div className="py-1">
                  {[
                    { to: "/", icon: BookOpen, label: "Meus Cursos" },
                    { to: "/certificado", icon: Award, label: "Certificado" },
                  ].map(({ to, icon: Icon, label }) => (
                    <Link
                      key={label}
                      to={to}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-150"
                      style={{ color: 'hsl(20 12% 76%)' }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.color = 'hsl(20 18% 93%)';
                        (e.currentTarget as HTMLElement).style.background = 'hsl(330 14% 16%)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.color = 'hsl(20 12% 76%)';
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                      }}
                      onClick={() => setMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors duration-200"
            style={{ color: 'hsl(330 8% 46%)' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = 'hsl(20 18% 93%)';
              (e.currentTarget as HTMLElement).style.background = 'hsl(330 14% 16%)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'hsl(330 8% 46%)';
              (e.currentTarget as HTMLElement).style.background = 'transparent';
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 shadow-xl"
          style={{ background: 'hsl(330 16% 10%)', borderBottom: '1px solid hsl(330 14% 18%)' }}
        >
          <nav className="flex flex-col py-2 px-4">
            {[
              { to: "/", icon: BookOpen, label: "Meus Cursos" },
              { to: "/", icon: Heart, label: "Favoritos" },
              { to: "/certificado", icon: Award, label: "Certificado" },
            ].map(({ to, icon: Icon, label }) => (
              <Link
                key={label}
                to={to}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold transition-colors"
                style={{ color: 'hsl(20 12% 76%)' }}
                onClick={() => setMobileOpen(false)}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
