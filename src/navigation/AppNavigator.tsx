
import { useAuth } from '../hooks/useAuth';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';

export function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <MainNavigator /> : <AuthNavigator />;
}
