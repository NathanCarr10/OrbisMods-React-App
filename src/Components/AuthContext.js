// React hooks for state, context, and lifecycle
import { createContext, useContext, useEffect, useState } from "react";

// Firebase authentication instance
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to access the AuthContext
export const useAuth = () => useContext(AuthContext);

// Context provider component to wrap the app and manage authentication state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold current authenticated user

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user when auth state changes
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Provide the current user to the rest of the app
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

// Default export for components that want to use this as a hook
export default useAuth;
