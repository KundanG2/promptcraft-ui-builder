import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { getTopSpecs, generateSlug } from "@/lib/productUtils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);
  const specs = getTopSpecs(product.product_specifications, 4);
  const slug = generateSlug(product.product_name);
  const imageUrl = product.product_image_urls[0];

  return (
    <Card className="group border-2 border-border bg-card hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <CardContent className="p-0">
        <Link to={`/products/${slug}`} state={{ product }}>
          <div className="aspect-square bg-secondary flex items-center justify-center p-6 border-b-2 border-border">
            {imageUrl && !imageError ? (
              <img
                src={imageUrl}
                alt={product.product_name}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                loading="lazy"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="text-muted-foreground text-center">
                <div className="text-4xl mb-2">🛞</div>
                <span className="text-xs">No Image</span>
              </div>
            )}
          </div>
        </Link>

        <div className="p-4 space-y-4">
          <Link to={`/products/${slug}`} state={{ product }}>
            <h3 className="font-bold text-lg line-clamp-2 group-hover:underline">
              {product.product_name}
            </h3>
          </Link>

          <div className="space-y-1.5">
            {specs.map((spec, index) => (
              <div
                key={index}
                className="flex justify-between text-sm border-b border-dashed border-border pb-1"
              >
                <span className="text-muted-foreground">{spec.key}</span>
                <span className="font-medium font-mono">{spec.value}</span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <p className="text-lg font-bold mb-3">
              {product.product_price
                ? `₹${product.product_price.toLocaleString()}`
                : "Ask for Price"}
            </p>
            <Link to={`/products/${slug}`} state={{ product }}>
              <Button className="w-full group/btn" variant="default">
                View Details
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
