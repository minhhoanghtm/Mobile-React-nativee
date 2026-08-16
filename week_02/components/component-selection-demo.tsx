import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export function ComponentSelectionDemo() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Exercise 1 — Component selection</ThemedText>
      <Text style={styles.note}>
        Sơ đồ Campus Dashboard: Gắn nhãn các khối giao diện và giải thích lý do chọn từng Component.
      </Text>

      {/* 1. Sơ đồ Wireframe đơn giản */}
      <ThemedView style={styles.card}>
        <Text style={styles.cardTitle} accessibilityRole="header">
          📱 Các khối trong Campus Dashboard
        </Text>

        {/* Khối 1: Dùng Text */}
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Khối 1: Tiêu đề Dashboard ➔ Chọn: &lt;Text&gt;</Text>
          <Text style={styles.boxReason}>Lý do: Chứa chuỗi chữ hiển thị. React Native bắt buộc chữ phải nằm trong &lt;Text&gt;.</Text>
        </View>

        {/* Khối 2: Dùng Image */}
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Khối 2: Banner trường học ➔ Chọn: &lt;Image&gt;</Text>
          <Text style={styles.boxReason}>Lý do: Hiển thị hình ảnh đồ họa hoặc ảnh bìa sinh viên.</Text>
        </View>

        {/* Khối 3: Dùng Pressable */}
        <View style={styles.boxNotView}>
          <Text style={styles.boxTitle}>Khối 3: Nút "Đăng ký môn" ➔ Chọn: &lt;Pressable&gt; (Không dùng View)</Text>
          <Text style={styles.boxReason}>Lý do: Cần xử lý bấm. View không có sự kiện bấm và không đọc role button.</Text>
        </View>

        {/* Khối 4: Dùng ScrollView */}
        <View style={styles.boxNotView}>
          <Text style={styles.boxTitle}>Khối 4: Bảng tin thông báo ➔ Chọn: &lt;ScrollView&gt; (Không dùng View)</Text>
          <Text style={styles.boxReason}>Lý do: Nhiều thông báo cần cuộn. View không tự cuộn được khi tràn màn hình.</Text>
        </View>

        {/* Khối 5: Dùng View */}
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Khối 5: Khung bao bọc (Container) ➔ Chọn: &lt;View&gt;</Text>
          <Text style={styles.boxReason}>Lý do: Dùng View làm khung nhóm các phần tử con và căn chỉnh bố cục (flex, padding).</Text>
        </View>
      </ThemedView>

      {/* 2. Trả lời câu hỏi 3 nơi KHÔNG DÙNG View */}
      <ThemedView style={styles.card}>
        <Text style={styles.cardTitle} accessibilityRole="header">
          🚫 3 Vị trí KHÔNG ĐƯỢC dùng &lt;View&gt;
        </Text>

        <View style={styles.ruleBox}>
          <Text style={styles.ruleHeader}>1. Nơi chứa văn bản / chữ:</Text>
          <Text style={styles.ruleBody}>➔ Dùng &lt;Text&gt;. View không thể chứa chuỗi chữ trực tiếp.</Text>
        </View>

        <View style={styles.ruleBox}>
          <Text style={styles.ruleHeader}>2. Nút bấm tương tác (Action button):</Text>
          <Text style={styles.ruleBody}>➔ Dùng &lt;Pressable&gt;. View không có hiệu ứng bấm và không nhận sự kiện chạm.</Text>
        </View>

        <View style={styles.ruleBox}>
          <Text style={styles.ruleHeader}>3. Danh sách dài cần cuộn:</Text>
          <Text style={styles.ruleBody}>➔ Dùng &lt;ScrollView&gt; hoặc &lt;FlatList&gt;. View cố định kích thước, không thể cuộn.</Text>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginTop: 16,
    paddingBottom: 24,
  },
  note: {
    color: '#374151',
    fontSize: 14,
    lineHeight: 20,
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
    fontSize: 16,
    fontWeight: '700',
  },
  box: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 10,
    gap: 4,
  },
  boxNotView: {
    backgroundColor: '#fef2f2',
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
    borderRadius: 8,
    padding: 10,
    gap: 4,
  },
  boxTitle: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
  },
  boxReason: {
    color: '#4b5563',
    fontSize: 13,
    lineHeight: 18,
  },
  ruleBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 10,
    gap: 2,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  ruleHeader: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '700',
  },
  ruleBody: {
    color: '#334155',
    fontSize: 13,
    lineHeight: 18,
  },
});
