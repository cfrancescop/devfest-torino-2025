import {
    GoogleAuthProvider,signInWithPopup,
    onAuthStateChanged as _onAuthStateChanged,
    onIdTokenChanged as _onIdTokenChanged,
  } from "firebase/auth";
  import { firebaseAuth } from "./firebaseApp";
  
  export function onAuthStateChanged(cb) {
    return _onAuthStateChanged(firebaseAuth, cb);
  }
  
  export function onIdTokenChanged(cb) {
    return _onIdTokenChanged(firebaseAuth, cb);
  }
  
  export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
  
    try {
      await signInWithPopup(firebaseAuth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  }
  
  export async function signOut() {
    try {
      return firebaseAuth.signOut();
    } catch (error) {
      console.error("Error signing out with Google", error);
    }
  }