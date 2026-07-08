import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

export const FLOATING_TAB_BAR_HEIGHT = 64;
export const FLOATING_TAB_BAR_BOTTOM_MARGIN = 12;
/** Bottom padding screen content should reserve so it doesn't sit under the floating tab bar. */
export const FLOATING_TAB_BAR_CLEARANCE =
  FLOATING_TAB_BAR_HEIGHT + FLOATING_TAB_BAR_BOTTOM_MARGIN + 16;

const ROW_HORIZONTAL_PADDING = 8;
const TAB_ITEM_HEIGHT = 48;
// Let the selected background bleed into neighboring tab slots a little so the
// active state feels broader than the icon + label column.
const INDICATOR_HORIZONTAL_OVERLAP = 3;
const INDICATOR_HEIGHT = 56;
const INDICATOR_TOP = (FLOATING_TAB_BAR_HEIGHT - INDICATOR_HEIGHT) / 2;
const INDICATOR_SPRING = { damping: 20, stiffness: 220, mass: 0.6 };
const INDICATOR_COLOR = {
  light: 'rgba(0, 0, 0, 0.09)',
  dark: 'rgba(255, 255, 255, 0.16)',
};
const TAB_BAR_FADE_COLOR = {
  light: '#FFFFFF',
  dark: '#0A0A0A',
};
const TAB_BAR_FADE_EXTRA_HEIGHT = 36;
const TAB_ICON_SIZE = 25;
const TAB_PRESS_SCALE = 1.08;
const TAB_PRESS_SPRING = { damping: 14, stiffness: 420, mass: 0.45 };

// Ionicons ships real outline/filled pairs, so the selected tab can swap the
// glyph itself instead of faking a "solid" look by filling an outline icon.
type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];
const TAB_ICONS: Record<string, { outline: IoniconsName; filled: IoniconsName }> = {
  index: { outline: 'home-outline', filled: 'home' },
  menu2: { outline: 'search-outline', filled: 'search' },
  menu3: { outline: 'add-circle-outline', filled: 'add-circle' },
  menu4: { outline: 'notifications-outline', filled: 'notifications' },
  menu5: { outline: 'person-outline', filled: 'person' },
};
const DEFAULT_TAB_ICON = TAB_ICONS.index;

function FloatingTabBarImpl({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const theme = THEME[colorScheme ?? 'light'];
  const bottom = insets.bottom + FLOATING_TAB_BAR_BOTTOM_MARGIN;
  const routeCount = state.routes.length;

  const rowWidth = useSharedValue(0);
  const activeIndex = useSharedValue(state.index);

  React.useEffect(() => {
    activeIndex.value = withSpring(state.index, INDICATOR_SPRING);
  }, [state.index, activeIndex]);

  const onRowLayout = React.useCallback(
    (event: LayoutChangeEvent) => {
      rowWidth.value = event.nativeEvent.layout.width;
    },
    [rowWidth]
  );

  const indicatorStyle = useAnimatedStyle(() => {
    const usableWidth = Math.max(rowWidth.value - ROW_HORIZONTAL_PADDING * 2, 0);
    const slot = usableWidth / routeCount;
    const width = Math.max(slot + INDICATOR_HORIZONTAL_OVERLAP * 2, 0);
    const slotCenter = ROW_HORIZONTAL_PADDING + activeIndex.value * slot + slot / 2;
    return {
      width,
      transform: [{ translateX: slotCenter - width / 2 }],
    };
  });

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

  const fadeColor = colorScheme === 'dark' ? TAB_BAR_FADE_COLOR.dark : TAB_BAR_FADE_COLOR.light;

  return (
    <>
      <View
        pointerEvents="none"
        style={[
          styles.fade,
          { height: bottom + FLOATING_TAB_BAR_HEIGHT + TAB_BAR_FADE_EXTRA_HEIGHT },
        ]}>
        <Svg width="100%" height="100%" preserveAspectRatio="none" style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id="tab-bar-fade" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={fadeColor} stopOpacity="0" />
              <Stop offset="0.42" stopColor={fadeColor} stopOpacity="0.68" />
              <Stop offset="1" stopColor={fadeColor} stopOpacity="0.88" />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#tab-bar-fade)" />
        </Svg>
      </View>
      <View pointerEvents="box-none" style={[styles.wrapper, { bottom }]}>
        <View
          style={[
            styles.surface,
            {
              backgroundColor:
                colorScheme === 'dark' ? 'rgba(38, 38, 38, 0.85)' : 'rgba(255, 255, 255, 0.85)',
              borderColor:
                colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
            },
          ]}>
          <View style={styles.row} onLayout={onRowLayout}>
            <Animated.View
              pointerEvents="none"
              style={[
                styles.indicator,
                indicatorStyle,
                {
                  backgroundColor:
                    colorScheme === 'dark' ? INDICATOR_COLOR.dark : INDICATOR_COLOR.light,
                },
              ]}
            />
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const isFocused = state.index === index;
              const label =
                typeof options.tabBarLabel === 'string'
                  ? options.tabBarLabel
                  : (options.title ?? route.name);

              return (
                <TabBarButton
                  key={route.key}
                  routeKey={route.key}
                  routeName={route.name}
                  label={label}
                  icon={TAB_ICONS[route.name] ?? DEFAULT_TAB_ICON}
                  isFocused={isFocused}
                  activeColor={theme.foreground}
                  inactiveColor={theme.foreground}
                  onPress={handlePress}
                  onLongPress={handleLongPress}
                />
              );
            })}
          </View>
        </View>
      </View>
    </>
  );
}

type TabBarButtonProps = {
  routeKey: string;
  routeName: string;
  label: string;
  icon: { outline: IoniconsName; filled: IoniconsName };
  isFocused: boolean;
  activeColor: string;
  inactiveColor: string;
  onPress: (routeKey: string, routeName: string) => void;
  onLongPress: (routeKey: string) => void;
};

const TabBarButton = React.memo(function TabBarButton({
  routeKey,
  routeName,
  label,
  icon,
  isFocused,
  activeColor,
  inactiveColor,
  onPress,
  onLongPress,
}: TabBarButtonProps) {
  const handlePress = React.useCallback(
    () => onPress(routeKey, routeName),
    [onPress, routeKey, routeName]
  );
  const handleLongPress = React.useCallback(() => onLongPress(routeKey), [onLongPress, routeKey]);
  const pressScale = useSharedValue(1);
  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));
  const handlePressIn = React.useCallback(() => {
    pressScale.value = withSpring(TAB_PRESS_SCALE, TAB_PRESS_SPRING);
  }, [pressScale]);
  const handlePressOut = React.useCallback(() => {
    pressScale.value = withSpring(1, TAB_PRESS_SPRING);
  }, [pressScale]);
  const color = isFocused ? activeColor : inactiveColor;

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLongPress={handleLongPress}
      accessibilityRole="button"
      accessibilityState={{ selected: isFocused }}
      accessibilityLabel={label}
      hitSlop={8}
      style={styles.buttonWrapper}>
      <Animated.View style={[styles.item, pressStyle]}>
        <Ionicons
          name={isFocused ? icon.filled : icon.outline}
          size={TAB_ICON_SIZE}
          color={color}
        />
        <Text numberOfLines={1} style={{ color }} className="text-[11px] font-medium">
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  fade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  wrapper: {
    position: 'absolute',
    left: 24,
    right: 24,
  },
  surface: {
    height: FLOATING_TAB_BAR_HEIGHT,
    borderRadius: 32,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    elevation: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  indicator: {
    position: 'absolute',
    top: INDICATOR_TOP,
    left: 0,
    height: INDICATOR_HEIGHT,
    borderRadius: INDICATOR_HEIGHT / 2,
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    height: TAB_ITEM_HEIGHT,
    width: '100%',
  },
});

export const FloatingTabBar = React.memo(FloatingTabBarImpl);
