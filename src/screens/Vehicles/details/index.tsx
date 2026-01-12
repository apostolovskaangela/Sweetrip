// import { View, Text, Button } from "react-native"
// import { useRoute, useNavigation } from "@react-navigation/native"
// import { useVehicleDetails } from "./logic"

// export default function VehicleDetails() {
//   const { id } = useRoute<any>().params
//   const { vehicle } = useVehicleDetails(id)
//   const nav = useNavigation<any>()

//   if (!vehicle) return <Text>Loading...a</Text>

//   return (
//     <View style={{ padding: 16 }}>
//       <Text style={{ fontSize: 22 }}>{vehicle.registration_number}</Text>
//       <Text>{vehicle.is_active ? "Active" : "Inactive"}</Text>
//       <Text>{vehicle.notes}</Text>

//       <Button title="Edit" onPress={() => nav.navigate("VehicleEdit", { id })} />
//     </View>
//   )
// }

import { View, Text, Button } from "react-native";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import { useVehicleDetails } from "./logic";
import { useCallback } from "react";

export default function VehicleDetails() {
  const { id } = useRoute<any>().params;
  const nav = useNavigation<any>();
  const { vehicle, loadVehicle } = useVehicleDetails(id); // we'll export loadVehicle

  // Reload vehicle whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadVehicle();
    }, [id])
  );

  if (!vehicle) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22 }}>{vehicle.registration_number}</Text>
      <Text>{vehicle.is_active ? "Active" : "Inactive"}</Text>
      <Text>{vehicle.notes}</Text>

      <Button title="Edit" onPress={() => nav.navigate("VehicleEdit", { id })} />
    </View>
  );
}
