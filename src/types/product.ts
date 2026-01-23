export interface Product {
  product_name: string;
  product_price: number | null;
  product_pdf_urls: string | string[];
  product_image_urls: string[];
  product_description: string;
  product_specifications: Record<string, string>;
  source_url: string;
}

export interface ProductsData {
  data: Product[];
}
