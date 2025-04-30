"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { firebaseAuth } from "@/firebase/firebaseApp";
interface AuthContextType {
  user: User | null;
}
interface ProvidersProps {
  children: React.ReactNode;
}
export const AuthContext = createContext<AuthContextType>({
  user: null,
});

export function Providers({ children }: ProvidersProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SessionProvider>
      <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    </SessionProvider>
  );
}
export default Providers;