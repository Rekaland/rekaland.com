
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolled down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`${
        isVisible ? "opacity-100" : "opacity-0"
      } fixed right-4 top-1/2 transform -translate-y-1/2 z-40 p-2 rounded-full bg-rekaland-orange text-white shadow-lg transition-all duration-300 hover:bg-orange-600 focus:outline-none pulse-animation`}
      aria-label="Kembali ke atas"
    >
      <ArrowUp size={20} />
    </button>
  );
};
