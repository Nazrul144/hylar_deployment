"use client";
import { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../config/config";

// Provide default values in createContext
export const UserContext = createContext({
  user: null,
  setUser: () => {},
  loading: true,
  fetchUserProfile: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ ADDED: Reusable function to fetch user profile
  const fetchUserProfile = async () => {
    // Check if we're in the browser
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    try {
      // ✅ FIXED: Use "access" instead of "access_token"
      const token = localStorage.getItem("access");
      
      if (!token) {
        console.log("No access token found");
        setUser(null);
        setLoading(false);
        return;
      }

      console.log("🔍 Fetching user profile with token...");

      const res = await fetch(`${BASE_URL}/api/accounts/complete-profile/`, {
        method: "GET",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (!res.ok) {
        console.error("Profile fetch failed:", res.status);
        
        // If token is invalid (401), clear it
        if (res.status === 401) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          localStorage.removeItem("user");
        }
        
        setUser(null);
        setLoading(false);
        return;
      }

      const result = await res.json();
      console.log("✅ User profile fetched:", result);
      
      if (result.statusCode === 200 && result.data) {
        setUser(result.data);
        // Also save to localStorage for quick access
        localStorage.setItem("user", JSON.stringify(result.data));
      } else if (result.data) {
        // Handle different response structures
        setUser(result.data);
        localStorage.setItem("user", JSON.stringify(result.data));
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch user profile on mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // ✅ ADDED: Listen for storage changes (when user logs in/out in another tab)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "access" || e.key === "user") {
        console.log("🔄 Token changed, refetching user...");
        fetchUserProfile();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, fetchUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
