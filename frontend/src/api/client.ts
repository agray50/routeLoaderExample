import axios from 'axios';
import type { User, Resource } from '@api/types';

const backendApi = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

const integrationApi = axios.create({
  baseURL: '/users-api',
  timeout: 10000,
});

export const usersClient = {
  getAll: async (): Promise<User[]> => {
    const response = await integrationApi.get<User[]>('/users');
    return response.data;
  },
};

export const resourceClient = {
  get: async (uuid: string): Promise<Resource> => {
    const response = await backendApi.get<Resource>(`/resource/${uuid}`);
    return response.data;
  },
  getStrict: async (uuid: string): Promise<Resource> => {
    const response = await backendApi.get<Resource>(`/resource/${uuid}/strict`);
    return response.data;
  },
};
