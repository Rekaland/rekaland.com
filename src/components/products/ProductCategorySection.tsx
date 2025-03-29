
import { Card, CardContent } from "@/components/ui/card";
import { PropertyCategoryCard } from "@/components/products/PropertyCategoryCard";
import { CategoryProps } from "@/types/product";

interface ProductCategorySectionProps {
  categories: CategoryProps[];
  activeCategory: string;
  onCategoryClick: (path: string) => void;
}

export const ProductCategorySection = ({
  categories,
  activeCategory,
  onCategoryClick
}: ProductCategorySectionProps) => {
  return (
    <div className="mb-8">
      <Card className="border-0 shadow-md overflow-hidden bg-white dark:bg-gray-800">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Kategori Properti</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <PropertyCategoryCard
                key={category.id}
                category={category}
                isActive={category.id === activeCategory}
                onClick={() => onCategoryClick(category.path)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
