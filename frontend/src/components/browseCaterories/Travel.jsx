import CatagoriesSlider from "../UserLandingPage/UserLandingPageCard/CatagoriesSlider"
import HotelAndTravel from "../UserLandingPage/UserLandingPageCard/TravelComponentes/HotelsAndTravel"
import SkiBreaks from "../UserLandingPage/UserLandingPageCard/TravelComponentes/SkiBreaks"
import SunAndBeach from "../UserLandingPage/UserLandingPageCard/TravelComponentes/SunAndBeach"
import UkStays from "../UserLandingPage/UserLandingPageCard/TravelComponentes/UkStays"
import TravelHero from "./TravelHero"


const Travel = () => {
  return (
    <div>
      <TravelHero/>
      <SunAndBeach/>
      <UkStays/>
      <HotelAndTravel/>
      <SkiBreaks/>
      <CatagoriesSlider/>
    </div>
  )
}
     
export default Travel