import { usersApi } from '@/src/services/api/users';
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
  mockedAxios.get = jest.fn();
  mockedAxios.post = jest.fn();
});

test('list returns cached users when network fails', async () => {
  const cached = [{ id: 1, name: 'U' }];
  (global as any).mockStorage['cache:/users'] = JSON.stringify(cached);
  mockedAxios.get.mockRejectedValue(new Error('Network'));

  const list = await usersApi.list();
  expect(list).toEqual(cached);
});

test('create enqueues when offline and returns temp user', async () => {
  mockedAxios.post.mockRejectedValue({ code: 'ERR_NETWORK' });
  const data = { name: 'New', email: 'n@example.com', password: 'p', role: 'user' };

  const res = await usersApi.create(data as any);
  expect(res.name).toBe('New');
  const queueRaw = (global as any).mockStorage['OFFLINE_QUEUE_V1'];
  expect(queueRaw).toBeDefined();
});
