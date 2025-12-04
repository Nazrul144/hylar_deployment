// contexts/SearchContext.js or lib/SearchContext.js
"use client";

import { createContext, useContext, useState, useMemo } from "react";

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within SearchProvider");
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const value = {
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useFilteredData = (data, searchFields) => {
  const { searchQuery } = useSearch();

  return useMemo(() => {
    if (!searchQuery.trim()) return data;

    const lowerSearch = searchQuery.toLowerCase();

    return data.filter((item) => {
      return searchFields.some((field) => {
        const value = field.split(".").reduce((obj, key) => obj?.[key], item);
        return value?.toString().toLowerCase().includes(lowerSearch);
      });
    });
  }, [data, searchQuery, searchFields]);
};