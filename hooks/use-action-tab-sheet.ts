import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { NativeTabTriggerProps } from 'expo-router/unstable-native-tabs';
import * as React from 'react';

type ActionTabSheetRef = React.ComponentRef<typeof BottomSheetModal>;

/**
 * Turns one tab route into a "sheet trigger" instead of a normal navigation
 * target, on both the custom Android tab bar and iOS's native tab bar.
 *
 * Pass the route name once; wire the returned handlers into
 * `FloatingTabBar`'s `onInterceptTabPress` (Android) and
 * `NativeTabs.Trigger`'s spread props (iOS), then mount a `BottomSheetModal`
 * with `ref={sheetRef}` next to the tab navigator.
 */
export function useActionTabSheet(actionRouteName: string) {
  const sheetRef = React.useRef<ActionTabSheetRef>(null);

  const present = React.useCallback(() => {
    sheetRef.current?.present();
  }, []);

  const onInterceptTabPress = React.useCallback(
    (routeName: string) => {
      if (routeName !== actionRouteName) return false;
      present();
      return true;
    },
    [actionRouteName, present]
  );

  const getNativeTriggerProps = React.useCallback(
    (routeName: string): Partial<NativeTabTriggerProps> => {
      if (routeName !== actionRouteName) return {};
      return {
        disabled: true,
        listeners: { tabPress: present },
      };
    },
    [actionRouteName, present]
  );

  return { sheetRef, onInterceptTabPress, getNativeTriggerProps };
}
