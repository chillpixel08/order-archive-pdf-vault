import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Download } from "lucide-react";
import { Order } from "@/components/OrderCard";
import { InvoicePDFGenerator } from "@/lib/pdf-generator";
import { toast } from "@/hooks/use-toast";

interface InvoicePreviewProps {
  order: Order;
}

export function InvoicePreview({ order }: InvoicePreviewProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const generatePreview = async () => {
    setIsGenerating(true);
    try {
      const pdfGenerator = new InvoicePDFGenerator();
      const blob = await pdfGenerator.getPDFBlob(order);
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error('Preview generation error:', error);
      toast({
        title: "Preview Failed",
        description: "Could not generate invoice preview.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadFromPreview = async () => {
    try {
      const pdfGenerator = new InvoicePDFGenerator();
      await pdfGenerator.downloadPDF(order);
      toast({
        title: "Invoice Downloaded",
        description: `Invoice for order ${order.orderNumber} downloaded successfully.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Could not download invoice.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={generatePreview}
          disabled={isGenerating}
        >
          <Eye className="h-4 w-4" />
          {isGenerating ? "Generating..." : "Preview"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Invoice Preview - {order.orderNumber}</DialogTitle>
            <Button onClick={downloadFromPreview} variant="download" size="sm">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              className="w-full h-[70vh] border rounded-md"
              title={`Invoice ${order.orderNumber}`}
            />
          ) : (
            <div className="flex items-center justify-center h-[70vh] bg-muted rounded-md">
              <div className="text-center space-y-2">
                <Eye className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">Click "Preview" to generate invoice preview</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}