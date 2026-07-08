import { THEME } from '@/lib/theme';
import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FLOATING_TAB_BAR_BOTTOM_MARGIN } from './constants';
import { TabBarFade } from './tab-bar-fade';
import { TabBarSurface } from './tab-bar-surface';

export { FLOATING_TAB_BAR_CLEARANCE } from './constants';

function FloatingTabBarImpl({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const resolvedColorScheme = colorScheme ?? 'light';
  const theme = THEME[resolvedColorScheme];
  const bottom = insets.bottom + FLOATING_TAB_BAR_BOTTOM_MARGIN;

  const handlePress = React.useCallback(
    (routeKey: string, routeName: string) => {
      const isFocused = state.routes[state.index]?.key === routeKey;
      const event = navigation.emit({
        type: 'tabPress',
        target: routeKey,
        canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(routeName);
      }
    },
    [navigation, state.index, state.routes]
  );

  const handleLongPress = React.useCallback(
    (routeKey: string) => {
      navigation.emit({ type: 'tabLongPress', target: routeKey });
    },
    [navigation]
  );

  return (
    <>
      <TabBarFade bottom={bottom} colorScheme={resolvedColorScheme} />
      <TabBarSurface
        state={state}
        descriptors={descriptors}
        bottom={bottom}
        colorScheme={resolvedColorScheme}
        foregroundColor={theme.foreground}
        onPress={handlePress}
        onLongPress={handleLongPress}
      />
    </>
  );
}

export const FloatingTabBar = React.memo(FloatingTabBarImpl);
