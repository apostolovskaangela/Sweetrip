import { useState } from "react";
import { vehiclesApi } from "@/src/services/api";

export function useCreateVehicle() {
  const [registration_number, setRegistrationNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [is_active, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      await vehiclesApi.create({
        registration_number,
        notes,
        is_active,
      });
      setLoading(false);
    } catch (err) {
      console.log("Create Vehicle API error", err);
      setLoading(false);
    }
  };

  return {
    registration_number,
    setRegistrationNumber,
    notes,
    setNotes,
    is_active,
    setIsActive,
    submit,
    loading,
  };
}
