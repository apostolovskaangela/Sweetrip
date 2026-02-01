import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Offline, { OfflineRequest } from '@/src/services/offline';

export function useOfflineQueue() {
  const [items, setItems] = useState<OfflineRequest[]>([]);

  const load = useCallback(async () => {
    const raw = await AsyncStorage.getItem('OFFLINE_QUEUE_V1');
    if (!raw) { setItems([]); return; }
    try {
      setItems(JSON.parse(raw));
    } catch { setItems([]); }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, 3000);
    return () => clearInterval(id);
  }, [load]);

  const handleRetry = useCallback(async (id: string) => {
    await Offline.processQueue();
    await load();
  }, [load]);

  const handleRemove = useCallback(async (id: string) => {
    const raw = await AsyncStorage.getItem('OFFLINE_QUEUE_V1');
    if (!raw) return;
    try {
      const q: OfflineRequest[] = JSON.parse(raw);
      const filtered = q.filter(i => i.id !== id);
      await AsyncStorage.setItem('OFFLINE_QUEUE_V1', JSON.stringify(filtered));
      setItems(filtered);
    } catch (e) {
      if (__DEV__) console.warn(e);
    }
  }, []);

  const clearAll = useCallback(() => {
    Alert.alert('Clear queue', 'Remove all pending offline requests?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Clear', 
        style: 'destructive', 
        onPress: async () => { 
          await Offline.clearQueue(); 
          load(); 
        } 
      },
    ]);
  }, [load]);

  const keyExtractor = useCallback((i: OfflineRequest) => i.id, []);

  return {
    items,
    load,
    handleRetry,
    handleRemove,
    clearAll,
    keyExtractor,
  };
}
