import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
statCard: {
    width: "48%",
    marginBottom: 12,
    padding: 8,
  },
  statCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8, // space between icon and title
  },
  statCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statCardValue: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statCardTrend: {
    fontSize: 14,
  },
});