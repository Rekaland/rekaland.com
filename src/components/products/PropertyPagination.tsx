
import { Button } from "@/components/ui/button";

interface PropertyPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PropertyPagination = ({
  currentPage,
  totalPages,
  onPageChange
}: PropertyPaginationProps) => {
  return (
    <div className="flex justify-center mt-8">
      <nav className="flex items-center gap-1">
        <Button 
          variant="outline" 
          size="sm" 
          disabled={currentPage <= 1}
          className="w-8 h-8 p-0"
          onClick={() => onPageChange(currentPage - 1)}
        >
          <span className="sr-only">Previous</span>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button 
            key={page}
            variant="outline" 
            size="sm" 
            className={`w-8 h-8 p-0 ${
              page === currentPage ? 'bg-rekaland-orange text-white border-rekaland-orange' : ''
            }`}
            onClick={() => onPageChange(page)}
          >
            <span className="sr-only">Page {page}</span>
            <span>{page}</span>
          </Button>
        ))}
        
        <Button 
          variant="outline" 
          size="sm" 
          disabled={currentPage >= totalPages}
          className="w-8 h-8 p-0"
          onClick={() => onPageChange(currentPage + 1)}
        >
          <span className="sr-only">Next</span>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
      </nav>
    </div>
  );
};
