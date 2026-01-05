import { Alert } from 'react-native';
import { AxiosError } from 'axios';

/**
 * Handle API errors and show user-friendly messages
 * Based on the React Native API Integration Guide
 */
export const handleApiError = (error: any, showAlert = true): string => {
  let message = 'An error occurred';

  if (error.response) {
    // Server responded with error
    message = error.response.data?.message || 'Server error';
    
    // Handle validation errors
    if (error.response.data?.errors) {
      const errors = error.response.data.errors;
      const firstError = Object.values(errors)[0];
      if (Array.isArray(firstError)) {
        message = firstError[0] as string;
      } else if (typeof firstError === 'string') {
        message = firstError;
      }
    }
  } else if (error.request) {
    // Request made but no response
    message = 'Network error. Please check your connection.';
  } else if (error instanceof Error) {
    // Something else happened
    message = error.message || 'An unexpected error occurred';
  }

  if (showAlert) {
    Alert.alert('Error', message);
  }

  return message;
};

/**
 * Extract error message from axios error
 */
export const getErrorMessage = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.response?.data?.errors) {
    const errors = error.response.data.errors;
    const firstError = Object.values(errors)[0];
    if (Array.isArray(firstError)) {
      return firstError[0] as string;
    }
    if (typeof firstError === 'string') {
      return firstError;
    }
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};

