import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { Download, Package, Calendar, DollarSign } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  customerInfo: {
    name: string;
    email: string;
    address: string;
  };
}

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadInvoice = async () => {
    setIsDownloading(true);
    
    // Simulate PDF generation and download
    try {
      // This would be replaced with actual PDF generation once Supabase is connected
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Invoice Downloaded",
        description: `Invoice for order ${order.orderNumber} has been downloaded successfully.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error downloading your invoice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="p-6 space-y-4 hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-foreground">
            Order #{order.orderNumber}
          </h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(order.date)}
            </div>
            <div className="flex items-center gap-1">
              <Package className="h-4 w-4" />
              {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={order.status} />
          <Button
            variant="download"
            size="sm"
            onClick={handleDownloadInvoice}
            disabled={isDownloading}
          >
            <Download className="h-4 w-4" />
            {isDownloading ? "Generating..." : "Download Invoice"}
          </Button>
        </div>
      </div>

      {/* Items Summary */}
      <div className="space-y-2">
        <h4 className="font-medium text-sm text-muted-foreground">Items Ordered:</h4>
        <div className="grid gap-2">
          {order.items.slice(0, 3).map((item) => (
            <div key={item.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center">
                  <Package className="h-4 w-4 text-muted-foreground" />
                </div>
                <span className="font-medium">{item.name}</span>
                <span className="text-muted-foreground">×{item.quantity}</span>
              </div>
              <span className="font-medium">${item.price.toFixed(2)}</span>
            </div>
          ))}
          {order.items.length > 3 && (
            <div className="text-sm text-muted-foreground">
              + {order.items.length - 3} more {order.items.length - 3 === 1 ? 'item' : 'items'}
            </div>
          )}
        </div>
      </div>

      {/* Order Total */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-1 text-muted-foreground">
          <DollarSign className="h-4 w-4" />
          <span className="text-sm">Order Total:</span>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-foreground">${order.total.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground">
            Subtotal: ${order.subtotal.toFixed(2)} + Tax: ${order.tax.toFixed(2)} + Shipping: ${order.shipping.toFixed(2)}
          </div>
        </div>
      </div>
    </Card>
  );
}