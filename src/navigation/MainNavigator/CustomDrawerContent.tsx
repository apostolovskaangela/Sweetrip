import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { MainDrawerParamList } from '../types';

type DrawerContentProps = DrawerContentComponentProps;

const menuItems = [
  {
    name: 'Dashboard' as keyof MainDrawerParamList,
    label: 'Dashboard',
    icon: 'view-dashboard',
  },
  {
    name: 'Trips' as keyof MainDrawerParamList,
    label: 'Trips',
    icon: 'map-marker-path',
  },
  {
    name: 'Vehicles' as keyof MainDrawerParamList,
    label: 'Vehicles',
    icon: 'truck',
  },
  {
    name: 'LiveTracking' as keyof MainDrawerParamList,
    label: 'Live Tracking',
    icon: 'map-marker-radius',
  },
];

export const CustomDrawerContent = (props: DrawerContentProps) => {
  const currentRoute = props.state.routes[props.state.index].name;

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>Sweetrip</Text>
        <Text style={styles.drawerSubtitle}>Fleet Management</Text>
      </View>
      
      <View style={styles.menuContainer}>
        {menuItems.map((item) => {
          const isActive = currentRoute === item.name;
          return (
            <TouchableOpacity
              key={item.name}
              style={[styles.menuItem, isActive && styles.menuItemActive]}
              onPress={() => {
                props.navigation.navigate(item.name);
                props.navigation.closeDrawer();
              }}
            >
              <MaterialCommunityIcons
                name={item.icon as any}
                size={24}
                color={isActive ? '#0a7ea4' : '#687076'}
                style={styles.menuIcon}
              />
              <Text style={[styles.menuLabel, isActive && styles.menuLabelActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  drawerHeader: {
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 10,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#11181C',
    marginBottom: 4,
  },
  drawerSubtitle: {
    fontSize: 14,
    color: '#687076',
  },
  menuContainer: {
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 2,
  },
  menuItemActive: {
    backgroundColor: '#e3f2fd',
    borderLeftWidth: 4,
    borderLeftColor: '#0a7ea4',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuLabel: {
    fontSize: 16,
    color: '#687076',
  },
  menuLabelActive: {
    color: '#0a7ea4',
    fontWeight: '600',
  },
});

