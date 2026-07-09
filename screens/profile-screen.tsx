import { CommonMenuHeader } from '@/components/common-menu-header';
import { FLOATING_TAB_BAR_CLEARANCE } from '@/components/floating-tab-bar/constants';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { usePosts } from '@/hooks/use-posts';
import { useFavoritesStore } from '@/store/favorites-store';
import {
  BellIcon,
  BookmarkIcon,
  ChevronRightIcon,
  FileTextIcon,
  GiftIcon,
  HeartIcon,
  PlusIcon,
} from 'lucide-react-native';
import * as React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const PROFILE_NAME = 'WWIT';
const FOLLOWER_COUNT = 1;
const FOLLOWING_COUNT = 2;
const SCRAPBOOK_COUNT = 17;
const POINT_BALANCE = 100;

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { data: posts, isPending } = usePosts();
  const favoriteCount = useFavoritesStore((state) => state.favoriteIds.length);
  const myPosts = React.useMemo(() => posts?.filter((post) => post.userId === 1) ?? [], [posts]);

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
      <CommonMenuHeader />
      <ScrollView
        contentContainerStyle={
          Platform.OS === 'ios'
            ? styles.content
            : [styles.content, { paddingBottom: insets.bottom + FLOATING_TAB_BAR_CLEARANCE }]
        }>
        <View className="gap-8">
          <View className="gap-4">
            <View className="flex-row items-center gap-4">
              <Avatar alt={PROFILE_NAME} className="size-16">
                <AvatarFallback>
                  <Text className="text-xl font-semibold">{PROFILE_NAME.charAt(0)}</Text>
                </AvatarFallback>
              </Avatar>
              <View className="gap-1.5">
                <Text variant="h4" className="border-0 pb-0">
                  {PROFILE_NAME}
                </Text>
                <View className="flex-row items-center gap-2">
                  <Text className="text-sm text-muted-foreground">팔로워 {FOLLOWER_COUNT}</Text>
                  <Separator orientation="vertical" className="h-3" />
                  <Text className="text-sm text-muted-foreground">팔로잉 {FOLLOWING_COUNT}</Text>
                </View>
              </View>
            </View>

            <Pressable className="flex-row items-center justify-center gap-2 rounded-xl bg-primary/10 py-3 active:opacity-70">
              <Icon as={GiftIcon} className="size-4 text-primary" />
              <Text className="text-sm font-semibold text-primary">친구 초대하고 5,000P 받기</Text>
            </Pressable>
          </View>

          <View className="flex-row items-center justify-around">
            <View className="items-center gap-2">
              <Icon as={BellIcon} className="size-6 text-foreground" />
              <Text className="text-sm">알림</Text>
            </View>
            <View className="items-center gap-2">
              <Icon as={BookmarkIcon} className="size-6 text-foreground" />
              <Text className="text-sm">스크랩북 {SCRAPBOOK_COUNT}</Text>
            </View>
            <View className="items-center gap-2">
              <Icon as={HeartIcon} className="size-6 text-foreground" />
              <Text className="text-sm">좋아요 {favoriteCount}</Text>
            </View>
          </View>

          <View className="gap-3">
            <Pressable className="flex-row items-center justify-between active:opacity-70">
              <Text className="text-base font-semibold">나의 활동</Text>
              <Icon as={ChevronRightIcon} className="size-5 text-muted-foreground" />
            </Pressable>
            <View className="h-16 flex-row items-center rounded-2xl bg-secondary">
              <View className="flex-1 items-center justify-center gap-0.5">
                <Text className="text-base font-bold">{myPosts.length}</Text>
                <Text className="text-xs text-muted-foreground">게시물</Text>
              </View>
              <Separator orientation="vertical" className="h-8" />
              <View className="flex-1 items-center justify-center gap-0.5">
                <Text className="text-base font-bold">0</Text>
                <Text className="text-xs text-muted-foreground">댓글</Text>
              </View>
              <Separator orientation="vertical" className="h-8" />
              <View className="flex-1 items-center justify-center gap-0.5">
                <Text className="text-base font-bold">{POINT_BALANCE}</Text>
                <Text className="text-xs text-muted-foreground">포인트</Text>
              </View>
            </View>
          </View>

          <View className="gap-3">
            <Pressable className="flex-row items-center justify-between active:opacity-70">
              <Text className="text-base font-semibold">게시물 {myPosts.length}</Text>
              <Icon as={ChevronRightIcon} className="size-5 text-muted-foreground" />
            </Pressable>
            <Text className="text-sm text-muted-foreground">
              작성한 게시물을 한 곳에 모아볼 수 있어요.
            </Text>
            {isPending ? (
              <View className="flex-row gap-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="size-28 rounded-2xl" />
                ))}
              </View>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-3">
                  {myPosts.map((post) => (
                    <View key={post.id} className="w-28 gap-2">
                      <View className="size-28 items-center justify-center rounded-2xl bg-secondary">
                        <Icon as={FileTextIcon} className="size-7 text-muted-foreground" />
                      </View>
                      <Text numberOfLines={2} className="text-xs capitalize">
                        {post.title}
                      </Text>
                    </View>
                  ))}
                  <View className="w-28 gap-2">
                    <Pressable className="size-28 items-center justify-center rounded-2xl border border-dashed border-border active:opacity-70">
                      <Icon as={PlusIcon} className="size-6 text-muted-foreground" />
                    </Pressable>
                    <Text className="text-xs text-muted-foreground">새 글 작성</Text>
                  </View>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
