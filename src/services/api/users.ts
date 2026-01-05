import axiosClient from '../axiosClient';

export interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
  manager_id?: number;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: string;
  manager_id?: number;
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {
  password?: string; // Optional - if not provided, existing password is kept
}

export interface UsersListResponse {
  users: User[];
}

export const usersApi = {
  list: async (): Promise<User[]> => {
    const response = await axiosClient.get<UsersListResponse>('/users');
    return response.data.users;
  },

  create: async (data: CreateUserRequest): Promise<User> => {
    const response = await axiosClient.post<User>('/users', data);
    return response.data;
  },

  update: async (id: number, data: UpdateUserRequest): Promise<User> => {
    const response = await axiosClient.put<User>(`/users/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosClient.delete(`/users/${id}`);
  },
};


