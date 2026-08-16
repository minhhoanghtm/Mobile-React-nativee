import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const SUMMARY_MAX = 100;

export function ValidationCopyDemo() {
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [summary, setSummary] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleValidate = () => {
    const newErrors: Record<string, string> = {};
    setIsSuccess(false);

    // 1. Kiểm tra Tên chỉ chứa khoảng trắng (Spaces-only names)
    if (!fullName.trim()) {
      newErrors.fullName = 'Tên không được bỏ trống hoặc chỉ chứa khoảng trắng. Vui lòng nhập đầy đủ họ tên.';
    }

    // 2. Kiểm tra Mã học viên sai định dạng (Malformed IDs: Ví dụ đúng RN1234)
    if (!studentId.trim()) {
      newErrors.studentId = 'Mã học viên là bắt buộc.';
    } else if (!/^[A-Za-z]{2}\d{4}$/.test(studentId.trim())) {
      newErrors.studentId = 'Mã học viên chưa đúng định dạng. Cấu trúc chuẩn gồm 2 chữ cái + 4 số (Ví dụ: RN1234).';
    }

    // 3. Kiểm tra Lỗi Email (Email errors)
    if (!email.trim()) {
      newErrors.email = 'Email là bắt buộc để nhận thông báo.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Email chưa đúng định dạng. Vui lòng nhập đúng mẫu: ten@domain.com.';
    }

    // 4. Kiểm tra Tóm tắt quá dài (Overlong summaries)
    if (summary.length > SUMMARY_MAX) {
      newErrors.summary = `Nội dung tóm tắt đang có ${summary.length} ký tự. Vui lòng rút gọn dưới giới hạn ${SUMMARY_MAX} ký tự.`;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSuccess(true);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Exercise 9 — Validation copy</ThemedText>
      <Text style={styles.note}>
        Thay thế thông báo lỗi chung chung (như "Invalid input") bằng thông báo hướng dẫn rõ ràng, dễ hiểu.
      </Text>

      <ThemedView style={styles.card}>
        <Text style={styles.cardTitle} accessibilityRole="header">
          📝 Form đăng ký (Thử nghiệm 4 trường hợp lỗi)
        </Text>

        {/* Trường 1: Họ tên */}
        <Text style={styles.label}>1. Họ và tên học viên:</Text>
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          placeholder="Nhập họ tên (Thử nhập khoảng trắng)..."
          placeholderTextColor="#9ca3af"
          style={[styles.input, Boolean(errors.fullName) && styles.inputError]}
        />
        {errors.fullName ? <Text style={styles.errorText}>⚠️ {errors.fullName}</Text> : null}

        {/* Trường 2: Mã học viên */}
        <Text style={styles.label}>2. Mã học viên (Định dạng: 2 chữ + 4 số):</Text>
        <TextInput
          value={studentId}
          onChangeText={setStudentId}
          placeholder="Ví dụ: RN1234 (Thử nhập 123)..."
          placeholderTextColor="#9ca3af"
          style={[styles.input, Boolean(errors.studentId) && styles.inputError]}
          autoCapitalize="characters"
        />
        {errors.studentId ? <Text style={styles.errorText}>⚠️ {errors.studentId}</Text> : null}

        {/* Trường 3: Email */}
        <Text style={styles.label}>3. Email liên hệ:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="ten@domain.com (Thử nhập abc)..."
          placeholderTextColor="#9ca3af"
          keyboardType="email-address"
          autoCapitalize="none"
          style={[styles.input, Boolean(errors.email) && styles.inputError]}
        />
        {errors.email ? <Text style={styles.errorText}>⚠️ {errors.email}</Text> : null}

        {/* Trường 4: Tóm tắt */}
        <Text style={styles.label}>
          4. Tóm tắt bản thân (Tối đa {SUMMARY_MAX} ký tự - Hiện tại: {summary.length}):
        </Text>
        <TextInput
          value={summary}
          onChangeText={setSummary}
          placeholder="Nhập tóm tắt..."
          placeholderTextColor="#9ca3af"
          style={[styles.input, styles.multiline, Boolean(errors.summary) && styles.inputError]}
          multiline
        />
        {errors.summary ? <Text style={styles.errorText}>⚠️ {errors.summary}</Text> : null}

        {isSuccess ? <Text style={styles.successText}>✅ Đã xác thực thành công tất cả các trường!</Text> : null}

        <Pressable onPress={handleValidate} style={styles.submitBtn} accessibilityRole="button">
          <Text style={styles.submitBtnText}>Kiểm tra dữ liệu</Text>
        </Pressable>
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
    gap: 8,
  },
  cardTitle: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
  },
  label: {
    color: '#111827',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
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
  inputError: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 12,
    lineHeight: 16,
  },
  successText: {
    color: '#166534',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  submitBtn: {
    backgroundColor: '#0a7ea4',
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
