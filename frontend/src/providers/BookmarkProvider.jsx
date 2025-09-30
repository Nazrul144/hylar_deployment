'use client'

import { createContext, useEffect, useState } from "react"

export const BookmarkContext =  createContext()

const BookmarkProvider = ({children}) => {

    const [bookmarks, setBookmarks] = useState([]);

  // Load from localStorage on first render
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmark") || "[]");
    setBookmarks(saved);
  }, []);

  // Update localStorage whenever bookmarks change
  useEffect(() => {
    localStorage.setItem("bookmark", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Toggle add/remove (for ManswearCard)
  const toggleBookmark = (item) => {
    setBookmarks((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  // Remove only (for StorageItem)
  const removeBookmark = (id) => {
    setBookmarks((prev) => prev.filter((i) => i.id !== id));
  };
    
  return (
    <div>
      <BookmarkContext.Provider value={{bookmarks, toggleBookmark, removeBookmark}}>
            {children}
      </BookmarkContext.Provider>
    </div>
  )
}

export default BookmarkProvider

//Step1: Create Provider by the folling command: "createContext"
//Step2: Then in the div or the replacing the dive you write the varibale name what you have used during creatingContext.
//Step3: Now use .Provider and you can pass the value in it.
//Step4: Wrap the children in it.
