
import { FC } from "react";
import { ReactNode } from "react";

interface CategoryProps {
  id: string;
  title: string;
  icon: ReactNode;
  description: string;
  path: string;
}

interface PropertyCategoryCardProps {
  category: CategoryProps;
  isActive: boolean;
  onClick: () => void;
}

export const PropertyCategoryCard: FC<PropertyCategoryCardProps> = ({ 
  category, 
  isActive, 
  onClick 
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer p-4 rounded-lg transition-all duration-300
        ${isActive 
          ? 'bg-rekaland-orange text-white' 
          : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'
        }
      `}
    >
      <div className="flex items-center mb-2">
        <div className={`
          p-2 rounded-full mr-3 
          ${isActive 
            ? 'bg-white/20' 
            : 'bg-white dark:bg-gray-700'
          }
        `}>
          {category.icon}
        </div>
        <h3 className="font-semibold">{category.title}</h3>
      </div>
      <p className="text-sm opacity-80">{category.description}</p>
    </div>
  );
};
