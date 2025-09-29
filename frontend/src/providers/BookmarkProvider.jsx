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

  // Toggle add/remove bookmark
  const toggleBookmark = (item) => {
    const exists = bookmarks.find((i) => i.id === item.id);
    if (exists) {
      setBookmarks(bookmarks.filter((i) => i.id !== item.id));
    } else {
      setBookmarks([...bookmarks, item]);
    }
  };
    
  return (
    <div>
      <BookmarkContext.Provider value={{bookmarks, toggleBookmark}}>
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
