import { useEffect, useState } from "react";
import { vehiclesApi } from "@/src/services/api";

export function useEditVehicle(id: number, navigation: any) {
  const [form, setForm] = useState<any>(null); // start as null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const vehicle = await vehiclesApi.get(id); // GET /vehicles/:id
        setForm(vehicle); // pre-fill the form with vehicle data
      } catch (err) {
        console.log("Vehicle API error", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const update = async () => {
    if (!form) return;
    try {
      await vehiclesApi.update(id, form);
      navigation.goBack(); // go back to details
    } catch (err) {
      console.log("Update vehicle error", err);
    }
  };

  return { form, setForm, update, loading };
}
