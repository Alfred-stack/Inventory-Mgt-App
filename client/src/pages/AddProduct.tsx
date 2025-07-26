import { useNavigate } from 'react-router-dom';
import { ProductFormData } from '@/types/product';
import { apiService } from '@/lib/api';
import { ProductForm } from '@/components/products/ProductForm';
import { useToast } from '@/hooks/use-toast';

export default function AddProduct() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: ProductFormData) => {
    try {
      await apiService.createProduct(data);
      toast({
        title: "Success",
        description: "Product created successfully"
      });
      navigate('/products');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create product",
        variant: "destructive"
      });
      throw error; // Re-throw to keep form in submitting state
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Add New Product</h1>
        <p className="text-muted-foreground">
          Create a new product in your inventory
        </p>
      </div>

      <ProductForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}