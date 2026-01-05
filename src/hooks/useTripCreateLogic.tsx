import { tripsApi } from "@/src/services/api";
import { useEffect, useState } from "react";

type CreateTripForm = {
  trip_number: string;
  destination_from: string;
  destination_to: string;
  vehicle_id: number | null;
  driver_id: number | null;
  trip_date: string;
  status: "not_started" | "started" | "in_process" | "completed";
};

export function useTripCreateLogic(navigation: any) {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<CreateTripForm>({
    trip_number: "",
    destination_from: "",
    destination_to: "",
    vehicle_id: null,
    driver_id: null,
    trip_date: new Date().toISOString().split("T")[0],
    status: "not_started",
  });

  useEffect(() => {
    loadCreateData();
  }, []);

  const loadCreateData = async () => {
    try {
      const data = await tripsApi.getCreateData();
      setDrivers(data.drivers);
      setVehicles(data.vehicles);
    } catch (error) {
      console.error("Error loading create trip data:", error);
    }
  };

  const set = <K extends keyof CreateTripForm>(
    key: K,
    value: CreateTripForm[K]
  ) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const submit = async () => {
    // 🔒 frontend validation (prevents 422)
    if (!form.trip_number || !form.destination_from || !form.destination_to) {
      console.warn("Missing required fields");
      return;
    }

    if (!form.vehicle_id || !form.driver_id) {
      console.warn("Vehicle and Driver must be selected");
      return;
    }

    try {
      setLoading(true);

      await tripsApi.create({
        ...form,
        vehicle_id: Number(form.vehicle_id),
        driver_id: Number(form.driver_id),
      });

      navigation.goBack();
    } catch (error: any) {
      console.error("Create trip error:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    set,
    submit,
    drivers,
    vehicles,
    loading,
  };
}
