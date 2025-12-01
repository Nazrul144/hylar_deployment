"use client";

import { getAllCategoriesData, getData } from "@/lib/api";
import { createContext, useEffect, useState } from "react";

export const CategoriesContext = createContext();

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCategoriesData();
      setCategories(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, loading }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;
