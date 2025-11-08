'use client'
import { createContext, useState } from "react"

export const SignupContext = createContext()

const SignupProvider = ({children}) => {

  const [signupData, setSignupData] = useState()
  const [userProfile, setUserProfile] = useState({})
  const [userCreated, setUserCreated] = useState(false)

    console.log("from context", signupData, "userCreated:", userCreated);
    console.log("from context", userProfile,);

    // const getFinalSignupData = ()=>{
    //   if(!signupData) return {}
    //   const {form5, form6, form7} = signupData;
    //   return {
    //     ...form5,
    //     ...form6,
    //     ...form7
    //   }
    // }

    //Function to send only form 5,6,7 data to backend

  return (
    <SignupContext.Provider value={{signupData, setSignupData, userProfile, setUserProfile, userCreated, setUserCreated}}>
        {children}
    </SignupContext.Provider>
  )
}

export default SignupProvider
