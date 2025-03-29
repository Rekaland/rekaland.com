
import { FC } from "react";
import { CategoryProps } from "@/types/product";

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
        cursor-pointer p-4 sm:p-5 rounded-lg transition-all duration-300 hover:shadow-md
        flex flex-col h-full card-hover transform hover:-translate-y-1
        ${isActive 
          ? 'bg-gradient-to-br from-rekaland-orange to-orange-600 text-white shadow-lg' 
          : 'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'
        }
      `}
    >
      <div className="flex items-center mb-2 sm:mb-3">
        <div className={`
          p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3 
          ${isActive 
            ? 'bg-white/20' 
            : 'bg-gray-50 dark:bg-gray-700'
          }
        `}>
          {category.icon}
        </div>
        <h3 className="font-semibold text-sm sm:text-base">{category.title}</h3>
      </div>
      <p className="text-xs sm:text-sm opacity-80 line-clamp-2">{category.description}</p>
    </div>
  );
};
