import type { BottomTabBarProps } from 'expo-router/js-tabs';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import {
  FLOATING_TAB_BAR_HEIGHT,
  INDICATOR_COLOR,
  INDICATOR_HEIGHT,
  INDICATOR_TOP,
  ROW_HORIZONTAL_PADDING,
} from './constants';
import { TabBarButton } from './tab-bar-button';
import { DEFAULT_TAB_ICON, TAB_ICONS } from './tab-icons';
import { useTabIndicatorStyle } from './use-tab-indicator-style';

type TabBarSurfaceProps = Pick<BottomTabBarProps, 'state' | 'descriptors'> & {
  bottom: number;
  colorScheme: 'light' | 'dark';
  activeColor: string;
  inactiveColor: string;
  onPress: (routeKey: string, routeName: string) => void;
  onLongPress: (routeKey: string) => void;
};

function TabBarSurfaceImpl({
  state,
  descriptors,
  bottom,
  colorScheme,
  activeColor,
  inactiveColor,
  onPress,
  onLongPress,
}: TabBarSurfaceProps) {
  const { indicatorStyle, onRowLayout } = useTabIndicatorStyle(state.index, state.routes.length);

  return (
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
                activeColor={activeColor}
                inactiveColor={inactiveColor}
                onPress={onPress}
                onLongPress={onLongPress}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    paddingHorizontal: ROW_HORIZONTAL_PADDING,
  },
  indicator: {
    position: 'absolute',
    top: INDICATOR_TOP,
    left: 0,
    height: INDICATOR_HEIGHT,
    borderRadius: INDICATOR_HEIGHT / 2,
  },
});

export const TabBarSurface = React.memo(TabBarSurfaceImpl);
