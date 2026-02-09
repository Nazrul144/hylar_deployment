"use client";

import { Inter, Montserrat } from "next/font/google";
import Link from "next/link";

const interFont = Inter({ subsets: ["latin"] });
const montSerrat = Montserrat({ subsets: ["latin"] });


const HomeAndLifeStyle = () => {
 


  return (
    <div className="flex flex-col items-center justify-center pt-24">
      <h1 className="text-[#000000] font-bold text-5xl inter-text">
        Home & Lifestyle
      </h1>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 pt-11">
        {/* {homeOffers.map((offer) => (
          <UserLandingPageCard
            key={offer.id}
            id={offer.id}
            imageName={`${BASE_URL}${offer.image}`}
            descriptionBoldText={offer.brand_name}
            descriptionLightText={`${offer.discount_percent}% OFF`}
            descriptionFont={interFont}
            buttonName="Redeem"
            buttonFont={montSerrat}
            isBookmarked={bookmarkIds.has(offer.id)}
            onBookmarkClick={() => handleBookmarkClick(offer)}
          />
        ))} */}
        {/* Placeholder cards */}
      </div>

      <Link
        href={`/categories/home&lifestyle`}
        className={`bg-[#00308F] text-[#FFFFFF] mt-12 px-6 py-2 rounded-sm cursor-pointer ${montSerrat.className}`}
      >
        View All {">>"}
      </Link>
    </div>
  );
};

export default HomeAndLifeStyle;