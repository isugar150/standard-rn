import { CommonMenuHeader } from '@/components/common-menu-header';
import { FLOATING_TAB_BAR_CLEARANCE } from '@/components/floating-tab-bar/constants';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { SearchIcon } from 'lucide-react-native';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Menu2Screen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['top']} className="bg-background flex-1">
      <CommonMenuHeader title="메뉴2" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={
          Platform.OS === 'ios'
            ? styles.content
            : [styles.content, { paddingBottom: insets.bottom + FLOATING_TAB_BAR_CLEARANCE }]
        }>
        <View className="gap-10">
          <View className="bg-secondary h-11 flex-row items-center gap-3 rounded-full px-4">
            <Icon as={SearchIcon} className="text-muted-foreground size-5" />
            <Input
              placeholder="검색어를 입력하세요"
              returnKeyType="search"
              autoCapitalize="none"
              autoCorrect={false}
              className="h-11 flex-1 border-0 bg-transparent p-0 px-0 py-0 text-base shadow-none"
            />
          </View>

          <View className="items-center justify-center py-20">
            <Text className="text-muted-foreground text-sm">최근 검색어가 없습니다.</Text>
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
