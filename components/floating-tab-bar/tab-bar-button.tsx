import { Text } from '@/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { TAB_ICON_SIZE, TAB_ITEM_HEIGHT, TAB_PRESS_SCALE, TAB_PRESS_SPRING } from './constants';
import type { TabIconConfig } from './tab-icons';

type TabBarButtonProps = {
  routeKey: string;
  routeName: string;
  label: string;
  icon: TabIconConfig;
  isFocused: boolean;
  activeColor: string;
  inactiveColor: string;
  onPress: (routeKey: string, routeName: string) => void;
  onLongPress: (routeKey: string) => void;
};

function TabBarButtonImpl({
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
  const pressScale = useSharedValue(1);
  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));

  const handlePress = React.useCallback(
    () => onPress(routeKey, routeName),
    [onPress, routeKey, routeName]
  );
  const handleLongPress = React.useCallback(() => onLongPress(routeKey), [onLongPress, routeKey]);
  const handlePressIn = React.useCallback(() => {
    pressScale.value = withSpring(TAB_PRESS_SCALE, TAB_PRESS_SPRING);
  }, [pressScale]);
  const handlePressOut = React.useCallback(() => {
    pressScale.value = withSpring(1, TAB_PRESS_SPRING);
  }, [pressScale]);
  const color = isFocused ? activeColor : inactiveColor;
  const showLabel = icon.showLabel ?? true;

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
          size={icon.size ?? TAB_ICON_SIZE}
          color={color}
        />
        {showLabel && (
          <Text numberOfLines={1} style={{ color }} className="text-[11px] font-medium">
            {label}
          </Text>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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

export const TabBarButton = React.memo(TabBarButtonImpl);
