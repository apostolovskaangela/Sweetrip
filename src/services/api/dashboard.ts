import axiosClient from '../axiosClient';

export interface DashboardStats {
  active_trips: number;
  total_vehicles: number;
  distance_today: number;
  efficiency: number;
  total_trips_last_month: number;
  completed_trips_last_month: number;
}

export interface DashboardResponse {
  stats: DashboardStats;
  drivers: any[];
  trips: any[];
  vehicles: any[];
}

export interface DriverDashboardResponse {
  stats: {
    total_trips: number;
    completed_trips: number;
    pending_trips: number;
  };
  trips: any[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export const dashboardApi = {
  getDashboard: async (): Promise<DashboardResponse> => {
    const response = await axiosClient.get<DashboardResponse>('/dashboard');
    return response.data;
  },

  getDriverDashboard: async (): Promise<DriverDashboardResponse> => {
    const response = await axiosClient.get<DriverDashboardResponse>('/driver/dashboard');
    return response.data;
  },
};


