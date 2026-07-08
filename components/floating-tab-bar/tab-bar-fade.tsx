import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import {
  FLOATING_TAB_BAR_HEIGHT,
  TAB_BAR_FADE_COLOR,
  TAB_BAR_FADE_EXTRA_HEIGHT,
} from './constants';

type TabBarFadeProps = {
  bottom: number;
  colorScheme: 'light' | 'dark';
};

function TabBarFadeImpl({ bottom, colorScheme }: TabBarFadeProps) {
  const fadeColor = colorScheme === 'dark' ? TAB_BAR_FADE_COLOR.dark : TAB_BAR_FADE_COLOR.light;

  return (
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
  );
}

const styles = StyleSheet.create({
  fade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export const TabBarFade = React.memo(TabBarFadeImpl);
