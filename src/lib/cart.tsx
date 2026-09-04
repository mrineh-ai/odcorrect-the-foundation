import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, type Product } from "@/data/products";

/**
 * Client-side cart.
 *
 * Persisted to localStorage under a single key. The shape mirrors the future
 * `carts` / `cart_items` tables (product id + variant sku + quantity), so the
 * same reducer can later be backed by the database without changing the UI.
 */

export interface CartLine {
  productId: string;
  slug: string;
  variantSku: string;
  size?: string;
  colour: string;
  quantity: number;
  /** Unit price in INR captured at the time of adding. */
  unitPrice: number;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  total: number;
  add: (line: CartLine) => void;
  remove: (variantSku: string) => void;
  setQuantity: (variantSku: string, quantity: number) => void;
  clear: () => void;
  ready: boolean;
}

const STORAGE_KEY = "odcorrect.cart.v1";

const CartContext = createContext<CartContextValue | null>(null);

function readStored(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartLine[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLines(readStored());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable — cart stays in memory */
    }
  }, [lines, ready]);

  const add = useCallback((line: CartLine) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.variantSku === line.variantSku);
      if (existing) {
        return prev.map((l) =>
          l.variantSku === line.variantSku
            ? { ...l, quantity: Math.min(10, l.quantity + line.quantity) }
            : l,
        );
      }
      return [...prev, line];
    });
  }, []);

  const remove = useCallback((variantSku: string) => {
    setLines((prev) => prev.filter((l) => l.variantSku !== variantSku));
  }, []);

  const setQuantity = useCallback((variantSku: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.variantSku !== variantSku)
        : prev.map((l) =>
            l.variantSku === variantSku ? { ...l, quantity: Math.min(10, quantity) } : l,
          ),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((n, l) => n + l.quantity, 0);
    const subtotal = lines.reduce((n, l) => n + l.quantity * l.unitPrice, 0);
    return { lines, count, subtotal, total: subtotal, add, remove, setQuantity, clear, ready };
  }, [lines, add, remove, setQuantity, clear, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

/** Resolve the catalogue record for a cart line. */
export function lineProduct(line: CartLine): Product | undefined {
  return PRODUCTS.find((p) => p.id === line.productId);
}
