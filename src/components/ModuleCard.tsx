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
      <div
        className="overflow-hidden transition-all duration-300 cursor-pointer rounded-2xl"
        style={{
          background: 'hsl(330 16% 10.5%)',
          border: '1px solid hsl(330 14% 16%)',
          boxShadow: '0 2px 16px -2px hsl(330 30% 4% / 0.7)',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
          (e.currentTarget as HTMLElement).style.boxShadow =
            '0 8px 32px -4px hsl(330 30% 4% / 0.6), 0 0 0 1px hsl(322 40% 40% / 0.3), 0 0 24px -6px hsl(322 62% 65% / 0.2)';
          (e.currentTarget as HTMLElement).style.borderColor = 'hsl(322 40% 30%)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = '';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px -2px hsl(330 30% 4% / 0.7)';
          (e.currentTarget as HTMLElement).style.borderColor = 'hsl(330 14% 16%)';
        }}
      >
        {/* Thumbnail */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          {/* Hover play overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(135deg, hsl(330 30% 4% / 0.55), hsl(280 40% 10% / 0.55))' }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300"
              style={{ background: 'linear-gradient(135deg, hsl(322 62% 62%), hsl(280 50% 55%))' }}
            >
              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            </div>
          </div>

          {/* Badge */}
          {badge && (
            <div
              className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full"
              style={{
                background: 'linear-gradient(135deg, hsl(322 62% 62%), hsl(280 50% 55%))',
                color: 'white',
                boxShadow: '0 2px 8px hsl(322 62% 40% / 0.4)',
                letterSpacing: '0.04em',
              }}
            >
              {badge}
            </div>
          )}

          {/* Bottom gradient label */}
          <div className="absolute bottom-0 left-0 right-0 p-3"
            style={{ background: 'linear-gradient(to top, hsl(330 20% 6% / 0.8), transparent)' }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'hsl(322 55% 75%)', letterSpacing: '0.12em' }}
            >
              Clique para acessar
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3
            className="font-display text-lg font-semibold mb-1.5 flex items-center justify-between gap-2 transition-colors duration-200 group-hover:text-primary"
            style={{ color: 'hsl(20 18% 93%)', letterSpacing: '-0.01em', lineHeight: 1.25 }}
          >
            <span>{title}</span>
            <ArrowRight
              className="w-4 h-4 shrink-0 transition-all duration-200 group-hover:translate-x-1"
              style={{ opacity: 0.4 }}
            />
          </h3>
          <p className="text-sm leading-relaxed line-clamp-2"
            style={{ color: 'hsl(330 8% 46%)' }}
          >
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};
