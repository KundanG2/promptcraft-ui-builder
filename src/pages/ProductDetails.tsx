import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product, ProductsData } from "@/types/product";
import {
  generateSlug,
  getPdfUrl,
  extractCategory,
} from "@/lib/productUtils";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import ImageGallery from "@/components/ImageGallery";
import SpecsTable from "@/components/SpecsTable";
import CTABox from "@/components/CTABox";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(
    (location.state as { product?: Product })?.product || null
  );
  const [loading, setLoading] = useState(!product);

  useEffect(() => {
    if (!product && slug) {
      fetch("/data/products.json")
        .then((res) => res.json())
        .then((data: ProductsData) => {
          const found = data.data.find(
            (p) => generateSlug(p.product_name) === slug
          );
          if (found) {
            setProduct(found);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load product:", err);
          setLoading(false);
        });
    }
  }, [slug, product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <Skeleton className="aspect-square w-full" />
            </div>
            <div className="lg:col-span-5 space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
            <div className="lg:col-span-3">
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-8xl mb-6">🔍</div>
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/")} variant="default">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const category = extractCategory(product.source_url);
  const pdfUrl = getPdfUrl(product.product_pdf_urls);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 pb-12">
        <Breadcrumb
          items={[
            { label: category, href: "/" },
            { label: product.product_name },
          ]}
        />

        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="mb-6 border-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Catalog
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Image Gallery */}
          <div className="lg:col-span-4">
            <ImageGallery
              images={product.product_image_urls}
              productName={product.product_name}
            />
          </div>

          {/* Center Column - Product Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.product_name}</h1>
              <p className="text-2xl font-bold">
                {product.product_price
                  ? `₹${product.product_price.toLocaleString()}`
                  : "Price on Request"}
              </p>
            </div>

            {product.product_description && (
              <div className="border-2 border-border p-4 bg-secondary">
                <h3 className="font-bold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.product_description}
                </p>
              </div>
            )}

            <SpecsTable
              specifications={product.product_specifications}
              title="Technical Specifications"
            />
          </div>

          {/* Right Column - CTA */}
          <div className="lg:col-span-3">
            <CTABox
              pdfUrl={pdfUrl}
              sourceUrl={product.source_url}
              productName={product.product_name}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
