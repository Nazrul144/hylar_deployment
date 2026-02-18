"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { BASE_URL } from "../config/config";
import { UserContext } from "./UserProvider";

export const WishlistContext = createContext();

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access");
};

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(UserContext);

  const [savedItems, setSavedItems] = useState([]);
  const [savedProductIds, setSavedProductIds] = useState(new Set());
  const [loading, setLoading] = useState(true); // ← change default to true

  const fetchSavedProducts = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setSavedItems([]);
      setSavedProductIds(new Set());
      setLoading(false); // ← make sure loading becomes false
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/offers/saved-products/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();

      if (result.success && Array.isArray(result.data)) {
        setSavedItems(result.data);
        setSavedProductIds(new Set(result.data.map((entry) => entry.product.id)));
      }
    } catch (err) {
      console.error("Error fetching saved products:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchSavedProducts();
    } else {
      setSavedItems([]);
      setSavedProductIds(new Set());
      setLoading(false); // ← important: stop loading if no user
    }
  }, [user, fetchSavedProducts]);

  const toggleSave = useCallback(
    async (productId) => {
      const token = getToken();
      if (!token) return { success: false };

      setSavedProductIds((prev) => {
        const next = new Set(prev);
        if (next.has(productId)) {
          next.delete(productId);
        } else {
          next.add(productId);
        }
        return next;
      });

      try {
        const res = await fetch(`${BASE_URL}/api/offers/save-product/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ product_id: productId }),
        });

        const result = await res.json();

        if (result.success) {
          if (result.data.is_saved) {
            setSavedProductIds((prev) => new Set([...prev, productId]));
            // ← re-fetch to get full product data for wishlist page
            await fetchSavedProducts();
          } else {
            setSavedProductIds((prev) => {
              const next = new Set(prev);
              next.delete(productId);
              return next;
            });
            setSavedItems((prev) =>
              prev.filter((entry) => entry.product.id !== productId)
            );
          }
          return { success: true, isSaved: result.data.is_saved };
        } else {
          setSavedProductIds((prev) => {
            const next = new Set(prev);
            if (next.has(productId)) {
              next.delete(productId);
            } else {
              next.add(productId);
            }
            return next;
          });
          return { success: false, message: result.message };
        }
      } catch (err) {
        setSavedProductIds((prev) => {
          const next = new Set(prev);
          if (next.has(productId)) {
            next.delete(productId);
          } else {
            next.add(productId);
          }
          return next;
        });
        console.error("Toggle save error:", err);
        return { success: false, message: "Network error" };
      }
    },
    [fetchSavedProducts]
  );

  return (
    <WishlistContext.Provider
      value={{
        savedItems,
        savedProductIds,
        savedCount: savedProductIds.size,
        loading,
        toggleSave,
        fetchSavedProducts,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};