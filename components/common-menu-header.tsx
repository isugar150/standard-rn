import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { MenuIcon, MoonStarIcon, SunIcon, XIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Animated, Modal, Platform, Pressable, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type CommonMenuHeaderProps = {
  title: string;
  actions?: React.ReactNode;
};

export function CommonMenuHeader({ title, actions }: CommonMenuHeaderProps) {
  return (
    <View className="min-h-12 flex-row items-center justify-between pb-2 pl-4 pr-3">
      <Text variant="h3" numberOfLines={1} className="flex-1 border-0 pb-0">
        {title}
      </Text>
      <View className="flex-row items-center justify-end gap-2">
        {actions}
        <ThemeToggle />
        <MoreMenu />
      </View>
    </View>
  );
}

const MENU_ITEMS = ['홈', '검색', '글쓰기', '알림', '마이'] as const;
const USE_NATIVE_DRIVER = Platform.OS !== 'web';

function MoreMenu() {
  const { width } = useWindowDimensions();
  const [isOpen, setIsOpen] = React.useState(false);
  const progress = React.useRef(new Animated.Value(0)).current;

  const openMenu = React.useCallback(() => {
    setIsOpen(true);
    Animated.timing(progress, {
      toValue: 1,
      duration: 220,
      useNativeDriver: USE_NATIVE_DRIVER,
    }).start();
  }, [progress]);

  const closeMenu = React.useCallback(() => {
    Animated.timing(progress, {
      toValue: 0,
      duration: 180,
      useNativeDriver: USE_NATIVE_DRIVER,
    }).start(({ finished }) => {
      if (finished) {
        setIsOpen(false);
      }
    });
  }, [progress]);

  const panelStyle = {
    transform: [
      {
        translateX: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [width, 0],
        }),
      },
    ],
  };

  return (
    <>
      <Button
        onPress={openMenu}
        size="icon"
        variant="ghost"
        accessibilityLabel="더보기 메뉴 열기"
        className="rounded-full">
        <Icon as={MenuIcon} className="size-5" />
      </Button>
      <Modal visible={isOpen} transparent animationType="none" onRequestClose={closeMenu}>
        <View className="flex-1 overflow-hidden">
          <Animated.View
            className="bg-background h-full shadow-lg shadow-black/10"
            style={[{ width }, panelStyle]}>
            <SafeAreaView edges={['top', 'bottom']} className="flex-1">
              <View className="min-h-12 flex-row items-center justify-between px-4 pt-1">
                <Text variant="h4" className="border-0 pb-0">
                  더보기
                </Text>
                <Button
                  onPress={closeMenu}
                  size="icon"
                  variant="ghost"
                  accessibilityLabel="더보기 메뉴 닫기"
                  className="rounded-full">
                  <Icon as={XIcon} className="size-5" />
                </Button>
              </View>
              <View className="gap-3 px-4 pt-8">
                {MENU_ITEMS.map((item) => (
                  <Pressable
                    key={item}
                    className="bg-card border-border rounded-2xl border px-5 py-4 active:bg-accent">
                    <Text className="text-base font-medium">{item}</Text>
                  </Pressable>
                ))}
              </View>
            </SafeAreaView>
          </Animated.View>
        </View>
      </Modal>
    </>
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
      onPressIn={toggleColorScheme}
      size="icon"
      variant="ghost"
      accessibilityLabel="테마 변경"
      className="rounded-full">
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
}
