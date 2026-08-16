import { SectionList, StyleSheet, Text, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type AnnouncementItem = {
  id: string;
  title: string;
  time: string;
};

type SectionData = {
  title: string;
  data: AnnouncementItem[];
};

// Phân nhóm 3 mục: Hôm nay (Today), Tuần này (This Week), Trước đó (Earlier)
const ANNOUNCEMENT_SECTIONS: SectionData[] = [
  {
    title: 'Hôm nay (Today)',
    data: [
      { id: '1', title: 'Thông báo họp lớp trực tuyến', time: '09:30' },
      { id: '2', title: 'Nộp bài tập Exercise 5 & 6', time: '15:00' },
    ],
  },
  {
    title: 'Tuần này (This Week)',
    data: [
      { id: '3', title: 'Lịch thi học kỳ phụ', time: 'Thứ 4' },
      { id: '4', title: 'Hội thảo công nghệ di động', time: 'Thứ 6' },
    ],
  },
  {
    title: 'Trước đó (Earlier)',
    data: [
      { id: '5', title: 'Kết quả đăng ký môn học', time: '10/08' },
      { id: '6', title: 'Thông báo nghỉ lễ', time: '01/08' },
    ],
  },
];

export function AnnouncementSections() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Exercise 6 — SectionList grouping</ThemedText>

      <ThemedView style={styles.card}>
        <Text style={styles.cardTitle} accessibilityRole="header">
          📋 Phân nhóm thông báo (SectionList)
        </Text>

        <SectionList
          sections={ANNOUNCEMENT_SECTIONS}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          stickySectionHeadersEnabled={false} // Tắt sticky headers trên màn hình nhỏ
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeaderBox}>
              <Text style={styles.sectionHeaderText}>{title}</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Text style={styles.itemTitle}>• {item.title}</Text>
              <Text style={styles.itemTime}>{item.time}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </ThemedView>

      {/* Giải thích câu hỏi Sticky Section Headers */}
      <ThemedView style={styles.card}>
        <Text style={styles.cardTitle} accessibilityRole="header">
          ❓ Sticky Section Headers có tốt trên màn hình hẹp &amp; chữ lớn không?
        </Text>
        <View style={styles.explainBox}>
          <Text style={styles.explainText}>
            👉 <Text style={styles.boldText}>Trả lời:</Text> KHÔNG NÊN dùng Sticky Headers khi màn hình hẹp và cỡ chữ lớn.
          </Text>
          <Text style={styles.explainText}>
            👉 <Text style={styles.boldText}>Lý do:</Text> Tiêu đề dính cố định (Sticky Header) sẽ chiếm chiều cao khung nhìn dọc, làm thu hẹp không gian đọc nội dung của người dùng. Trên màn hình nhỏ hoặc khi bật chữ lớn, nên đặt `stickySectionHeadersEnabled={false}` để tiêu đề cuộn tự nhiên theo danh sách.
          </Text>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginTop: 14,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 14,
    gap: 10,
  },
  cardTitle: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
  },
  sectionHeaderBox: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 8,
    marginBottom: 4,
  },
  sectionHeaderText: {
    color: '#0369a1',
    fontSize: 13,
    fontWeight: '700',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  itemTitle: {
    color: '#374151',
    fontSize: 13,
  },
  itemTime: {
    color: '#6b7280',
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#f3f4f6',
  },
  explainBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  explainText: {
    color: '#334155',
    fontSize: 13,
    lineHeight: 18,
  },
  boldText: {
    fontWeight: '700',
    color: '#0f172a',
  },
});
