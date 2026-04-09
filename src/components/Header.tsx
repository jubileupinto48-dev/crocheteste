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
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-card/95 backdrop-blur-sm border-b border-border/60 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-md">
            <span className="text-white font-extrabold text-base leading-none">C</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-foreground font-bold text-[15px] tracking-tight">Crochê da Josi</span>
            <span className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase">Área de Membros</span>
          </div>
        </Link>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-0.5">
          <Link
            to="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Meus Cursos
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
          >
            <Heart className="w-4 h-4" />
            Favoritos
          </Link>
          <Link
            to="/certificado"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
          >
            <Award className="w-4 h-4" />
            Certificado
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 shrink-0">
          <button className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Bell className="w-5 h-5" />
          </button>

          {/* User avatar dropdown — desktop */}
          <div className="relative hidden md:block" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-muted transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-sm font-medium text-foreground">Aluna</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
                <div className="px-4 py-3 border-b border-border/60">
                  <p className="text-sm font-semibold text-foreground">Aluna</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Membro</p>
                </div>
                <div className="py-1">
                  <Link
                    to="/"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <BookOpen className="w-4 h-4" />
                    Meus Cursos
                  </Link>
                  <Link
                    to="/certificado"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Award className="w-4 h-4" />
                    Certificado
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-card border-b border-border shadow-xl">
          <nav className="flex flex-col py-2 px-4">
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <BookOpen className="w-4 h-4" />
              Meus Cursos
            </Link>
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <Heart className="w-4 h-4" />
              Favoritos
            </Link>
            <Link
              to="/certificado"
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <Award className="w-4 h-4" />
              Certificado
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
