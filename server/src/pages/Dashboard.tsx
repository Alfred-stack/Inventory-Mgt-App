import { useEffect, useState } from 'react';
import { DashboardStats } from '@/types/product';
import { apiService } from '@/lib/api';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Package, 
  DollarSign, 
  AlertTriangle, 
  XCircle,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadStats = async () => {
      try {
        const dashboardStats = await apiService.getDashboardStats();
        setStats(dashboardStats);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load dashboard statistics",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [toast]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="space-y-0 pb-2">
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your inventory management system
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Package}
          change="+2 this week"
          changeType="positive"
        />
        
        <StatsCard
          title="Total Inventory Value"
          value={`$${stats.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          icon={DollarSign}
          change="+12.5% from last month"
          changeType="positive"
        />
        
        <StatsCard
          title="Low Stock Items"
          value={stats.lowStockItems}
          icon={AlertTriangle}
          change={stats.lowStockItems > 0 ? "Requires attention" : "All good"}
          changeType={stats.lowStockItems > 0 ? "negative" : "positive"}
        />
        
        <StatsCard
          title="Out of Stock"
          value={stats.outOfStockItems}
          icon={XCircle}
          change={stats.outOfStockItems > 0 ? "Critical" : "All stocked"}
          changeType={stats.outOfStockItems > 0 ? "negative" : "positive"}
        />
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quick Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Most Valuable Category</span>
              <span className="font-medium">Electronics</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Average Product Value</span>
              <span className="font-medium">
                ${stats.totalProducts > 0 ? (stats.totalValue / stats.totalProducts).toFixed(2) : '0.00'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Stock Health</span>
              <span className={`font-medium ${
                stats.outOfStockItems === 0 && stats.lowStockItems === 0 
                  ? 'text-success' 
                  : stats.outOfStockItems > 0 
                    ? 'text-destructive' 
                    : 'text-warning'
              }`}>
                {stats.outOfStockItems === 0 && stats.lowStockItems === 0 
                  ? 'Excellent' 
                  : stats.outOfStockItems > 0 
                    ? 'Critical' 
                    : 'Needs Attention'}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm">New product added: Dell XPS 13 Laptop</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm">Low stock alert: Logitech MX Master 3</p>
                  <p className="text-xs text-muted-foreground">4 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm">Stock updated: iPhone 15 Pro (+25 units)</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-destructive rounded-full mt-2"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm">Out of stock: Herman Miller Aeron</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Section */}
      {(stats.lowStockItems > 0 || stats.outOfStockItems > 0) && (
        <Card className="border-warning">
          <CardHeader>
            <CardTitle className="text-warning flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Inventory Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.outOfStockItems > 0 && (
                <p className="text-sm">
                  <span className="font-medium text-destructive">{stats.outOfStockItems}</span> 
                  {' '}products are completely out of stock and need immediate restocking.
                </p>
              )}
              {stats.lowStockItems > 0 && (
                <p className="text-sm">
                  <span className="font-medium text-warning">{stats.lowStockItems}</span> 
                  {' '}products are running low on stock and should be restocked soon.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}