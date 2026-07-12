import { FloatingTabBar } from '@/components/floating-tab-bar';
import { TAB_ICONS } from '@/components/floating-tab-bar/tab-icons';
import { THEME } from '@/lib/theme';
import { useSegments } from 'expo-router';
import { Tabs } from 'expo-router/js-tabs';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'nativewind';
import { Platform } from 'react-native';

const TAB_TITLES = ['홈', '검색 & 카테고리', '커뮤니티&멘토', '체험', '마이페이지'] as const;
const TAB_ROUTES = ['home', 'search', 'community', 'experience', 'profile'] as const;
const TAB_LABELS = ['홈', '쇼핑', '커뮤니티', '체험', '마이'] as const;

export default function TabsLayout() {
  const { colorScheme } = useColorScheme();
  const theme = THEME[colorScheme ?? 'light'];
  const segments = useSegments();
  const isTabsFocused = segments[0] === '(tabs)';

  if (Platform.OS === 'ios') {
    return (
      <NativeTabs tintColor={theme.primary} labelVisibilityMode="labeled">
        {TAB_ROUTES.map((name, index) => (
          <NativeTabs.Trigger key={name} name={name}>
            <NativeTabs.Trigger.Icon src={TAB_ICONS[name]} renderingMode="template" />
            <NativeTabs.Trigger.Label>{TAB_LABELS[index]}</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>
        ))}
      </NativeTabs>
    );
  }

  return (
    <Tabs
      tabBar={
        isTabsFocused
          ? (props) => <FloatingTabBar {...props} />
          : () => null
      }
      screenOptions={{ headerShown: false, animation: 'fade' }}>
      {TAB_ROUTES.map((name, index) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{ title: TAB_TITLES[index], tabBarLabel: TAB_LABELS[index] }}
        />
      ))}
    </Tabs>
  );
}