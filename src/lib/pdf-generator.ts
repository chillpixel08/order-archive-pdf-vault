import jsPDF from 'jspdf';
import { Order } from '@/components/OrderCard';

export class InvoicePDFGenerator {
  private pdf: jsPDF;
  
  constructor() {
    this.pdf = new jsPDF();
  }

  private formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  private formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }

  generateInvoice(order: Order): void {
    const { pdf } = this;
    let yPosition = 20;

    // Company Header
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Order Archive Invoice', 20, yPosition);
    yPosition += 15;

    // Invoice Details
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Invoice Date: ${this.formatDate(new Date().toISOString())}`, 20, yPosition);
    pdf.text(`Order Number: ${order.orderNumber}`, 120, yPosition);
    yPosition += 10;
    
    pdf.text(`Order Date: ${this.formatDate(order.date)}`, 20, yPosition);
    pdf.text(`Status: ${order.status.toUpperCase()}`, 120, yPosition);
    yPosition += 20;

    // Customer Information
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Bill To:', 20, yPosition);
    yPosition += 8;

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(order.customerInfo.name, 20, yPosition);
    yPosition += 6;
    pdf.text(order.customerInfo.email, 20, yPosition);
    yPosition += 6;
    pdf.text(order.customerInfo.address, 20, yPosition);
    yPosition += 20;

    // Items Table Header
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Item', 20, yPosition);
    pdf.text('Qty', 120, yPosition);
    pdf.text('Price', 140, yPosition);
    pdf.text('Total', 170, yPosition);
    yPosition += 5;

    // Draw line under header
    pdf.line(20, yPosition, 190, yPosition);
    yPosition += 10;

    // Items
    pdf.setFont('helvetica', 'normal');
    order.items.forEach((item) => {
      const itemTotal = item.quantity * item.price;
      
      // Handle long item names by wrapping text
      const itemName = item.name.length > 30 ? item.name.substring(0, 30) + '...' : item.name;
      
      pdf.text(itemName, 20, yPosition);
      pdf.text(item.quantity.toString(), 120, yPosition);
      pdf.text(this.formatCurrency(item.price), 140, yPosition);
      pdf.text(this.formatCurrency(itemTotal), 170, yPosition);
      yPosition += 8;
    });

    yPosition += 10;

    // Totals Section
    pdf.line(120, yPosition, 190, yPosition);
    yPosition += 8;

    pdf.text('Subtotal:', 120, yPosition);
    pdf.text(this.formatCurrency(order.subtotal), 170, yPosition);
    yPosition += 8;

    pdf.text('Tax:', 120, yPosition);
    pdf.text(this.formatCurrency(order.tax), 170, yPosition);
    yPosition += 8;

    pdf.text('Shipping:', 120, yPosition);
    pdf.text(this.formatCurrency(order.shipping), 170, yPosition);
    yPosition += 10;

    // Total line
    pdf.line(120, yPosition, 190, yPosition);
    yPosition += 8;

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('Total:', 120, yPosition);
    pdf.text(this.formatCurrency(order.total), 170, yPosition);

    // Footer
    yPosition = 250;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Thank you for your business!', 20, yPosition);
    pdf.text('For questions about this invoice, please contact support@orderarchive.com', 20, yPosition + 6);
    
    // Add page border
    pdf.rect(10, 10, 190, 277);
  }

  async downloadPDF(order: Order): Promise<void> {
    this.generateInvoice(order);
    
    // Generate filename with order number and current date
    const filename = `invoice-${order.orderNumber}-${new Date().toISOString().split('T')[0]}.pdf`;
    
    // Download the PDF
    this.pdf.save(filename);
  }

  async getPDFBlob(order: Order): Promise<Blob> {
    this.generateInvoice(order);
    return this.pdf.output('blob');
  }

  async getPDFBase64(order: Order): Promise<string> {
    this.generateInvoice(order);
    return this.pdf.output('datauristring');
  }
}