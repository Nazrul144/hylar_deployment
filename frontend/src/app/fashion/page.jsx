'use client'
import Fashion from '@/components/browseCaterories/Fashion'
import FashionAndClothingDiscounts from '@/components/discountLandingPage/FashionAndClothingDiscounts'
import React, { useContext, useEffect, useState } from 'react'

const FasionPage = () => {
   
  const user = useContext(UserContext)
 
   if(user?.isLoggedIn){
    return(
      <div>
           <Fashion/>
      </div>
    )
   }

  return (
    <div>
     <FashionAndClothingDiscounts/>
    </div>
  )
}
export default FasionPage
