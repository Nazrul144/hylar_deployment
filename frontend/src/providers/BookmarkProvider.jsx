'use client'

import { createContext, useEffect, useState } from "react"


export const BookmarkContext = createContext({
  bookmarks: [],
  toggleBookmark: () => {},
  removeBookmark: () => {}
});

const BookmarkProvider = ({children}) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {

    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem("bookmark");
        if (saved) {
          const parsed = JSON.parse(saved);
          setBookmarks(Array.isArray(parsed) ? parsed : []);
        }
      } catch (error) {
        console.error("Error loading bookmarks:", error);
        setBookmarks([]);
      } finally {
        setIsLoaded(true);
      }
    }
  }, []);


  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      try {
        localStorage.setItem("bookmark", JSON.stringify(bookmarks));
      } catch (error) {
        console.error("Error saving bookmarks:", error);
      }
    }
  }, [bookmarks, isLoaded]);


  const toggleBookmark = (item) => {
    setBookmarks((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  };


  const removeBookmark = (id) => {
    setBookmarks((prev) => prev.filter((i) => i.id !== id));
  };
    
  return (
    <BookmarkContext.Provider value={{bookmarks, toggleBookmark, removeBookmark}}>
      {children}
    </BookmarkContext.Provider>
  )
}

export default BookmarkProvider