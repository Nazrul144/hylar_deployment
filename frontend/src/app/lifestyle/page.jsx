'use client'
import FinanceDiscount from '@/components/discountLandingPage/FinanceDiscount'
import HomeAndLifeStyle from '@/components/UserLandingPage/HomeAndLifeStyle'
import React, { useState } from 'react'

const LifestylePage = () => {
  const [isLogin, setIsLogin] = useState(false)
 
   if(isLogin){
    return(
      <div>
      <HomeAndLifeStyle/>
      </div>
    )
   }

  return (
    <div>
     <HomeAndLifeStyle/>
    </div>
  )

}

export default LifestylePage
