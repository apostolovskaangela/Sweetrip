import { Dashboard } from '@/src/screens/Dashboard';
import { LiveTracking } from '@/src/screens/LiveTracking';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { TripsNavigator } from '../TripsNavigator';
import { MainDrawerParamList } from '../types';
import { CustomDrawerContent } from './CustomDrawerContent';
import { VehiclesNavigator } from '../VehiclesNavigator';

const Drawer = createDrawerNavigator<MainDrawerParamList>();

export const MainNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation, route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#11181C',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

        // Hamburger menu
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{
              marginLeft: 16,
              padding: 8,
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialCommunityIcons name="menu" size={28} color="#11181C" />
          </TouchableOpacity>
        ),

        // Clickable header title
        headerTitle: () => {
          const currentRouteName = route.name;

          // Determine if we should redirect to nested list
          const handleTitlePress = () => {
            if (currentRouteName === 'Vehicles') {
              navigation.navigate('Vehicles', { screen: 'VehiclesList' });
            } else if (currentRouteName === 'Trips') {
              navigation.navigate('Trips', { screen: 'TripsList' });
            }
          };

          let titleText = currentRouteName;
          if (currentRouteName === 'Vehicles') titleText = 'Vehicles';
          if (currentRouteName === 'Trips') titleText = 'Trips';
          if (currentRouteName === 'Dashboard') titleText = 'Dashboard';
          if (currentRouteName === 'LiveTracking') titleText = 'Live Tracking';

          return (
            <TouchableOpacity onPress={handleTitlePress}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#11181C' }}>
                {titleText}
              </Text>
            </TouchableOpacity>
          );
        },
      })}
    >
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ title: 'Dashboard' }}
      />
      <Drawer.Screen
        name="Trips"
        component={TripsNavigator}
        options={{
          title: 'Trips',
        }}
      />
      <Drawer.Screen
        name="Vehicles"
        component={VehiclesNavigator}
        options={{
          title: 'Vehicles',
        }}
      />
      <Drawer.Screen
        name="LiveTracking"
        component={LiveTracking}
        options={{
          title: 'Live Tracking',
        }}
      />
    </Drawer.Navigator>
  );
};
