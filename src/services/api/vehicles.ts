import axiosClient from "../axiosClient";

export interface Vehicle {
  id: number;
  registration_number: string;
  notes?: string;
  is_active: boolean;
  manager_id?: number;
}

// src/services/api.ts
export const vehiclesApi = {
  list: async (): Promise<any[]> => {
    try {
      const response = await axiosClient.get("/vehicles");

      console.log("Vehicles API response:", response.data); // DEBUG

      // Backend returns { vehicles: [...] }, so return that array directly
      return response.data.vehicles;
    } catch (error) {
      console.error("Vehicles API error", error);
      throw error; // rethrow for the hook to catch
    }
  },

  get: async (id: number) => {
    const response = await axiosClient.get(`/vehicles/${id}`);
    return response.data.vehicle; // make sure this matches backend
  },

  create: async (data: any) => {
    const response = await axiosClient.post("/vehicles", data);
    return response.data.vehicle;
  },

  update: async (id: number, data: any) => {
    const response = await axiosClient.put(`/vehicles/${id}`, data);
    return response.data.vehicle;
  },

  delete: async (id: number) => {
    await axiosClient.delete(`/vehicles/${id}`);
  },
};
