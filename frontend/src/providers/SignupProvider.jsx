'use client'
import { createContext, useState } from "react"

export const SignupContext = createContext()

const SignupProvider = ({children}) => {

  const [signupData, setSignupData] = useState({})
  const [userCreated, setUserCreated] = useState(false)

    console.log("from context", signupData, "userCreated:", userCreated);

  return (
    <SignupContext.Provider value={{signupData, setSignupData, userCreated, setUserCreated}}>
        {children}
    </SignupContext.Provider>
  )
}

export default SignupProvider
