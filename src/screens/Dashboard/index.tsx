import React from "react";
import { ScrollView, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { StatCard } from "@/src/components/StatCard/StatCard";

export const Dashboard = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Monitor your fleet operations in real-time</Text>
      </View>

      <View style={styles.statsContainer}>
        <StatCard
          title="Active Trips"
          value="12"
          icon={<MaterialCommunityIcons name="package-variant-closed" size={24} />}
          trend="+2 from yesterday"
          trendUp
        />
        <StatCard
          title="Total Vehicles"
          value="48"
          icon={<MaterialCommunityIcons name="truck" size={24} />}
          trend="3 in maintenance"
        />
        <StatCard
          title="Distance Today"
          value="2,847 km"
          icon={<MaterialCommunityIcons name="map-marker-distance" size={24} />}
          trend="+15% from last week"
          trendUp
        />
        <StatCard
          title="Efficiency"
          value="94.2%"
          icon={<MaterialCommunityIcons name="trending-up" size={24} />}
          trend="+2.1% from last month"
          trendUp
        />
      </View>

      <View style={styles.bottomContainer}>
        {/* <RecentTrips />
        <VehicleStatus /> */}
        <Text>Recent trips and vehicle status will be added here</Text>
      </View>
    </ScrollView>
  );
};
