import { View, Text, TextInput, Switch, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCreateVehicle } from "./logic";
import { styles } from "./styles";

export default function CreateVehicle() {
  const nav = useNavigation();
  const {
    registration_number,
    setRegistrationNumber,
    notes,
    setNotes,
    is_active,
    setIsActive,
    submit,
    loading,
  } = useCreateVehicle();

  const handleSubmit = async () => {
    await submit();
    nav.navigate("VehiclesList"); // Go back to the list after creation
  };

  return (
    <View style={styles.container}>
      <Text>Registration Number</Text>
      <TextInput
        style={styles.input}
        value={registration_number}
        onChangeText={setRegistrationNumber}
      />

      <Text>Notes</Text>
      <TextInput
        style={styles.input}
        value={notes}
        onChangeText={setNotes}
      />

      <View style={styles.row}>
        <Text>Active</Text>
        <Switch value={is_active} onValueChange={setIsActive} />
      </View>

      <Button
        title={loading ? "Creating..." : "Create Vehicle"}
        onPress={handleSubmit}
        disabled={loading}
      />
    </View>
  );
}
