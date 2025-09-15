import React from 'react'
import UserLandingPageCard from './UserLandingPageCard/UserLandingPageCard'
import { Inter, Montserrat } from "next/font/google";
import { Button } from '../ui/button';
import Link from 'next/link';

const interFont = Inter({
  subsets: ["latin"],
  weight: ["400","500","600","700","800","900"]
});

const montSerrat = Montserrat({
  subsets: ["latin"],
  weight: ["400","500","600","700","800","900"]
});

const Finance = () => {
  return (
    <div className='mb-16'>
      <div className="flex flex-col items-center justify-center pt-24">
        <h1 className={`text-[#000000] font-bold text-5xl ${interFont.className}`}>Finance</h1>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 pt-11">
          <UserLandingPageCard
            imageName="fashion_style"
            descriptionBoldText="Paucek and Lage –"
            descriptionLightText="Happy World Rainforest Day 🌿"
            descriptionFont={interFont}
            buttonName="Redeem"
            buttonFont={montSerrat}
            bookMarkIcon="bookmark"
          />

          <UserLandingPageCard
            imageName="black_friday"
            descriptionBoldText="Paucek and Lage –"
            descriptionLightText="Happy World Rainforest Day 🌿"
            descriptionFont={interFont}
            buttonName="Redeem"
            buttonFont={montSerrat}
            bookMarkIcon="bookmark"
          />

          <UserLandingPageCard
            imageName="autumn_fashion_sale"
            descriptionBoldText="Paucek and Lage –"
            descriptionLightText="Happy World Rainforest Day 🌿"
            descriptionFont={interFont}
            buttonName="Redeem"
            buttonFont={montSerrat}
            bookMarkIcon="bookmark"
          />
        </div>

        <Link href={'/finance'} className={`bg-[#00308F] text-[#FFFFFF] mt-12 px-6 py-2 rounded-sm cursor-pointer ${montSerrat.className}`}>
          View All {'>>'}
        </Link>
      </div>
    </div>
  )
}

export default Finance
