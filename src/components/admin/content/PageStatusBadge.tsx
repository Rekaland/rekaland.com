
import { cn } from "@/lib/utils";

interface PageStatusBadgeProps {
  status: string;
}

export const PageStatusBadge = ({ status }: PageStatusBadgeProps) => {
  // Determine badge color based on status
  const getBadgeStyles = () => {
    switch (status.toLowerCase()) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <span className={cn("px-2 py-1 rounded-full text-xs", getBadgeStyles())}>
      {status}
    </span>
  );
};
