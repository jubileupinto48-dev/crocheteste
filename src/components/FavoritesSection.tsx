import { Heart, ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/hooks/use-favorites";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const FavoritesSection = () => {
  const { favorites, toggleFavorite } = useFavorites();

  if (favorites.length === 0) return null;

  // Group by module
  const grouped = favorites.reduce((acc, fav) => {
    if (!acc[fav.module]) acc[fav.module] = [];
    acc[fav.module].push(fav);
    return acc;
  }, {} as Record<string, typeof favorites>);

  return (
    <section className="animate-fade-in mb-8">
      <div className="text-center mb-6">
        <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-3">
          <Heart className="w-3.5 h-3.5 inline mr-1.5 fill-current" />
          Seus Favoritos
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Acesso Rápido
        </h2>
        <p className="text-muted-foreground">
          Vídeos que você marcou como favorito
        </p>
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([module, items]) => (
          <div key={module}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {module}
              </h3>
              {items[0]?.modulePath && (
                <Link
                  to={items[0].modulePath}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  Ver módulo
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {items.map((fav) => (
                <FavoriteCard
                  key={fav.videoId}
                  title={fav.title}
                  thumbnail={fav.thumbnail}
                  modulePath={fav.modulePath}
                  onRemove={() =>
                    toggleFavorite({
                      videoId: fav.videoId,
                      title: fav.title,
                      thumbnail: fav.thumbnail,
                      module: fav.module,
                      modulePath: fav.modulePath,
                    })
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

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
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link to={modulePath}>
      <Card className="overflow-hidden group cursor-pointer hover:ring-1 hover:ring-primary/50 transition-all duration-200">
        <CardContent className="p-0">
          <div className="relative aspect-video overflow-hidden bg-muted">
            {!imageLoaded && <Skeleton className="absolute inset-0" />}
            <img
              src={thumbnail}
              alt={title}
              className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemove();
              }}
              className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/40 text-white/80 hover:bg-destructive hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-200"
              aria-label="Remover dos favoritos"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          <div className="p-2">
            <p className="text-xs font-medium text-foreground line-clamp-2 leading-tight">
              {title}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
