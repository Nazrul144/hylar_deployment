import React from 'react'
import Furniture from './UserLandingPageCard/HomeAndLifestyleComponents/Furniture'
import HomeDecor from './UserLandingPageCard/HomeAndLifestyleComponents/HomeDecor'
import BeddingAndBath from './UserLandingPageCard/HomeAndLifestyleComponents/BeddingAndBath'
import KitchenAndDining from './UserLandingPageCard/HomeAndLifestyleComponents/KitchenAndDining'
import HomeAndLifestyleHero from '../browseCaterories/HomeAndLifestyleHero'
import FAQ from '../addYourBusiness/FAQ'
import { Oleo_Script } from 'next/font/google'
import { Button } from '../ui/button'
import Link from 'next/link'

const oleo = Oleo_Script({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const HomeAndLifeStyle = () => {
  return (
    <div className='lg:w-7xl mx-auto mt-10 lg:mt-20 mb-11 px-2'>
            <h1
        className={`${oleo.className} font-bold text-xl lg:text-5xl text-[#00308F] text-center mb-4`}
      >
        Home & Lifestyle
      </h1>
      <p className="text-center lg:text-lg mb-12">
        A trusted platform built for high-impact results. <br /> With over a
        million verified members and thousands of trusted partners, we help your
        business stand out. Whether you're a local shop or a national brand,
        your offers gain powerful exposure across our app, website, and
        marketing channels — without the stress of setup fees or long
        commitments. You bring the offer, we bring the audience
      </p>
       <div className="lg:flex justify-center ml-28 lg:ml-0 mb-6">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="bg-[#00308F] px-6 py-5 font-semibold text-lg rounded
               hover:bg-[#002766] hover:text-gray-300 transition-colors"
        >
          <Link href="/register" className="text-white">
            Sign Up
          </Link>
        </Button>
      </div>
      <div>
        <HomeAndLifestyleHero/>
      </div>
       <h1 className={`${oleo.className} font-bold mt-8 text-xl lg:text-5xl text-center mb-4`}>
          Over <span className="text-[#00308F] mb-8">$300,000,000</span> saved
          by our <br /> members in the past year.
        </h1>
        <h1 className="text-center lg:text-lg">
          Don't miss out — join the Blue Light Card community today and start
          saving on the <br /> brands you love!
        </h1>
        <Furniture/>
        <HomeDecor/>
        <BeddingAndBath/>
        <KitchenAndDining/>
        <FAQ/>
    </div>
  )
}

export default HomeAndLifeStyle
