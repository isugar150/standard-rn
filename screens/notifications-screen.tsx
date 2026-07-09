import { CommonMenuHeader } from '@/components/common-menu-header';
import { FLOATING_TAB_BAR_CLEARANCE } from '@/components/floating-tab-bar/constants';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { BellIcon, CheckCircle2Icon, MessageCircleIcon, SparklesIcon } from 'lucide-react-native';
import { FlatList, Image, Platform, Pressable, StyleSheet, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type NotificationItem = {
  id: string;
  title: string;
  body: string;
  time: string;
  category: string;
  isUnread?: boolean;
  imageSource?: ImageSourcePropType;
  icon: React.ComponentProps<typeof Icon>['as'];
};

const PUSH_AD_IMAGE = require('@/assets/images/notifications/weekend-deals-push-ad.png');

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: '오늘의 추천 게시글',
    body: '지금 반응이 좋은 동네 맛집 리스트를 확인해 보세요.',
    time: '방금',
    category: '추천',
    isUnread: true,
    imageSource: {
      uri: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=480&q=80',
    },
    icon: SparklesIcon,
  },
  {
    id: '2',
    title: '댓글이 달렸어요',
    body: '작성한 글에 새로운 댓글이 등록되었습니다.',
    time: '12분 전',
    category: '댓글',
    isUnread: true,
    icon: MessageCircleIcon,
  },
  {
    id: '3',
    title: '이미지 푸시 샘플',
    body: '푸시 payload에 이미지가 포함되면 이런 형태로 노출됩니다.',
    time: '1시간 전',
    category: '이미지',
    imageSource: PUSH_AD_IMAGE,
    icon: BellIcon,
  },
  {
    id: '4',
    title: '프로필 설정 완료',
    body: '계정 설정이 정상적으로 저장되었습니다.',
    time: '어제',
    category: '시스템',
    icon: CheckCircle2Icon,
  },
];

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
      <CommonMenuHeader />
      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          Platform.OS === 'ios'
            ? styles.listContent
            : [styles.listContent, { paddingBottom: insets.bottom + FLOATING_TAB_BAR_CLEARANCE }]
        }
        ListHeaderComponent={
          <View className="pb-1">
            <Text className="text-sm text-muted-foreground">
              읽지 않은 알림 {NOTIFICATIONS.filter((item) => item.isUnread).length}개
            </Text>
          </View>
        }
        renderItem={({ item }) => <NotificationRow item={item} />}
      />
    </SafeAreaView>
  );
}

function NotificationRow({ item }: { item: NotificationItem }) {
  return (
    <Pressable className="flex-row gap-3 border-b border-border py-4 active:bg-accent/60">
      <View className="relative">
        <View className="size-11 items-center justify-center rounded-full bg-secondary">
          <Icon as={item.icon} className="size-5 text-foreground" />
        </View>
        {item.isUnread && (
          <View className="absolute right-0 top-0 size-2.5 rounded-full bg-primary" />
        )}
      </View>

      <View className="min-w-0 flex-1 gap-1">
        <View className="flex-row items-center gap-2">
          <Text numberOfLines={1} className="min-w-0 flex-1 text-base font-semibold">
            {item.title}
          </Text>
          <Text className="text-xs text-muted-foreground">{item.time}</Text>
        </View>
        <Text numberOfLines={2} className="text-sm leading-5 text-muted-foreground">
          {item.body}
        </Text>
        <View className="mt-1 flex-row">
          <Badge variant={item.isUnread ? 'default' : 'secondary'}>
            <Text>{item.category}</Text>
          </Badge>
        </View>
      </View>

      {item.imageSource && (
        <Image
          source={item.imageSource}
          resizeMode="cover"
          className="size-16 rounded-md bg-muted"
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
});
