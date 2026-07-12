import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import {
  type ImageSourcePropType,
  Image,
  Pressable,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type PromoSlide = {
  id: string;
  image: ImageSourcePropType;
  title: string;
  description: string;
  textColor: string;
  descriptionColor: string;
  shadowColor: string;
  accessibilityLabel: string;
};

type PromoAllSheetProps = {
  items: PromoSlide[];
  /**
   * Called when a slide card inside the sheet is tapped.
   * Caller typically dismisses the sheet (and may navigate later).
   */
  onItemPress?: (id: string) => void;
};

export const PromoAllSheet = React.forwardRef<
  React.ComponentRef<typeof BottomSheetModal>,
  PromoAllSheetProps
>(function PromoAllSheet({ items, onItemPress }, ref) {
  const { colorScheme } = useColorScheme();
  const theme = THEME[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();

  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
      />
    ),
    []
  );

  const handleItemPress = React.useCallback(
    (id: string) => {
      onItemPress?.(id);
    },
    [onItemPress]
  );

  return (
    <BottomSheetModal
      ref={ref}
      topInset={insets.top}
      snapPoints={['85%']}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: theme.card }}
      handleIndicatorStyle={{ backgroundColor: theme.mutedForeground }}>
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="px-5 pb-4">
          <Text variant="h4" className="font-extrabold">
            기획전
          </Text>
          <Text className="mt-1 text-[12px] text-muted-foreground">
            진행 중인 캠페인을 한눈에 확인하세요
          </Text>
        </View>
        <View className="gap-3 px-5">
          {items.map((item) => (
            <Pressable
              key={item.id}
              accessibilityRole="button"
              accessibilityLabel={item.accessibilityLabel}
              onPress={() => handleItemPress(item.id)}
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: 750 / 910,
                borderRadius: 18,
                overflow: 'hidden',
                backgroundColor: theme.muted,
              }}>
              <Image
                source={item.image}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 14,
                  left: 14,
                  right: 14,
                }}>
                <Text
                  className="text-[15px] font-extrabold"
                  style={{
                    color: item.textColor,
                    lineHeight: 21,
                    textShadowColor: item.shadowColor,
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 3,
                  }}>
                  {item.title}
                </Text>
                <Text
                  className="mt-1 text-[11.5px] font-medium"
                  style={{
                    color: item.descriptionColor,
                    lineHeight: 16,
                    textShadowColor: item.shadowColor,
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 2,
                  }}>
                  {item.description}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});
