import { Icon } from '@/components/ui/icon';
import { useBrandColor } from '@/lib/theme';
import { HeartIcon } from 'lucide-react-native';
import * as React from 'react';
import { Pressable } from 'react-native';

export type HeartButtonSize = 'xs' | 'sm' | 'md';

const HEART_BUTTON_DIMS: Record<HeartButtonSize, { box: number; icon: number; offset: number }> = {
  xs: { box: 18, icon: 9, offset: 4 },
  sm: { box: 22, icon: 12, offset: 6 },
  md: { box: 26, icon: 14, offset: 8 },
};

type HeartButtonProps = {
  liked?: boolean;
  size?: HeartButtonSize;
  onPress?: () => void;
};

/**
 * Circular "찜" (like/wishlist) toggle button meant to be absolutely
 * positioned over the top-right corner of a product image.
 */
export function HeartButton({ liked, size = 'md', onPress }: HeartButtonProps) {
  const palette = useBrandColor();
  const { box, icon, offset } = HEART_BUTTON_DIMS[size];

  return (
    <Pressable
      onPress={
        onPress ??
        (() => {
          /* TODO: 찜 토글 */
        })
      }
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={liked ? '찜 해제' : '찜'}
      style={{
        position: 'absolute',
        top: offset,
        right: offset,
        width: box,
        height: box,
        borderRadius: box / 2,
        backgroundColor: palette.surface,
        borderWidth: 1,
        borderColor: palette.muted,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Icon
        as={HeartIcon}
        size={icon}
        color={liked ? palette.accent : palette.brand}
        fill={liked ? palette.accent : 'transparent'}
        strokeWidth={2}
      />
    </Pressable>
  );
}
