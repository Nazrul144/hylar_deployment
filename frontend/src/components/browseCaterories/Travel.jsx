import CatagoriesSlider from "../UserLandingPage/UserLandingPageCard/CatagoriesSlider"
import HotelAndTravel from "../UserLandingPage/UserLandingPageCard/TravelComponentes/HotelsAndTravel"
import SkiBreaks from "../UserLandingPage/UserLandingPageCard/TravelComponentes/SkiBreaks"

import SunAndBeach from "../UserLandingPage/UserLandingPageCard/TravelComponentes/SunAndBeach"
import UkStays from "../UserLandingPage/UserLandingPageCard/TravelComponentes/UkStays"

import FinanceHero from "./FinanceHero"


const Travel = () => {
  return (
    <div>
      <FinanceHero/>
      <SunAndBeach/>
      <UkStays/>
      <HotelAndTravel/>
      <SkiBreaks/>
      <CatagoriesSlider/>
    </div>
  )
}
     
export default Travel