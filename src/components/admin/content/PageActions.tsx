
import { Pencil, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageActionsProps {
  pageId: number;
  onEdit: (id: number) => void;
  onView: (id: number) => void;
}

export const PageActions = ({ pageId, onEdit, onView }: PageActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onEdit(pageId)}
      >
        <Pencil size={14} className="mr-1" />
        Edit
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onView(pageId)}
      >
        <Eye size={14} className="mr-1" />
        Lihat
      </Button>
    </div>
  );
};
