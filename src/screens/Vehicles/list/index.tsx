import React from "react";
import { FlatList, TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useVehicles } from "./logic";
import { styles } from "./styles";

export default function VehicleList() {
  const { vehicles, loading } = useVehicles();
  const nav = useNavigation<any>();

  // Assuming canCreate is a constant for now
  const canCreate = true;

  if (loading) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Vehicles</Text>
          <Text style={styles.subtitle}>See all your vehicles</Text>
        </View>

        {canCreate && (
          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => nav.navigate("VehicleCreate")}
          >
            <Text style={styles.createText}>＋ New Vehicle</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* List */}
      <FlatList
        data={vehicles}
        keyExtractor={(v) => v.id.toString()}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => nav.navigate("VehicleDetails", { id: item.id })}
          >
            <Text style={styles.title}>{item.registration_number}</Text>
            <Text style={item.is_active ? styles.active : styles.inactive}>
              {item.is_active ? "Active" : "Inactive"}
            </Text>
            {!!item.notes && <Text>{item.notes}</Text>}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
