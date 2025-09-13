import Image from 'next/image'
import React from 'react'

const UserLandingPageCard = ({ imageName, descriptionBoldText, descriptionLightText, descriptionFont,
    buttonName, buttonFont, bookMarkIcon }) => {
  return (
    <div>
      <div className="max-w-[352px] h-[313px] border-2 z-30">
            <div className="w-full h-[60%] relative">
                <Image src={`/${imageName}.jpg`} alt={`imageName`} fill />
            </div>
            <div className="w-full h-[40%] pl-6">
                <p className={`text-[#000000] font-bold pt-2 ${descriptionFont.className}`}>
                    {descriptionBoldText} <span className="font-normal">{descriptionLightText}</span></p>
                <div className="flex gap-5 pt-4">
                    <button className={`text-[#747474] ring-2 px-4 py-1 ${buttonFont.className}`}>{buttonName} {'>>'}</button>
                    <button className="text-[#747474] ring-2 px-4 py-1"><Image src={`/${bookMarkIcon}.svg`} alt="bookMarkIcon"
                        width={20} height={20} /></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserLandingPageCard
