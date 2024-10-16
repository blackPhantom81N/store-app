import { create } from "zustand";

interface Product {
  name: string;
  price: string;
  image: string;
}

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  createProduct: (
    newProduct: Product
  ) => Promise<{ success: boolean; message: string }>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct: Product) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields" };
    }
    const response = await fetch("/api/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully!" };
  },
}));
