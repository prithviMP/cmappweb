import React from 'react';
import { ChevronRightIcon } from 'lucide-react';
import { Button } from '../button';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center space-x-2">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
          )}
          <Button
            variant="ghost"
            className={`px-2 py-1 h-auto text-sm ${
              index === items.length - 1
                ? 'text-gray-600 cursor-default hover:bg-transparent'
                : 'text-[#577bff] hover:bg-[#577bff10]'
            }`}
            onClick={item.onClick}
            disabled={index === items.length - 1}
          >
            {item.label}
          </Button>
        </React.Fragment>
      ))}
    </nav>
  );
};