import { create } from "zustand";

interface Product {
  _id?: string;
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
  fetchProducts: () => Promise<void>;
  deleteProducts: (
    id: string
  ) => Promise<{ success: boolean; message: string } | undefined>;
  updatedProducts: (
    pid: string,
    updatedProduct: Product
  ) => Promise<{ success: boolean; message: string } | undefined>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct: Product) => {
    try {
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
    } catch (error) {
      return { success: false, message: "Failed to create new product" };
    }
  },

  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },

  deleteProducts: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: "Product deletion failed" };
    }
  },

  updatedProducts: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      }
      //update UI without refresh
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));

      return { success: true, message: "Product updated successfully!" };
    } catch (error) {
      return { success: false, message: "Failed to update product" };
    }
  },
}));
