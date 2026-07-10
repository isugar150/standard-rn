import type { MenuDestination } from '@/components/more-menu-data';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { ChevronRightIcon } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

type NavigationRowProps = {
  readonly item: MenuDestination;
  readonly isActive: boolean;
  readonly onPress: () => void;
};

export function NavigationRow({ item, isActive, onPress }: NavigationRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${item.title}, ${item.description}`}
      accessibilityState={{ selected: isActive }}
      className={`flex-row items-center gap-3 rounded-2xl border border-border px-4 py-3 active:bg-accent ${
        isActive ? 'bg-secondary' : 'bg-card'
      }`}>
      <View className="size-10 items-center justify-center rounded-xl bg-secondary">
        <Icon as={item.icon} className="size-5" />
      </View>
      <View className="flex-1 gap-0.5">
        <Text className="text-base font-semibold">{item.title}</Text>
        <Text className="text-xs text-muted-foreground">{item.description}</Text>
      </View>
      {item.badge ? (
        <Badge className="min-w-5 px-1.5" variant="secondary">
          <Text className="text-xs font-semibold">{item.badge}</Text>
        </Badge>
      ) : null}
      <Icon as={ChevronRightIcon} className="size-4 text-muted-foreground" />
    </Pressable>
  );
}
