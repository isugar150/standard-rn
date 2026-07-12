import { StripePlaceholder } from '@/components/stripe-placeholder';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useBrandColor } from '@/lib/theme';
import { useRouter } from 'expo-router';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  ShareIcon,
  ShoppingBagIcon,
  SparklesIcon,
  StarIcon,
  TruckIcon,
  XIcon,
} from 'lucide-react-native';
import * as React from 'react';
import {
  type LayoutChangeEvent,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const SCREEN_PADDING = 20;
const PROMO_ACCENT = '#21C7C7';
const BOTTOM_CTA_VERTICAL = 12;
const HEADER_HEIGHT = 56;
const TABS_OFFSET = HEADER_HEIGHT + 8;
const SECTION_KEYS = ['product', 'review', 'qna', 'seller'] as const;
type SectionKey = (typeof SECTION_KEYS)[number];

type Color = { id: string; label: string };
type Review = {
  id: string;
  rating: number;
  text: string;
  author: string;
  date: string;
  hasPhoto?: boolean;
  likes?: number;
};
type QnA = {
  id: string;
  question: string;
  answer: string;
};
type RelatedProduct = {
  id: string;
  name: string;
  price: string;
};
type Seller = {
  name: string;
  rating: number;
  productCount: number;
  responseRate: string;
  avgShipping: string;
  joinedYear: string;
};

const COLORS: Color[] = [
  { id: 'warm-gray', label: '웜그레이' },
  { id: 'sage', label: '세이지그린' },
  { id: 'cream', label: '크림아이보리' },
];

const REVIEWS: Review[] = [
  {
    id: '1',
    rating: 5,
    text: '설치도 쉽고 아기가 편안해해요. 강력 추천!',
    author: '채원맘',
    date: '3일 전',
    hasPhoto: true,
    likes: 24,
  },
  {
    id: '2',
    rating: 5,
    text: '신생아 때부터 지금까지 잘 쓰고 있어요.',
    author: '지은맘',
    date: '1주 전',
    hasPhoto: false,
    likes: 12,
  },
  {
    id: '3',
    rating: 4,
    text: '전체적으로 만족하지만 가격대가 좀 있는 편이에요.',
    author: '초보맘',
    date: '2주 전',
    hasPhoto: true,
    likes: 7,
  },
];

const RATING_DISTRIBUTION: { stars: number; percent: number }[] = [
  { stars: 5, percent: 82 },
  { stars: 4, percent: 12 },
  { stars: 3, percent: 4 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 1 },
];

const RELATED_PRODUCTS: RelatedProduct[] = [
  { id: '1', name: '경량 절충형 유모차', price: '259,000원' },
  { id: '2', name: '신생아 속싸개 세트', price: '24,900원' },
  { id: '3', name: '완달이 젖병 세트', price: '31,000원' },
];

const QNAS: QnA[] = [
  {
    id: '1',
    question: '100일 아기도 바로 눕혀서 쓸 수 있나요?',
    answer: '네, 신생아용 인서트가 포함되어 있어 눕혀서 사용 가능합니다.',
  },
  {
    id: '2',
    question: '세탁기로 커버 세탁이 가능한가요?',
    answer: '네, 커버는 분리해 손세탁 또는 울코스로 세탁기 사용 가능합니다.',
  },
];

const SELLER: Seller = {
  name: '라라베베 공식스토어',
  rating: 4.9,
  productCount: 128,
  responseRate: '98%',
  avgShipping: '1일',
  joinedYear: '2019~',
};

const UNIT_PRICE = 129000;

export default function ProductDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const palette = useBrandColor();
  const scrollRef = React.useRef<ScrollView>(null);
  const sectionPositions = React.useRef<Record<SectionKey, number>>({
    product: 0,
    review: 0,
    qna: 0,
    seller: 0,
  });

  const [qty, setQty] = React.useState(1);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(COLORS[0].id);
  const [activeTab, setActiveTab] = React.useState<SectionKey>('product');

  const totalPrice = UNIT_PRICE * qty;
  const totalPriceLabel = `${totalPrice.toLocaleString()}원`;

  const onSectionLayout = (key: SectionKey) => (e: LayoutChangeEvent) => {
    sectionPositions.current[key] = e.nativeEvent.layout.y;
  };

  const goToSection = (key: SectionKey) => {
    const y = Math.max(sectionPositions.current[key] - TABS_OFFSET, 0);
    scrollRef.current?.scrollTo({ y, animated: true });
    setActiveTab(key);
  };

  const openSheet = React.useCallback(() => setSheetOpen(true), []);
  const closeSheet = React.useCallback(() => setSheetOpen(false), []);

return (
    <View className="flex-1 bg-brand-cream">
      <SafeAreaView
        edges={['top']}
        className="flex-1 bg-brand-cream">
        <Header onBackPress={() => router.back()} />
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 90 + insets.bottom }}>
          <HeroPhoto />
          <ProductInfo onLikePress={() => setLiked(v => !v)} liked={liked} />
          <AIReviewSummary />
          <ShippingInfo />
          <ColorSizeSelector
            selectedColor={selectedColor}
            onPress={openSheet}
            totalPriceLabel={totalPriceLabel}
            qty={qty}
          />
          <ExperienceCTA onPress={() => undefined} />
          <RelatedProducts />
          <StickyTabs activeTab={activeTab} onSelect={goToSection} />
          <View onLayout={onSectionLayout('product')}>
            <ProductDetailSection />
          </View>
          <View onLayout={onSectionLayout('review')}>
            <ReviewsPreviewSection />
          </View>
          <View onLayout={onSectionLayout('qna')}>
            <QnASection />
          </View>
          <View onLayout={onSectionLayout('seller')}>
            <SellerInfo />
          </View>
        </ScrollView>

        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            paddingBottom: insets.bottom + BOTTOM_CTA_VERTICAL,
            backgroundColor: palette.surface,
            borderTopWidth: 1,
            borderTopColor: palette.subtleStrong,
          }}>
          <BottomCTA
            liked={liked}
            onLikePress={() => setLiked(v => !v)}
            onCartPress={openSheet}
            onBuyPress={openSheet}
          />
        </View>

        <OptionSheet
          open={sheetOpen}
          onClose={closeSheet}
          qty={qty}
          onQtyDec={() => setQty(q => Math.max(q - 1, 1))}
          onQtyInc={() => setQty(q => Math.min(q + 1, 10))}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
          totalPriceLabel={totalPriceLabel}
          onCart={closeSheet}
          onBuy={closeSheet}
        />
      </SafeAreaView>
    </View>
  );
}

function Header({ onBackPress }: { onBackPress: () => void }) {
  const palette = useBrandColor();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SCREEN_PADDING,
        height: HEADER_HEIGHT,
        backgroundColor: palette.cream,
      }}>
      <Pressable
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel="뒤로"
        onPress={onBackPress}>
        <Icon as={ChevronLeftIcon} size={22} color={palette.brand} />
      </Pressable>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <Pressable
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="공유">
          <Icon as={ShareIcon} size={20} color={palette.brand} />
        </Pressable>
        <Pressable
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="장바구니">
          <Icon as={ShoppingBagIcon} size={20} color={palette.brand} />
        </Pressable>
      </View>
    </View>
  );
}

function HeroPhoto() {
  const palette = useBrandColor();
  return (
    <View style={{ position: 'relative' }}>
      <StripePlaceholder label="PRODUCT PHOTO 1:1" width="100%" height={390} square />
      <View
        style={{
          position: 'absolute',
          bottom: 12,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 6,
        }}>
        {[0, 1, 2, 3].map((i) => (
          <View
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: i === 0 ? palette.brand : palette.mutedStrong,
            }}
          />
        ))}
      </View>
    </View>
  );
}

function ProductInfo({
  liked,
  onLikePress,
}: {
  liked: boolean;
  onLikePress: () => void;
}) {
  const palette = useBrandColor();
  return (
    <View style={{ padding: SCREEN_PADDING, paddingBottom: 16 }}>
      <Text className="text-[12px] font-semibold text-muted-foreground">
        라라베베
      </Text>
      <Text
        className="mt-1.5 text-[17px] font-bold text-foreground"
        style={{ lineHeight: 23 }}>
        전연령 카시트 세이프 3 · 신생아부터 사용가능
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          marginTop: 8,
        }}>
        <Icon as={StarIcon} size={14} color={PROMO_ACCENT} fill={PROMO_ACCENT} />
        <Text className="text-[12.5px] font-semibold text-foreground">4.8</Text>
        <Text className="text-[12px] text-muted-foreground">후기 1,204</Text>
        <Pressable
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={liked ? '찜 해제' : '찜'}
          onPress={onLikePress}
          style={{ marginLeft: 'auto' }}>
          <Icon
            as={HeartIcon}
            size={20}
            color={liked ? PROMO_ACCENT : palette.brand}
            fill={liked ? PROMO_ACCENT : 'transparent'}
            strokeWidth={2}
          />
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          gap: 8,
          marginTop: 14,
        }}>
        <Text className="text-[20px] font-extrabold text-brand">
          32%
        </Text>
        <Text
          className="text-[15px]"
          style={{ color: palette.mutedText, textDecorationLine: 'line-through' }}>
          189,000원
        </Text>
      </View>
      <Text
        className="mt-0.5 text-[22px] font-extrabold text-foreground">
        129,000원
      </Text>
    </View>
  );
}

function AIReviewSummary() {
  const palette = useBrandColor();
  return (
    <View
      style={{
        marginHorizontal: SCREEN_PADDING,
        marginBottom: 18,
        borderRadius: 16,
        padding: 16,
        backgroundColor: 'rgba(33, 199, 199, 0.10)',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          marginBottom: 10,
        }}>
        <Icon as={SparklesIcon} size={16} color={palette.brand} />
        <Text className="text-[12.5px] font-extrabold text-brand">
          AI 후기 요약
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 6,
          flexWrap: 'wrap',
          marginBottom: 10,
        }}>
        {['설치 편의성 ★', '신생아~4세 장기사용', '통풍 · 세척 편리'].map((tag) => (
          <View
            key={tag}
            style={{
              backgroundColor: palette.surface,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 999,
            }}>
            <Text className="text-[11px] font-bold" style={{ color: palette.accentText }}>
              {tag}
            </Text>
          </View>
        ))}
      </View>
      <Text className="text-[12.5px] text-foreground" style={{ lineHeight: 18 }}>
        구매자 1,204명의 후기를 분석한 결과, "설치가 쉽고" "오래 쓸 수 있다"는 평이
        가장 많았어요. 다만 일부는 "무게가 무겁다"는 의견도 있었습니다.
      </Text>
    </View>
  );
}

function ShippingInfo() {
  const palette = useBrandColor();
  return (
    <View
      style={{
        marginHorizontal: SCREEN_PADDING,
        marginBottom: 18,
        padding: 14,
        backgroundColor: palette.subtle,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}>
      <Icon as={TruckIcon} size={18} color={palette.brand} />
      <Text className="text-[12.5px] text-foreground" style={{ lineHeight: 18 }}>
        <Text className="font-bold">무료배송</Text> · 오늘 주문 시 내일(7/12) 도착 예정
      </Text>
    </View>
  );
}

function ColorSizeSelector({
  selectedColor,
  onPress,
  totalPriceLabel,
  qty,
}: {
  selectedColor: string;
  onPress: () => void;
  totalPriceLabel: string;
  qty: number;
}) {
  const palette = useBrandColor();
  const selected = COLORS.find((c) => c.id === selectedColor) ?? COLORS[0];
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="색상 및 사이즈 선택"
      style={{
        marginHorizontal: SCREEN_PADDING,
        marginBottom: 22,
        borderWidth: 1,
        borderColor: palette.muted,
        borderRadius: 16,
        padding: 4,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 12,
          paddingVertical: 12,
        }}>
        <Text className="text-[13.5px] text-foreground">색상 / 사이즈 선택</Text>
        <Icon as={ChevronDownIcon} size={16} color={palette.mutedText} />
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: palette.subtleStrong,
          paddingHorizontal: 12,
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text className="text-[13px] font-semibold text-foreground">
            {selected.label} · 기본형
          </Text>
          <Text className="mt-0.5 text-[11.5px] text-muted-foreground">
            129,000원 × {qty}개
          </Text>
        </View>
        <Text className="text-[13.5px] font-bold text-brand">
          {totalPriceLabel}
        </Text>
      </View>
    </Pressable>
  );
}

function ReviewsPreviewSection() {
  const palette = useBrandColor();
  const displayReviews = REVIEWS.slice(0, 3);
  return (
    <View style={{ marginBottom: 24 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          paddingHorizontal: SCREEN_PADDING,
          marginBottom: 12,
        }}>
        <Text className="text-[15px] font-bold text-foreground">
          리뷰{' '}
          <Text className="text-[15px] font-bold text-brand-accent">
            1,204
          </Text>
        </Text>
        <Text className="text-[11.5px] font-semibold text-brand-accent">
          전체보기
        </Text>
      </View>

      <View
        style={{
          marginHorizontal: SCREEN_PADDING,
          marginBottom: 16,
          backgroundColor: palette.surface,
          borderRadius: 16,
          padding: 18,
          flexDirection: 'row',
          gap: 20,
          alignItems: 'center',
          shadowColor: palette.brand,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 1,
        }}>
        <View style={{ alignItems: 'center' }}>
          <Text className="text-[32px] font-extrabold text-brand">
            4.8
          </Text>
          <Text
            className="mt-0.5 text-[11px] font-bold"
            style={{ color: PROMO_ACCENT }}>
            ★★★★★
          </Text>
          <Text className="mt-0.5 text-[10.5px] text-muted-foreground">1,204개</Text>
        </View>
        <View style={{ flex: 1, gap: 6 }}>
          {RATING_DISTRIBUTION.map((row) => (
            <View
              key={row.stars}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text className="w-3 text-[10.5px] text-muted-foreground">
                {row.stars}
              </Text>
              <View
                style={{
                  flex: 1,
                  height: 6,
                  backgroundColor: palette.subtleStrong,
                  borderRadius: 3,
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    width: `${row.percent}%`,
                    height: '100%',
                    backgroundColor: PROMO_ACCENT,
                    borderRadius: 3,
                  }}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={{ paddingHorizontal: SCREEN_PADDING, gap: 12 }}>
        {displayReviews.map((review) => (
          <View
            key={review.id}
            style={{
              backgroundColor: palette.surface,
              borderRadius: 16,
              padding: 14,
              shadowColor: palette.brand,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 1,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <StripePlaceholder label="USER" circle width={32} height={32} />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6 }}>
                  <Text className="text-[12.5px] font-bold text-foreground">
                    {review.author}
                  </Text>
                  <Text className="text-[10.5px] text-muted-foreground">
                    {review.date}
                  </Text>
                </View>
                <Text
                  className="mt-0.5 text-[11px] font-bold"
                  style={{ color: PROMO_ACCENT }}>
                  {'★'.repeat(review.rating)}
                </Text>
              </View>
            </View>
            {review.hasPhoto ? (
              <View style={{ marginTop: 10 }}>
                <StripePlaceholder label="후기 사진" width="100%" height={160} />
              </View>
            ) : null}
            <Text
              className="mt-2.5 text-[13px] text-foreground"
              style={{ lineHeight: 18 }}>
              {review.text}
            </Text>
            <View style={{ flexDirection: 'row', gap: 16, marginTop: 10 }}>
              <Text className="text-[11px] text-muted-foreground">
                좋아요 {review.likes ?? 0}
              </Text>
              <Text className="text-[11px] text-muted-foreground">답글</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function ExperienceCTA({ onPress }: { onPress: () => void }) {
  const palette = useBrandColor();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="체험단 신청"
      style={{
        marginHorizontal: SCREEN_PADDING,
        marginBottom: 28,
        borderRadius: 18,
        padding: 16,
        backgroundColor: PROMO_ACCENT,
        opacity: 0.85,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text className="text-[14px] font-bold" style={{ color: '#0a3d3d' }}>
          직접 체험해보고 구매하세요
        </Text>
        <View
          style={{
            backgroundColor: PROMO_ACCENT,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 999,
          }}>
          <Text className="text-[10.5px] font-bold" style={{ color: '#0a3d3d' }}>
            예약가능
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 12, alignItems: 'center' }}>
        <StripePlaceholder label="체험" width={64} height={64} />
        <View style={{ flex: 1 }}>
          <Text className="text-[13px] font-semibold text-foreground">
            뉴본 카시트 3일 체험단
          </Text>
          <Text className="mt-0.5 text-[11.5px] text-muted-foreground">
            서울 강남 · 라라베베 진행
          </Text>
        </View>
        <Text className="text-[12px] font-bold text-brand">
          신청 →
        </Text>
      </View>
    </Pressable>
  );
}

function RelatedProducts() {
  const palette = useBrandColor();
  return (
    <View style={{ marginBottom: 28 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          paddingHorizontal: SCREEN_PADDING,
          marginBottom: 12,
        }}>
        <Text className="text-[15px] font-bold text-foreground">함께 많이 산 상품</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingHorizontal: SCREEN_PADDING }}>
        {RELATED_PRODUCTS.map((product) => (
          <Pressable
            key={product.id}
            accessibilityRole="button"
            accessibilityLabel={product.name}
            style={{ width: 130 }}>
            <StripePlaceholder label="PRODUCT" width={130} height={130} />
            <Text
              className="mt-2 text-[12px] font-semibold text-foreground"
              style={{ lineHeight: 16 }}>
              {product.name}
            </Text>
            <Text className="mt-0.5 text-[12px] font-bold text-brand">
              {product.price}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

function StickyTabs({
  activeTab,
  onSelect,
}: {
  activeTab: SectionKey;
  onSelect: (key: SectionKey) => void;
}) {
  const palette = useBrandColor();
  const tabs: { key: SectionKey; label: string }[] = [
    { key: 'product', label: '상품정보' },
    { key: 'review', label: '리뷰' },
    { key: 'qna', label: 'Q&A' },
    { key: 'seller', label: '판매자정보' },
  ];
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: palette.surface,
        borderBottomWidth: 1,
        borderBottomColor: palette.subtleStrong,
      }}>
      {tabs.map((tab) => {
        const active = activeTab === tab.key;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onSelect(tab.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: 12,
              borderBottomWidth: 2,
              borderBottomColor: active ? palette.brand : 'transparent',
            }}>
            <Text
              className="text-[13px] font-bold"
              style={{ color: active ? palette.brand : palette.mutedText }}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function ProductDetailSection() {
  return (
    <View style={{ marginBottom: 24 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          paddingHorizontal: SCREEN_PADDING,
          paddingTop: 20,
          marginBottom: 12,
        }}>
        <Text className="text-[15px] font-bold text-foreground">상품 상세 정보</Text>
      </View>
      <View
        style={{
          paddingHorizontal: SCREEN_PADDING,
          paddingBottom: 30,
          gap: 10,
        }}>
        <StripePlaceholder label="상세 이미지 1" width="100%" height={280} />
        <StripePlaceholder label="상세 이미지 2" width="100%" height={280} />
      </View>
    </View>
  );
}

function QnASection() {
  const palette = useBrandColor();
  return (
    <View style={{ marginBottom: 24 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          paddingHorizontal: SCREEN_PADDING,
          marginBottom: 12,
        }}>
        <Text className="text-[15px] font-bold text-foreground">
          Q&amp;A{' '}
          <Text className="text-[15px] font-bold text-brand-accent">
            32
          </Text>
        </Text>
        <Text className="text-[11.5px] font-semibold text-brand-accent">
          문의하기
        </Text>
      </View>
      <View style={{ paddingHorizontal: SCREEN_PADDING, gap: 12 }}>
        {QNAS.map((qna) => (
          <View
            key={qna.id}
            style={{
              backgroundColor: palette.surface,
              borderRadius: 16,
              padding: 14,
              shadowColor: palette.brand,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 1,
            }}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Text
                className="text-[12px] font-extrabold text-brand-accent">
                Q.
              </Text>
              <Text
                className="flex-1 text-[12.5px] font-semibold text-foreground"
                style={{ lineHeight: 18 }}>
                {qna.question}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
              <Text
                className="text-[12px] font-extrabold text-brand">
                A.
              </Text>
              <Text
                className="flex-1 text-[12px] text-muted-foreground"
                style={{ lineHeight: 17 }}>
                {qna.answer}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function SellerInfo() {
  const palette = useBrandColor();
  return (
    <View style={{ marginBottom: 28 }}>
      <View
        style={{
          paddingHorizontal: SCREEN_PADDING,
          marginBottom: 12,
        }}>
        <Text className="text-[15px] font-bold text-foreground">판매자 정보</Text>
      </View>
      <View
        style={{
          marginHorizontal: SCREEN_PADDING,
          backgroundColor: palette.surface,
          borderRadius: 16,
          padding: 16,
          shadowColor: palette.brand,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 1,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <StripePlaceholder label="로고" width={44} height={44} circle />
          <View style={{ flex: 1 }}>
            <Text className="text-[13.5px] font-bold text-foreground">{SELLER.name}</Text>
            <Text className="mt-0.5 text-[11px] text-muted-foreground">
              평점 {SELLER.rating} · 판매상품 {SELLER.productCount}개
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="문의하기"
            style={{
              borderWidth: 1,
              borderColor: palette.muted,
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 999,
            }}>
            <Text className="text-[12px] font-bold text-brand">
              문의하기
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginTop: 14,
            paddingTop: 14,
            borderTopWidth: 1,
            borderTopColor: palette.subtleStrong,
          }}>
          {[
            { value: SELLER.responseRate, label: '응답률' },
            { value: SELLER.avgShipping, label: '평균 배송' },
            { value: SELLER.joinedYear, label: '입점년도' },
          ].map((stat) => (
            <View key={stat.label} style={{ flex: 1, alignItems: 'center' }}>
              <Text className="text-[13px] font-bold text-foreground">{stat.value}</Text>
              <Text className="mt-0.5 text-[10.5px] text-muted-foreground">
                {stat.label}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function BottomCTA({
  liked,
  onLikePress,
  onCartPress,
  onBuyPress,
}: {
  liked: boolean;
  onLikePress: () => void;
  onCartPress: () => void;
  onBuyPress: () => void;
}) {
  const palette = useBrandColor();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: SCREEN_PADDING,
        paddingVertical: 12,
      }}>
      <Pressable
        onPress={onLikePress}
        accessibilityRole="button"
        accessibilityLabel={liked ? '찜 해제' : '찜'}
        style={{
          width: 46,
          height: 46,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: palette.muted,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          as={HeartIcon}
          size={20}
          color={liked ? PROMO_ACCENT : palette.brand}
          fill={liked ? PROMO_ACCENT : 'transparent'}
          strokeWidth={2}
        />
      </Pressable>
      <Pressable
        onPress={onCartPress}
        accessibilityRole="button"
        accessibilityLabel="장바구니"
        style={{
          flex: 1,
          backgroundColor: palette.subtleStrong,
          paddingVertical: 14,
          borderRadius: 14,
          alignItems: 'center',
        }}>
        <Text className="text-[14.5px] font-bold text-brand">
          장바구니
        </Text>
      </Pressable>
      <Pressable
        onPress={onBuyPress}
        accessibilityRole="button"
        accessibilityLabel="바로 구매"
        style={{
          flex: 1,
          backgroundColor: palette.brand,
          paddingVertical: 14,
          borderRadius: 14,
          alignItems: 'center',
        }}>
        <Text className="text-[14.5px] font-bold text-primary-foreground">바로 구매</Text>
      </Pressable>
    </View>
  );
}

function OptionSheet({
  open,
  onClose,
  qty,
  onQtyDec,
  onQtyInc,
  selectedColor,
  onSelectColor,
  totalPriceLabel,
  onCart,
  onBuy,
}: {
  open: boolean;
  onClose: () => void;
  qty: number;
  onQtyDec: () => void;
  onQtyInc: () => void;
  selectedColor: string;
  onSelectColor: (id: string) => void;
  totalPriceLabel: string;
  onCart: () => void;
  onBuy: () => void;
}) {
  const palette = useBrandColor();
  if (!open) return null;
  return (
    <View
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(10, 30, 30, 0.4)',
        justifyContent: 'flex-end',
      }}>
      <Pressable
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="옵션 선택 닫기"
        style={{ flex: 1 }}
      />
      <View
        style={{
          backgroundColor: palette.surface,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          padding: 18,
          paddingBottom: 22,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -10 },
          shadowOpacity: 0.15,
          shadowRadius: 30,
          elevation: 20,
        }}>
        <View
          style={{
            width: 36,
            height: 4,
            backgroundColor: palette.muted,
            borderRadius: 2,
            alignSelf: 'center',
            marginBottom: 16,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            alignItems: 'center',
            paddingBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: palette.subtleStrong,
          }}>
          <StripePlaceholder label="PRODUCT" width={56} height={56} />
          <View style={{ flex: 1 }}>
            <Text className="text-[13px] font-semibold text-foreground">
              전연령 카시트 세이프 3
            </Text>
            <Text className="mt-0.5 text-[11.5px] text-muted-foreground">라라베베</Text>
          </View>
          <Pressable
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="닫기"
            onPress={onClose}>
            <Icon as={XIcon} size={20} color={palette.brand} />
          </Pressable>
        </View>

        <Text className="pt-4 text-[12.5px] font-bold text-foreground">색상</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
          {COLORS.map((color) => {
            const selected = color.id === selectedColor;
            return (
              <Pressable
                key={color.id}
                onPress={() => onSelectColor(color.id)}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 9,
                  borderRadius: 10,
                  backgroundColor: selected ? palette.brand : palette.subtle,
                }}>
                <Text
                  className="text-[12.5px] font-semibold"
                  style={{ color: selected ? palette.onBrand : palette.brand }}>
                  {color.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 20,
          }}>
          <Text className="text-[12.5px] font-bold text-foreground">수량</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <Pressable
              onPress={onQtyDec}
              accessibilityRole="button"
              accessibilityLabel="수량 감소"
              style={{
                width: 30,
                height: 30,
                borderRadius: 9,
                backgroundColor: palette.subtleStrong,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon as={MinusIcon} size={16} color={palette.brand} />
            </Pressable>
            <Text className="text-[14px] font-bold text-foreground">{qty}</Text>
            <Pressable
              onPress={onQtyInc}
              accessibilityRole="button"
              accessibilityLabel="수량 증가"
              style={{
                width: 30,
                height: 30,
                borderRadius: 9,
                backgroundColor: palette.subtleStrong,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon as={PlusIcon} size={16} color={palette.brand} />
            </Pressable>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            paddingTop: 14,
            paddingBottom: 18,
            marginTop: 14,
            borderTopWidth: 1,
            borderTopColor: palette.subtleStrong,
          }}>
          <Text className="text-[13px] text-muted-foreground">총 결제금액</Text>
          <Text className="text-[18px] font-extrabold text-brand">
            {totalPriceLabel}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Pressable
            onPress={onCart}
            accessibilityRole="button"
            accessibilityLabel="장바구니 담기"
            style={{
              flex: 1,
              backgroundColor: palette.subtleStrong,
              paddingVertical: 14,
              borderRadius: 14,
              alignItems: 'center',
            }}>
            <Text className="text-[14.5px] font-bold text-brand">
              장바구니 담기
            </Text>
          </Pressable>
          <Pressable
            onPress={onBuy}
            accessibilityRole="button"
            accessibilityLabel="결제하기"
            style={{
              flex: 1,
              backgroundColor: palette.brand,
              paddingVertical: 14,
              borderRadius: 14,
              alignItems: 'center',
            }}>
            <Text className="text-[14.5px] font-bold text-primary-foreground">
              결제하기
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}