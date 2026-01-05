import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from '../axiosClient';

const STORAGE_KEYS = {
  TOKEN: 'AUTH_TOKEN',
  USER: 'USER_DATA',
};

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
    roles: string[];
  };
  token: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

export const authApi = {
  /**
   * Login user
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosClient.post<LoginResponse>('/login', data);
    
    // Store token and user data
    if (response.data.token) {
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    try {
      await axiosClient.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage
      await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    }
  },

  /**
   * Get current authenticated user
   */
  getUser: async (): Promise<User> => {
    const response = await axiosClient.get<User>('/user');
    return response.data;
  },

  /**
   * Alias for getUser (matches guide naming)
   */
  getCurrentUser: async (): Promise<User> => {
    return authApi.getUser();
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: async (): Promise<boolean> => {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    return !!token;
  },

  /**
   * Get stored user data
   */
  getStoredUser: async (): Promise<User | null> => {
    try {
      const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('Error getting stored user:', error);
      return null;
    }
  },
};


