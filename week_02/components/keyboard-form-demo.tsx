import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export function KeyboardFormDemo() {
  const [showFixedMode, setShowFixedMode] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Exercise 8 — Keyboard failure reproduction</ThemedText>

      {/* Nút chuyển đổi chế độ Xem Lỗi Bàn Phím vs Bản Đã Sửa */}
      <Pressable
        onPress={() => setShowFixedMode(!showFixedMode)}
        style={[styles.toggleBtn, showFixedMode ? styles.toggleBtnFixed : styles.toggleBtnBad]}
        accessibilityRole="button">
        <Text style={styles.toggleBtnText}>
          {showFixedMode
            ? '🟢 Đang xem: Bản đã sửa (Keyboard-Safe Scroll)'
            : '🔴 Đang xem: Bản bị lỗi (Bị bàn phím che ô nhập cuối)'}
        </Text>
      </Pressable>

      {!showFixedMode ? (
        /* 🔴 BẢN BỊ LỖI (KHÔNG DÙNG KEYBOARD AVOIDING VIEW / SCROLLVIEW) */
        <ThemedView style={[styles.card, styles.badCard]}>
          <Text style={styles.badBadge}>🔴 Tái hiện lỗi: Ô nhập cuối bị bàn phím che</Text>
          <Text style={styles.description}>
            Khi chạm vào ô nhập "Ghi chú bổ sung" ở dưới cùng, bàn phím ảo đẩy lên sẽ che khuất hoàn toàn ô nhập và nút "Gửi đăng ký".
          </Text>

          <Text style={styles.label}>1. Họ và tên:</Text>
          <TextInput value={fullName} onChangeText={setFullName} placeholder="Nhập họ tên..." style={styles.input} />

          <Text style={styles.label}>2. Email liên hệ:</Text>
          <TextInput value={email} onChangeText={setEmail} placeholder="Nhập email..." style={styles.input} />

          <Text style={styles.label}>3. Địa chỉ:</Text>
          <TextInput value={address} onChangeText={setAddress} placeholder="Nhập địa chỉ..." style={styles.input} />

          {/* Ô nhập ở cuối bị che */}
          <Text style={styles.label}>4. Ghi chú bổ sung (Ô bị che khi bật bàn phím):</Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Nhập ghi chú..."
            style={[styles.input, styles.multiline]}
            multiline
          />

          <Pressable onPress={() => alert('Đã gửi!')} style={styles.badSubmitBtn} accessibilityRole="button">
            <Text style={styles.submitBtnText}>Gửi đăng ký (Nút bị che)</Text>
          </Pressable>
        </ThemedView>
      ) : (
        /* 🟢 BẢN ĐÃ SỬA (KEYBOARD AVOIDING VIEW + SCROLLVIEW) */
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <ThemedView style={styles.card}>
                <Text style={styles.goodBadge}>🟢 Đã sửa: Cấu trúc cuộn an toàn khi bật bàn phím</Text>
                <Text style={styles.description}>
                  Sử dụng KeyboardAvoidingView + ScrollView cho phép cuộn mượt mà lên trên khi bàn phím ảo xuất hiện.
                </Text>

                <Text style={styles.label}>1. Họ và tên:</Text>
                <TextInput value={fullName} onChangeText={setFullName} placeholder="Nhập họ tên..." style={styles.input} />

                <Text style={styles.label}>2. Email liên hệ:</Text>
                <TextInput value={email} onChangeText={setEmail} placeholder="Nhập email..." style={styles.input} />

                <Text style={styles.label}>3. Địa chỉ:</Text>
                <TextInput value={address} onChangeText={setAddress} placeholder="Nhập địa chỉ..." style={styles.input} />

                <Text style={styles.label}>4. Ghi chú bổ sung (An toàn khi bật bàn phím):</Text>
                <TextInput
                  value={note}
                  onChangeText={setNote}
                  placeholder="Nhập ghi chú..."
                  style={[styles.input, styles.multiline]}
                  multiline
                />

                <Pressable onPress={() => alert('Đã gửi!')} style={styles.goodSubmitBtn} accessibilityRole="button">
                  <Text style={styles.submitBtnText}>Gửi đăng ký thành công</Text>
                </Pressable>
              </ThemedView>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginTop: 14,
  },
  toggleBtn: {
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  toggleBtnFixed: {
    backgroundColor: '#166534',
  },
  toggleBtnBad: {
    backgroundColor: '#dc2626',
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
    gap: 8,
  },
  badCard: {
    backgroundColor: '#fff5f5',
    borderColor: '#fca5a5',
  },
  goodBadge: {
    color: '#166534',
    fontSize: 12,
    fontWeight: '700',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badBadge: {
    color: '#991b1b',
    fontSize: 12,
    fontWeight: '700',
    backgroundColor: '#fee2e2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  description: {
    color: '#374151',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 4,
  },
  label: {
    color: '#111827',
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#ffffff',
  },
  multiline: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  goodSubmitBtn: {
    backgroundColor: '#0a7ea4',
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  badSubmitBtn: {
    backgroundColor: '#64748b',
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
