'use client'
import { createContext, useState } from "react"

export const SignupContext = createContext()

const SignupProvider = ({children}) => {

  const [signupData, setSignupData] = useState(null)

  console.log("from context", signupData)

  return (
    <SignupContext.Provider value={{signupData, setSignupData}}>
        {children}
    </SignupContext.Provider>
  )
}

export default SignupProvider
