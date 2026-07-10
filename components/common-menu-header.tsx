import { MoreMenu } from '@/components/more-menu';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { MoonStarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Image, View } from 'react-native';

type CommonMenuHeaderProps = {
  actions?: React.ReactNode;
};

const APP_WORDMARK = require('@/assets/images/app-wordmark.png');

export function CommonMenuHeader({ actions }: CommonMenuHeaderProps) {
  return (
    <View className="min-h-12 flex-row items-center justify-between pb-2 pl-4 pr-3">
      <View className="flex-1">
        <Image
          source={APP_WORDMARK}
          resizeMode="contain"
          accessibilityLabel="standard-rn 로고"
          className="h-10 w-48"
        />
      </View>
      <View className="flex-row items-center justify-end gap-2">
        {actions}
        <ThemeToggle />
        <MoreMenu />
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
    <Button
      onPress={toggleColorScheme}
      size="icon"
      variant="ghost"
      accessibilityLabel="테마 변경"
      className="rounded-full">
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
}
