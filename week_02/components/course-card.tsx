import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export type CourseImageType =
  | 'local'
  | 'remote'
  | 'loading'
  | 'failed'
  | 'informative'
  | 'decorative';

type CourseCardProps = {
  title: string;
  subtitle: string;
  description: string;
  imageType?: CourseImageType;
};

const LOCAL_IMG = require('@/assets/images/partial-react-logo.png');
const REMOTE_IMG = { uri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80' };
const BROKEN_IMG = { uri: 'https://invalid-domain.com/broken.png' };

export function CourseCard({
  title = 'React Native cơ bản',
  subtitle = 'Khóa học',
  description = 'Học lập trình ứng dụng di động cho người mới bắt đầu.',
  imageType = 'local',
}: CourseCardProps) {
  const [loading, setLoading] = useState(imageType === 'loading');
  const [error, setError] = useState(imageType === 'failed');

  // Chọn nguồn ảnh theo trường hợp
  const imageSource =
    imageType === 'local'
      ? LOCAL_IMG
      : imageType === 'failed'
      ? BROKEN_IMG
      : REMOTE_IMG;

  return (
    <ThemedView style={styles.card}>
      {/* 1. Thông tin văn bản chính (Đảm bảo hoàn thành nhiệm vụ không phụ thuộc vào ảnh) */}
      <Text style={styles.badge}>{subtitle}</Text>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      <Text style={styles.description}>{description}</Text>

      {/* 2. Xử lý 6 trường hợp Hình ảnh (Image Resilience) */}
      {imageType === 'decorative' ? (
        /* Trường hợp 6: Decorative (Trang trí) -> Ẩn khỏi Screen Reader */
        <View style={styles.decorativeBox} accessibilityElementsHidden={true} importantForAccessibility="no">
          <Text style={styles.decorativeText}>🎨 Ảnh trang trí (Screen Reader bỏ qua)</Text>
        </View>
      ) : (
        <View style={styles.imageContainer}>
          {loading ? (
            /* Trường hợp 3: Loading (Đang tải) */
            <View style={styles.statusBox}>
              <ActivityIndicator size="small" color="#0a7ea4" />
              <Text style={styles.statusText}>Đang tải hình ảnh...</Text>
            </View>
          ) : error ? (
            /* Trường hợp 4: Failed (Lỗi ảnh -> Fallback UI) */
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ Không thể tải ảnh (Nội dung chính vẫn đọc bình thường)</Text>
            </View>
          ) : (
            /* Trường hợp 1, 2, 5: Local, Remote, Informative */
            <Image
              source={imageSource}
              style={styles.image}
              contentFit="cover"
              /* Trường hợp 5: Informative -> có accessibilityLabel mô tả ảnh */
              accessibilityLabel={
                imageType === 'informative'
                  ? 'Hình ảnh minh họa sinh viên đang thực hành lập trình'
                  : 'Hình ảnh khóa học'
              }
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setError(true);
              }}
            />
          )}
        </View>
      )}
    </ThemedView>
  );
}

// Component Demo hiển thị 6 trường hợp hình ảnh cho Exercise 3
export function CourseCardDemo() {
  return (
    <ThemedView style={styles.demoContainer}>
      <ThemedText type="subtitle">Exercise 3 — Image resilience</ThemedText>
      <Text style={styles.note}>
        Đảm bảo 6 trường hợp hình ảnh (Local, Remote, Loading, Failed, Informative, Decorative) và nhiệm vụ hoàn thành không phụ thuộc vào ảnh.
      </Text>

      <CourseCard
        title="1. Ảnh Local (require)"
        subtitle="Local Asset"
        description="Sử dụng ảnh nội bộ có sẵn trong dự án."
        imageType="local"
      />

      <CourseCard
        title="2. Ảnh Remote (URL)"
        subtitle="Remote URL"
        description="Tải ảnh trực tuyến từ máy chủ internet."
        imageType="remote"
      />

      <CourseCard
        title="3. Ảnh Đang tải (Loading)"
        subtitle="Loading State"
        description="Hiển thị spinner xoay trong khi chờ tải ảnh."
        imageType="loading"
      />

      <CourseCard
        title="4. Lỗi tải ảnh (Failed Fallback)"
        subtitle="Error Fallback"
        description="Tài nguyên hỏng nhưng người dùng vẫn đọc đầy đủ thông tin chữ."
        imageType="failed"
      />

      <CourseCard
        title="5. Ảnh thông tin (Informative)"
        subtitle="Informative"
        description="Có nhãn accessibilityLabel mô tả ý nghĩa bức ảnh."
        imageType="informative"
      />

      <CourseCard
        title="6. Ảnh trang trí (Decorative)"
        subtitle="Decorative"
        description="Chỉ phục vụ làm đẹp, ẩn hoàn toàn khỏi Screen Reader."
        imageType="decorative"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  demoContainer: {
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
  badge: {
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  title: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
  },
  description: {
    color: '#4b5563',
    fontSize: 13,
    lineHeight: 18,
  },
  imageContainer: {
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
    marginTop: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  statusBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#6b7280',
  },
  errorBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    padding: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#dc2626',
    fontWeight: '600',
    textAlign: 'center',
  },
  decorativeBox: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
  },
  decorativeText: {
    color: '#64748b',
    fontSize: 12,
    fontStyle: 'italic',
  },
});
