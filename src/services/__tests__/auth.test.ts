import { authApi } from '@/src/services/api/auth';
import axiosClient from '@/src/services/axiosClient';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn((k) => Promise.resolve((global as any).mockStorage?.[k] ?? null)),
  setItem: jest.fn((k, v) => { (global as any).mockStorage = (global as any).mockStorage || {}; (global as any).mockStorage[k] = v; return Promise.resolve(); }),
  removeItem: jest.fn((k) => { (global as any).mockStorage = (global as any).mockStorage || {}; delete (global as any).mockStorage[k]; return Promise.resolve(); }),
}));

jest.mock('@/src/services/axiosClient');
const mockedAxios: any = axiosClient as any;

beforeEach(() => {
  (global as any).mockStorage = {};
  mockedAxios.post = jest.fn();
  mockedAxios.get = jest.fn();
});

test('login stores token and user when online', async () => {
  const payload = { token: 't1', user: { id: 1, name: 'A', email: 'a@example.com', roles: ['admin'] } };
  mockedAxios.post.mockResolvedValue({ data: payload });

  const res = await authApi.login({ email: 'a@example.com', password: 'pw' });
  expect(res.token).toBe(payload.token);
  expect((global as any).mockStorage['AUTH_TOKEN']).toBe(payload.token);
  expect((global as any).mockStorage['USER_DATA']).toBe(JSON.stringify(payload.user));
});

test('login falls back to stored user on network error', async () => {
  // seed stored user
  (global as any).mockStorage['USER_DATA'] = JSON.stringify({ id: 2, name: 'B', email: 'b@example.com', roles: [] });
  (global as any).mockStorage['AUTH_TOKEN'] = 'stored-token';

  mockedAxios.post.mockRejectedValue({ code: 'ERR_NETWORK', message: 'Network Error' });

  const res = await authApi.login({ email: 'b@example.com', password: 'pw' });
  expect(res.token).toBe('stored-token');
  expect(res.user.email).toBe('b@example.com');
});

test('getUser returns stored user when request fails', async () => {
  (global as any).mockStorage['USER_DATA'] = JSON.stringify({ id: 3, name: 'C', email: 'c@example.com', roles: [] });
  mockedAxios.get.mockRejectedValue(new Error('Network'));

  const u = await authApi.getUser();
  expect(u.email).toBe('c@example.com');
});
