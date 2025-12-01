"use client";
import { createContext, useState } from "react";

export const PasswordContext = createContext();

const PasswordProvider = ({ children }) => {

  const [passInfo, setPassInfo] = useState(null);

  return (
    <PasswordContext.Provider value={{ passInfo, setPassInfo }}>
      {children}
    </PasswordContext.Provider>
  );
};

export default PasswordProvider;
