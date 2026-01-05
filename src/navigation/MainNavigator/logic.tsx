import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMemo } from 'react';

export const useMainNavigatorLogic = () => {
  const insets = useSafeAreaInsets();

  const tabBarStyle = useMemo(
    () => ({
      height: 70 + insets.bottom,
      paddingBottom: insets.bottom,
      backgroundColor: '#fff',
    }),
    [insets.bottom]
  );

  return { tabBarStyle };
};
