import { vehiclesApi } from '@/src/services/api/vehicles';
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

test('list returns cached vehicles when network fails', async () => {
  const cached = [{ id: 1, registration_number: 'ABC' }];
  (global as any).mockStorage['cache:/vehicles'] = JSON.stringify(cached);
  mockedAxios.get.mockRejectedValue(new Error('Network'));

  const list = await vehiclesApi.list();
  expect(list).toEqual(cached);
});

test('create enqueues when offline and returns temp item', async () => {
  mockedAxios.post.mockRejectedValue({ code: 'ERR_NETWORK' });
  const data = { registration_number: 'XYZ' };

  const res = await vehiclesApi.create(data as any);
  expect(res.registration_number).toBe('XYZ');
  const queueRaw = (global as any).mockStorage['OFFLINE_QUEUE_V1'];
  expect(queueRaw).toBeDefined();
  const q = JSON.parse(queueRaw);
  expect(q.some((i: any) => i.url === '/vehicles')).toBe(true);
});
