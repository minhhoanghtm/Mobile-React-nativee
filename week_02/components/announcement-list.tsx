import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View, type ListRenderItem } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type Announcement = {
  id: string;
  title: string;
  message: string;
  time: string;
};

const INITIAL_DATA: Announcement[] = [
  { id: '1', title: 'Thông báo 1', message: 'Cập nhật lịch học tuần tới cho lớp React Native.', time: '08:30' },
  { id: '2', title: 'Thông báo 2', message: 'Nộp bài tập Exercise 5 & 6 trước 23h59 hôm nay.', time: '10:15' },
  { id: '3', title: 'Thông báo 3', message: 'Phòng học 302 thay đổi sang giảng đường B2.', time: '14:00' },
];

export function AnnouncementList() {
  const [data, setData] = useState<Announcement[]>(INITIAL_DATA);

  // Typed renderItem function
  const renderItem: ListRenderItem<Announcement> = ({ item }) => (
    <View style={styles.itemRow}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemTime}>{item.time}</Text>
      </View>
      <Text style={styles.itemMessage}>{item.message}</Text>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Exercise 5 — FlatList migration</ThemedText>

      {/* Nút bấm giả lập dữ liệu rỗng để kiểm thử ListEmptyComponent */}
      <Pressable
        onPress={() => setData(data.length > 0 ? [] : INITIAL_DATA)}
        style={styles.toggleBtn}
        accessibilityRole="button">
        <Text style={styles.toggleBtnText}>
          {data.length > 0 ? 'Xóa danh sách (Thử Empty State)' : 'Nạp dữ liệu (Thử FlatList)'}
        </Text>
      </Pressable>

      <ThemedView style={styles.card}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false} // Để cuộn theo trang chính
          /* ListHeaderComponent */
          ListHeaderComponent={
            <Text style={styles.headerTitle} accessibilityRole="header">
              📢 Bảng tin thông báo (ListHeader)
            </Text>
          }
          /* ListFooterComponent */
          ListFooterComponent={
            <Text style={styles.footerTitle}>--- Hết danh sách thông báo (ListFooter) ---</Text>
          }
          /* ItemSeparatorComponent */
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          /* ListEmptyComponent */
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Chưa có thông báo nào mới (ListEmptyComponent).</Text>
            </View>
          }
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginTop: 14,
  },
  toggleBtn: {
    backgroundColor: '#0a7ea4',
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  toggleBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 14,
  },
  headerTitle: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  footerTitle: {
    color: '#6b7280',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
  itemRow: {
    paddingVertical: 8,
    gap: 4,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
  },
  itemTime: {
    color: '#6b7280',
    fontSize: 12,
  },
  itemMessage: {
    color: '#374151',
    fontSize: 13,
    lineHeight: 18,
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 4,
  },
  emptyContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#9ca3af',
    fontSize: 13,
  },
});
