'use client'

import { getData } from "@/lib/api";
import { createContext, useEffect, useState } from "react";


export const CategoriesContext = createContext();

const CategoriesProvider = ({children}) => {

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    console.log("Categories data:", categories)

    useEffect(()=>{
      const allCategoriesData = async()=>{
        const data = await getData();
        setCategories(data);
        setLoading(false)
      }
      allCategoriesData()
    },[])

  return (
    <CategoriesContext.Provider value={{categories, loading}}>
        {children}
    </CategoriesContext.Provider>
  )
}

export default CategoriesProvider
