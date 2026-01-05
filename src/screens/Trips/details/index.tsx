import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useTripDetailsLogic } from "./logic";
import { styles } from "./styles";

export default function TripDetailsScreen({ route, navigation }: any) {
  const { trip, canEdit, canDriverUpdate, updateStatus } = useTripDetailsLogic(
    route.params.id
  );

  if (!trip) return null;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Trip: {trip.trip_number}</Text>

      {canEdit && (
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate("TripEdit", { id: trip.id })}
        >
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.sectionTitle}>
        {trip.destination_from} → {trip.destination_to}
      </Text>
      <Text>Status: {trip.status.replace("_", " ")}</Text>
      <Text>Vehicle: {trip.vehicle?.registration_number ?? "-"}</Text>
      <Text>Driver: {trip.driver?.name ?? "-"}</Text>
      <Text>Date: {trip.trip_date}</Text>
      <Text>Mileage: {trip.mileage ? `${trip.mileage} km` : "-"}</Text>

      {trip.stops?.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Stops</Text>
          {trip.stops.map((s: any) => (
            <Text key={s.id}>
              {s.stop_order}. {s.destination}
            </Text>
          ))}
        </>
      )}

      {canDriverUpdate && (
        <>
          <TouchableOpacity
            style={styles.updateBtn}
            onPress={() => updateStatus("completed")}
          >
            <Text style={styles.btnText}>Update Status</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}
