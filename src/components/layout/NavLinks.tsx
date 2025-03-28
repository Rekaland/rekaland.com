
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinksProps {
  location: {
    pathname: string;
  };
}

export const NavLinks = ({ location }: NavLinksProps) => {
  return (
    <>
      <Link
        to="/"
        className={cn(
          "text-foreground hover:text-rekaland-orange transition-colors px-3 py-2 rounded-md",
          {
            "text-rekaland-orange font-medium bg-orange-100/50 dark:bg-orange-900/20": location.pathname === "/",
          }
        )}
      >
        Beranda
      </Link>

      <Link
        to="/produk"
        className={cn(
          "text-foreground hover:text-rekaland-orange transition-colors px-3 py-2 rounded-md",
          {
            "text-rekaland-orange font-medium bg-orange-100/50 dark:bg-orange-900/20": location.pathname.includes("/produk"),
          }
        )}
      >
        Produk
      </Link>

      <Link
        to="/informasi"
        className={cn(
          "text-foreground hover:text-rekaland-orange transition-colors px-3 py-2 rounded-md",
          {
            "text-rekaland-orange font-medium bg-orange-100/50 dark:bg-orange-900/20": location.pathname.includes("/informasi"),
          }
        )}
      >
        Informasi
      </Link>

      <Link
        to="/tentang"
        className={cn(
          "text-foreground hover:text-rekaland-orange transition-colors px-3 py-2 rounded-md",
          {
            "text-rekaland-orange font-medium bg-orange-100/50 dark:bg-orange-900/20": location.pathname === "/tentang",
          }
        )}
      >
        Tentang
      </Link>
    </>
  );
};
