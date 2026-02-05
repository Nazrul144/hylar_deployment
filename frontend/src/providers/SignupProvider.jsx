'use client'
import { createContext, useState, useEffect } from "react"

export const SignupContext = createContext()

const SignupProvider = ({children}) => {
  const [signupData, setSignupData] = useState()
  const [userProfile, setUserProfile] = useState({})
  const [userCreated, setUserCreated] = useState(false)

  // Load userProfile from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProfile = localStorage.getItem('userProfile')
      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile)
          setUserProfile(parsed)
        } catch (error) {
          console.error('Error parsing saved profile:', error)
          localStorage.removeItem('userProfile')
        }
      }
    }
  }, [])

  // Save userProfile to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && Object.keys(userProfile).length > 0) {
      localStorage.setItem('userProfile', JSON.stringify(userProfile))
    }
  }, [userProfile])

  // Clear profile data helper function
  const clearUserProfile = () => {
    setUserProfile({})
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userProfile')
    }
  }

  return (
    <SignupContext.Provider value={{
      signupData, 
      setSignupData, 
      userProfile, 
      setUserProfile, 
      userCreated, 
      setUserCreated,
      clearUserProfile
    }}>
        {children}
    </SignupContext.Provider>
  )
}

export default SignupProvider
