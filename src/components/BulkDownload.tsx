import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { InvoicePDFGenerator } from "@/lib/pdf-generator";
import { Order } from "@/components/OrderCard";

interface BulkDownloadProps {
  orders: Order[];
  filteredOrders: Order[];
}

export function BulkDownload({ orders, filteredOrders }: BulkDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleBulkDownload = async () => {
    if (filteredOrders.length === 0) {
      toast({
        title: "No Orders to Download",
        description: "Please select orders or adjust your filters.",
        variant: "destructive",
      });
      return;
    }

    setIsDownloading(true);
    
    try {
      const pdfGenerator = new InvoicePDFGenerator();
      let successCount = 0;
      let errorCount = 0;

      // Download each invoice with a small delay to prevent browser blocking
      for (const order of filteredOrders) {
        try {
          await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
          await pdfGenerator.downloadPDF(order);
          successCount++;
        } catch (error) {
          console.error(`Failed to generate PDF for order ${order.orderNumber}:`, error);
          errorCount++;
        }
      }

      if (successCount > 0) {
        toast({
          title: "Bulk Download Complete",
          description: `Successfully downloaded ${successCount} invoice${successCount !== 1 ? 's' : ''}${errorCount > 0 ? `, ${errorCount} failed` : ''}.`,
        });
      } else {
        toast({
          title: "Download Failed",
          description: "Failed to download any invoices. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Bulk download error:', error);
      toast({
        title: "Download Failed",
        description: "There was an error with the bulk download. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={handleBulkDownload}
        disabled={isDownloading || filteredOrders.length === 0}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        {isDownloading ? "Downloading..." : `Download All (${filteredOrders.length})`}
      </Button>
    </div>
  );
}