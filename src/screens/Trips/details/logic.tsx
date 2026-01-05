import { authApi, tripsApi } from "@/src/services/api";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export function useTripDetailsLogic(id: number) {
  const [trip, setTrip] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  const load = useCallback(async () => {
    try {
      const [tripData, userData] = await Promise.all([
        tripsApi.get(id),
        authApi.getUser(),
      ]);

      setTrip(tripData);
      setUser(userData);
    } catch (error) {
      console.error("Error loading trip details:", error);
    }
  }, [id]);

  // 🔥 reload EVERY time screen becomes active
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const updateStatus = async (
    status: "not_started" | "in_process" | "started" | "completed"
  ) => {
    await tripsApi.updateStatus(id, { status });
    load(); // instant update
  };

  return {
    trip,
    canEdit:
      user?.roles?.some((r: string) => ["admin", "manager"].includes(r)) ??
      false,
    canDriverUpdate:
      user?.roles?.includes("driver") && user?.id === trip?.driver?.id,
    updateStatus,
  };
}
