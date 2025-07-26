import { Product, ProductFormData, DashboardStats } from '@/types/product';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_ENDPOINTS = {
  products: `${API_BASE_URL}/api/products`,
  dashboard: `${API_BASE_URL}/api/dashboard`
};

// Mock data - Will be replaced with real API calls when backend is deployed
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    sku: 'LAPTOP-001',
    name: 'Dell XPS 13 Laptop',
    description: 'High-performance ultrabook with 16GB RAM',
    category: 'Electronics',
    price: 1299.99,
    quantity: 25,
    minStock: 5,
    supplier: 'Dell Inc.',
    imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=400&fit=crop',
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    sku: 'MOUSE-001',
    name: 'Logitech MX Master 3',
    description: 'Wireless ergonomic mouse',
    category: 'Electronics',
    price: 99.99,
    quantity: 3,
    minStock: 10,
    supplier: 'Logitech',
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    status: 'active',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '3',
    sku: 'CHAIR-001',
    name: 'Herman Miller Aeron',
    description: 'Ergonomic office chair',
    category: 'Furniture',
    price: 1395.00,
    quantity: 0,
    minStock: 2,
    supplier: 'Herman Miller',
    imageUrl: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop',
    status: 'active',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '4',
    sku: 'PHONE-001',
    name: 'iPhone 15 Pro',
    description: 'Latest Apple smartphone',
    category: 'Electronics',
    price: 999.99,
    quantity: 50,
    minStock: 10,
    supplier: 'Apple Inc.',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-22')
  }
];

// Simulate localStorage for persistence
const STORAGE_KEY = 'inventory_products';

class ApiService {
  private isProduction = import.meta.env.PROD;
  
  private getStoredProducts(): Product[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored).map((p: any) => ({
        ...p,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt)
      }));
    }
    // Initialize with mock data
    this.saveProducts(MOCK_PRODUCTS);
    return MOCK_PRODUCTS;
  }

  private saveProducts(products: Product[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  async getProducts(): Promise<Product[]> {
    if (this.isProduction && import.meta.env.VITE_API_URL) {
      try {
        const response = await fetch(API_ENDPOINTS.products);
        if (!response.ok) throw new Error('Failed to fetch products');
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
        // Fallback to localStorage in case of API failure
      }
    }
    
    // Development mode or fallback: use localStorage
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.getStoredProducts();
  }

  async getProduct(id: string): Promise<Product | null> {
    if (this.isProduction && import.meta.env.VITE_API_URL) {
      try {
        const response = await fetch(`${API_ENDPOINTS.products}/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 200));
    const products = this.getStoredProducts();
    return products.find(p => p.id === id) || null;
  }

  async createProduct(data: ProductFormData): Promise<Product> {
    if (this.isProduction && import.meta.env.VITE_API_URL) {
      try {
        const response = await fetch(API_ENDPOINTS.products, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create product');
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 400));
    const products = this.getStoredProducts();
    
    // Check for duplicate SKU
    if (products.some(p => p.sku === data.sku)) {
      throw new Error('SKU already exists');
    }

    const newProduct: Product = {
      id: this.generateId(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    products.push(newProduct);
    this.saveProducts(products);
    return newProduct;
  }

  async updateProduct(id: string, data: Partial<ProductFormData>): Promise<Product> {
    if (this.isProduction && import.meta.env.VITE_API_URL) {
      try {
        const response = await fetch(`${API_ENDPOINTS.products}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update product');
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 400));
    const products = this.getStoredProducts();
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      throw new Error('Product not found');
    }

    // Check for duplicate SKU (excluding current product)
    if (data.sku && products.some(p => p.sku === data.sku && p.id !== id)) {
      throw new Error('SKU already exists');
    }

    products[index] = {
      ...products[index],
      ...data,
      updatedAt: new Date()
    };

    this.saveProducts(products);
    return products[index];
  }

  async deleteProduct(id: string): Promise<void> {
    if (this.isProduction && import.meta.env.VITE_API_URL) {
      try {
        const response = await fetch(`${API_ENDPOINTS.products}/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete product');
        return;
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
    const products = this.getStoredProducts();
    const filteredProducts = products.filter(p => p.id !== id);
    
    if (filteredProducts.length === products.length) {
      throw new Error('Product not found');
    }

    this.saveProducts(filteredProducts);
  }

  async getDashboardStats(): Promise<DashboardStats> {
    if (this.isProduction && import.meta.env.VITE_API_URL) {
      try {
        const response = await fetch(`${API_ENDPOINTS.dashboard}/stats`);
        if (!response.ok) throw new Error('Failed to fetch dashboard stats');
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 200));
    const products = this.getStoredProducts();
    
    return {
      totalProducts: products.length,
      totalValue: products.reduce((sum, p) => sum + (p.price * p.quantity), 0),
      lowStockItems: products.filter(p => p.quantity <= p.minStock && p.quantity > 0).length,
      outOfStockItems: products.filter(p => p.quantity === 0).length
    };
  }
}

export const apiService = new ApiService();

// Simulate real-time updates using a custom event system
export const simulateRealTimeUpdate = (callback: () => void) => {
  // In a real app, this would be Socket.IO connection
  const interval = setInterval(() => {
    // Randomly update stock levels to simulate real-time changes
    if (Math.random() > 0.95) { // 5% chance every second
      callback();
    }
  }, 1000);

  return () => clearInterval(interval);
};
