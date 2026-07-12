import { FLOATING_TAB_BAR_CLEARANCE } from '@/components/floating-tab-bar/constants';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useBrandColor } from '@/lib/theme';
import { useRouter } from 'expo-router';
import { SearchIcon, XIcon } from 'lucide-react-native';
import * as React from 'react';
import {
  Image,
  type ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_PADDING = 20;
const PROMO_ACCENT = '#21C7C7';

type SearchTab = 'all' | 'product' | 'experience' | 'community' | 'mentor';

type RecentSearch = { id: string; keyword: string };
type PopularSearch = { id: string; rank: number; keyword: string };
type Category = { id: string; label: string };
type ProductResult = {
  id: string;
  brand: string;
  name: string;
  price: string;
  image: ImageSourcePropType;
};
type ExperienceResult = {
  id: string;
  title: string;
  location: string;
  status: string;
  image: ImageSourcePropType;
};
type CommunityResult = {
  id: string;
  title: string;
  likes: number;
  comments: number;
};
type MentorResult = { id: string; name: string; followers: number; image: ImageSourcePropType };

const RECENT_SEARCHES: RecentSearch[] = [
  { id: 'r1', keyword: '카시트' },
  { id: 'r2', keyword: '이유식 냉동보관용기' },
  { id: 'r3', keyword: '신생아 속싸개' },
];

const POPULAR_SEARCHES: PopularSearch[] = [
  { id: 'p1', rank: 1, keyword: '경량 유모차' },
  { id: 'p2', rank: 2, keyword: '신생아 카시트' },
  { id: 'p3', rank: 3, keyword: '이유식 초기 세트' },
  { id: 'p4', rank: 4, keyword: '수면조끼' },
  { id: 'p5', rank: 5, keyword: '아기 로션' },
];

const CATEGORIES: Category[] = [
  { id: 'c1', label: '기저귀' },
  { id: 'c2', label: '이유식' },
  { id: 'c3', label: '카시트' },
  { id: 'c4', label: '유모차' },
  { id: 'c5', label: '장난감' },
  { id: 'c6', label: '스킨케어' },
];

const PRODUCT_RESULTS: ProductResult[] = [
  {
    id: 'p1',
    brand: '라라베베',
    name: '전연령 카시트 세이프 3',
    price: '129,000원',
    image: require('@/assets/images/home/product-car-seat-v2.png'),
  },
  {
    id: 'p2',
    brand: '뽀득',
    name: '주니어 카시트 그로우',
    price: '159,000원',
    image: require('@/assets/images/search/product-junior-car-seat.png'),
  },
];

const EXPERIENCE_RESULTS: ExperienceResult[] = [
  {
    id: 'e1',
    title: '뉴본 카시트 3일 체험단',
    location: '서울 강남 · 라라베베',
    status: '예약가능',
    image: require('@/assets/images/experience/car-seat-trial.png'),
  },
];

const COMMUNITY_RESULTS: CommunityResult[] = [
  {
    id: 'c1',
    title: '카시트 새거 vs 중고, 뭐가 나을까요?',
    likes: 156,
    comments: 48,
  },
];

const MENTOR_RESULTS: MentorResult[] = [
  {
    id: 'm1',
    name: '카시트 전문가 민지쌤',
    followers: 1204,
    image: require('@/assets/images/search/mentor-car-seat-minji.png'),
  },
];

const TAB_COUNTS: Record<SearchTab, number> = {
  all: 12,
  product: 6,
  experience: 2,
  community: 3,
  mentor: 1,
};

const TAB_LABELS: Record<SearchTab, string> = {
  all: '전체',
  product: '상품',
  experience: '체험',
  community: '커뮤니티',
  mentor: '멘토',
};

export default function SearchInputScreen() {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const [showResults, setShowResults] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<SearchTab>('all');

  const submitQuery = (text: string) => {
    if (!text.trim()) return;
    setQuery(text);
    setShowResults(true);
    setActiveTab('all');
  };

  const clearQuery = () => {
    setQuery('');
    setShowResults(false);
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-brand-cream">
      <SearchBar
        query={query}
        onChangeQuery={setQuery}
        onClear={clearQuery}
        onCancel={() => router.back()}
        onSubmit={() => submitQuery(query)}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: FLOATING_TAB_BAR_CLEARANCE }}
        keyboardShouldPersistTaps="handled">
        {!showResults ? (
          <Landing
            recents={RECENT_SEARCHES}
            populars={POPULAR_SEARCHES}
            categories={CATEGORIES}
            onSelectQuery={submitQuery}
          />
        ) : (
          <Results query={query} activeTab={activeTab} onSelectTab={setActiveTab} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function SearchBar({
  query,
  onChangeQuery,
  onClear,
  onCancel,
  onSubmit,
}: {
  query: string;
  onChangeQuery: (text: string) => void;
  onClear: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  const palette = useBrandColor();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 16,
        paddingHorizontal: SCREEN_PADDING,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          backgroundColor: palette.surface,
          borderWidth: 1.5,
          borderColor: palette.brand,
          borderRadius: 14,
          paddingHorizontal: 14,
          paddingVertical: 11,
        }}>
        <Icon as={SearchIcon} size={18} color={palette.brand} />
        <TextInput
          value={query}
          onChangeText={onChangeQuery}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
          placeholder="우리 아이 카시트 찾아보기"
          placeholderTextColor="#aaa"
          style={{
            flex: 1,
            fontSize: 13.5,
            color: palette.brand,
            padding: 0,
          }}
        />
        {query.length > 0 ? (
          <Pressable
            onPress={onClear}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="검색어 지우기">
            <Icon as={XIcon} size={16} color={palette.mutedText} strokeWidth={2.2} />
          </Pressable>
        ) : null}
      </View>
      <Pressable
        onPress={onCancel}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="취소">
        <Text style={{ fontSize: 13, fontWeight: '600', color: palette.mutedText }}>취소</Text>
      </Pressable>
    </View>
  );
}

function Landing({
  recents,
  populars,
  categories,
  onSelectQuery,
}: {
  recents: RecentSearch[];
  populars: PopularSearch[];
  categories: Category[];
  onSelectQuery: (keyword: string) => void;
}) {
  const palette = useBrandColor();
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: SCREEN_PADDING,
          paddingTop: 18,
          paddingBottom: 12,
        }}>
        <Text className="text-[15px] font-bold text-foreground">최근 검색어</Text>
        <Text className="text-[11.5px] text-muted-foreground">전체삭제</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 8,
          paddingHorizontal: SCREEN_PADDING,
          marginBottom: 24,
        }}>
        {recents.map((r) => (
          <Pressable
            key={r.id}
            onPress={() => onSelectQuery(r.keyword)}
            accessibilityRole="button"
            accessibilityLabel={r.keyword}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 999,
              backgroundColor: palette.subtle,
            }}>
            <Text className="text-[12.5px] font-semibold text-brand">{r.keyword}</Text>
            <Icon as={XIcon} size={12} color={palette.mutedText} strokeWidth={2.4} />
          </Pressable>
        ))}
      </ScrollView>

      <View
        style={{
          paddingHorizontal: SCREEN_PADDING,
          paddingBottom: 12,
        }}>
        <Text className="text-[15px] font-bold text-foreground">인기 검색어</Text>
      </View>
      <View
        style={{
          paddingHorizontal: SCREEN_PADDING,
          paddingBottom: 26,
        }}>
        {populars.map((p) => (
          <Pressable
            key={p.id}
            onPress={() => onSelectQuery(p.keyword)}
            accessibilityRole="button"
            accessibilityLabel={p.keyword}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              paddingVertical: 9,
            }}>
            <Text
              className="text-center text-[14px] font-extrabold"
              style={{ width: 16, color: p.rank <= 2 ? PROMO_ACCENT : palette.mutedText }}>
              {p.rank}
            </Text>
            <Text className="text-[13.5px] text-foreground">{p.keyword}</Text>
          </Pressable>
        ))}
      </View>

      <View
        style={{
          paddingHorizontal: SCREEN_PADDING,
          paddingBottom: 12,
        }}>
        <Text className="text-[15px] font-bold text-foreground">추천 카테고리</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
          paddingHorizontal: SCREEN_PADDING,
          marginBottom: 28,
        }}>
        {categories.map((c) => (
          <Pressable
            key={c.id}
            onPress={() => onSelectQuery(c.label)}
            accessibilityRole="button"
            accessibilityLabel={c.label}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 999,
              backgroundColor: palette.subtle,
            }}>
            <Text className="text-[12.5px] font-semibold text-brand">{c.label}</Text>
          </Pressable>
        ))}
      </View>

      <View
        style={{
          height: 8,
          backgroundColor: palette.subtle,
          marginBottom: 20,
        }}
      />

      <View style={{ paddingHorizontal: SCREEN_PADDING, paddingBottom: 20 }}>
        <Text className="text-[12px] text-muted-foreground">
          검색 결과는 상품 · 체험 · 커뮤니티 · 멘토로 구분되어 표시돼요
        </Text>
      </View>
    </View>
  );
}

function Results({
  query,
  activeTab,
  onSelectTab,
}: {
  query: string;
  activeTab: SearchTab;
  onSelectTab: (tab: SearchTab) => void;
}) {
  return (
    <View>
      <ResultsTabBar activeTab={activeTab} onSelect={onSelectTab} />

      {activeTab === 'all' || activeTab === 'product' ? (
        <ProductResults products={PRODUCT_RESULTS} isAllTab={activeTab === 'all'} />
      ) : null}

      {activeTab === 'all' || activeTab === 'experience' ? (
        <ExperienceResults experiences={EXPERIENCE_RESULTS} />
      ) : null}

      {activeTab === 'all' || activeTab === 'community' ? (
        <CommunityResults results={COMMUNITY_RESULTS} isAllTab={activeTab === 'all'} />
      ) : null}

      {activeTab === 'all' || activeTab === 'mentor' ? (
        <MentorResults mentors={MENTOR_RESULTS} />
      ) : null}
    </View>
  );
}

function ResultsTabBar({
  activeTab,
  onSelect,
}: {
  activeTab: SearchTab;
  onSelect: (tab: SearchTab) => void;
}) {
  const palette = useBrandColor();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 8,
        padding: 14,
        paddingHorizontal: SCREEN_PADDING,
      }}>
      {(Object.keys(TAB_LABELS) as SearchTab[]).map((key) => {
        const isActive = key === activeTab;
        return (
          <Pressable
            key={key}
            onPress={() => onSelect(key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 999,
              backgroundColor: isActive ? palette.brand : palette.subtle,
            }}>
            <Text
              className="text-[12.5px] font-bold"
              style={{ color: isActive ? palette.onBrand : palette.brand }}>
              {TAB_LABELS[key]} {TAB_COUNTS[key]}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

function ProductResults({ products, isAllTab }: { products: ProductResult[]; isAllTab: boolean }) {
  const palette = useBrandColor();
  const { width: screenWidth } = useWindowDimensions();
  const productImageSize = (screenWidth - SCREEN_PADDING * 2 - 16) / 2;
  return (
    <View>
      <View
        style={{
          paddingHorizontal: SCREEN_PADDING,
          paddingTop: 6,
          paddingBottom: 12,
        }}>
        <Text className="text-[14px] font-bold text-foreground">
          상품 <Text className="text-[14px] font-bold text-brand-accent">{products.length}</Text>
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 16,
          paddingHorizontal: SCREEN_PADDING,
          marginBottom: 22,
        }}>
        {products.map((p) => (
          <Pressable
            key={p.id}
            accessibilityRole="button"
            accessibilityLabel={p.name}
            style={{ width: productImageSize }}>
            <Image
              source={p.image}
              accessibilityLabel={p.name}
              style={{ width: productImageSize, height: productImageSize, borderRadius: 16 }}
              resizeMode="cover"
            />
            <Text className="mt-2 text-[11px] text-muted-foreground">{p.brand}</Text>
            <Text
              className="mt-1 text-[12.5px] font-semibold text-foreground"
              style={{ lineHeight: 17 }}>
              {p.name}
            </Text>
            <Text className="mt-0.5 text-[13px] font-bold text-brand">{p.price}</Text>
          </Pressable>
        ))}
      </View>
      {isAllTab ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="상품 결과 더보기"
          style={{
            marginHorizontal: SCREEN_PADDING,
            marginBottom: 24,
            alignItems: 'center',
            padding: 12,
            borderWidth: 1,
            borderColor: palette.muted,
            borderRadius: 12,
          }}>
          <Text className="text-[12.5px] font-bold text-brand">상품 결과 4개 더보기 ↓</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function ExperienceResults({ experiences }: { experiences: ExperienceResult[] }) {
  return (
    <View>
      <View
        style={{
          paddingHorizontal: SCREEN_PADDING,
          paddingTop: 6,
          paddingBottom: 12,
        }}>
        <Text className="text-[14px] font-bold text-foreground">
          체험 <Text className="text-[14px] font-bold text-brand-accent">{experiences.length}</Text>
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: SCREEN_PADDING,
          marginBottom: 22,
        }}>
        {experiences.map((e) => (
          <Pressable
            key={e.id}
            accessibilityRole="button"
            accessibilityLabel={e.title}
            style={{ width: 200 }}>
            <View style={{ position: 'relative' }}>
              <Image
                source={e.image}
                accessibilityLabel={e.title}
                style={{ width: 200, height: 120, borderRadius: 16 }}
                resizeMode="cover"
              />
              <View
                style={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  backgroundColor: PROMO_ACCENT,
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: 999,
                }}>
                <Text className="text-[10px] font-bold" style={{ color: '#FFFFFF' }}>
                  {e.status}
                </Text>
              </View>
            </View>
            <Text className="mt-2 text-[12.5px] font-semibold text-foreground">{e.title}</Text>
            <Text className="mt-0.5 text-[11px] text-muted-foreground">{e.location}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

function CommunityResults({
  results,
  isAllTab,
}: {
  results: CommunityResult[];
  isAllTab: boolean;
}) {
  const palette = useBrandColor();
  return (
    <View>
      <View
        style={{
          paddingHorizontal: SCREEN_PADDING,
          paddingTop: 6,
          paddingBottom: 12,
        }}>
        <Text className="text-[14px] font-bold text-foreground">
          커뮤니티 <Text className="text-[14px] font-bold text-brand-accent">{results.length}</Text>
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: SCREEN_PADDING,
          paddingBottom: 22,
          gap: 12,
        }}>
        {results.map((c) => (
          <View
            key={c.id}
            style={{
              backgroundColor: palette.surface,
              borderRadius: 14,
              padding: 14,
              shadowColor: palette.brand,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 1,
            }}>
            <Text className="text-[13px] font-semibold text-foreground" style={{ lineHeight: 18 }}>
              {c.title}
            </Text>
            <Text className="mt-1.5 text-[11px] text-muted-foreground">
              댓글 {c.comments} · 좋아요 {c.likes}
            </Text>
          </View>
        ))}
      </View>
      {isAllTab ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="커뮤니티 결과 더보기"
          style={{
            marginHorizontal: SCREEN_PADDING,
            marginTop: -6,
            marginBottom: 24,
            alignItems: 'center',
            padding: 12,
            borderWidth: 1,
            borderColor: palette.muted,
            borderRadius: 12,
          }}>
          <Text className="text-[12.5px] font-bold text-brand">커뮤니티 결과 2개 더보기 ↓</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function MentorResults({ mentors }: { mentors: MentorResult[] }) {
  const palette = useBrandColor();
  return (
    <View>
      <View
        style={{
          paddingHorizontal: SCREEN_PADDING,
          paddingTop: 6,
          paddingBottom: 12,
        }}>
        <Text className="text-[14px] font-bold text-foreground">
          멘토 <Text className="text-[14px] font-bold text-brand-accent">{mentors.length}</Text>
        </Text>
      </View>
      <View style={{ paddingHorizontal: SCREEN_PADDING, paddingBottom: 26 }}>
        {mentors.map((m) => (
          <View
            key={m.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              backgroundColor: palette.surface,
              marginBottom: 22,
              borderRadius: 14,
              padding: 14,
              shadowColor: palette.brand,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 1,
            }}>
            <Image
              source={m.image}
              accessibilityLabel={m.name}
              style={{ width: 44, height: 44, borderRadius: 999 }}
            />
            <View style={{ flex: 1 }}>
              <Text className="text-[13px] font-bold text-foreground">{m.name}</Text>
              <Text className="mt-0.5 text-[11px] text-muted-foreground">
                팔로워 {m.followers.toLocaleString()}
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: palette.muted,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 999,
              }}>
              <Text className="text-[11.5px] font-bold text-brand">팔로우</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
