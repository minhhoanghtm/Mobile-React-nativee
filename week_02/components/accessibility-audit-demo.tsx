import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const auditNotes = [
  '1. Missing names: Thêm accessibilityLabel & accessibilityHint cho ô nhập và nút bấm.',
  '2. Wrong roles: Dùng Pressable (role="button") và tiêu đề (role="header").',
  '3. Absent states: Khai báo accessibilityState (selected, disabled) để đọc trạng thái.',
  '4. Order problems: Đưa tiêu đề lên đầu tiên để Screen Reader đọc đúng luồng.',
  '5. Small targets: Đặt minHeight: 44, minWidth: 44 cho vùng chạm dễ bấm.',
  '6. Contrast failures: Dùng màu chữ đậm (#111827) trên nền sáng (#ffffff).',
  '7. Clipped large text: Không cố định height của text, dùng lineHeight để co giãn khi phóng to font.',
];

export function AccessibilityAuditDemo() {
  const [isDone, setIsDone] = useState(false);
  const [summary, setSummary] = useState('');

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Exercise 10 — Accessibility audit</ThemedText>

      {/* 1. Nhật ký audit 7 lỗi cơ bản */}
      <ThemedView style={styles.card}>
        <Text style={styles.title} accessibilityRole="header">
          Ghi nhận Audit (7 Lỗi &amp; Cách sửa)
        </Text>
        {auditNotes.map((note, index) => (
          <Text key={index} style={styles.auditText}>
            {note}
          </Text>
        ))}
      </ThemedView>

      {/* 2. Thẻ Milestone đã được sửa Accessibility chuẩn */}
      <ThemedView style={styles.card}>
        {/* Lỗi 4: Tiêu đề lên đầu tiên & có role="header" */}
        <Text style={styles.title} accessibilityRole="header">
          Milestone: Hoàn thành khóa học
        </Text>

        {/* Lỗi 1, 6 & 7: Nhãn rõ ràng, tương phản tốt, co giãn chữ */}
        <Text style={styles.label}>Tóm tắt kết quả:</Text>
        <TextInput
          value={summary}
          onChangeText={setSummary}
          placeholder="Nhập ghi chú tóm tắt..."
          placeholderTextColor="#6b7280"
          style={styles.input}
          multiline
          /* Lỗi 1: Tên truy cập và gợi ý cho Screen Reader */
          accessibilityLabel="Tóm tắt kết quả milestone"
          accessibilityHint="Nhập nội dung mô tả ngắn về kết quả của bạn"
        />

        <View style={styles.row}>
          {/* Lỗi 2, 3, 5: Nút bấm chuẩn role, state selected, minHeight >= 44 */}
          <Pressable
            onPress={() => setIsDone(!isDone)}
            style={[styles.button, isDone && styles.buttonDone]}
            accessibilityRole="button"
            accessibilityLabel={isDone ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu hoàn thành'}
            accessibilityHint="Thay đổi trạng thái hoàn thành"
            accessibilityState={{ selected: isDone }}>
            <Text style={styles.buttonText}>{isDone ? 'Đã hoàn thành' : 'Hoàn thành'}</Text>
          </Pressable>

          {/* Lỗi 1, 3, 5: Nút xóa có tên, công bố state disabled, minHeight >= 44 */}
          <Pressable
            onPress={() => setSummary('')}
            style={[styles.buttonOutline, !summary && styles.buttonDisabled]}
            disabled={!summary}
            accessibilityRole="button"
            accessibilityLabel="Xóa tóm tắt"
            accessibilityHint="Xóa nội dung đã nhập trong ô tóm tắt"
            accessibilityState={{ disabled: !summary }}>
            <Text style={[styles.outlineText, !summary && styles.disabledText]}>Xóa tóm tắt</Text>
          </Pressable>
        </View>

        {/* Lỗi 3: Đọc tự động trạng thái khi thay đổi */}
        <Text style={styles.statusText} accessibilityLiveRegion="polite">
          Trạng thái: {isDone ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
        </Text>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginTop: 14,
    paddingBottom: 24,
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
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  auditText: {
    color: '#374151',
    fontSize: 13,
    lineHeight: 20,
  },
  label: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#9ca3af',
    borderRadius: 8,
    padding: 10,
    minHeight: 70,
    color: '#111827',
    fontSize: 15,
    lineHeight: 22,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#0a7ea4',
    borderRadius: 8,
    minHeight: 44, // Kích thước vùng chạm chuẩn >= 44
    minWidth: 120,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDone: {
    backgroundColor: '#166534',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: '#6b7280',
    borderRadius: 8,
    minHeight: 44, // Kích thước vùng chạm chuẩn >= 44
    minWidth: 90,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    borderColor: '#e5e7eb',
    backgroundColor: '#f3f4f6',
  },
  outlineText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
  disabledText: {
    color: '#9ca3af',
  },
  statusText: {
    color: '#111827',
    fontSize: 14,
    lineHeight: 20,
  },
});
