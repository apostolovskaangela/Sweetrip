import { tripsApi } from "@/src/services/api";
import { useEffect, useState } from "react";

type CreateTripForm = {
  trip_number: string;
  destination_from: string;
  destination_to: string;

  vehicle_id: number;
  driver_id: number;

  a_code?: string;
  mileage?: number;

  driver_description?: string; // 👈 shown to driver + notification
  admin_description?: string;  // 👈 admin & manager only

  invoice_number?: string;
  amount?: number;

  trip_date: string;
  status: "not_started" | "started" | "in_process" | "completed";
};

export function useTripCreateLogic(navigation: any) {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);

  const [form, setForm] = useState<CreateTripForm>({
    trip_number: "",
    destination_from: "",
    destination_to: "",
    vehicle_id: 0,
    driver_id: 0,

    a_code: "",
    mileage: undefined,
    driver_description: "",
    admin_description: "",
    invoice_number: "",
    amount: undefined,

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
    if (!form.vehicle_id || !form.driver_id) {
      console.warn("Driver and vehicle are required");
      return;
    }

    try {
      await tripsApi.create({
        ...form,
        vehicle_id: Number(form.vehicle_id),
        driver_id: Number(form.driver_id),
        mileage: form.mileage ? Number(form.mileage) : undefined,
        amount: form.amount ? Number(form.amount) : undefined,
      });

      navigation.goBack();
    } catch (error: any) {
      console.error("Create trip error:", error.response?.data);
    }
  };

  return {
    form,
    set,
    submit,
    drivers,
    vehicles,
  };
}
