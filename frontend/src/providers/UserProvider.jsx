"use client";
import { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../config/config";

// FIXED: Provide default values in createContext
export const UserContext = createContext({
  user: null,
  setUser: () => {},
  loading: true
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      // FIXED: Check if we're in the browser
      if (typeof window === 'undefined') {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await fetch(`${BASE_URL}/api/profiles`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          // FIXED: Better error handling for non-200 responses
          console.error("Profile fetch failed:", res.status);
          setUser(null);
          setLoading(false);
          return;
        }

        const result = await res.json();
        
        if (result.status_code === 200 && result.data) {
          setUser(result.data);
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

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;