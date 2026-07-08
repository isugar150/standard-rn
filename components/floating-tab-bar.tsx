import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { BlurView } from 'expo-blur';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { Bell, CirclePlus, Compass, House, User, type LucideIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { LayoutChangeEvent, Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export const FLOATING_TAB_BAR_HEIGHT = 64;
export const FLOATING_TAB_BAR_BOTTOM_MARGIN = 12;
/** Suggested bottom padding for screen content so it clears the floating tab bar. */
export const FLOATING_TAB_BAR_CLEARANCE = FLOATING_TAB_BAR_HEIGHT + FLOATING_TAB_BAR_BOTTOM_MARGIN + 16;

const INDICATOR_INSET = 4;
const ROW_HORIZONTAL_PADDING = 8;
const INDICATOR_SPRING = { damping: 20, stiffness: 220, mass: 0.6 };

const TAB_ICONS: Record<string, LucideIcon> = {
  index: House,
  menu2: Compass,
  menu3: CirclePlus,
  menu4: Bell,
  menu5: User,
};

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
    return {
      width: Math.max(slot - INDICATOR_INSET * 2, 0),
      transform: [{ translateX: ROW_HORIZONTAL_PADDING + activeIndex.value * slot + INDICATOR_INSET }],
    };
  });

  const handlePress = React.useCallback(
    (routeKey: string, routeName: string) => {
      const isFocused = state.routes[state.index]?.key === routeKey;
      const event = navigation.emit({ type: 'tabPress', target: routeKey, canPreventDefault: true });
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
    <View pointerEvents="box-none" style={[styles.wrapper, { bottom }]}>
      <TabBarSurface colorScheme={colorScheme ?? 'light'}>
        <View style={styles.row} onLayout={onRowLayout}>
          <Animated.View
            pointerEvents="none"
            style={[styles.indicator, indicatorStyle, { backgroundColor: theme.accent }]}
          />
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;
            const label =
              typeof options.tabBarLabel === 'string' ? options.tabBarLabel : (options.title ?? route.name);

            return (
              <TabBarButton
                key={route.key}
                routeKey={route.key}
                routeName={route.name}
                label={label}
                icon={TAB_ICONS[route.name] ?? Compass}
                isFocused={isFocused}
                activeColor={theme.primary}
                inactiveColor={theme.mutedForeground}
                onPress={handlePress}
                onLongPress={handleLongPress}
              />
            );
          })}
        </View>
      </TabBarSurface>
    </View>
  );
}

type TabBarSurfaceProps = {
  colorScheme: 'light' | 'dark';
  children: React.ReactNode;
};

function TabBarSurface({ colorScheme, children }: TabBarSurfaceProps) {
  if (Platform.OS === 'ios') {
    if (isLiquidGlassAvailable()) {
      return (
        <View style={styles.shadow}>
          <GlassView glassEffectStyle="regular" colorScheme={colorScheme} style={styles.surface}>
            {children}
          </GlassView>
        </View>
      );
    }
    return (
      <View style={styles.shadow}>
        <BlurView
          intensity={80}
          tint={colorScheme === 'dark' ? 'dark' : 'light'}
          style={[styles.surface, styles.blurBorder]}>
          {children}
        </BlurView>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.surface,
        styles.androidSurface,
        {
          backgroundColor: colorScheme === 'dark' ? 'rgba(38, 38, 38, 0.96)' : 'rgba(255, 255, 255, 0.98)',
          borderColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
        },
      ]}>
      {children}
    </View>
  );
}

type TabBarButtonProps = {
  routeKey: string;
  routeName: string;
  label: string;
  icon: LucideIcon;
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
  const handlePress = React.useCallback(() => onPress(routeKey, routeName), [onPress, routeKey, routeName]);
  const handleLongPress = React.useCallback(() => onLongPress(routeKey), [onLongPress, routeKey]);

  return (
    <Pressable
      onPress={handlePress}
      onLongPress={handleLongPress}
      accessibilityRole="button"
      accessibilityState={{ selected: isFocused }}
      accessibilityLabel={label}
      hitSlop={8}
      style={styles.buttonWrapper}>
      {({ pressed }) => (
        <Animated.View
          layout={LinearTransition.duration(220)}
          style={[styles.item, pressed && styles.itemPressed]}>
          <Icon as={icon} size={22} color={isFocused ? activeColor : inactiveColor} />
          {isFocused ? (
            <Animated.View entering={FadeIn.duration(160)} exiting={FadeOut.duration(120)}>
              <Text numberOfLines={1} style={{ color: activeColor }} className="text-xs font-medium">
                {label}
              </Text>
            </Animated.View>
          ) : null}
        </Animated.View>
      )}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 24,
    right: 24,
  },
  shadow: {
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
  },
  surface: {
    height: FLOATING_TAB_BAR_HEIGHT,
    borderRadius: 32,
    overflow: 'hidden',
  },
  androidSurface: {
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 14,
  },
  blurBorder: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  indicator: {
    position: 'absolute',
    top: 8,
    left: 0,
    height: 48,
    borderRadius: 24,
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 48,
    borderRadius: 24,
    paddingHorizontal: 14,
  },
  itemPressed: {
    opacity: 0.6,
  },
});

export const FloatingTabBar = React.memo(FloatingTabBarImpl);
