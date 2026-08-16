import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export function TextStressTestDemo() {
  const [isBigFont, setIsBigFont] = useState(false);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Exercise 2 — Text stress test</ThemedText>
      <Text style={styles.note}>
        Thử nghiệm khi đổi chữ ngắn thành văn bản dài và phóng to cỡ chữ.
      </Text>

      {/* Nút bật/tắt cỡ chữ to */}
      <Pressable
        onPress={() => setIsBigFont(!isBigFont)}
        style={styles.button}
        accessibilityRole="button">
        <Text style={styles.buttonText}>
          {isBigFont ? '🔍 Đang chọn: Cỡ chữ LỚN (20px)' : '🔍 Đang chọn: Cỡ chữ THƯỜNG (14px)'}
        </Text>
      </Pressable>

      {/* Thẻ hiển thị văn bản dài đã tối ưu ngắt dòng */}
      <ThemedView style={styles.card}>
        <Text style={styles.title} accessibilityRole="header">
          Văn bản dài sau khi tối ưu Layout:
        </Text>

        <View style={styles.row}>
          {/* flexShrink: 1 giúp chữ tự xuống dòng không đè nút */}
          <Text style={[styles.text, isBigFont && styles.bigText]}>
            Chương trình đào tạo lập trình di động ứng dụng nâng cao dành cho sinh viên năm 2026.
          </Text>
        </View>

        {/* 3 Quy tắc thiết kế layout cơ bản */}
        <View style={styles.ruleBox}>
          <Text style={styles.ruleTitle}>📌 3 Quy tắc thiết kế Layout cần nhớ:</Text>
          <Text style={styles.ruleItem}>1. Xóa `height` cố định để khung tự mở rộng khi chữ dài.</Text>
          <Text style={styles.ruleItem}>2. Thêm `flexShrink: 1` cho Text để tự xuống dòng.</Text>
          <Text style={styles.ruleItem}>3. Đặt `lineHeight` tỉ lệ với `fontSize` để không đè dòng.</Text>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginTop: 14,
  },
  note: {
    color: '#374151',
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#0a7ea4',
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  buttonText: {
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
    gap: 10,
  },
  title: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f0fdf4',
    padding: 10,
    borderRadius: 8,
  },
  text: {
    flexShrink: 1, // Tự xuống dòng khi dài
    color: '#166534',
    fontSize: 14,
    lineHeight: 22,
  },
  bigText: {
    fontSize: 20,
    lineHeight: 28,
  },
  ruleBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 10,
    gap: 4,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  ruleTitle: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '700',
  },
  ruleItem: {
    color: '#334155',
    fontSize: 13,
    lineHeight: 18,
  },
});
