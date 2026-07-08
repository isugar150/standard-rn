import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import type { Post } from '@/hooks/use-posts';
import { THEME } from '@/lib/theme';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { View } from 'react-native';

type PostDetailSheetProps = {
  post: Post | null;
};

export const PostDetailSheet = React.forwardRef<
  React.ComponentRef<typeof BottomSheetModal>,
  PostDetailSheetProps
>(function PostDetailSheet({ post }, ref) {
  const { colorScheme } = useColorScheme();
  const theme = THEME[colorScheme ?? 'light'];

  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5} />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      enableDynamicSizing
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: theme.card }}
      handleIndicatorStyle={{ backgroundColor: theme.mutedForeground }}>
      <BottomSheetView className="gap-4 px-6 pb-10 pt-2">
        {post ? (
          <>
            <Badge variant="secondary" className="self-start">
              <Text>Post #{post.id}</Text>
            </Badge>
            <Text variant="h4" className="capitalize">
              {post.title}
            </Text>
            <Text className="text-muted-foreground capitalize leading-6">{post.body}</Text>
          </>
        ) : (
          <View className="h-24" />
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
});
