import { CommonMenuHeader } from '@/components/common-menu-header';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Menu5Screen() {
  return (
    <SafeAreaView edges={['top']} className="bg-background flex-1">
      <CommonMenuHeader title="메뉴5" />
      <View className="flex-1 items-center justify-center gap-2 px-8">
        <Text className="text-muted-foreground text-center">메뉴5 화면입니다. 실제 콘텐츠로 교체해 주세요.</Text>
      </View>
    </SafeAreaView>
  );
}
