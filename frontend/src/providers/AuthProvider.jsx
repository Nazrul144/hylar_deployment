'use client'

import { createContext } from "react";

export const UserContext = createContext(null);

const AuthProvider = ({ children }) => {
  // Dummy user
  const userInfo = {
    name: "Nazrul Islam",
    email: "nazrul@example.com",
    isLoggedIn: false
  };

  return (
    <UserContext.Provider value={userInfo}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthProvider;
