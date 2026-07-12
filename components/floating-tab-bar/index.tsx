import { THEME } from '@/lib/theme';
import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FLOATING_TAB_BAR_BOTTOM_MARGIN } from './constants';
import { TAB_ICONS } from './tab-icons';
import { TabBarFade } from './tab-bar-fade';
import { TabBarSurface } from './tab-bar-surface';

export { FLOATING_TAB_BAR_CLEARANCE } from './constants';

function FloatingTabBarImpl({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
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
      if (event.defaultPrevented) return;
      if (!isFocused) {
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

  React.useEffect(() => {
    const assets = Object.values(TAB_ICONS).map((icon) =>
      Image.resolveAssetSource(icon.selected)
    );
    Promise.all(assets).then((sources) => {
      for (const source of sources) {
        if (source?.uri) {
          Image.prefetch(source.uri);
        }
      }
    });
  }, []);

  return (
    <>
      <TabBarFade bottom={bottom} colorScheme={resolvedColorScheme} />
      <TabBarSurface
        state={state}
        descriptors={descriptors}
        bottom={bottom}
        colorScheme={resolvedColorScheme}
        activeColor={theme.primary}
        inactiveColor={theme.mutedForeground}
        onPress={handlePress}
        onLongPress={handleLongPress}
      />
    </>
  );
}

export const FloatingTabBar = React.memo(FloatingTabBarImpl);
