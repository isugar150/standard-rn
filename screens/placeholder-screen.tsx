import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type PlaceholderScreenProps = {
  title: string;
  description: string;
};

export function PlaceholderScreen({ title, description }: PlaceholderScreenProps) {
  return (
    <SafeAreaView edges={['top']} className="bg-background flex-1">
      <View className="flex-1 items-center justify-center gap-2 px-8">
        <Text variant="h2" className="border-0 pb-0">
          {title}
        </Text>
        <Text className="text-muted-foreground text-center">{description}</Text>
      </View>
    </SafeAreaView>
  );
}
