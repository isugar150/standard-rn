import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { MoonStarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { View } from 'react-native';

type CommonMenuHeaderProps = {
  title: string;
  actions?: React.ReactNode;
};

export function CommonMenuHeader({ title, actions }: CommonMenuHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-4 pb-2">
      <Text variant="h3" className="border-0 pb-0">
        {title}
      </Text>
      <View className="flex-row items-center gap-1">
        {actions}
        <ThemeToggle />
      </View>
    </View>
  );
}

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button onPressIn={toggleColorScheme} size="icon" variant="ghost" className="rounded-full">
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
}
