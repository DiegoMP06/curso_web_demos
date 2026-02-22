import type { Category, Product } from "astro:db";

export type CategoryType = typeof Category.$inferSelect;
export type ProductType = typeof Product.$inferSelect;

export type ProductWithCategory = {
    Product: ProductType;
    Category: CategoryType;
};

export type DropzoneFile = File & {
    preview: string;
};

export type DraftProduct = {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: File[];
    categoryId: number;
};

export type CartItem = {
    id: number;
    quantity: number;
    description: string;
    name: string;
    price: number;
    image: string;
    category: string;
}