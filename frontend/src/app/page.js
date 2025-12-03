'use client'

import PublicLandingPage from "../components/landingPage/PublicLandingPage";
import UserLandingPage from "../components/UserLandingPage/UserLandingPage";
import { UserContext } from "../providers/UserProvider";
import { useContext } from "react";

export default function Home() {
    const { user, loading } = useContext(UserContext);

  if(user){
    return (
      <div>
        <UserLandingPage/>
      </div>
    )
  }

  return (
    <div>
      <PublicLandingPage/>
    </div>
  );
}