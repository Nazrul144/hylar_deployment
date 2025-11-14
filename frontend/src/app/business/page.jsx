"use client";

import AddUserBusiness from "@/components/addYourBusiness/userBusinessSide/AddUserBusiness";
import BlogPage from "@/components/blogPage/BlogPage";
import { UserContext } from "@/providers/UserProvider";
import React, { useContext } from "react";

const BusinessPage = () => {
  const { user, loading } = useContext(UserContext);


  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <div>
      {user ? (   
          <AddUserBusiness/>
      ) : (
        <>
          <BlogPage />
        </>
      )}
    </div>
  );
};

export default BusinessPage;
