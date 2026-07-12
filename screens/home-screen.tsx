import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { HeartButton } from '@/components/ui/heart-button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { FLOATING_TAB_BAR_CLEARANCE } from '@/components/floating-tab-bar/constants';
import { useBrandColor } from '@/lib/theme';
import { cn } from '@/lib/utils';
import { Link } from 'expo-router';
import { BellIcon, ChevronRightIcon, SearchIcon } from 'lucide-react-native';
import * as React from 'react';
import { Image, type ImageSourcePropType, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';

type Baby = {
  id: string;
  name: string;
  dday: number;
  weight: string;
  height: string;
  image: ImageSourcePropType;
};

type Tag = { id: string; label: string; selected?: boolean };

type ContentItem = {
  id: string;
  title: string;
  author: string;
  likes: number;
  image: ImageSourcePropType;
};

type Product = {
  id: string;
  brand: string;
  name: string;
  discount: string;
  price: string;
  image: ImageSourcePropType;
  liked?: boolean;
};

type Experience = {
  id: string;
  title: string;
  location: string;
  brand: string;
  badge: '예약가능' | '마감임박';
  image: ImageSourcePropType;
};

type Mentor = { id: string; name: string; image: ImageSourcePropType };

type Post = { id: string; title: string; comments: number; likes: number };

const BABIES: Baby[] = [
  {
    id: '1',
    name: '이준이',
    dday: 186,
    weight: '7.8kg',
    height: '68cm',
    image: require('@/assets/images/home/baby-leejun.png'),
  },
  {
    id: '2',
    name: '하은이',
    dday: 920,
    weight: '13.2kg',
    height: '92cm',
    image: require('@/assets/images/home/baby-haeun.png'),
  },
];

const TAGS: Tag[] = [
  { id: '1', label: '#신생아', selected: true },
  { id: '2', label: '#이유식' },
  { id: '3', label: '#카시트' },
  { id: '4', label: '#유모차' },
  { id: '5', label: '#수면교육' },
];

const CONTENTS: ContentItem[] = [
  {
    id: '1',
    title: '밤중수유 루틴, 이렇게 편해졌어요',
    author: 'say_mom',
    likes: 342,
    image: require('@/assets/images/home/content-night-feeding.png'),
  },
  {
    id: '2',
    title: '6개월 이유식 초기 세팅 리스트',
    author: 'little_table',
    likes: 218,
    image: require('@/assets/images/home/content-weaning.png'),
  },
  {
    id: '3',
    title: '카시트 안전 체크리스트',
    author: 'safe_drive',
    likes: 187,
    image: require('@/assets/images/home/content-car-seat.png'),
  },
];

const PRODUCTS: Product[] = [
  {
    id: '1',
    brand: '라라베베',
    name: '전연령 카시트 세이프 3',
    discount: '32%',
    price: '129,000원',
    image: require('@/assets/images/home/product-car-seat-v2.png'),
  },
  {
    id: '2',
    brand: '소보송',
    name: '유기농 전연령 이유식 세트',
    discount: '15%',
    price: '38,900원',
    image: require('@/assets/images/home/product-weaning-set-v2.png'),
  },
  {
    id: '3',
    brand: '보노보노',
    name: '신생아 아기띠 세트',
    discount: '20%',
    price: '85,000원',
    image: require('@/assets/images/home/product-baby-carrier.png'),
  },
];

const EXPERIENCES: Experience[] = [
  {
    id: '1',
    title: '뉴본 카시트 3일 체험단',
    location: '서울 강남',
    brand: '브랜드 라라베베',
    badge: '예약가능',
    image: require('@/assets/images/home/experience-car-seat.png'),
  },
  {
    id: '2',
    title: '유모차 시승 클래스',
    location: '온라인',
    brand: '브랜드 뽀득',
    badge: '마감임박',
    image: require('@/assets/images/home/experience-stroller.png'),
  },
];

const MENTORS: Mentor[] = [
  { id: '1', name: '수면코치 지은', image: require('@/assets/images/home/mentor-sleep-coach.png') },
  {
    id: '2',
    name: '이유식쌤 나라',
    image: require('@/assets/images/home/mentor-weaning-teacher.png'),
  },
  { id: '3', name: '육아템리뷰', image: require('@/assets/images/home/mentor-reviewer.png') },
  { id: '4', name: '소아과 의사', image: require('@/assets/images/home/mentor-pediatrician.png') },
];

const POSTS: Post[] = [
  { id: '1', title: '카시트 새거 vs 중고, 뭐가 나을까요?', comments: 48, likes: 156 },
  { id: '2', title: '이유식 초기, 진짜 이렇게까지 해야하나요 (후기)', comments: 31, likes: 98 },
];

const SCREEN_PADDING = 20;
const CONTENT_CARD_WIDTH = 220;
const CONTENT_CARD_HEIGHT = 200;
const PRODUCT_CARD_WIDTH = 150;
const EXPERIENCE_CARD_WIDTH = 210;
const EXPERIENCE_IMAGE_HEIGHT = 130;
const MENTOR_WIDTH = 76;

export default function HomeScreen() {
  const [activeBabyIndex, setActiveBabyIndex] = React.useState(0);
  const activeBaby = BABIES[activeBabyIndex];

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-brand-cream">
      <Header />
      <ScrollView
        contentContainerStyle={{ paddingBottom: FLOATING_TAB_BAR_CLEARANCE }}
        showsVerticalScrollIndicator={false}>
        <BabyChips babies={BABIES} activeIndex={activeBabyIndex} onSelect={setActiveBabyIndex} />
        <ActiveBabyCard baby={activeBaby} />
        <TagPills tags={TAGS} />
        <SectionTitle title="지금 뜨는 콘텐츠" className="mb-3 px-5" />
        <ContentCarousel items={CONTENTS} />
        <SectionTitle title="채원님을 위한 추천 상품" action="더보기" className="mb-3 px-5" />
        <ProductCarousel items={PRODUCTS} />
        <SectionTitle title="인기 체험" className="mb-3 px-5" />
        <ExperienceCarousel items={EXPERIENCES} />
        <SectionTitle title="팔로우한 멘토" className="mb-3 px-5" />
        <MentorList items={MENTORS} />
        <SectionTitle title="커뮤니티 인기글" className="mb-3 px-5" />
        <PostList items={POSTS} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Header() {
  const palette = useBrandColor();
  return (
    <View
      className="flex-row items-center justify-between pb-3.5 pt-4"
      style={{ paddingHorizontal: SCREEN_PADDING }}>
      <Text
        className="text-xl font-extrabold tracking-tight text-brand"
        style={{ letterSpacing: -0.3 }}>
        멘토리
      </Text>
      <View className="flex-row items-center" style={{ gap: 14 }}>
        <Link href="/search-input" asChild>
          <Pressable hitSlop={10} accessibilityRole="button" accessibilityLabel="검색">
            <Icon as={SearchIcon} size={22} color={palette.brand} />
          </Pressable>
        </Link>
        <Pressable hitSlop={10} accessibilityRole="button" accessibilityLabel="알림">
          <Icon as={BellIcon} size={22} color={palette.brand} />
        </Pressable>
      </View>
    </View>
  );
}

function BabyChips({
  babies,
  activeIndex,
  onSelect,
}: {
  babies: Baby[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const palette = useBrandColor();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 10,
        paddingHorizontal: SCREEN_PADDING,
        paddingTop: 4,
        paddingBottom: 14,
      }}>
      {babies.map((baby, index) => {
        const active = index === activeIndex;
        return (
          <Pressable
            key={baby.id}
            onPress={() => onSelect(index)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={`${baby.name} 선택`}
            className="flex-row items-center rounded-full"
            style={{
              gap: 8,
              paddingLeft: 7,
              paddingRight: 14,
              paddingVertical: 7,
              backgroundColor: active ? palette.surface : 'transparent',
              borderWidth: 1.5,
              borderColor: active ? palette.brand : palette.muted,
              borderStyle: active ? 'solid' : 'solid',
            }}>
            <Avatar alt={baby.name} className="size-[30px]">
              <AvatarImage source={baby.image} />
            </Avatar>
            <Text
              className="text-[12.5px] font-bold"
              style={{ color: active ? palette.brand : palette.mutedText }}>
              {baby.name}
            </Text>
          </Pressable>
        );
      })}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="아이 추가"
        className="flex-row items-center rounded-full"
        style={{
          gap: 6,
          paddingHorizontal: 14,
          paddingVertical: 7,
          borderWidth: 1.5,
          borderColor: palette.muted,
          borderStyle: 'dashed',
        }}>
        <Text className="text-base leading-none" style={{ color: palette.brand }}>
          +
        </Text>
        <Text className="text-[12.5px] font-bold" style={{ color: palette.brand }}>
          아이 추가
        </Text>
      </Pressable>
    </ScrollView>
  );
}

function ActiveBabyCard({ baby }: { baby: Baby }) {
  const palette = useBrandColor();
  return (
    <View
      className="rounded-3xl bg-card p-4"
      style={{
        marginHorizontal: SCREEN_PADDING,
        marginBottom: 22,
        shadowColor: palette.brand,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 10,
        elevation: 2,
      }}>
      <Link href="/baby-detail" asChild>
        <Pressable accessibilityRole="button" accessibilityLabel={`${baby.name} 상세`}>
          <View className="flex-row items-center" style={{ gap: 12 }}>
            <Avatar alt={baby.name} className="size-[52px]">
              <AvatarImage source={baby.image} />
            </Avatar>
            <View className="flex-1">
              <View className="flex-row items-baseline" style={{ gap: 6 }}>
                <Text className="text-sm font-bold text-foreground">{baby.name}</Text>
                <Text className="text-sm font-extrabold text-brand-accent">D+{baby.dday}</Text>
              </View>
              <Text className="mt-0.5 text-[11.5px] text-muted-foreground">
                최근 기록 · 몸무게 {baby.weight} · 키 {baby.height}
              </Text>
            </View>
            <Icon as={ChevronRightIcon} size={18} className="text-muted-foreground" />
          </View>
        </Pressable>
      </Link>
      <View className="mt-3 flex-row" style={{ gap: 8 }}>
        <QuickAction emoji="😴" label="어제 수면" />
        <QuickAction emoji="🍼" label="그제 수유" />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="일기 쓰기"
          className="flex-row items-center justify-center rounded-xl py-2"
          style={{ flex: 1.4, gap: 4, backgroundColor: palette.brand }}>
          <Text className="text-[13px]">📝</Text>
          <Text className="text-[11.5px] font-bold text-primary-foreground">일기 쓰기</Text>
          <Icon as={ChevronRightIcon} size={13} color={palette.onBrand} />
        </Pressable>
      </View>
    </View>
  );
}

function QuickAction({ emoji, label }: { emoji: string; label: string }) {
  const palette = useBrandColor();
  return (
    <View
      className="flex-1 items-center justify-center rounded-xl py-2"
      style={{ backgroundColor: palette.stripeBg }}>
      <Text className="text-base">{emoji}</Text>
      <Text className="mt-0.5 text-[10px] text-muted-foreground">{label}</Text>
    </View>
  );
}

function TagPills({ tags }: { tags: Tag[] }) {
  const palette = useBrandColor();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 8,
        paddingHorizontal: SCREEN_PADDING,
        marginBottom: 22,
      }}>
      {tags.map((tag) => {
        const selected = tag.selected ?? false;
        return (
          <View
            key={tag.id}
            className="rounded-full px-3.5 py-1.5"
            style={{ backgroundColor: selected ? palette.brand : palette.accentSoft }}>
            <Text
              className="text-[12.5px] font-semibold"
              style={{ color: selected ? palette.onBrand : palette.accentText }}>
              {tag.label}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

function SectionTitle({
  title,
  action,
  className,
}: {
  title: string;
  action?: string;
  className?: string;
}) {
  return (
    <View className={cn('flex-row items-baseline justify-between', className)}>
      <Text className="text-[15px] font-bold text-foreground">{title}</Text>
      {action ? (
        <Pressable accessibilityRole="button" accessibilityLabel={action}>
          <Text className="text-[11.5px] font-semibold text-brand-accent">{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function ContentCarousel({ items }: { items: ContentItem[] }) {
  return (
    <View className="mb-[26px]">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: SCREEN_PADDING,
        }}>
        {items.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}

function ContentCard({ item }: { item: ContentItem }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.title}
      style={{ width: CONTENT_CARD_WIDTH }}>
      <Image
        source={item.image}
        accessibilityLabel={item.title}
        style={{ width: CONTENT_CARD_WIDTH, height: CONTENT_CARD_HEIGHT - 60, borderRadius: 16 }}
      />
      <Text
        className="mt-2.5 text-[13.5px] font-semibold text-foreground"
        style={{ lineHeight: 18 }}
        numberOfLines={2}>
        {item.title}
      </Text>
      <Text className="mt-1 text-[11.5px] text-muted-foreground">
        {item.author} · 좋아요 {item.likes}
      </Text>
    </Pressable>
  );
}

function ProductCarousel({ items }: { items: Product[] }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 10,
        paddingHorizontal: SCREEN_PADDING,
        marginBottom: 26,
      }}>
      {items.map((product) => (
        <ProductCard key={product.id} item={product} />
      ))}
    </ScrollView>
  );
}

function ProductCard({ item }: { item: Product }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.name}
      style={{ width: PRODUCT_CARD_WIDTH }}>
      <View style={{ position: 'relative', width: PRODUCT_CARD_WIDTH, height: PRODUCT_CARD_WIDTH }}>
        <Image
          source={item.image}
          accessibilityLabel={item.name}
          style={{ width: PRODUCT_CARD_WIDTH, height: PRODUCT_CARD_WIDTH, borderRadius: 16 }}
        />
        <HeartButton liked={item.liked} size="sm" />
      </View>
      <Text className="mt-2 text-[11px] text-muted-foreground">{item.brand}</Text>
      <Text
        className="text-[13px] font-semibold text-foreground"
        style={{ lineHeight: 17 }}
        numberOfLines={2}>
        {item.name}
      </Text>
      <View className="mt-0.5 flex-row items-baseline" style={{ gap: 5 }}>
        <Text className="text-[13px] font-extrabold text-brand">{item.discount}</Text>
        <Text className="text-[13.5px] font-bold text-foreground">{item.price}</Text>
      </View>
    </Pressable>
  );
}

function ExperienceCarousel({ items }: { items: Experience[] }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 10,
        paddingHorizontal: SCREEN_PADDING,
        marginBottom: 26,
      }}>
      {items.map((experience) => (
        <ExperienceCard key={experience.id} item={experience} />
      ))}
    </ScrollView>
  );
}

function ExperienceCard({ item }: { item: Experience }) {
  const palette = useBrandColor();
  const isClosing = item.badge === '마감임박';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.title}
      style={{ width: EXPERIENCE_CARD_WIDTH }}>
      <View className="relative">
        <Image
          source={item.image}
          accessibilityLabel={item.title}
          style={{
            width: EXPERIENCE_CARD_WIDTH,
            height: EXPERIENCE_IMAGE_HEIGHT,
            borderRadius: 16,
          }}
        />
        <View
          className="absolute left-2 top-2 rounded-full"
          style={{
            backgroundColor: isClosing ? palette.overlay : palette.accent,
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}>
          <Text className="text-[10.5px] font-bold" style={{ color: '#FFFFFF' }}>
            {item.badge}
          </Text>
        </View>
      </View>
      <Text
        className="mt-2.5 text-[13.5px] font-semibold text-foreground"
        style={{ lineHeight: 18 }}
        numberOfLines={2}>
        {item.title}
      </Text>
      <Text className="mt-0.5 text-[11.5px] text-muted-foreground">
        {item.location} · {item.brand}
      </Text>
    </Pressable>
  );
}

function MentorList({ items }: { items: Mentor[] }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 12,
        paddingHorizontal: SCREEN_PADDING,
        marginBottom: 26,
      }}>
      {items.map((mentor) => (
        <Pressable
          key={mentor.id}
          accessibilityRole="button"
          accessibilityLabel={mentor.name}
          className="items-center"
          style={{ width: MENTOR_WIDTH }}>
          <Avatar alt={mentor.name} className="size-16">
            <AvatarImage source={mentor.image} />
          </Avatar>
          <Text className="mt-1.5 text-[11.5px] font-semibold text-foreground" numberOfLines={1}>
            {mentor.name}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

function PostList({ items }: { items: Post[] }) {
  const palette = useBrandColor();
  return (
    <View className="px-5 pb-6" style={{ gap: 14 }}>
      {items.map((post) => (
        <Pressable
          key={post.id}
          accessibilityRole="button"
          accessibilityLabel={post.title}
          className="rounded-2xl bg-card p-3.5"
          style={{
            shadowColor: palette.brand,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 1,
          }}>
          <Text
            className="text-[13.5px] font-semibold text-foreground"
            style={{ lineHeight: 19 }}
            numberOfLines={2}>
            {post.title}
          </Text>
          <Text className="mt-1.5 text-[11.5px] text-muted-foreground">
            댓글 {post.comments} · 좋아요 {post.likes}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
