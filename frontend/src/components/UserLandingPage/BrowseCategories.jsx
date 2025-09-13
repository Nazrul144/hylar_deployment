import Image from 'next/image'
import React from 'react'

const BrowseCategories = () => {
  return (
    <div>
       <div className="pt-22 flex flex-col items-center justify-center gap-8">
            <h1 className={`text-[#00308F] font-medium md:font-bold text-5xl text-center inter-text`}>Browse Categories</h1>
            <div className="flex flex-col items-center justify-center">
                <p className={`text-[#000000] text-center montserrat-text`}>Must see offers from some of Blue Light Card
                    members' best-loved</p>
                <p className={`text-[#000000] text-center montserrat-text`}>Fashion & Clothing partners.</p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20">
                <div className="w-60 h-60 relative overflow-hidden">
                    <Image src="/browse1.jpg" alt="browse1" fill className="object-cover object-top" />
                    <div className="absolute inset-x-0 bottom-0 h-1/4 backdrop-blur-sm" />
                    <p className={`absolute bottom-4 inset-x-18 text-[#FFFFFF] text-2xl inter-text`}>Fashion</p>
                    {/* this text is set with respect to its parent div*/}
                </div>
                <div className="w-60 h-60 relative overflow-hidden">
                    <Image src="/browse2.jpg" alt="browse2" fill className="object-cover object-top" />
                    <div className="absolute inset-x-0 bottom-0 h-1/4 backdrop-blur-sm" />
                    <p className={`absolute bottom-4 inset-x-18 text-[#FFFFFF] text-2xl inter-text`}>Travels</p>
                </div>
                <div className="w-60 h-60 relative overflow-hidden">
                    <Image src="/browse3.jpg" alt="browse3" fill className="object-cover object-top" />
                    <div className="absolute inset-x-0 bottom-0 h-1/4 backdrop-blur-sm" />
                    <p className={`absolute bottom-4 inset-x-5 text-[#FFFFFF] text-2xl inter-text`}>Home & Lifestyle</p>
                </div>
            </div>

            <div className="w-60 h-60 relative overflow-hidden">
                <Image src="/browse4.jpg" alt="browse4" fill className="object-cover object-top" />
                <div className="absolute inset-x-0 bottom-0 h-1/4 backdrop-blur-sm" />
                <p className={`absolute bottom-4 inset-x-18 text-[#FFFFFF] text-2xl inter-text`}>Finance</p>
            </div>
        </div>
    </div>
  )
}

export default BrowseCategories
