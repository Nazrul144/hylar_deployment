'use client'
import Finance from '@/components/browseCaterories/Finance'
import FinanceDiscount from '@/components/discountLandingPage/FinanceDiscount'
import React, { useState } from 'react'


export const metadata = {
  title: "Add Your Business || Maximum Savings",
  description:
    "Partner with Maximum Savings and grow your business! List your products or services on our platform to reach more customers, boost sales, and gain brand visibility. Join our network of trusted sellers today.",
  keywords: [
    "Add your business",
    "List your store",
    "Sell on Maximum Savings",
    "Business partnership",
    "Online marketplace",
    "Promote your business",
    "Grow your sales",
    "Ecommerce platform"
  ]
}

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
