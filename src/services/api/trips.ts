import axiosClient from '../axiosClient';

export interface Trip {
  id: number;
  trip_number: string;
  status: string;
  status_label: string;
  trip_date: string;
  destination_from: string;
  destination_to: string;
  mileage: number;
  a_code?: string;
  driver_description?: string;
  admin_description?: string;
  invoice_number?: string;
  amount?: number;
  cmr?: string | null;
  cmr_url?: string | null;
  driver?: {
    id: number;
    name: string;
    email: string;
  };
  vehicle?: {
    id: number;
    registration_number: string;
  };
  stops?: {
    id: number;
    destination: string;
    stop_order: number;
    notes?: string;
  }[];
}

export interface CreateTripRequest {
  trip_number: string;
  vehicle_id: number;
  driver_id: number;
  a_code?: string;
  destination_from: string;
  destination_to: string;
  status?: string;
  mileage?: number;
  driver_description?: string;
  admin_description?: string;
  trip_date: string;
  invoice_number?: string;
  amount?: number;
  stops?: {
    destination: string;
    stop_order: number;
    notes?: string;
  }[];
}

export interface UpdateTripRequest extends Partial<CreateTripRequest> {}

export interface TripsListResponse {
  trips: Trip[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface TripResponse {
  trip: Trip;
}

export interface CreateTripResponse {
  message: string;
  trip: Trip;
}

export interface TripCreateDataResponse {
  drivers: {
    id: number;
    name: string;
    email: string;
  }[];
  vehicles: {
    id: number;
    registration_number: string;
    make?: string;
    model?: string;
    is_active: boolean;
  }[];
}

export interface UpdateStatusRequest {
  status: 'not_started' | 'in_process' | 'started' | 'completed';
}

export interface UpdateStatusResponse {
  message: string;
  trip: {
    id: number;
    status: string;
    status_label: string;
  };
}

export const tripsApi = {
  list: async (page?: number): Promise<TripsListResponse> => {
    const params = page ? { page } : {};
    const response = await axiosClient.get<TripsListResponse>('/trips', { params });
    return response.data;
  },

  get: async (id: number): Promise<Trip> => {
    const response = await axiosClient.get<TripResponse>(`/trips/${id}`);
    return response.data.trip;
  },

  create: async (data: CreateTripRequest): Promise<CreateTripResponse> => {
    const response = await axiosClient.post<CreateTripResponse>('/trips', data);
    return response.data;
  },

  update: async (id: number, data: UpdateTripRequest): Promise<CreateTripResponse> => {
    const response = await axiosClient.put<CreateTripResponse>(`/trips/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/trips/${id}`);
  },

  getCreateData: async (): Promise<TripCreateDataResponse> => {
    const response = await axiosClient.get<TripCreateDataResponse>('/trips/create');
    return response.data;
  },

  updateStatus: async (id: number, status: UpdateStatusRequest): Promise<UpdateStatusResponse> => {
    const response = await axiosClient.post<UpdateStatusResponse>(
      `/driver/trips/${id}/status`,
      status
    );
    return response.data;
  },

  uploadCMR: async (id: number, file: any): Promise<TripResponse> => {
    const formData = new FormData();
    formData.append('cmr', file);
    
    const response = await axiosClient.post<TripResponse>(
      `/driver/trips/${id}/cmr`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  uploadCMRByTrip: async (id: number, file: any): Promise<TripResponse> => {
    const formData = new FormData();
    formData.append('cmr', file);
    
    const response = await axiosClient.post<TripResponse>(
      `/trips/${id}/cmr`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },
};


