import { FloatingTabBar } from '@/components/floating-tab-bar';
import { THEME } from '@/lib/theme';
import { Tabs } from 'expo-router/js-tabs';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'nativewind';
import { Platform } from 'react-native';

const TAB_TITLES = ['메뉴1', '메뉴2', '메뉴3', '메뉴4', '메뉴5'] as const;
const TAB_ROUTES = ['index', 'menu2', 'menu3', 'menu4', 'menu5'] as const;
const TAB_SF_ICONS = [
  { default: 'house', selected: 'house.fill' },
  { default: 'magnifyingglass', selected: 'magnifyingglass' },
  { default: 'plus.circle', selected: 'plus.circle.fill' },
  { default: 'bell', selected: 'bell.fill' },
  { default: 'person', selected: 'person.fill' },
] as const;

// iOS uses the real system tab bar. Android keeps the custom FloatingTabBar.
// Both are styled to match: flat, edge-to-edge, tint-color-only active state.
export default function TabsLayout() {
  const { colorScheme } = useColorScheme();
  const theme = THEME[colorScheme ?? 'light'];

  if (Platform.OS === 'ios') {
    return (
      <NativeTabs tintColor={theme.primary}>
        {TAB_ROUTES.map((name, index) => (
          <NativeTabs.Trigger key={name} name={name}>
            <NativeTabs.Trigger.Icon sf={TAB_SF_ICONS[index]} />
            <NativeTabs.Trigger.Label>{TAB_TITLES[index]}</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>
        ))}
      </NativeTabs>
    );
  }

  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{ headerShown: false, animation: 'fade' }}>
      {TAB_ROUTES.map((name, index) => (
        <Tabs.Screen key={name} name={name} options={{ title: TAB_TITLES[index] }} />
      ))}
    </Tabs>
  );
}
