
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddPageButtonProps {
  onClick: () => void;
}

export const AddPageButton = ({ onClick }: AddPageButtonProps) => {
  return (
    <Button 
      onClick={onClick}
      className="bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600"
    >
      <Plus size={16} className="mr-2" />
      Tambah Halaman Baru
    </Button>
  );
};
