import { Product } from "@/types/product";

export const formatSpecKey = (key: string): string => {
  return key
    .replace(/[_-]/g, " ")
    .replace(/\(([^)]+)\)/g, " ($1)")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
    .trim();
};

export const getTopSpecs = (
  specs: Record<string, string>,
  count: number = 5
): Array<{ key: string; value: string }> => {
  return Object.entries(specs)
    .filter(([_, value]) => value && value !== "x" && value !== "null")
    .slice(0, count)
    .map(([key, value]) => ({
      key: formatSpecKey(key),
      value,
    }));
};

export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const getPdfUrl = (pdfUrls: string | string[]): string | null => {
  if (Array.isArray(pdfUrls)) {
    return pdfUrls[0] || null;
  }
  return pdfUrls || null;
};

export const extractCategory = (sourceUrl: string): string => {
  const match = sourceUrl.match(/apollotyres\.com\/en-in\/([^/]+)/);
  if (match) {
    return match[1]
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return "Tyres";
};

export const getUniqueWidths = (products: Product[]): string[] => {
  const widths = new Set<string>();
  products.forEach((p) => {
    Object.entries(p.product_specifications).forEach(([key, value]) => {
      if (key.toLowerCase().includes("width") && value && value !== "x") {
        widths.add(value);
      }
    });
  });
  return Array.from(widths).sort((a, b) => Number(a) - Number(b));
};

export const getUniqueRimDiameters = (products: Product[]): string[] => {
  const rims = new Set<string>();
  products.forEach((p) => {
    Object.entries(p.product_specifications).forEach(([key, value]) => {
      if (key.toLowerCase().includes("rim") && value && value !== "x") {
        rims.add(value);
      }
    });
  });
  return Array.from(rims).sort((a, b) => Number(a) - Number(b));
};

export const getUniqueSpeedRatings = (products: Product[]): string[] => {
  const ratings = new Set<string>();
  products.forEach((p) => {
    Object.entries(p.product_specifications).forEach(([key, value]) => {
      if (
        (key.toLowerCase().includes("speed") || key.toLowerCase().includes("symbol")) &&
        value &&
        value !== "x"
      ) {
        ratings.add(value);
      }
    });
  });
  return Array.from(ratings).sort();
};
