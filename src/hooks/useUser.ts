import { useState, useEffect } from 'react';

const USER_STORAGE_KEY = 'finance-tracker-user';

export interface UserData {
  name: string;
  hasCompletedOnboarding: boolean;
  joinedAt: string;
}

export const useUser = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUser = (userData: { name: string }) => {
    const user: UserData = {
      name: userData.name,
      hasCompletedOnboarding: true,
      joinedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const clearUser = () => {
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  };

  return {
    user,
    isLoading,
    saveUser,
    clearUser,
    isNewUser: !user?.hasCompletedOnboarding,
  };
};
