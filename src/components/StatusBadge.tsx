import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-warning text-warning-foreground",
  },
  processing: {
    label: "Processing", 
    className: "bg-status-processing text-primary-foreground",
  },
  shipped: {
    label: "Shipped",
    className: "bg-status-shipped text-success-foreground",
  },
  delivered: {
    label: "Delivered",
    className: "bg-status-delivered text-success-foreground",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-status-cancelled text-destructive-foreground",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge 
      className={cn(
        "px-2 py-1 text-xs font-medium rounded-full",
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  );
}