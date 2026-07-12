import {
  FLOATING_TAB_BAR_BOTTOM_MARGIN,
  FLOATING_TAB_BAR_CLEARANCE,
  FLOATING_TAB_BAR_HEIGHT,
} from '@/components/floating-tab-bar/constants';
import { StripePlaceholder } from '@/components/stripe-placeholder';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { BRAND } from '@/lib/theme';
import { useRouter } from 'expo-router';
import {
  BookmarkIcon,
  ChevronRightIcon,
  HeartIcon,
  PlusIcon,
  SearchIcon,
} from 'lucide-react-native';
import * as React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const SCREEN_PADDING = 20;
const FAB_SIZE = 52;
const FAB_BOTTOM_OFFSET = 0;
const SHEET_HEIGHT = 480;
const CATEGORY_KEYS = ['전체', '사용후기', '체험후기', '질문', '멘토'] as const;
type CategoryKey = (typeof CATEGORY_KEYS)[number];
type PostCategory = Exclude<CategoryKey, '전체'>;

type BadgeKind = '멘토' | '사용후기' | '체험후기' | '질문';

type Post = {
  id: string;
  author: string;
  time: string;
  category: PostCategory;
  badge?: BadgeKind;
  isHighlighted?: boolean;
  showFollowButton?: boolean;
  title?: string;
  content: string;
  hasPhoto?: boolean;
  photoHeight?: number;
  productTag?: { name: string; emoji: string };
  likes: number;
  comments: number;
  isLinkable?: boolean;
};

const POSTS: Post[] = [
  {
    id: 'mentor-1',
    author: '수면코치 지은',
    time: '3시간 전',
    category: '멘토',
    badge: '멘토',
    isHighlighted: true,
    showFollowButton: true,
    title: '생후 6개월, 밤잠 늘리는 현실적인 방법 3가지',
    content: '',
    hasPhoto: true,
    photoHeight: 150,
    likes: 412,
    comments: 58,
  },
  {
    id: 'review-1',
    author: '채원맘',
    time: '5시간 전',
    category: '사용후기',
    badge: '사용후기',
    content:
      '카시트 새거로 바꾼지 한 달 됐는데 진짜 만족스러워요. 설치도 쉽고 아기가 훨씬 편안해 보여요!',
    hasPhoto: true,
    photoHeight: 170,
    productTag: { name: '전연령 카시트 세이프 3', emoji: 'P' },
    likes: 156,
    comments: 48,
    isLinkable: true,
  },
  {
    id: 'question-1',
    author: '초보아빠',
    time: '어제',
    category: '질문',
    badge: '질문',
    title: '카시트 새거 vs 중고, 뭐가 나을까요? 다들 어떻게 하셨나요',
    content: '안전 관련이라 고민이 많이 되네요...',
    likes: 22,
    comments: 48,
  },
  {
    id: 'experience-1',
    author: '지은맘',
    time: '어제',
    category: '체험후기',
    badge: '체험후기',
    content:
      '뉴본 카시트 3일 체험단 다녀왔어요! 직접 설치까지 해볼 수 있어서 좋았어요.',
    hasPhoto: true,
    photoHeight: 170,
    productTag: { name: '뉴본 카시트 3일 체험단', emoji: 'E' },
    likes: 89,
    comments: 21,
    isLinkable: true,
  },
  {
    id: 'recommendation-1',
    author: '나라쌘',
    time: '2일 전',
    category: '멘토',
    title: '이유식 초기, 진짜 이렇게까지 해야하나요? (경험담)',
    content: '처음이라 다들 걱정 많으실 것 같아 정리해봤어요...',
    likes: 98,
    comments: 31,
  },
];

const BADGE_BG: Record<BadgeKind, string> = {
  멘토: '#21C7C7',
  사용후기: 'rgba(33,199,199,0.16)',
  체험후기: 'rgba(33,199,199,0.16)',
  질문: 'rgba(54,81,84,0.08)',
};

const BADGE_TEXT: Record<BadgeKind, string> = {
  멘토: '#FFFFFF',
  사용후기: '#1a7a7a',
  체험후기: '#1a7a7a',
  질문: '#365154',
};

const BADGE_LABEL: Record<BadgeKind, string> = {
  멘토: '멘토',
  사용후기: '사용후기',
  체험후기: '체험후기',
  질문: '질문',
};

export default function CommunityScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = React.useState<CategoryKey>('전체');
  const [sheetOpen, setSheetOpen] = React.useState(false);

  const visiblePosts = React.useMemo(() => {
    if (activeCategory === '전체') return POSTS;
    return POSTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const fabBottom =
    FLOATING_TAB_BAR_HEIGHT +
    FLOATING_TAB_BAR_BOTTOM_MARGIN +
    insets.bottom +
    FAB_BOTTOM_OFFSET +
    (Platform.OS === 'android' ? 20 : -60);

  return (
    <SafeAreaView
      edges={['top']}
      className="flex-1"
      style={{ backgroundColor: BRAND.cream }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: FLOATING_TAB_BAR_CLEARANCE + FAB_SIZE + 24 }}>
        <Header
        onSearchPress={() => router.push('/search-input' as never)}
        onSavedPress={() => router.push('/profile' as never)}
      />
        <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />

        <View
          style={{
            paddingHorizontal: SCREEN_PADDING,
            paddingTop: 18,
            paddingBottom: 8,
            gap: 14,
          }}>
          {visiblePosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onPress={() => {
                if (post.isLinkable) {
                  router.push('/post-detail' as never);
                }
              }}
            />
          ))}
        </View>
      </ScrollView>

      <Pressable
        onPress={() => setSheetOpen(true)}
        accessibilityRole="button"
        accessibilityLabel="글쓰기"
        style={{
          position: 'absolute',
          bottom: fabBottom,
          right: 20,
          width: FAB_SIZE,
          height: FAB_SIZE,
          borderRadius: FAB_SIZE / 2,
          backgroundColor: BRAND.dark,
          shadowColor: BRAND.dark,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.35,
          shadowRadius: 20,
          elevation: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon as={PlusIcon} size={22} color="#FFFFFF" strokeWidth={2.2} />
      </Pressable>

      <WriteSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </SafeAreaView>
  );
}

function Header({
  onSearchPress,
  onSavedPress,
}: {
  onSearchPress: () => void;
  onSavedPress: () => void;
}) {
  return (
    <View
      style={{
        paddingHorizontal: SCREEN_PADDING,
        paddingTop: 18,
        paddingBottom: 12,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 14,
        }}>
        <Text
          className="text-xl font-extrabold"
          style={{ color: BRAND.dark, letterSpacing: -0.3 }}>
          커뮤니티
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <Pressable
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="검색"
            onPress={onSearchPress}>
            <Icon as={SearchIcon} size={22} color={BRAND.dark} />
          </Pressable>
          <Pressable
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="저장된 항목"
            onPress={onSavedPress}>
            <Icon as={BookmarkIcon} size={22} color={BRAND.dark} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function CategoryFilter({
  active,
  onSelect,
}: {
  active: CategoryKey;
  onSelect: (key: CategoryKey) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 8,
        paddingHorizontal: SCREEN_PADDING,
        paddingBottom: 4,
      }}>
      {CATEGORY_KEYS.map(key => {
        const isActive = key === active;
        return (
          <Pressable
            key={key}
            onPress={() => onSelect(key)}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 999,
              backgroundColor: isActive ? BRAND.dark : 'rgba(54,81,84,0.06)',
            }}>
            <Text
              className="text-[12.5px] font-bold"
              style={{ color: isActive ? '#FFFFFF' : BRAND.dark }}>
              {key}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

function PostCard({ post, onPress }: { post: Post; onPress: () => void }) {
  const isHighlighted = !!post.isHighlighted;
  const containerStyle = isHighlighted
    ? {
        backgroundColor: 'rgba(33,199,199,0.14)',
      }
    : {
        backgroundColor: '#FFFFFF',
        shadowColor: BRAND.dark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 1,
      };

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${post.author}의 글`}
      style={{
        borderRadius: 18,
        padding: 16,
        ...containerStyle,
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <StripePlaceholder
          label={isHighlighted ? 'MENTOR' : 'USER'}
          circle
          width={isHighlighted ? 40 : 36}
          height={isHighlighted ? 40 : 36}
        />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text
              className={isHighlighted ? 'text-[12.5px] font-bold' : 'text-[12.5px] font-bold'}
              style={{ color: '#2a2a2a' }}>
              {post.author}
            </Text>
            {post.badge ? (
              <View
                style={{
                  backgroundColor: BADGE_BG[post.badge],
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 6,
                  marginLeft: 4,
                }}>
                <Text
                  className="text-[9.5px] font-bold"
                  style={{ color: BADGE_TEXT[post.badge] }}>
                  {BADGE_LABEL[post.badge]}
                </Text>
              </View>
            ) : null}
          </View>
          <Text className="mt-0.5 text-[11px]" style={{ color: '#666' }}>
            {post.time}
          </Text>
        </View>
        {post.showFollowButton ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="팔로우"
            style={{
              borderWidth: 1,
              borderColor: 'rgba(54,81,84,0.25)',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 999,
            }}>
            <Text className="text-[11.5px] font-bold" style={{ color: BRAND.dark }}>
              팔로우
            </Text>
          </Pressable>
        ) : null}
      </View>

      {post.title ? (
        <Text
          className={post.content ? 'mt-3 text-[13.5px] font-semibold' : 'mt-3 text-[13.5px] font-semibold'}
          style={{ color: '#2a2a2a', lineHeight: 19 }}>
          {post.title}
        </Text>
      ) : null}

      {post.content ? (
        <Text
          className={post.title ? 'mt-1.5 text-[13px]' : 'mt-3 text-[13px]'}
          style={{ color: '#2a2a2a', lineHeight: 19 }}>
          {post.content}
        </Text>
      ) : null}

      {post.hasPhoto ? (
        <View style={{ marginTop: 10 }}>
          <StripePlaceholder
            label={isHighlighted ? 'CONTENT PHOTO' : post.productTag ? '후기 사진' : '체험 사진'}
            width="100%"
            height={post.photoHeight ?? 170}
          />
        </View>
      ) : null}

      {post.productTag ? (
        <View style={{ marginTop: 12 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              alignSelf: 'flex-start',
              backgroundColor: 'rgba(54,81,84,0.06)',
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 10,
            }}>
            <StripePlaceholder label={post.productTag.emoji} width={20} height={20} />
            <Text className="text-[11.5px] font-semibold" style={{ color: BRAND.dark }}>
              {post.productTag.name}
            </Text>
            <Icon as={ChevronRightIcon} size={12} color={BRAND.dark} />
          </View>
        </View>
      ) : null}

      <View
        style={{
          flexDirection: 'row',
          gap: 14,
          marginTop: 12,
        }}>
        <Text className="text-[11.5px]" style={{ color: '#888' }}>
          ❤️ {post.likes}
        </Text>
        <Text className="text-[11.5px]" style={{ color: '#888' }}>
          💬 {post.comments}
        </Text>
      </View>
    </Pressable>
  );
}

type WriteOption = {
  emoji: string;
  title: string;
  description: string;
  bgClass: 'teal' | 'gray';
};

const WRITE_OPTIONS: WriteOption[] = [
  {
    emoji: '📦',
    title: '사용후기 작성',
    description: '구매한 상품에 대한 후기를 남겨요',
    bgClass: 'teal',
  },
  {
    emoji: '🎟️',
    title: '체험후기 작성',
    description: '참여한 체험에 대한 후기를 남겨요',
    bgClass: 'teal',
  },
  {
    emoji: '❓',
    title: '질문하기',
    description: '궁금한 것을 다른 부모님들께 물어봐요',
    bgClass: 'gray',
  },
  {
    emoji: '✏️',
    title: '자유글 쓰기',
    description: '육아 이야기를 자유롭게 나눠요',
    bgClass: 'gray',
  },
];

function WriteSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const insets = useSafeAreaInsets();
  const progress = useSharedValue(0);
  const dragY = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withTiming(
      open ? 1 : 0,
      {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      },
      finished => {
        'worklet';
        if (finished && !open) {
          dragY.value = 0;
        }
      }
    );
  }, [open, progress, dragY]);

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      'worklet';
      dragY.value = Math.max(0, event.translationY);
    })
    .onEnd(event => {
      'worklet';
      const shouldClose = dragY.value > 100 || event.velocityY > 500;
      if (shouldClose) {
        runOnJS(onClose)();
      } else {
        dragY.value = withSpring(0, { damping: 20, stiffness: 200 });
      }
    });

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: (1 - progress.value) * SHEET_HEIGHT + dragY.value },
    ],
  }));

  return (
    <Animated.View
      pointerEvents={open ? 'auto' : 'none'}
      style={[
        StyleSheet.absoluteFill,
        overlayStyle,
        {
          backgroundColor: 'rgba(10,30,30,0.4)',
          justifyContent: 'flex-end',
          zIndex: 100,
        },
      ]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="글쓰기 옵션 닫기"
        onPress={onClose}
        style={{ flex: 1 }}
      />
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            sheetStyle,
            {
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              paddingHorizontal: SCREEN_PADDING,
              paddingTop: 18,
              paddingBottom:
                Platform.OS === 'android'
                  ? insets.bottom +
                    FLOATING_TAB_BAR_HEIGHT +
                    FLOATING_TAB_BAR_BOTTOM_MARGIN +
                    24
                  : insets.bottom + 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -10 },
              shadowOpacity: 0.15,
              shadowRadius: 30,
              elevation: 20,
            },
        ]}>
        <View
          style={{
            width: 36,
            height: 4,
            backgroundColor: 'rgba(54,81,84,0.2)',
            borderRadius: 2,
            alignSelf: 'center',
            marginBottom: 18,
          }}
        />
        <Text className="text-[15px] font-bold mb-4" style={{ color: '#2a2a2a' }}>
          어떤 글을 쓸까요?
        </Text>
        <View style={{ gap: 10 }}>
          {WRITE_OPTIONS.map(option => {
            const bg = option.bgClass === 'teal' ? 'rgba(33,199,199,0.10)' : 'rgba(54,81,84,0.05)';
            const iconBg = option.bgClass === 'teal' ? '#21C7C7' : BRAND.dark;
            return (
              <Pressable
                key={option.title}
                accessibilityRole="button"
                accessibilityLabel={option.title}
                onPress={onClose}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  padding: 14,
                  borderRadius: 14,
                  backgroundColor: bg,
                }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    backgroundColor: iconBg,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{ fontSize: 18 }}>{option.emoji}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text className="text-[13.5px] font-bold" style={{ color: '#2a2a2a' }}>
                    {option.title}
                  </Text>
                  <Text className="mt-0.5 text-[11.5px]" style={{ color: '#888' }}>
                    {option.description}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}