import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useTripsListLogic } from "./logic";
import { styles } from "./styles";

export default function TripsListScreen({ navigation }: any) {
  const { trips, canCreate } = useTripsListLogic();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Trips</Text>
          <Text style={styles.subtitle}>Manage and track all your trips</Text>
        </View>

        {canCreate && (
          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => navigation.navigate("TripCreate")}
          >
            <Text style={styles.createText}>＋ New Trip</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={trips}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("TripDetails", { id: item.id })}
          >
            <Text style={styles.route}>
              {item.destination_from} → {item.destination_to}
            </Text>

            <Text style={styles.status}>{item.status}</Text>

            <Text>Vehicle: {item.vehicle?.registration_number ?? "N/A"}</Text>
            <Text>Trip #: {item.trip_number}</Text>
            <Text>Date: {item.trip_date}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
