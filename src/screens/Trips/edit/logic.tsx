import { tripsApi } from "@/src/services/api";
import { useEffect, useState } from "react";

type EditTripForm = {
  trip_number: string;
  destination_from: string;
  destination_to: string;
  vehicle_id: number | null;
  driver_id: number | null;
  trip_date: string;
  status: string;
  mileage?: number;
  a_code?: string;
  driver_description?: string;
  admin_description?: string;
  invoice_number?: string;
  amount?: number;
};

export function useTripEditLogic(id: number, navigation: any) {
  const [form, setForm] = useState<EditTripForm | null>(null);

  useEffect(() => {
    const loadTrip = async () => {
      const trip = await tripsApi.get(id);

      setForm({
        trip_number: trip.trip_number,
        destination_from: trip.destination_from,
        destination_to: trip.destination_to,
        vehicle_id: trip.vehicle?.id ?? null,
        driver_id: trip.driver?.id ?? null,
        trip_date: trip.trip_date,
        status: trip.status,
        mileage: trip.mileage,
        a_code: trip.a_code,
        driver_description: trip.driver_description,
        admin_description: trip.admin_description,
        invoice_number: trip.invoice_number,
        amount: trip.amount,
      });
    };

    loadTrip();
  }, [id]);

  const set = (k: keyof EditTripForm, v: any) =>
    setForm((f) => (f ? { ...f, [k]: v } : f));

  const submit = async () => {
    if (!form) return;

    await tripsApi.update(id, {
      ...form,
      vehicle_id: Number(form.vehicle_id),
      driver_id: Number(form.driver_id),
    });

    navigation.goBack();
  };

  return { form, set, submit };
}
