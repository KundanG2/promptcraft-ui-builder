import { useState, useMemo, useEffect } from "react";
import { Product, ProductsData } from "@/types/product";
import {
  getUniqueWidths,
  getUniqueRimDiameters,
  getUniqueSpeedRatings,
} from "@/lib/productUtils";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";

const ITEMS_PER_PAGE = 16;

const ProductListing = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWidth, setSelectedWidth] = useState("");
  const [selectedRim, setSelectedRim] = useState("");
  const [selectedSpeed, setSelectedSpeed] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/data/products.json");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: ProductsData = await res.json();
        setProducts(data.data || []);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const widths = useMemo(() => getUniqueWidths(products), [products]);
  const rimDiameters = useMemo(() => getUniqueRimDiameters(products), [products]);
  const speedRatings = useMemo(() => getUniqueSpeedRatings(products), [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.product_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const specs = product.product_specifications;

      const matchesWidth =
        !selectedWidth ||
        Object.entries(specs).some(
          ([key, value]) =>
            key.toLowerCase().includes("width") && value === selectedWidth
        );

      const matchesRim =
        !selectedRim ||
        Object.entries(specs).some(
          ([key, value]) =>
            key.toLowerCase().includes("rim") && value === selectedRim
        );

      const matchesSpeed =
        !selectedSpeed ||
        Object.entries(specs).some(
          ([key, value]) =>
            (key.toLowerCase().includes("speed") ||
              key.toLowerCase().includes("symbol")) &&
            value === selectedSpeed
        );

      return matchesSearch && matchesWidth && matchesRim && matchesSpeed;
    });
  }, [products, searchQuery, selectedWidth, selectedRim, selectedSpeed]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleClearFilters = () => {
    setSelectedWidth("");
    setSelectedRim("");
    setSelectedSpeed("");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 pb-12">
        <Breadcrumb items={[{ label: "All Products" }]} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Apollo Tyres Catalog</h1>
          <p className="text-muted-foreground text-lg">
            {loading ? "Loading products..." : `Explore ${products.length} premium tyre products`}
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="max-w-xl">
            <SearchBar
              value={searchQuery}
              onChange={(value) => {
                setSearchQuery(value);
                setCurrentPage(1);
              }}
              placeholder="Search by product name..."
            />
          </div>

          <FilterPanel
            widths={widths}
            rimDiameters={rimDiameters}
            speedRatings={speedRatings}
            selectedWidth={selectedWidth}
            selectedRim={selectedRim}
            selectedSpeed={selectedSpeed}
            onWidthChange={(value) => {
              setSelectedWidth(value);
              setCurrentPage(1);
            }}
            onRimChange={(value) => {
              setSelectedRim(value);
              setCurrentPage(1);
            }}
            onSpeedChange={(value) => {
              setSelectedSpeed(value);
              setCurrentPage(1);
            }}
            onClear={handleClearFilters}
          />

          <div className="flex items-center justify-between text-sm text-muted-foreground border-b-2 border-border pb-4">
            <span>
              Showing {paginatedProducts.length} of {filteredProducts.length}{" "}
              products
            </span>
            <span>
              Page {currentPage} of {totalPages || 1}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="border-2 border-border p-4 space-y-4">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <ProductGrid products={paginatedProducts} />
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
};

export default ProductListing;
