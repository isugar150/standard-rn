import * as React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
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
  const defaultTint = inactiveColor;
  const selectedTint = activeColor;
  const iconSize = icon.size ?? TAB_ICON_SIZE;

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
        <View style={[styles.iconFrame, { width: iconSize, height: iconSize }]}>
          <Image
            source={icon.default}
            resizeMode="contain"
            fadeDuration={0}
            accessibilityIgnoresInvertColors
            style={[
              styles.icon,
              {
                tintColor: defaultTint,
                opacity: isFocused ? 0 : 1,
                width: iconSize,
                height: iconSize,
              },
            ]}
          />
          <Image
            source={icon.selected}
            resizeMode="contain"
            fadeDuration={0}
            accessibilityIgnoresInvertColors
            style={[
              styles.icon,
              {
                tintColor: selectedTint,
                opacity: isFocused ? 1 : 0,
                width: iconSize,
                height: iconSize,
              },
            ]}
          />
        </View>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.78}
          style={[styles.label, { color: isFocused ? selectedTint : defaultTint }, isFocused && styles.focusedLabel]}>
          {label}
        </Text>
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
    justifyContent: 'flex-start',
    height: TAB_ITEM_HEIGHT,
    paddingTop: 4,
    width: '100%',
  },
  iconFrame: {
    position: 'relative',
    flexShrink: 0,
    overflow: 'hidden',
  },
  icon: {
    ...StyleSheet.absoluteFill,
  },
  label: {
    marginTop: 3,
    maxWidth: '100%',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 12,
    textAlign: 'center',
  },
  focusedLabel: {
    fontWeight: '700',
  },
});

export const TabBarButton = React.memo(TabBarButtonImpl);
