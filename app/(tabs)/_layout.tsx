import { FloatingTabBar } from '@/components/floating-tab-bar';
import { Tabs } from 'expo-router/js-tabs';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Tabs.Screen name="index" options={{ title: '메뉴1' }} />
      <Tabs.Screen name="menu2" options={{ title: '메뉴2' }} />
      <Tabs.Screen name="menu3" options={{ title: '메뉴3' }} />
      <Tabs.Screen name="menu4" options={{ title: '메뉴4' }} />
      <Tabs.Screen name="menu5" options={{ title: '메뉴5' }} />
    </Tabs>
  );
}
