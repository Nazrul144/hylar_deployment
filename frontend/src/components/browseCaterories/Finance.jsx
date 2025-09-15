import Hero from "../UserLandingPage/Hero"
import CatagoriesSlider from "../UserLandingPage/UserLandingPageCard/CatagoriesSlider"
import ChildrenswearCard from "../UserLandingPage/UserLandingPageCard/ChildrenswearCard"
import BankAccounts from "../UserLandingPage/UserLandingPageCard/FinanceComponenets/BankAccounts"
import CreditCards from "../UserLandingPage/UserLandingPageCard/FinanceComponenets/CreditCards"
import Insurance from "../UserLandingPage/UserLandingPageCard/FinanceComponenets/Insurance"
import Loans from "../UserLandingPage/UserLandingPageCard/FinanceComponenets/Loans"

import FinanceHero from "./FinanceHero"

const Finance = () => {
  return (
    <div>
      <FinanceHero/>
      <Insurance/>
      <CreditCards/>
      <Loans/>
      <BankAccounts/>
      <CatagoriesSlider/>
    </div>
  )
}

export default Finance