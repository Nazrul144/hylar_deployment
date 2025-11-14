"use client";

import AddUserBusiness from "@/components/addYourBusiness/userBusinessSide/AddUserBusiness";
import BlogPage from "@/components/blogPage/BlogPage";
import { UserContext } from "@/providers/UserProvider";
import React, { useContext } from "react";

const BusinessPage = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <h1 className="text-center mt-12">Loading...</h1>; 
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
