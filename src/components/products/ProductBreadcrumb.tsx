
import { Link } from "react-router-dom";

interface ProductBreadcrumbProps {
  category?: string;
  paths?: { name: string; path: string; active?: boolean }[];
}

export const ProductBreadcrumb = ({ category, paths }: ProductBreadcrumbProps) => {
  // Jika paths disediakan, gunakan paths tersebut
  if (paths) {
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
  }
  
  // Fallback ke perilaku default jika menggunakan prop category
  const defaultPaths = [
    { name: "Beranda", path: "/", active: false },
    { name: "Produk", path: "/produk", active: false },
    { 
      name: category === 'all' ? 'Semua Properti' : 
        category === 'empty_lot' ? 'Kavling Kosongan' :
        category === 'semi_finished' ? 'Kavling Setengah Jadi' :
        'Kavling Siap Huni',
      path: `/produk/${category !== 'all' ? category : ''}`,
      active: true 
    },
  ];
  
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
      {defaultPaths.map((path, index) => (
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
