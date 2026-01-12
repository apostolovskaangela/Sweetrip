// src/screens/Vehicles/list/logic.tsx
import { useState, useEffect } from "react";
import { vehiclesApi } from "@/src/services/api";

export function useVehicles() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const vehiclesData = await vehiclesApi.list();
        setVehicles(vehiclesData);
      } catch (error) {
        console.error("Vehicles API error", error);
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, []);

  
  return { vehicles, loading };
}
