import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed border-border">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-bold mb-2">No products found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={`${product.product_name}-${index}`} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
