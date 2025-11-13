'use client'
import { createContext, useState } from "react"

export const SignupContext = createContext()

const SignupProvider = ({children}) => {

  const [signupData, setSignupData] = useState()
  const [userProfile, setUserProfile] = useState({})
  const [userCreated, setUserCreated] = useState(false)

    console.log("from context", signupData, "userCreated:", userCreated);
    console.log("from context", userProfile,);



  return (
    <SignupContext.Provider value={{signupData, setSignupData, userProfile, setUserProfile, userCreated, setUserCreated}}>
        {children}
    </SignupContext.Provider>
  )
}

export default SignupProvider
