import { Dashboard } from '@/src/screens/Dashboard';
import { LiveTracking } from '@/src/screens/LiveTracking';
import { Vehicles } from '@/src/screens/Vehicles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { TripsNavigator } from '../TripsNavigator';
import { MainDrawerParamList } from '../types';
import { CustomDrawerContent } from './CustomDrawerContent';

const Drawer = createDrawerNavigator<MainDrawerParamList>();

export const MainNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
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
      })}
    >
      <Drawer.Screen 
        name="Dashboard" 
        component={Dashboard}
        options={{
          title: 'Dashboard',
        }}
      />
      <Drawer.Screen 
        name="Trips" 
        component={TripsNavigator}
        options={{
          title: 'Trips',
          headerShown: false,
        }}
      />
      <Drawer.Screen 
        name="Vehicles" 
        component={Vehicles}
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
