
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
        cursor-pointer p-5 rounded-lg transition-all duration-300 hover:shadow-md
        flex flex-col h-full card-hover
        ${isActive 
          ? 'bg-rekaland-orange text-white shadow-lg' 
          : 'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'
        }
      `}
    >
      <div className="flex items-center mb-3">
        <div className={`
          p-2 rounded-full mr-3 
          ${isActive 
            ? 'bg-white/20' 
            : 'bg-gray-50 dark:bg-gray-700'
          }
        `}>
          {category.icon}
        </div>
        <h3 className="font-semibold text-base">{category.title}</h3>
      </div>
      <p className="text-sm opacity-80 line-clamp-2">{category.description}</p>
    </div>
  );
};
