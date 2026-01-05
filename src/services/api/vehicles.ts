import axiosClient from '../axiosClient';

export interface Vehicle {
  id: number;
  registration_number: string;
  make?: string;
  model?: string;
  year?: number;
  notes?: string;
  is_active: boolean;
  manager_id?: number;
  manager?: {
    id: number;
    name: string;
    email: string;
  };
  trips?: any[];
}

export interface CreateVehicleRequest {
  registration_number: string;
  make?: string;
  model?: string;
  year?: number;
  notes?: string;
  is_active?: boolean;
  manager_id?: number;
}

export interface UpdateVehicleRequest extends Partial<CreateVehicleRequest> {}

export interface VehiclesListResponse {
  vehicles: Vehicle[];
}

export interface VehicleResponse {
  vehicle: Vehicle;
}

export const vehiclesApi = {
  list: async (): Promise<Vehicle[]> => {
    const response = await axiosClient.get<VehiclesListResponse>('/vehicles');
    return response.data.vehicles;
  },

  get: async (id: number): Promise<Vehicle> => {
    const response = await axiosClient.get<VehicleResponse>(`/vehicles/${id}`);
    return response.data.vehicle;
  },

  create: async (data: CreateVehicleRequest): Promise<VehicleResponse> => {
    const response = await axiosClient.post<VehicleResponse>('/vehicles', data);
    return response.data;
  },

  update: async (id: number, data: UpdateVehicleRequest): Promise<VehicleResponse> => {
    const response = await axiosClient.put<VehicleResponse>(`/vehicles/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/vehicles/${id}`);
  },
};


