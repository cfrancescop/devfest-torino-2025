"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { firebaseApp } from "@/firebase/firebaseApp";

interface AuthContextType {
  user: User | null;
}

const auth = getAuth(firebaseApp);

export const AuthContext = createContext<AuthContextType>({
  user: null,
});

export const LoggedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export default LoggedLayout;