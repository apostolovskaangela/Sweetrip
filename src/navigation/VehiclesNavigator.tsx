import VehicleCreateScreen from '@/src/screens/Vehicles/create';
import VehicleDetailsScreen from '@/src/screens/Vehicles/details';
import VehicleEditScreen from '@/src/screens/Vehicles/edit';
import VehiclesListScreen from '@/src/screens/Vehicles/list';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';

// Define the params for navigation
export type VehiclesStackParamList = {
  VehiclesList: undefined;
  VehicleDetails: { id: number };
  VehicleCreate: undefined;
  VehicleEdit: { id: number };
};

const Stack = createNativeStackNavigator<VehiclesStackParamList>();

export const VehiclesNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: false,
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#11181C',
        headerTitleStyle: { fontWeight: 'bold' },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={{ marginLeft: 16, padding: 8 }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialCommunityIcons name="menu" size={28} color="#11181C" />
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen
        name="VehiclesList"
        component={VehiclesListScreen}
        options={{ title: 'Vehicles' }}
      />
      <Stack.Screen
        name="VehicleDetails"
        component={VehicleDetailsScreen}
        options={{ title: 'Vehicle Details' }}
      />
      <Stack.Screen
        name="VehicleCreate"
        component={VehicleCreateScreen}
        options={{ title: 'Create Vehicle' }}
      />
      <Stack.Screen
        name="VehicleEdit"
        component={VehicleEditScreen}
        options={{ title: 'Edit Vehicle' }}
      />
    </Stack.Navigator>
  );
};
