import React, { useState, useEffect } from "react";
import { auth } from "../../Configuration/Firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAnonymous, setIsAnonymous, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
