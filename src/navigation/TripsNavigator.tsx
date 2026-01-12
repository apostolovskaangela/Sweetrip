import TripCreateScreen from '@/src/screens/Trips/create';
import TripDetailsScreen from '@/src/screens/Trips/details';
import TripEditScreen from '@/src/screens/Trips/edit';
import TripsListScreen from '@/src/screens/Trips/list';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export type TripsStackParamList = {
  TripsList: undefined;
  TripDetails: { id: number };
  TripCreate: undefined;
  TripEdit: { id: number };
};

const Stack = createNativeStackNavigator<TripsStackParamList>();

export const TripsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: false,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#11181C',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={{ 
              marginLeft: 16,
              padding: 8,
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialCommunityIcons name="menu" size={28} color="#11181C" />
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen 
        name="TripsList" 
        component={TripsListScreen}
        options={{
          title: 'Trips',
        }}
      />
      <Stack.Screen 
        name="TripDetails" 
        component={TripDetailsScreen}
        options={{
          title: 'Trip Details',
        }}
      />
      <Stack.Screen 
        name="TripCreate" 
        component={TripCreateScreen}
        options={{
          title: 'Create Trip',
        }}
      />
      <Stack.Screen 
        name="TripEdit" 
        component={TripEditScreen}
        options={{
          title: 'Edit Trip',
        }}
      />
    </Stack.Navigator>
  );
};

