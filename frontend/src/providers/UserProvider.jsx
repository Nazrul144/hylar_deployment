"use client";
import React, { createContext, useState, useEffect } from "react";
import { BASE_URL } from "../config/config";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("access");
      
      if (!token || token === "undefined" || token === "null") {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await fetch(`${BASE_URL}/api/accounts/profile/`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // Token expired or invalid
        if (response.status === 401) {
          console.log("Token expired, clearing auth data");
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          localStorage.removeItem("user");
          setUser(null);
        }
        throw new Error("Failed to fetch user profile");
      }

      const result = await response.json();
      
      
      const userData = result.data || result;
      
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      
      console.log("✅ User profile fetched:", userData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  
  useEffect(() => {
    const handleStorageChange = () => {
      fetchUserProfile();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const value = {
    user,
    setUser,
    loading,
    fetchUserProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};