import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { ComponentSelectionDemo } from '@/components/component-selection-demo';
import { TextStressTestDemo } from '@/components/text-stress-test-demo';
import { CourseCardDemo } from '@/components/course-card';
import { ButtonDemoScreen } from '@/components/press-state-buttons';
import { AnnouncementList } from '@/components/announcement-list';
import { AnnouncementSections } from '@/components/announcement-sections';
import { ResponsiveCourseGrid } from '@/components/responsive-course-grid';
import { KeyboardFormDemo } from '@/components/keyboard-form-demo';
import { ValidationCopyDemo } from '@/components/validation-copy-demo';
import { AccessibilityAuditDemo } from '@/components/accessibility-audit-demo';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Chào mừng bạn đến với ứng dụng</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Bước 1: Hãy thử ngay</ThemedText>
        <ThemedText>
          Chỉnh sửa <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> để xem
          thay đổi. Nhấn{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          để mở công cụ phát triển.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">Bước 2: Khám phá thêm</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Hành động" icon="cube" onPress={() => alert('Hành động đã được nhấn')} />
            <Link.MenuAction
              title="Chia sẻ"
              icon="square.and.arrow.up"
              onPress={() => alert('Chia sẻ đã được nhấn')}
            />
            <Link.Menu title="Thêm" icon="ellipsis">
              <Link.MenuAction
                title="Xóa"
                icon="trash"
                destructive
                onPress={() => alert('Xóa đã được nhấn')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>
          {`Nhấn vào tab Khám phá để tìm hiểu thêm các tính năng có sẵn trong ứng dụng mẫu này.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Bước 3: Khởi động lại từ đầu</ThemedText>
        <ThemedText>
          {`Khi bạn đã sẵn sàng, hãy chạy `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> để tạo lại một{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> mới. Thao tác này sẽ di chuyển thư
          mục hiện tại <ThemedText type="defaultSemiBold">app</ThemedText> sang{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>

      {/* Exercise 1 Component Selection */}
      <ComponentSelectionDemo />

      {/* Exercise 2 Text Stress Test */}
      <TextStressTestDemo />

      {/* Exercise 3 Image Resilience */}
      <CourseCardDemo />

      {/* Exercise 4 Press-State System */}
      <ButtonDemoScreen />

      {/* Exercise 5 FlatList Migration */}
      <AnnouncementList />

      {/* Exercise 6 SectionList Grouping */}
      <AnnouncementSections />

      {/* Exercise 7 Responsive Card Lab */}
      <ResponsiveCourseGrid />

      {/* Exercise 8 Keyboard Failure Reproduction */}
      <KeyboardFormDemo />

      {/* Exercise 9 Form Validation Copy */}
      <ValidationCopyDemo />

      {/* Exercise 10 Accessibility Audit */}
      <AccessibilityAuditDemo />

      {/* Đã comment lại 9 bài học trước theo yêu cầu */}
      {/*
      <ThemedView style={styles.cardSection}>
        <ThemedText type="subtitle">Exercise 3 — Image resilience</ThemedText>
        <CourseCard title="React Native cơ bản" subtitle="Khóa học" description="..." imageType="local" />
      </ThemedView>
      <ButtonDemoScreen />
      <AnnouncementList />
      <AnnouncementSections />
      <ResponsiveCourseGrid />
      <KeyboardFormDemo />
      <ValidationCopyDemo />
      <AccessibilityAuditDemo />
      */}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  cardSection: {
    gap: 12,
    marginTop: 8,
  },
  reactLogo: {
    width: 290,
    aspectRatio: 290 / 178,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
