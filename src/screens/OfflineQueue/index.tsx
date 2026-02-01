import { listVirtualizationConfig } from '@/src/lib/listConfig';
import { OfflineRequest } from '@/src/services/offline';
import React, { useCallback } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import PendingItemCard from '../../components/PendingItemCard';
import { useOfflineQueue } from './logic';
import { styles } from './styles';

export default function OfflineQueueScreen() {
  const { items, handleRetry, handleRemove, clearAll, keyExtractor } =
    useOfflineQueue();

  const renderItem = useCallback(
    ({ item }: { item: OfflineRequest }) => (
      <PendingItemCard
        id={item.id}
        method={item.method}
        url={item.url}
        body={item.body}
        onRetry={handleRetry}
        onRemove={handleRemove}
      />
    ),
    [handleRetry, handleRemove]
  );

  return (
    <View style={styles.containerQueue}>
      <View style={styles.header}>
        <Text style={styles.title}>Offline Queue</Text>
        <TouchableOpacity onPress={clearAll} style={styles.clearBtn}>
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      {items.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No pending requests</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          {...listVirtualizationConfig}
        />
      )}
    </View>
  );
}
