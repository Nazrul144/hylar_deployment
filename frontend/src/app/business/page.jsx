import FAQ from "@/components/addYourBusiness/FAQ";
import Header from "@/components/addYourBusiness/Header";
import Partner from "@/components/addYourBusiness/Partner";
import WhatYouGet from "@/components/addYourBusiness/WhatYouGet";
import Works from "@/components/addYourBusiness/Works";
import BlogPage from "@/components/blogPage/BlogPage";
import Subscription from "@/components/landingPage/Subscription";
import React from "react";

const BusinessPage = () => {
  const user = false;

  return (
    <div>
      {user ? (
        <div>
          <BlogPage/>
        </div>
      ) : (
        <div>
          <Header />
          <Partner />
          <Works />
          <Subscription />
          <WhatYouGet />
          <FAQ />
        </div>
      )}
    </div>
  );
};

export default BusinessPage;
