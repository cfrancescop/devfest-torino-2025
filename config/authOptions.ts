import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { firebaseAuth } from "@/firebase/firebaseApp";



export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === "google") {
        const googleProvider = new GoogleAuthProvider();
        const credential = GoogleAuthProvider.credential(account.id_token);
        try {
          await signInWithCredential(firebaseAuth, credential);
        } catch (error) {
          console.error("Error linking Google account to Firebase:", error);
        }
      }
      return true;
    },
    async session({ session }) {
      return session;
    },
  },
};