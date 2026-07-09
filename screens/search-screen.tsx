import { CommonMenuHeader } from '@/components/common-menu-header';
import { FLOATING_TAB_BAR_CLEARANCE } from '@/components/floating-tab-bar/constants';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useRecentSearchesStore } from '@/store/recent-searches-store';
import {
  CoffeeIcon,
  DumbbellIcon,
  FilmIcon,
  HouseIcon,
  PawPrintIcon,
  PlaneIcon,
  SearchIcon,
  ShoppingBagIcon,
  UtensilsIcon,
  XIcon,
} from 'lucide-react-native';
import * as React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const POPULAR_SEARCHES = [
  '맛집 추천',
  '카페 신메뉴',
  '주말 나들이',
  '반려동물 용품',
  '홈트레이닝',
  '중고거래 꿀팁',
  '재택근무 꿀템',
  '캠핑 준비물',
];

const CATEGORIES = [
  { label: '맛집', icon: UtensilsIcon },
  { label: '카페', icon: CoffeeIcon },
  { label: '쇼핑', icon: ShoppingBagIcon },
  { label: '여행', icon: PlaneIcon },
  { label: '운동', icon: DumbbellIcon },
  { label: '영화', icon: FilmIcon },
  { label: '반려동물', icon: PawPrintIcon },
  { label: '부동산', icon: HouseIcon },
] as const;

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = React.useState('');
  const recentSearches = useRecentSearchesStore((state) => state.recentSearches);
  const addSearch = useRecentSearchesStore((state) => state.addSearch);
  const removeSearch = useRecentSearchesStore((state) => state.removeSearch);
  const clearSearches = useRecentSearchesStore((state) => state.clearSearches);

  const onSubmit = React.useCallback(
    (term: string) => {
      const trimmed = term.trim();
      if (!trimmed) return;
      addSearch(trimmed);
      setQuery(trimmed);
    },
    [addSearch]
  );

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
      <CommonMenuHeader />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={
          Platform.OS === 'ios'
            ? styles.content
            : [styles.content, { paddingBottom: insets.bottom + FLOATING_TAB_BAR_CLEARANCE }]
        }>
        <View className="gap-8">
          <View className="h-11 flex-row items-center gap-3 rounded-full bg-secondary px-4">
            <Icon as={SearchIcon} className="size-5 text-muted-foreground" />
            <Input
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={() => onSubmit(query)}
              placeholder="검색어를 입력하세요"
              returnKeyType="search"
              autoCapitalize="none"
              autoCorrect={false}
              className="h-11 flex-1 border-0 bg-transparent p-0 px-0 py-0 text-base shadow-none"
            />
          </View>

          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-base font-semibold">최근 검색어</Text>
              {recentSearches.length > 0 && (
                <Pressable onPress={clearSearches} hitSlop={8}>
                  <Text className="text-xs text-muted-foreground">전체삭제</Text>
                </Pressable>
              )}
            </View>
            {recentSearches.length > 0 ? (
              <View className="flex-row flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <View
                    key={term}
                    className="flex-row items-center gap-1.5 rounded-full bg-secondary py-1.5 pl-3 pr-2">
                    <Pressable onPress={() => onSubmit(term)}>
                      <Text className="text-sm">{term}</Text>
                    </Pressable>
                    <Pressable onPress={() => removeSearch(term)} hitSlop={8} className="p-0.5">
                      <Icon as={XIcon} className="size-3.5 text-muted-foreground" />
                    </Pressable>
                  </View>
                ))}
              </View>
            ) : (
              <View className="items-center justify-center py-8">
                <Text className="text-sm text-muted-foreground">최근 검색어가 없습니다.</Text>
              </View>
            )}
          </View>

          <View className="gap-3">
            <Text className="text-base font-semibold">인기 검색어</Text>
            <View className="flex-row flex-wrap gap-2">
              {POPULAR_SEARCHES.map((term, index) => (
                <Pressable
                  key={term}
                  onPress={() => onSubmit(term)}
                  className="flex-row items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 active:opacity-70">
                  <Text
                    className={
                      index < 3
                        ? 'text-sm font-semibold text-primary'
                        : 'text-sm font-semibold text-muted-foreground'
                    }>
                    {index + 1}
                  </Text>
                  <Text className="text-sm">{term}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View className="gap-3">
            <Text className="text-base font-semibold">카테고리</Text>
            <View className="flex-row flex-wrap">
              {CATEGORIES.map((category) => (
                <View key={category.label} className="w-1/4 items-center gap-2 py-2">
                  <Pressable className="size-14 items-center justify-center rounded-2xl bg-secondary active:opacity-70">
                    <Icon as={category.icon} className="size-6 text-foreground" />
                  </Pressable>
                  <Text className="text-xs text-muted-foreground">{category.label}</Text>
                </View>
              ))}
            </View>
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
