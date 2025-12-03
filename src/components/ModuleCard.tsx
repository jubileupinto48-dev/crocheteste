import { Card, CardContent } from "@/components/ui/card";
import { Play, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ModuleCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  badge?: string;
}

export const ModuleCard = ({ title, description, image, link, badge }: ModuleCardProps) => {
  return (
    <Link to={link} className="block group">
      <Card className="overflow-hidden hover-lift shadow-card transition-all duration-300 border-border/50 cursor-pointer">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay escuro com ícone de play */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-7 h-7 text-primary-foreground fill-current ml-1" />
            </div>
          </div>
          {badge && (
            <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              {badge}
            </div>
          )}
          {/* Label de módulo */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <span className="text-white/90 text-xs font-medium uppercase tracking-wider">
              Clique para acessar
            </span>
          </div>
        </div>
        <CardContent className="p-5">
          <h3 className="text-lg font-semibold text-foreground mb-1.5 flex items-center justify-between group-hover:text-primary transition-colors">
            {title}
            <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};
