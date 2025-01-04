import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await authService.init();
        setIsSignedIn(authService.isSignedIn);
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const signIn = async () => {
    try {
      const result = await authService.signIn();
      setIsSignedIn(true);
      setUserData(result.profile);
      return result;
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      setIsSignedIn(false);
      setUserData(null);
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <UserContext.Provider value={{ isSignedIn, isLoading, userData, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext); 