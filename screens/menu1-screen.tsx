import { CommonMenuHeader } from '@/components/common-menu-header';
import { PostCard } from '@/components/post-card';
import { PostDetailSheet } from '@/components/post-detail-sheet';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { FLOATING_TAB_BAR_CLEARANCE } from '@/components/floating-tab-bar';
import { usePosts, type Post } from '@/hooks/use-posts';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import * as React from 'react';
import { FlatList, Platform, RefreshControl, View } from 'react-native';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';

export default function Menu1Screen() {
  const insets = useSafeAreaInsets();
  const { data: posts, isPending, isError, refetch, isRefetching } = usePosts();
  const sheetRef = React.useRef<React.ComponentRef<typeof BottomSheetModal>>(null);
  const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);

  const onCardPress = React.useCallback((post: Post) => {
    setSelectedPost(post);
    sheetRef.current?.present();
  }, []);

  return (
    <SafeAreaView edges={['top']} className="bg-background flex-1">
      <CommonMenuHeader title="메뉴1" />
      <FlatList
        data={posts}
        keyExtractor={(post) => String(post.id)}
        contentContainerClassName="gap-3 p-4"
        contentContainerStyle={
          // NativeTabs (iOS) applies automatic content inset adjustment for the tab bar.
          // The custom FloatingTabBar (Android) is an absolute overlay, so screens must
          // reserve space for it manually.
          Platform.OS === 'ios' ? undefined : { paddingBottom: insets.bottom + FLOATING_TAB_BAR_CLEARANCE }
        }
        renderItem={({ item }) => <PostCard post={item} onPress={onCardPress} />}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        ListEmptyComponent={
          isPending ? (
            <View className="gap-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-28 w-full rounded-xl" />
              ))}
            </View>
          ) : isError ? (
            <View className="items-center gap-3 py-16">
              <Text className="text-muted-foreground">Failed to load posts.</Text>
              <Button variant="outline" onPress={() => refetch()}>
                <Text>Try again</Text>
              </Button>
            </View>
          ) : null
        }
      />
      <PostDetailSheet ref={sheetRef} post={selectedPost} />
    </SafeAreaView>
  );
}
