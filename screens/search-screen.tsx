import { FLOATING_TAB_BAR_CLEARANCE } from '@/components/floating-tab-bar/constants';
import { PromoAllSheet, type PromoSlide } from '@/components/promo-all-sheet';
import { HeartButton } from '@/components/ui/heart-button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useBrandColor } from '@/lib/theme';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Link } from 'expo-router';
import { ChevronRightIcon, SearchIcon, ShoppingBagIcon } from 'lucide-react-native';
import * as React from 'react';
import {
  Dimensions,
  Image,
  type ImageSourcePropType,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_PADDING = 20;
const PROMO_BG = 'rgba(33, 199, 199, 0.14)';
const PROMO_BORDER = 'rgba(33, 199, 199, 0.3)';
const PROMO_TITLE = '#0a3d3d';
const PROMO_SUBTITLE = '#1a7a7a';
const PROMO_ACCENT = '#21C7C7';
const SCREEN_WIDTH = Dimensions.get('window').width;
const PROMO_AUTO_ADVANCE_MS = 5000;

type Category = { id: string; label: string; image: ImageSourcePropType };
type Product = {
  id: string;
  brand: string;
  name: string;
  discount?: string;
  price: string;
  liked?: boolean;
  image: ImageSourcePropType;
};
type RankedProduct = {
  id: string;
  rank: number;
  brand: string;
  name: string;
  price: string;
  liked?: boolean;
  image: ImageSourcePropType;
};
type RecentlyViewedItem = {
  id: string;
  name: string;
  liked?: boolean;
  image: ImageSourcePropType;
};

const CATEGORIES: Category[] = [
  {
    id: '1',
    label: '기저귀',
    image: require('@/assets/images/shopping/category-diapers-illustrated.png'),
  },
  {
    id: '2',
    label: '이유식',
    image: require('@/assets/images/shopping/category-weaning-illustrated.png'),
  },
  {
    id: '3',
    label: '카시트',
    image: require('@/assets/images/shopping/category-car-seat-illustrated.png'),
  },
  {
    id: '4',
    label: '유모차',
    image: require('@/assets/images/shopping/category-stroller-illustrated.png'),
  },
  {
    id: '5',
    label: '장난감',
    image: require('@/assets/images/shopping/category-toys-illustrated.png'),
  },
  {
    id: '6',
    label: '스킨케어',
    image: require('@/assets/images/shopping/category-sunscreen-illustrated.png'),
  },
];

const POPULAR_PRODUCTS: Product[] = [
  {
    id: '1',
    brand: '라라베베',
    name: '전연령 카시트 세이프 3',
    discount: '32%',
    price: '129,000원',
    liked: false,
    image: require('@/assets/images/home/product-car-seat-v2.png'),
  },
  {
    id: '2',
    brand: '소보송',
    name: '유기농 전연령 이유식 세트',
    discount: '15%',
    price: '38,900원',
    liked: true,
    image: require('@/assets/images/home/product-weaning-set-v2.png'),
  },
];

const NEW_PRODUCTS: Product[] = [
  {
    id: '1',
    brand: '뽀득',
    name: '경량 절충형 유모차',
    price: '259,000원',
    liked: false,
    image: require('@/assets/images/shopping/product-stroller.png'),
  },
  {
    id: '2',
    brand: '라라베베',
    name: '저자극 유아 선크림',
    price: '18,900원',
    liked: false,
    image: require('@/assets/images/shopping/product-sunscreen.png'),
  },
  {
    id: '3',
    brand: '소보송',
    name: '원목 감각놀이 세트',
    price: '42,000원',
    liked: false,
    image: require('@/assets/images/shopping/product-sensory-toys.png'),
  },
];

const RANKING: RankedProduct[] = [
  {
    id: '1',
    rank: 1,
    brand: '라라베베',
    name: '전연령 카시트 세이프 3',
    price: '129,000원',
    liked: true,
    image: require('@/assets/images/home/product-car-seat-v2.png'),
  },
  {
    id: '2',
    rank: 2,
    brand: '소보송',
    name: '유기농 전연령 이유식 세트',
    price: '38,900원',
    liked: false,
    image: require('@/assets/images/home/product-weaning-set-v2.png'),
  },
  {
    id: '3',
    rank: 3,
    brand: '뽀득',
    name: '경량 절충형 유모차',
    price: '259,000원',
    liked: false,
    image: require('@/assets/images/shopping/product-stroller.png'),
  },
];

const RECOMMENDED: Product[] = [
  {
    id: '1',
    brand: '라라베베',
    name: '신생아 속싸개 세트',
    price: '24,900원',
    liked: false,
    image: require('@/assets/images/shopping/product-swaddle-set.png'),
  },
  {
    id: '2',
    brand: '뽀득',
    name: '완달이 젖병 세트',
    price: '31,000원',
    liked: false,
    image: require('@/assets/images/shopping/product-bottle-set.png'),
  },
];

const RECENTLY_VIEWED: RecentlyViewedItem[] = [
  {
    id: '1',
    name: '전연령 카시트 세이프 3',
    liked: false,
    image: require('@/assets/images/home/product-car-seat-v2.png'),
  },
  {
    id: '2',
    name: '경량 절충형 유모차',
    liked: false,
    image: require('@/assets/images/shopping/product-stroller.png'),
  },
  {
    id: '3',
    name: '저자극 유아 선크림',
    liked: false,
    image: require('@/assets/images/shopping/product-sunscreen.png'),
  },
];

export default function ShoppingScreen() {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-brand-cream">
      <Header />
      <ScrollView
        contentContainerStyle={{ paddingBottom: FLOATING_TAB_BAR_CLEARANCE }}
        showsVerticalScrollIndicator={false}>
        <PromoBanner />
        <CategoryStrip items={CATEGORIES} />
        <SectionTitle title="인기 상품" action="더보기" />
        <PopularProductGrid items={POPULAR_PRODUCTS} />
        <SectionTitle title="신상품" action="더보기" />
        <NewProductStrip items={NEW_PRODUCTS} />
        <SectionTitle title="지금 랭킹" action="더보기" />
        <RankingList items={RANKING} />
        <SectionTitle title="채원님을 위한 추천" action="더보기" />
        <RecommendedStrip items={RECOMMENDED} />
        <SectionTitle title="최근 본 상품" />
        <RecentlyViewedStrip items={RECENTLY_VIEWED} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Header() {
  const palette = useBrandColor();
  return (
    <View
      className="bg-brand-cream"
      style={{
        paddingHorizontal: SCREEN_PADDING,
        paddingTop: 18,
        paddingBottom: 14,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text className="text-xl font-extrabold text-brand" style={{ letterSpacing: -0.3 }}>
          쇼핑
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <Link href="/search-input" asChild>
            <Pressable hitSlop={10} accessibilityRole="button" accessibilityLabel="검색">
              <Icon as={SearchIcon} size={22} color={palette.brand} />
            </Pressable>
          </Link>
          <Pressable hitSlop={10} accessibilityRole="button" accessibilityLabel="장바구니">
            <Icon as={ShoppingBagIcon} size={22} color={palette.brand} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function CategoryStrip({ items }: { items: Category[] }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 16,
        paddingHorizontal: SCREEN_PADDING,
        paddingTop: 16,
        paddingBottom: 20,
      }}>
      {items.map((category) => (
        <Pressable
          key={category.id}
          accessibilityRole="button"
          accessibilityLabel={category.label}
          style={{ width: 60, alignItems: 'center' }}>
          <Image
            source={category.image}
            accessibilityLabel={category.label}
            style={{ width: 52, height: 52, borderRadius: 16 }}
          />
          <Text className="mt-1.5 text-[11px] font-semibold text-foreground">{category.label}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const PROMO_SLIDES: PromoSlide[] = [
  {
    id: 'summer',
    image: require('@/assets/images/promo-summer.jpg'),
    title: '베베데코\n냉감패드 1만원대~💙',
    description: '냉감상품[패드·유모차라이너·바디필로우] 🚨최저가🚨',
    textColor: '#FFFFFF',
    descriptionColor: 'rgba(255,255,255,0.92)',
    shadowColor: 'rgba(0,0,0,0.45)',
    accessibilityLabel: '베베데코 냉감패드 기획전',
  },
  {
    id: 'scandi',
    image: require('@/assets/images/promo-scandi.jpg'),
    title: '스칸디맘\nTIME SALE',
    description: 'WOW!! 스와들 1만원대~❗',
    textColor: '#365154',
    descriptionColor: 'rgba(54,81,84,0.78)',
    shadowColor: 'rgba(255,255,255,0.55)',
    accessibilityLabel: '스칸디맘 TIME SALE',
  },
  {
    id: 'lusol',
    image: require('@/assets/images/promo-lusol.jpg'),
    title: '루솔\n7.월.핫.딜',
    description: '이유식 18+2  |  아기과자 800원~',
    textColor: '#FFFFFF',
    descriptionColor: 'rgba(255,255,255,0.85)',
    shadowColor: 'rgba(0,0,0,0.6)',
    accessibilityLabel: '루솔 7월 핫딜',
  },
];

function PromoBanner() {
  const palette = useBrandColor();
  const [realIndex, setRealIndex] = React.useState(0);
  const scrollRef = React.useRef<ScrollView>(null);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const sheetRef = React.useRef<React.ComponentRef<typeof BottomSheetModal>>(null);

  const themedSlides = React.useMemo(
    () => PROMO_SLIDES.map((s) => (s.id === 'scandi' ? { ...s, textColor: palette.brand } : s)),
    [palette]
  );

  const extendedSlides = React.useMemo(
    () => [themedSlides[themedSlides.length - 1], ...themedSlides, themedSlides[0]],
    [themedSlides]
  );

  const presentAllSheet = React.useCallback(() => {
    sheetRef.current?.present();
  }, []);

  const handleAllItemPress = React.useCallback(() => {
    sheetRef.current?.dismiss();
  }, []);

  const handleScrollInit = React.useCallback(() => {
    scrollRef.current?.scrollTo({ x: SCREEN_WIDTH, animated: false });
  }, []);

  const startAutoAdvance = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setRealIndex((prev) => {
        const nextReal = (prev + 1) % PROMO_SLIDES.length;
        scrollRef.current?.scrollTo({
          x: (nextReal + 1) * SCREEN_WIDTH,
          animated: true,
        });
        return nextReal;
      });
    }, PROMO_AUTO_ADVANCE_MS);
  }, []);

  React.useEffect(() => {
    startAutoAdvance();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [startAutoAdvance]);

  const handleMomentumScrollEnd = React.useCallback(
    (event: { nativeEvent: { contentOffset: { x: number } } }) => {
      const extendedIndex = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
      const mappedRealIndex = (extendedIndex - 1 + PROMO_SLIDES.length) % PROMO_SLIDES.length;
      setRealIndex(mappedRealIndex);

      if (extendedIndex === 0) {
        scrollRef.current?.scrollTo({
          x: PROMO_SLIDES.length * SCREEN_WIDTH,
          animated: false,
        });
      } else if (extendedIndex === extendedSlides.length - 1) {
        scrollRef.current?.scrollTo({ x: SCREEN_WIDTH, animated: false });
      }

      startAutoAdvance();
    },
    [extendedSlides.length, startAutoAdvance]
  );

  return (
    <View style={{ marginBottom: 24 }}>
      <View style={{ position: 'relative' }}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onLayout={handleScrollInit}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          scrollEventThrottle={16}
          decelerationRate="fast">
          {extendedSlides.map((slide, index) => (
            <Pressable
              key={`${slide.id}-${index}`}
              accessibilityRole="button"
              accessibilityLabel={slide.accessibilityLabel}
              style={{ width: SCREEN_WIDTH }}>
              <View style={{ marginHorizontal: SCREEN_PADDING }}>
                <View
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: 750 / 910,
                    borderRadius: 18,
                    overflow: 'hidden',
                  }}>
                  <Image
                    source={slide.image}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 16,
                      left: 16,
                      right: 130,
                    }}>
                    <Text
                      className="text-[15px] font-extrabold"
                      style={{
                        color: slide.textColor,
                        lineHeight: 21,
                        textShadowColor: slide.shadowColor,
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 3,
                      }}>
                      {slide.title}
                    </Text>
                    <Text
                      className="mt-1 text-[11.5px] font-medium"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        color: slide.descriptionColor,
                        lineHeight: 16,
                        textShadowColor: slide.shadowColor,
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 2,
                      }}>
                      {slide.description}
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        <View
          pointerEvents="box-none"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            marginHorizontal: SCREEN_PADDING,
          }}>
          <Pressable
            onPress={presentAllSheet}
            hitSlop={6}
            accessibilityRole="button"
            accessibilityLabel={`기획전 전체보기. 현재 ${realIndex + 1} / ${PROMO_SLIDES.length}`}
            style={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 999,
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
              borderColor: 'rgba(255, 255, 255, 0.28)',
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '600',
                color: '#FFFFFF',
                letterSpacing: 0.2,
              }}>
              {realIndex + 1}/{PROMO_SLIDES.length}
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '700',
                color: '#FFFFFF',
                marginLeft: 6,
              }}>
              전체보기
            </Text>
            <Icon
              as={ChevronRightIcon}
              size={11}
              color="#FFFFFF"
              strokeWidth={2.5}
              style={{ marginLeft: 2 }}
            />
          </Pressable>
        </View>
      </View>
      <PromoAllSheet ref={sheetRef} items={themedSlides} onItemPress={handleAllItemPress} />
    </View>
  );
}

function SectionTitle({ title, action }: { title: string; action?: string }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        paddingHorizontal: SCREEN_PADDING,
        marginBottom: 12,
      }}>
      <Text className="text-[15px] font-bold text-foreground">{title}</Text>
      {action ? (
        <Pressable accessibilityRole="button" accessibilityLabel={action}>
          <Text className="text-[11.5px] font-semibold text-brand-accent">{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function PopularProductGrid({ items }: { items: Product[] }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 18,
        paddingHorizontal: SCREEN_PADDING,
        marginBottom: 28,
      }}>
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </View>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href="/product-detail" asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={product.name}
        style={{ flex: 1, gap: 8 }}>
        <View style={{ position: 'relative', width: '100%', aspectRatio: 1 }}>
          <Image
            source={product.image}
            accessibilityLabel={product.name}
            style={{ width: '100%', height: '100%', borderRadius: 16 }}
          />
          <View
            pointerEvents="none"
            className="absolute inset-0 rounded-2xl bg-transparent dark:bg-black/20"
          />
          <HeartButton liked={product.liked} />
        </View>
        <Text className="text-[11px] text-muted-foreground">{product.brand}</Text>
        <Text
          className="text-[13px] font-semibold text-foreground"
          style={{ lineHeight: 17 }}
          numberOfLines={2}>
          {product.name}
        </Text>
        {product.discount ? (
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 5 }}>
            <Text className="text-[13px] font-extrabold text-brand">{product.discount}</Text>
            <Text className="text-[13.5px] font-bold text-foreground">{product.price}</Text>
          </View>
        ) : (
          <Text className="text-[13.5px] font-bold text-foreground">{product.price}</Text>
        )}
      </Pressable>
    </Link>
  );
}

function NewProductStrip({ items }: { items: Product[] }) {
  const palette = useBrandColor();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 10,
        paddingHorizontal: SCREEN_PADDING,
        marginBottom: 28,
      }}>
      {items.map((product) => (
        <Link key={product.id} href="/product-detail" asChild>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={product.name}
            style={{ width: 150 }}>
            <View style={{ position: 'relative', width: '100%' }}>
              <Image
                source={product.image}
                accessibilityLabel={product.name}
                style={{ width: 150, height: 150, borderRadius: 16 }}
              />
              <View
                pointerEvents="none"
                className="absolute inset-0 rounded-2xl bg-transparent dark:bg-black/20"
              />
              <View
                style={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  backgroundColor: palette.brand,
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: 999,
                }}>
                <Text className="text-[10px] font-bold text-primary-foreground">NEW</Text>
              </View>
              <HeartButton liked={product.liked} />
            </View>
            <Text className="mt-2 text-[11px] text-muted-foreground">{product.brand}</Text>
            <Text
              className="text-[13px] font-semibold text-foreground"
              style={{ lineHeight: 17 }}
              numberOfLines={2}>
              {product.name}
            </Text>
            <Text className="mt-0.5 text-[13.5px] font-bold text-foreground">{product.price}</Text>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}

function RankingList({ items }: { items: RankedProduct[] }) {
  return (
    <View
      style={{
        gap: 12,
        paddingHorizontal: SCREEN_PADDING,
        marginBottom: 28,
      }}>
      {items.map((product) => (
        <RankingRow key={product.id} product={product} />
      ))}
    </View>
  );
}

function RankingRow({ product }: { product: RankedProduct }) {
  const isFirst = product.rank === 1;
  const palette = useBrandColor();
  return (
    <Link href="/product-detail" asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${product.rank}위 ${product.name}`}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 14,
          backgroundColor: palette.surface,
          borderWidth: 1,
          borderColor: palette.muted,
          borderRadius: 16,
          padding: 10,
          shadowColor: palette.brand,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 1,
        }}>
        <Text
          className="text-center text-[18px] font-extrabold"
          style={{ width: 20, color: isFirst ? PROMO_ACCENT : palette.mutedText }}>
          {product.rank}
        </Text>
        <View style={{ position: 'relative' }}>
          <Image
            source={product.image}
            accessibilityLabel={product.name}
            style={{ width: 56, height: 56, borderRadius: 16 }}
          />
          <View
            pointerEvents="none"
            className="absolute inset-0 rounded-2xl bg-transparent dark:bg-black/20"
          />
          <HeartButton liked={product.liked} size="xs" />
        </View>
        <View style={{ flex: 1 }}>
          <Text className="text-[13px] font-semibold text-foreground" numberOfLines={1}>
            {product.name}
          </Text>
          <Text className="mt-0.5 text-[11px] text-muted-foreground">{product.brand}</Text>
        </View>
        <Text className="text-[13px] font-bold text-foreground">{product.price}</Text>
      </Pressable>
    </Link>
  );
}

function RecommendedStrip({ items }: { items: Product[] }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 10,
        paddingHorizontal: SCREEN_PADDING,
        marginBottom: 28,
      }}>
      {items.map((product) => (
        <Link key={product.id} href="/product-detail" asChild>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={product.name}
            style={{ width: 150 }}>
            <View style={{ position: 'relative', width: '100%' }}>
              <Image
                source={product.image}
                accessibilityLabel={product.name}
                style={{ width: 150, height: 150, borderRadius: 16 }}
              />
              <View
                pointerEvents="none"
                className="absolute inset-0 rounded-2xl bg-transparent dark:bg-black/20"
              />
              <HeartButton liked={product.liked} />
            </View>
            <Text className="mt-2 text-[11px] text-muted-foreground">{product.brand}</Text>
            <Text
              className="text-[13px] font-semibold text-foreground"
              style={{ lineHeight: 17 }}
              numberOfLines={2}>
              {product.name}
            </Text>
            <Text className="mt-0.5 text-[13.5px] font-bold text-foreground">{product.price}</Text>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}

function RecentlyViewedStrip({ items }: { items: RecentlyViewedItem[] }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 10,
        paddingHorizontal: SCREEN_PADDING,
        marginBottom: 28,
      }}>
      {items.map((product) => (
        <Link key={product.id} href="/product-detail" asChild>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={product.name}
            style={{ width: 120 }}>
            <View style={{ position: 'relative', width: '100%' }}>
              <Image
                source={product.image}
                accessibilityLabel={product.name}
                style={{ width: 120, height: 120, borderRadius: 16 }}
              />
              <View
                pointerEvents="none"
                className="absolute inset-0 rounded-2xl bg-transparent dark:bg-black/20"
              />
              <HeartButton liked={product.liked} size="sm" />
            </View>
            <Text
              className="mt-2 text-[12px] font-semibold text-foreground"
              style={{ lineHeight: 16 }}
              numberOfLines={2}>
              {product.name}
            </Text>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}
