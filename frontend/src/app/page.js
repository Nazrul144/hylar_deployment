'use client'

import About from "@/components/landingPage/About";
import EmailSubscription from "@/components/landingPage/EmailSubscription";
import Faq from "@/components/landingPage/Faq";
import Header from "@/components/landingPage/Header";
import LatestNews from "@/components/landingPage/LatestNews";
import Subscription from "@/components/landingPage/Subscription";
import Works from "@/components/landingPage/Works";
import BrowseCategories from "@/components/UserLandingPage/BrowseCategories";
import Fasion from "@/components/UserLandingPage/Fasion";
import Finance from "@/components/UserLandingPage/Finance";
import Hero from "@/components/UserLandingPage/Hero";
import HomeAndLifeStyle from "@/components/UserLandingPage/HomeAndLifeStyle";
import Travel from "@/components/UserLandingPage/Travel";
import { useState } from "react";


export default function Home() {

  const [isLogin, setIsLogin] = useState(false)

  if(isLogin){
    return (
      <div>
        <Hero/>
        <BrowseCategories/>
        <Fasion/>
        <Travel/>
        <HomeAndLifeStyle/>
        <Finance/>
        <EmailSubscription/>
        <Faq/>
      </div>
    )
  }

  return (
    <div>
      <Header/>
      <Works/>
      <About/>
      <Subscription/>
      <LatestNews/>
      <EmailSubscription/>
      <Faq/>
    </div>
  );
}
