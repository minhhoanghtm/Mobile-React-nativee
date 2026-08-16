import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const COURSES = [
  { id: '1', code: 'RN101', name: 'Lập trình React Native' },
  { id: '2', code: 'UI202', name: 'Thiết kế giao diện di động' },
  { id: '3', code: 'JS303', name: 'JavaScript ES6+' },
  { id: '4', code: 'TS404', name: 'TypeScript nâng cao' },
];

export function ResponsiveCourseGrid() {
  const [useFlexboxRule, setUseFlexboxRule] = useState(true);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Exercise 7 — Responsive card laboratory</ThemedText>

      {/* Nút chuyển đổi so sánh Flexbox vs Tính toán Width thủ công */}
      <Pressable
        onPress={() => setUseFlexboxRule(!useFlexboxRule)}
        style={[styles.toggleBtn, useFlexboxRule && styles.toggleBtnActive]}
        accessibilityRole="button">
        <Text style={styles.toggleBtnText}>
          {useFlexboxRule
            ? '✨ Phương pháp 1: Thuần Flexbox (flexBasis, minWidth, flexGrow)'
            : '📏 Phương pháp 2: Tính toán Width thủ công (width: 48% / 100%)'}
        </Text>
      </Pressable>

      <ThemedView style={styles.card}>
        <Text style={styles.cardTitle} accessibilityRole="header">
          📚 Lưới Khóa học Responsive ({useFlexboxRule ? 'Thuần Flexbox' : 'Width thủ công'})
        </Text>

        <View style={styles.gridWrapper}>
          {COURSES.map((course) => (
            <View
              key={course.id}
              style={[
                styles.gridCard,
                useFlexboxRule
                  ? styles.flexboxCardStyle // Dùng flexBasis, minWidth, maxWidth, flexGrow
                  : styles.manualCardStyle,  // Dùng width thủ công
              ]}>
              <Text style={styles.courseCode}>{course.code}</Text>
              <Text style={styles.courseName}>{course.name}</Text>
            </View>
          ))}
        </View>
      </ThemedView>

      {/* Bảng so sánh 2 phương pháp */}
      <ThemedView style={styles.card}>
        <Text style={styles.cardTitle} accessibilityRole="header">
          📊 So sánh Thuần Flexbox vs Tính toán Width thủ công
        </Text>

        <View style={styles.compareItem}>
          <Text style={styles.compareTitle}>1. Thuần Flexbox (flexBasis, minWidth, flexGrow):</Text>
          <Text style={styles.compareBody}>
            ✅ Tự động co giãn mượt mà theo kích thước màn hình mà không cần dùng câu lệnh `if/else` kiểm tra width. Thích ứng tốt với mọi thiết bị.
          </Text>
        </View>

        <View style={styles.compareItem}>
          <Text style={styles.compareTitle}>2. Tính toán Width thủ công (`width: '48%'`):</Text>
          <Text style={styles.compareBody}>
            ❌ Phụ thuộc vào phép tính thủ công, dễ bị lệch pixel hoặc vỡ layout trên các thiết bị màn hình gập / màn hình kích thước trung bình.
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
  toggleBtn: {
    backgroundColor: '#0a7ea4',
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  toggleBtnActive: {
    backgroundColor: '#166534',
  },
  toggleBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
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
  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  gridCard: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 12,
    gap: 4,
  },
  // Quy tắc Flexbox thuần theo yêu cầu đề bài (flexBasis, minWidth, maxWidth, flexGrow, wrap)
  flexboxCardStyle: {
    flexBasis: 140,
    minWidth: 140,
    maxWidth: '100%',
    flexGrow: 1,
  },
  // Quy tắc tính toán width thủ công
  manualCardStyle: {
    width: '48%',
  },
  courseCode: {
    color: '#0a7ea4',
    fontSize: 12,
    fontWeight: '700',
  },
  courseName: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
  compareItem: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 10,
    gap: 4,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  compareTitle: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '700',
  },
  compareBody: {
    color: '#334155',
    fontSize: 13,
    lineHeight: 18,
  },
});
