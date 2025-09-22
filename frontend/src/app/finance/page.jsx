'use client'
import Finance from '@/components/browseCaterories/Finance'
import HolidayDiscounts from '@/components/discountLandingPage/HolidayDiscounts'
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
     <HolidayDiscounts/>
    </div>
  )

}

export default FinancePage
