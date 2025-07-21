import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Package, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Order Archive</h1>
            </div>
            <Button asChild variant="default">
              <Link to="/orders">View Orders</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold text-foreground leading-tight">
              Your Complete 
              <span className="text-primary"> Order Archive</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access your complete order history, download invoices, and track your purchases 
              all in one place. Professional PDF invoices generated instantly.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="default" className="text-lg px-8">
              <Link to="/orders">
                <FileText className="mr-2 h-5 w-5" />
                View Order History
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              <Package className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Everything You Need
            </h3>
            <p className="text-muted-foreground text-lg">
              Comprehensive order management and invoice generation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center space-y-4 hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground">PDF Invoices</h4>
              <p className="text-muted-foreground">
                Generate professional PDF invoices instantly with complete order details, 
                pricing, and customer information.
              </p>
            </Card>

            <Card className="p-8 text-center space-y-4 hover:shadow-lg transition-all duration-200 border-l-4 border-l-success">
              <div className="bg-success/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
              <h4 className="text-xl font-semibold text-foreground">Order Tracking</h4>
              <p className="text-muted-foreground">
                Track your order status from pending to delivered with real-time updates 
                and comprehensive order history.
              </p>
            </Card>

            <Card className="p-8 text-center space-y-4 hover:shadow-lg transition-all duration-200 border-l-4 border-l-warning">
              <div className="bg-warning/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-warning" />
              </div>
              <h4 className="text-xl font-semibold text-foreground">Secure Access</h4>
              <p className="text-muted-foreground">
                Secure authentication ensures only you can access your orders and download 
                your personal invoices.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-card/50">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h3 className="text-3xl font-bold text-foreground">
            Ready to Access Your Orders?
          </h3>
          <p className="text-xl text-muted-foreground">
            View your complete order history and download invoices instantly.
          </p>
          <Button asChild size="lg" variant="default" className="text-lg px-8">
            <Link to="/orders">
              Get Started
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
