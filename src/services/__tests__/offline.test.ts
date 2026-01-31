import axiosClient from '@/src/services/axiosClient';
import Offline, { OfflineRequest } from '@/src/services/offline';

jest.mock('@react-native-async-storage/async-storage', () => ({
  storage: {} as Record<string, string>,
  getItem: jest.fn((key: string) => Promise.resolve((global as any).mockStorage?.[key] ?? null)),
  setItem: jest.fn((key: string, value: string) => {
    (global as any).mockStorage = (global as any).mockStorage || {};
    (global as any).mockStorage[key] = value;
    return Promise.resolve();
  }),
  removeItem: jest.fn((key: string) => {
    (global as any).mockStorage = (global as any).mockStorage || {};
    delete (global as any).mockStorage[key];
    return Promise.resolve();
  }),
}));

jest.mock('@/src/services/axiosClient');
const mockedAxios: any = axiosClient as any;

beforeEach(() => {
  (global as any).mockStorage = {};
  mockedAxios.request = jest.fn();
});

test('enqueueRequest saves to AsyncStorage', async () => {
  const id = await Offline.enqueueRequest({ method: 'POST', url: '/test', body: { a: 1 } });
  expect(typeof id).toBe('string');
  const raw = (global as any).mockStorage['OFFLINE_QUEUE_V1'];
  expect(raw).toBeDefined();
  const q: OfflineRequest[] = JSON.parse(raw);
  expect(q.length).toBe(1);
  expect(q[0].url).toBe('/test');
});

test('processQueue sends requests and clears queue', async () => {
  // seed storage with one request
  const item: OfflineRequest = { id: 't1', method: 'POST', url: '/sync', body: { b: 2 }, timestamp: Date.now() };
  (global as any).mockStorage['OFFLINE_QUEUE_V1'] = JSON.stringify([item]);
  mockedAxios.request.mockResolvedValue({ status: 200 });

  await Offline.processQueue();

  const raw = (global as any).mockStorage['OFFLINE_QUEUE_V1'];
  const q = raw ? JSON.parse(raw) : [];
  expect(q.length).toBe(0);
  expect(mockedAxios.request).toHaveBeenCalled();
});
