import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTripEditLogic } from "./logic";
import { styles } from "./styles";

export default function TripEditScreen({ route, navigation }: any) {
  const { form, set, submit } = useTripEditLogic(route.params.id, navigation);

  if (!form) return null;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Trip</Text>

      <TextInput
        style={styles.input}
        placeholder="Trip Number"
        value={form.trip_number}
        onChangeText={(v) => set("trip_number", v)}
      />

      <TextInput
        style={styles.input}
        placeholder="A Code"
        value={form.a_code ?? ""}
        onChangeText={(v) => set("a_code", v)}
      />

      <TextInput
        style={styles.input}
        placeholder="From"
        value={form.destination_from}
        onChangeText={(v) => set("destination_from", v)}
      />

      <TextInput
        style={styles.input}
        placeholder="To"
        value={form.destination_to}
        onChangeText={(v) => set("destination_to", v)}
      />

      <TextInput
        style={styles.input}
        placeholder="Mileage"
        keyboardType="numeric"
        value={form.mileage?.toString() ?? ""}
        onChangeText={(v) => set("mileage", Number(v))}
      />

      <TextInput
        style={styles.textarea}
        placeholder="Driver description (visible to driver)"
        value={form.driver_description ?? ""}
        onChangeText={(v) => set("driver_description", v)}
      />

      <TextInput
        style={styles.textarea}
        placeholder="Admin description"
        value={form.admin_description ?? ""}
        onChangeText={(v) => set("admin_description", v)}
      />

      <TextInput
        style={styles.input}
        placeholder="Invoice Number"
        value={form.invoice_number ?? ""}
        onChangeText={(v) => set("invoice_number", v)}
      />

      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={form.amount?.toString() ?? ""}
        onChangeText={(v) => set("amount", Number(v))}
      />

      <TouchableOpacity style={styles.submitBtn} onPress={submit}>
        <Text style={styles.submitText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
