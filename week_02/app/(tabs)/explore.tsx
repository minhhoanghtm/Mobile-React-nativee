import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Khám phá các tính năng trên ứng dụng
        </ThemedText>
      </ThemedView>
      <ThemedText>
        Ứng dụng này có ví dụ mã nguồn để giúp bạn bắt đầu một cách nhanh chóng và dễ hiểu.
      </ThemedText>
      <Collapsible title="Định tuyến dựa trên tệp">
        <ThemedText>
          Ứng dụng này có hai màn hình:{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> và{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          Tệp bố cục <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          định nghĩa cấu hình trình điều hướng tab.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Tìm hiểu thêm</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Hỗ trợ Android, iOS và web">
        <ThemedText>
          Bạn có thể mở dự án này trên Android, iOS và web. Để mở phiên bản web, hãy nhấn phím{' '}
          <ThemedText type="defaultSemiBold">w</ThemedText> trong terminal đang chạy dự án.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Hình ảnh">
        <ThemedText>
          Đối với hình ảnh tĩnh, bạn có thể dùng hậu tố <ThemedText type="defaultSemiBold">@2x</ThemedText>{' '}
          và <ThemedText type="defaultSemiBold">@3x</ThemedText> để cung cấp các phiên bản phù hợp
          với độ phân giải màn hình khác nhau.
        </ThemedText>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={{ width: 100, aspectRatio: 1, alignSelf: 'center' }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Tìm hiểu thêm</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Thành phần giao diện sáng và tối">
        <ThemedText>
          Mẫu này hỗ trợ giao diện sáng và tối. Hook{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> cho phép bạn kiểm tra màu
          sắc hiện tại của người dùng và điều chỉnh giao diện phù hợp.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Tìm hiểu thêm</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Hoạt ảnh">
        <ThemedText>
          Mẫu này bao gồm ví dụ về một thành phần có hoạt ảnh. Thành phần{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> sử dụng thư viện{' '}
          <ThemedText type="defaultSemiBold" style={{ fontFamily: Fonts.mono }}>
            react-native-reanimated
          </ThemedText>{' '}
          mạnh mẽ để tạo hiệu ứng tay vẫy.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              Thành phần <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              cung cấp hiệu ứng parallax cho hình ảnh ở đầu trang.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
