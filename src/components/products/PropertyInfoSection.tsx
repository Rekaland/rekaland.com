
import { Info, Check } from "lucide-react";

interface PropertyInfoSectionProps {
  title: string;
  description: string;
  features: string[];
}

export const PropertyInfoSection = ({
  title,
  description,
  features
}: PropertyInfoSectionProps) => {
  return (
    <div className="mb-8 p-5 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/20 rounded-lg border border-orange-100 dark:border-orange-800/40">
      <div className="flex items-start gap-3">
        <div className="bg-rekaland-orange bg-opacity-10 rounded-full p-1.5 mt-1">
          <Info className="h-5 w-5 text-rekaland-orange" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            {description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
