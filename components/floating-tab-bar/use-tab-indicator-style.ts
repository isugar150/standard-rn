import * as React from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import {
  INDICATOR_HORIZONTAL_OVERLAP,
  INDICATOR_SPRING,
  ROW_HORIZONTAL_PADDING,
} from './constants';

export function useTabIndicatorStyle(activeRouteIndex: number, routeCount: number) {
  const rowWidth = useSharedValue(0);
  const activeIndex = useSharedValue(activeRouteIndex);

  React.useEffect(() => {
    activeIndex.value = withSpring(activeRouteIndex, INDICATOR_SPRING);
  }, [activeRouteIndex, activeIndex]);

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

  return { indicatorStyle, onRowLayout };
}
