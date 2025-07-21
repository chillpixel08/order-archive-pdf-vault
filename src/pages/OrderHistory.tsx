import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderCard, Order } from "@/components/OrderCard";
import { Search, Filter, FileText, Download } from "lucide-react";

// Mock data - this would be replaced with actual data from Supabase
const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    date: "2024-01-15",
    status: "delivered",
    items: [
      { id: "1", name: "Wireless Bluetooth Headphones", quantity: 1, price: 99.99 },
      { id: "2", name: "USB-C Charging Cable", quantity: 2, price: 19.99 },
    ],
    subtotal: 139.97,
    tax: 11.20,
    shipping: 8.99,
    total: 160.16,
    customerInfo: {
      name: "John Doe",
      email: "john@example.com",
      address: "123 Main St, City, State 12345"
    }
  },
  {
    id: "2", 
    orderNumber: "ORD-2024-002",
    date: "2024-01-22",
    status: "shipped",
    items: [
      { id: "3", name: "Smart Watch Series 5", quantity: 1, price: 299.99 },
      { id: "4", name: "Watch Band Leather", quantity: 1, price: 49.99 },
    ],
    subtotal: 349.98,
    tax: 28.00,
    shipping: 0.00,
    total: 377.98,
    customerInfo: {
      name: "John Doe",
      email: "john@example.com", 
      address: "123 Main St, City, State 12345"
    }
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003", 
    date: "2024-02-01",
    status: "processing",
    items: [
      { id: "5", name: "4K Webcam", quantity: 1, price: 149.99 },
    ],
    subtotal: 149.99,
    tax: 12.00,
    shipping: 12.99,
    total: 174.98,
    customerInfo: {
      name: "John Doe",
      email: "john@example.com",
      address: "123 Main St, City, State 12345"
    }
  },
  {
    id: "4",
    orderNumber: "ORD-2024-004",
    date: "2024-02-10", 
    status: "pending",
    items: [
      { id: "6", name: "Gaming Mechanical Keyboard", quantity: 1, price: 129.99 },
      { id: "7", name: "RGB Gaming Mouse", quantity: 1, price: 79.99 },
      { id: "8", name: "Mouse Pad XL", quantity: 1, price: 24.99 },
    ],
    subtotal: 234.97,
    tax: 18.80,
    shipping: 9.99,
    total: 263.76,
    customerInfo: {
      name: "John Doe", 
      email: "john@example.com",
      address: "123 Main St, City, State 12345"
    }
  },
];

export default function OrderHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [orders] = useState<Order[]>(mockOrders);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalOrderValue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Order History</h1>
          </div>
          <p className="text-muted-foreground">
            Track your orders and download invoices for your purchases.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-foreground">{totalOrders}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold text-foreground">${totalOrderValue.toFixed(2)}</p>
              </div>
              <Download className="h-8 w-8 text-success" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Order</p>
                <p className="text-2xl font-bold text-foreground">
                  ${totalOrders > 0 ? (totalOrderValue / totalOrders).toFixed(2) : '0.00'}
                </p>
              </div>
              <Filter className="h-8 w-8 text-warning" />
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders by number or product name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-lg z-50">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <Card className="p-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No orders found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your search or filter criteria." 
                  : "You haven't placed any orders yet."}
              </p>
              <Button className="mt-4" onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}>
                Clear Filters
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}