import React from 'react';
import { ChevronRight } from 'lucide-react';
import { RouteState, pathFor } from '../lib/routes';

export interface BreadcrumbItem {
  label: string;
  route?: RouteState;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigateRoute?: (route: RouteState) => void;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onNavigateRoute,
  className = '',
}) => (
  <nav aria-label="Breadcrumb" className={className}>
    <ol className="flex flex-wrap items-center gap-1.5 text-[12px] text-[#8B7073]">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
            {index > 0 && (
              <ChevronRight className="w-3 h-3 text-[#C5A059]" aria-hidden="true" />
            )}
            {item.route && !isLast ? (
              <a
                href={pathFor(item.route)}
                onClick={(event) => {
                  if (!onNavigateRoute) return;
                  event.preventDefault();
                  onNavigateRoute(item.route as RouteState);
                }}
                className="hover:text-[#2F1B2E] hover:underline transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <span aria-current={isLast ? 'page' : undefined} className="text-[#584144]">
                {item.label}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);
