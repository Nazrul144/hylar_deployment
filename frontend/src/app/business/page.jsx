'use client'

import FAQ from "@/components/addYourBusiness/FAQ";
import Header from "@/components/addYourBusiness/Header";
import Partner from "@/components/addYourBusiness/Partner";
import WhatYouGet from "@/components/addYourBusiness/WhatYouGet";
import Works from "@/components/addYourBusiness/Works";
import BlogPage from "@/components/blogPage/BlogPage";
import Subscription from "@/components/landingPage/Subscription";
import { UserContext } from "@/providers/AuthProvider";
import React, { useContext } from "react";

const BusinessPage = () => {
  const user = useContext(UserContext); // context থেকে user info নাও
  console.log("user is :", user);

  return (
    <div>
      {user?.isLoggedIn ? (   // user login আছে কিনা check করো
        <BlogPage/>
      ) : (
        <>
          <Header />
          <Partner />
          <Works />
          <Subscription />
          <WhatYouGet />
          <FAQ />
        </>
      )}
    </div>
  );
};

export default BusinessPage;
