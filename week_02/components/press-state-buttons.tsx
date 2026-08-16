import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View, type PressableStateCallbackType } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type ButtonProps = {
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
};

type ExtendedPressState = PressableStateCallbackType & { focused?: boolean };

// 1. PrimaryButton (Nút chính)
export function PrimaryButton({ label = 'Nút chính', disabled = false, loading = false, onPress }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      style={(state: ExtendedPressState) => [
        styles.baseButton,
        styles.primaryBtn,
        state.pressed && styles.primaryPressed,
        state.focused && styles.focusedBorder,
        (disabled || loading) && styles.disabledState,
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Text style={styles.primaryText}>{label}</Text>
      )}
    </Pressable>
  );
}

// 2. SecondaryButton (Nút phụ)
export function SecondaryButton({ label = 'Nút phụ', disabled = false, loading = false, onPress }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      style={(state: ExtendedPressState) => [
        styles.baseButton,
        styles.secondaryBtn,
        state.pressed && styles.secondaryPressed,
        state.focused && styles.focusedBorder,
        (disabled || loading) && styles.disabledState,
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color="#0a7ea4" />
      ) : (
        <Text style={styles.secondaryText}>{label}</Text>
      )}
    </Pressable>
  );
}

// 3. IconButton (Nút định dạng nhỏ - Không dùng icon, dùng chữ)
export function IconButton({ label = 'Thao tác', disabled = false, loading = false, onPress }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      style={(state: ExtendedPressState) => [
        styles.baseButton,
        styles.iconBtn,
        state.pressed && styles.secondaryPressed,
        state.focused && styles.focusedBorder,
        (disabled || loading) && styles.disabledState,
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color="#0a7ea4" />
      ) : (
        <Text style={styles.iconText}>{label}</Text>
      )}
    </Pressable>
  );
}

// Màn hình Demo Exercise 4
export function ButtonDemoScreen() {
  const [count, setCount] = useState(0);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Exercise 4 — Press-state system</ThemedText>
      <Text style={styles.note}>
        Hệ thống nút bấm Pressable: Kiểm thử 4 trạng thái (Normal, Pressed, Focused, Disabled, Loading) không giảm kích thước vùng chạm (&gt;= 44dp).
      </Text>

      {/* 1. PrimaryButton Demo */}
      <ThemedView style={styles.card}>
        <Text style={styles.cardTitle} accessibilityRole="header">
          1. PrimaryButton (Nút chính)
        </Text>
        <View style={styles.row}>
          <PrimaryButton label={`Nhấn (${count})`} onPress={() => setCount((c) => c + 1)} />
          <PrimaryButton label="Loading" loading={true} />
          <PrimaryButton label="Disabled" disabled={true} />
        </View>
      </ThemedView>

      {/* 2. SecondaryButton Demo */}
      <ThemedView style={styles.card}>
        <Text style={styles.cardTitle} accessibilityRole="header">
          2. SecondaryButton (Nút phụ)
        </Text>
        <View style={styles.row}>
          <SecondaryButton label="Xem thêm" onPress={() => alert('Đã nhấn nút phụ')} />
          <SecondaryButton label="Loading" loading={true} />
          <SecondaryButton label="Disabled" disabled={true} />
        </View>
      </ThemedView>

      {/* 3. IconButton Demo (Dùng chữ, không dùng icon) */}
      <ThemedView style={styles.card}>
        <Text style={styles.cardTitle} accessibilityRole="header">
          3. IconButton (Nút chữ thao tác gọn)
        </Text>
        <View style={styles.row}>
          <IconButton label="Thêm" onPress={() => alert('Thêm mới')} />
          <IconButton label="Xóa" onPress={() => alert('Xóa')} />
          <IconButton label="Tải" loading={true} />
          <IconButton label="Khóa" disabled={true} />
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
    fontSize: 15,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  // Kích thước vùng chạm chuẩn tối thiểu minHeight 44, minWidth 44 cho tất cả các nút
  baseButton: {
    minHeight: 44,
    minWidth: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  primaryBtn: {
    backgroundColor: '#0a7ea4',
  },
  primaryText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  primaryPressed: {
    backgroundColor: '#075975',
    opacity: 0.85,
  },
  secondaryBtn: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#0a7ea4',
  },
  secondaryText: {
    color: '#0a7ea4',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryPressed: {
    backgroundColor: '#f0f9ff',
  },
  iconBtn: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#6b7280',
  },
  iconText: {
    color: '#374151',
    fontSize: 13,
    fontWeight: '600',
  },
  focusedBorder: {
    borderWidth: 2,
    borderColor: '#2563eb',
  },
  disabledState: {
    opacity: 0.5,
  },
});
