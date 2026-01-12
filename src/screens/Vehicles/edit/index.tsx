import { View, Text, TextInput, Button, Switch, ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEditVehicle } from "./logic";

export default function EditVehicle() {
  const { id } = useRoute<any>().params;
  const nav = useNavigation<any>();
  const { form, setForm, update, loading } = useEditVehicle(id, nav);

  if (loading || !form) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={{ padding: 16 }}>
      <Text>Registration Number</Text>
      <TextInput
        value={form.registration_number}
        onChangeText={v => setForm({ ...form, registration_number: v })}
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />

      <Text>Notes</Text>
      <TextInput
        value={form.notes}
        onChangeText={v => setForm({ ...form, notes: v })}
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
        <Text>Active: </Text>
        <Switch
          value={form.is_active}
          onValueChange={v => setForm({ ...form, is_active: v })}
        />
      </View>

      <Button title="Update" onPress={update} />
    </View>
  );
}
