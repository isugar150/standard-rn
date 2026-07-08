import { PostCard } from '@/components/post-card';
import { PostDetailSheet } from '@/components/post-detail-sheet';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { FLOATING_TAB_BAR_CLEARANCE } from '@/components/floating-tab-bar';
import { usePosts, type Post } from '@/hooks/use-posts';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { MoonStarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
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
      <View className="flex-row items-center justify-between px-4 pb-2">
        <Text variant="h3" className="border-0 pb-0">
          메뉴1
        </Text>
        <ThemeToggle />
      </View>
      <FlatList
        data={posts}
        keyExtractor={(post) => String(post.id)}
        contentContainerClassName="gap-3 p-4"
        contentContainerStyle={{ paddingBottom: insets.bottom + FLOATING_TAB_BAR_CLEARANCE }}
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

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button onPressIn={toggleColorScheme} size="icon" variant="ghost" className="rounded-full">
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
}
