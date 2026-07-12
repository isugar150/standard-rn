import { Text } from '@/components/ui/text';
import { BRAND } from '@/lib/theme';
import { cn } from '@/lib/utils';
import { type DimensionValue, View } from 'react-native';
import Svg, { Defs, Line, Pattern, Rect } from 'react-native-svg';

type StripePlaceholderProps = {
  label: string;
  height?: DimensionValue;
  width?: DimensionValue;
  square?: boolean;
  aspectRatio?: number;
  circle?: boolean;
};

export function StripePlaceholder({
  label,
  height,
  width,
  square,
  aspectRatio,
  circle,
}: StripePlaceholderProps) {
  const resolvedWidth = width ?? (circle ? 64 : square ? 150 : undefined);
  const resolvedHeight = height ?? (circle ? 64 : square ? 150 : 140);

  return (
    <View
      className={cn('overflow-hidden', circle ? 'rounded-full' : 'rounded-2xl')}
      style={{
        width: resolvedWidth,
        height: resolvedHeight,
        aspectRatio: typeof resolvedWidth === 'number' ? undefined : aspectRatio,
        backgroundColor: BRAND.stripeBg,
        borderWidth: circle ? 1.5 : 1,
        borderColor: BRAND.stripeBorder,
      }}>
      <Svg width="100%" height="100%">
        <Defs>
          <Pattern
            id="stripe-pattern"
            patternUnits="userSpaceOnUse"
            width="12"
            height="12"
            patternTransform="rotate(45)">
            <Line
              x1="0"
              y1="0"
              x2="0"
              y2="12"
              stroke="rgba(54, 81, 84, 0.18)"
              strokeWidth="6"
            />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#stripe-pattern)" />
      </Svg>
      <View className="absolute inset-0 items-center justify-center">
        <Text
          className="text-[10px] font-medium"
          style={{ color: 'rgba(54, 81, 84, 0.55)' }}>
          {label}
        </Text>
      </View>
    </View>
  );
}