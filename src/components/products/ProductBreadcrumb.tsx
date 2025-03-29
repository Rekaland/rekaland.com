
import { Link } from "react-router-dom";

interface ProductBreadcrumbProps {
  paths: {
    name: string;
    path: string;
    active?: boolean;
  }[];
}

export const ProductBreadcrumb = ({ paths }: ProductBreadcrumbProps) => {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
      {paths.map((path, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <span className="mx-2">/</span>}
          {path.active ? (
            <span className="text-rekaland-orange">{path.name}</span>
          ) : (
            <Link to={path.path} className="hover:text-rekaland-orange">
              {path.name}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};
