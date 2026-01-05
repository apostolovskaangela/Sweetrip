import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const LiveTracking = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Tracking</Text>
      <Text style={styles.subtitle}>Live tracking screen coming soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
  },
});

