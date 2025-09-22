'use client'
import Fashion from '@/components/browseCaterories/Fashion'
import FashionAndClothingDiscounts from '@/components/discountLandingPage/FashionAndClothingDiscounts'
import React, { useState } from 'react'

const FasionPage = () => {
   const [isLogin, setIsLogin] = useState(false)

   if(isLogin){
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
