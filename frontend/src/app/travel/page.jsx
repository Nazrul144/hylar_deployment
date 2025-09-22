'use client'
import Travel from '@/components/browseCaterories/Travel'
import HolidayDiscounts from '@/components/discountLandingPage/HolidayDiscounts'
import React, { useState } from 'react'

const TravelPage = () => {
  const [isLogin, setIsLogin] = useState(false)

    if(isLogin){
    return(
      <div>
      <Travel/>
      </div>
    )
   }

  return (
    <div>
     <HolidayDiscounts/>
    </div>
  )
}

export default TravelPage
