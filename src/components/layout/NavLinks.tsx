
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
          "text-rekaland-black hover:text-rekaland-orange transition-colors",
          {
            "text-rekaland-orange font-medium": location.pathname === "/",
          }
        )}
      >
        Beranda
      </Link>

      <Link
        to="/produk"
        className={cn(
          "text-rekaland-black hover:text-rekaland-orange transition-colors",
          {
            "text-rekaland-orange font-medium": location.pathname.includes("/produk"),
          }
        )}
      >
        Produk
      </Link>

      <Link
        to="/informasi"
        className={cn(
          "text-rekaland-black hover:text-rekaland-orange transition-colors",
          {
            "text-rekaland-orange font-medium": location.pathname.includes("/informasi"),
          }
        )}
      >
        Informasi
      </Link>

      <Link
        to="/tentang"
        className={cn(
          "text-rekaland-black hover:text-rekaland-orange transition-colors",
          {
            "text-rekaland-orange font-medium":
              location.pathname === "/tentang",
          }
        )}
      >
        Tentang
      </Link>
    </>
  );
};
