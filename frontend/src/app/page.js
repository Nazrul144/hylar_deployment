'use client'
import About from "@/components/LandingPage/About";
import EmailSubscription from "@/components/LandingPage/EmailSubscription";
import Faq from "@/components/LandingPage/Faq";
import Header from "@/components/LandingPage/Header";
import LatestNews from "@/components/LandingPage/LatestNews";
import Subscription from "@/components/LandingPage/Subscription";
import Works from "@/components/LandingPage/Works";
import BrowseCategories from "@/components/UserLandingPage/BrowseCategories";
import Fasion from "@/components/UserLandingPage/Fasion";
import Finance from "@/components/UserLandingPage/Finance";
import Hero from "@/components/UserLandingPage/Hero";
import HomeAndLifeStyle from "@/components/UserLandingPage/HomeAndLifeStyle";
import Travel from "@/components/UserLandingPage/Travel";
import { useState } from "react";



export default function Home() {

  const [isLogin, setIsLogin] = useState(true)

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
