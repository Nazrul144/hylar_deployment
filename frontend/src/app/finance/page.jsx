'use client'
import Finance from '@/components/browseCaterories/Finance'
import FinanceDiscount from '@/components/discountLandingPage/FinanceDiscount'
import React, { useState } from 'react'

const FinancePage = () => {
   const [isLogin, setIsLogin] = useState(false)
   if(isLogin){
    return(
      <div>
      <Finance/>
      </div>
    )
   }

  return (
    <div>
     <FinanceDiscount/>
    </div>
  )

}

export default FinancePage
