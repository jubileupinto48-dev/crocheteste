import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
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
    <Link to={link} className="block">
      <Card className="overflow-hidden hover-lift shadow-card transition-all duration-300 border-border/50 group">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {badge && (
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium shadow-soft">
              {badge}
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center justify-between group-hover:text-primary transition-colors">
            {title}
            <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};
