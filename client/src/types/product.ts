
export interface Product {
  id: string;
  sku: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  quantity: number;
  minStock: number;
  supplier?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'inactive' | 'discontinued';
}

export interface ProductFormData {
  sku: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  quantity: number;
  minStock: number;
  supplier?: string;
  imageUrl?: string;
  status: 'active' | 'inactive' | 'discontinued';
}

export interface DashboardStats {
  totalProducts: number;
  totalValue: number;
  lowStockItems: number;
  outOfStockItems: number;
}
