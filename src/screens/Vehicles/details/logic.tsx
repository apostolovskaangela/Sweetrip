import { useEffect, useState, useCallback } from "react";
import { vehiclesApi } from "@/src/services/api";

export function useVehicleDetails(id: number) {
  const [vehicle, setVehicle] = useState<any>(null);

  const loadVehicle = useCallback(async () => {
    try {
      const data = await vehiclesApi.get(id); // GET /vehicles/:id
      setVehicle(data); // axios already returns vehicle
    } catch (err) {
      console.log("Vehicle details API error", err);
    }
  }, [id]);

  useEffect(() => {
    loadVehicle();
  }, [loadVehicle]);

  return { vehicle, loadVehicle };
}
