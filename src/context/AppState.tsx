import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import seedProducts from "../products.json";

export type Product = {
  id: number | string;
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  createdAt: string;
  isActive: boolean;
  tags: string[];
};

export type User = { email: string; role: "admin" | "user" } | null;

interface AppStateValue {
  user: User;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;

  products: Product[];
  addProduct: (p: Omit<Product, "id" | "createdAt">) => Product;
  updateProduct: (id: Product["id"], patch: Partial<Omit<Product, "id" | "createdAt">>) => void;
  deleteProduct: (id: Product["id"]) => void;
  isAdmin: boolean;
}

const AppStateContext = createContext<AppStateValue | undefined>(undefined);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(() => {
    try {
      const raw = sessionStorage.getItem("app_user");
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const raw = sessionStorage.getItem("app_products");
      if (raw) return JSON.parse(raw) as Product[];
    } catch {}
    return [...(seedProducts as Product[])];
  });

  const ADMIN_EMAIL = "admin@shoppie.com";
  const ADMIN_PASSWORD = "admin123";

  const value = useMemo<AppStateValue>(() => ({
    user,
    signIn: async (email: string, password: string) => {
      if (!email) throw new Error("Email is required");
      if (!password) throw new Error("Password is required");
      // Only default admin is allowed to sign in for now
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        setUser({ email, role: "admin" });
      } else {
        throw new Error("Invalid credentials");
      }
    },
    signOut: () => {
      setUser(null);
      try { sessionStorage.removeItem("app_user"); } catch {}
    },

    products,
    addProduct: (p) => {
      const newProduct: Product = {
        ...p,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      setProducts((prev) => [newProduct, ...prev]);
      return newProduct;
    },
    updateProduct: (id, patch) => {
      setProducts((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
    },
    deleteProduct: (id) => {
      setProducts((prev) => prev.filter((it) => it.id !== id));
    },
    isAdmin: user?.role === "admin",
  }), [user, products]);

  // Persist to sessionStorage
  useEffect(() => {
    try { sessionStorage.setItem("app_user", JSON.stringify(user)); } catch {}
  }, [user]);
  useEffect(() => {
    try { sessionStorage.setItem("app_products", JSON.stringify(products)); } catch {}
  }, [products]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
