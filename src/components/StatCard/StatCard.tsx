import React from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-paper";
import { styles } from "./styles";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendUp }) => {
  return (
    <Card style={styles.statCard}>
      <Card.Content>
        <View style={styles.statCardHeader}>
          {icon}
          <Text style={styles.statCardTitle}>{title}</Text>
        </View>
        <Text style={styles.statCardValue}>{value}</Text>
        {trend && (
          <Text style={[styles.statCardTrend, { color: trendUp ? "green" : "red" }]}>
            {trend}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
};
