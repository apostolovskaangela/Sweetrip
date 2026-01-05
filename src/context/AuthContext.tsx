import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, User as ApiUser } from "@/src/services/api";

export interface User {
  id: string | number;
  name?: string;
  email: string;
  avatar?: string;
  roles?: string[];
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  refreshToken: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEYS = {
  TOKEN: "AUTH_TOKEN",
  USER: "USER_DATA",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
    user: null,
    isLoading: true,
    error: null,
  });

  /**
   * Restore session on app start
   */
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
        const user = await AsyncStorage.getItem(STORAGE_KEYS.USER);

        if (token && user) {
          setState({
            isAuthenticated: true,
            token,
            user: JSON.parse(user),
            isLoading: false,
            error: null,
          });
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } catch {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    restoreSession();
  }, []);

  /**
   * Real login using API
   */
  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await authApi.login({ email, password });
      
      const user: User = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        roles: response.user.roles,
      };

      setState({
        isAuthenticated: true,
        token: response.token,
        user,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
        isAuthenticated: false,
        token: null,
        user: null,
      }));
      throw error;
    }
  };

  /**
   * Register - for now, same as login (backend may have separate endpoint)
   */
  const register = async (email: string, password: string, name?: string) => {
    // If backend has a register endpoint, use it here
    // For now, using login endpoint
    return login(email, password);
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local state
      setState({
        isAuthenticated: false,
        token: null,
        user: null,
        isLoading: false,
        error: null,
      });
    }
  };

  const clearError = () =>
    setState(prev => ({ ...prev, error: null }));

  /**
   * Refresh user data from API
   */
  const refreshToken = async () => {
    if (!state.token) return;

    try {
      const userData = await authApi.getUser();
      const user: User = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        roles: userData.roles,
      };
      
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      setState(prev => ({ ...prev, user }));
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (!state.user) return;

    const updatedUser = { ...state.user, ...userData };
    AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));

    setState(prev => ({ ...prev, user: updatedUser }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError,
        refreshToken,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
