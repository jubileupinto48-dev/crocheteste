import { Heart, ArrowLeft, ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/hooks/use-favorites";
import { useState } from "react";

const FavoriteCard = ({
  title,
  thumbnail,
  modulePath,
  onRemove,
}: {
  title: string;
  thumbnail: string;
  modulePath: string;
  onRemove: () => void;
}) => (
  <Link to={modulePath} className="block group">
    <div
      className="overflow-hidden rounded-xl transition-all duration-300"
      style={{
        background: 'hsl(330 16% 10.5%)',
        border: '1px solid hsl(330 14% 16%)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'hsl(322 40% 30%)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'hsl(330 14% 16%)';
        (e.currentTarget as HTMLElement).style.transform = '';
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <button
          onClick={e => { e.preventDefault(); e.stopPropagation(); onRemove(); }}
          className="absolute top-2 right-2 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
          style={{ background: 'hsl(0 70% 40% / 0.85)' }}
          aria-label="Remover dos favoritos"
        >
          <X className="w-3 h-3 text-white" />
        </button>
      </div>
      <div className="p-3">
        <p className="text-xs font-medium line-clamp-2 leading-tight" style={{ color: 'hsl(20 18% 88%)' }}>
          {title}
        </p>
      </div>
    </div>
  </Link>
);

const Favoritos = () => {
  const { favorites, toggleFavorite } = useFavorites();

  const grouped = favorites.reduce((acc, fav) => {
    if (!acc[fav.module]) acc[fav.module] = [];
    acc[fav.module].push(fav);
    return acc;
  }, {} as Record<string, typeof favorites>);

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 pt-24 space-y-10">

        {/* Header */}
        <section className="animate-fade-in">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold mb-6 transition-colors"
            style={{ color: 'hsl(322 45% 55%)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-7 rounded-full" style={{ background: 'linear-gradient(180deg, hsl(322 62% 65%), hsl(280 50% 55%))' }} />
            <div>
              <h1 className="font-display text-2xl font-semibold text-foreground flex items-center gap-2" style={{ letterSpacing: '-0.01em' }}>
                <Heart className="w-5 h-5 fill-current" style={{ color: 'hsl(322 62% 65%)' }} />
                Meus Favoritos
              </h1>
              <p className="text-sm mt-0.5" style={{ color: 'hsl(330 8% 46%)' }}>
                {favorites.length > 0
                  ? `${favorites.length} vídeo${favorites.length > 1 ? 's' : ''} favoritado${favorites.length > 1 ? 's' : ''}`
                  : 'Seus vídeos favoritos aparecem aqui'}
              </p>
            </div>
          </div>
        </section>

        {/* Empty state */}
        {favorites.length === 0 && (
          <section className="animate-fade-in flex flex-col items-center justify-center py-20 text-center gap-5">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: 'hsl(322 30% 14%)' }}
            >
              <Heart className="w-9 h-9" style={{ color: 'hsl(322 40% 45%)' }} />
            </div>
            <div>
              <p className="font-display text-lg font-semibold" style={{ color: 'hsl(20 18% 80%)' }}>
                Nenhum favorito ainda
              </p>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: 'hsl(330 8% 46%)' }}>
                Marque o ❤️ em qualquer vídeo dos módulos<br />e ele aparece aqui para acesso rápido.
              </p>
            </div>
            <Link
              to="/"
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
              style={{ background: 'linear-gradient(135deg, hsl(322 62% 58%), hsl(280 50% 52%))' }}
            >
              Explorar módulos
            </Link>
          </section>
        )}

        {/* Favorites grouped by module */}
        {Object.entries(grouped).map(([module, items]) => (
          <section key={module} className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: 'hsl(322 45% 58%)' }}>
                {module}
              </h2>
              {items[0]?.modulePath && (
                <Link
                  to={items[0].modulePath}
                  className="text-xs font-semibold flex items-center gap-1 transition-colors"
                  style={{ color: 'hsl(322 45% 55%)' }}
                >
                  Ver módulo <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {items.map(fav => (
                <FavoriteCard
                  key={fav.videoId}
                  title={fav.title}
                  thumbnail={fav.thumbnail}
                  modulePath={fav.modulePath}
                  onRemove={() => toggleFavorite({
                    videoId: fav.videoId,
                    title: fav.title,
                    thumbnail: fav.thumbnail,
                    module: fav.module,
                    modulePath: fav.modulePath,
                  })}
                />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default Favoritos;
