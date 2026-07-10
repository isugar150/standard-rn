import { MENU_ITEMS, type MenuDestination } from '@/components/more-menu-data';
import { NavigationRow } from '@/components/more-menu-navigation-row';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import { usePathname, useRouter } from 'expo-router';
import { ChevronRightIcon, MenuIcon, SparklesIcon, XIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import {
  Animated,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const USE_NATIVE_DRIVER = Platform.OS !== 'web';

export function MoreMenu() {
  const { width } = useWindowDimensions();
  const { colorScheme } = useColorScheme();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const progress = React.useRef(new Animated.Value(0)).current;
  const theme = THEME[colorScheme ?? 'light'];

  const openMenu = React.useCallback(() => {
    setIsOpen(true);
    Animated.timing(progress, {
      toValue: 1,
      duration: 220,
      useNativeDriver: USE_NATIVE_DRIVER,
    }).start();
  }, [progress]);

  const closeMenu = React.useCallback(
    (afterClose?: () => void) => {
      Animated.timing(progress, {
        toValue: 0,
        duration: 180,
        useNativeDriver: USE_NATIVE_DRIVER,
      }).start(({ finished }) => {
        if (finished) {
          setIsOpen(false);
          afterClose?.();
        }
      });
    },
    [progress]
  );

  const dismissMenu = React.useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  const navigateTo = React.useCallback(
    (href: MenuDestination['href']) => {
      closeMenu(() => router.navigate(href));
    },
    [closeMenu, router]
  );

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
      <Modal visible={isOpen} transparent animationType="none" onRequestClose={dismissMenu}>
        <SafeAreaProvider>
          <View className="flex-1 overflow-hidden">
            <Animated.View
              className="h-full bg-background shadow-lg shadow-black/10"
              style={[{ backgroundColor: theme.nativeBackground, width }, panelStyle]}>
              <SafeAreaView edges={['top', 'bottom']} className="flex-1">
                <View className="min-h-12 flex-row items-center justify-between px-4 pt-1">
                  <Text variant="h4" className="border-0 pb-0">
                    더보기
                  </Text>
                  <Button
                    onPress={dismissMenu}
                    size="icon"
                    variant="ghost"
                    accessibilityLabel="더보기 메뉴 닫기"
                    className="rounded-full">
                    <Icon as={XIcon} className="size-5" />
                  </Button>
                </View>
                <ScrollView
                  contentContainerStyle={styles.menuContent}
                  showsVerticalScrollIndicator={false}>
                  <Pressable
                    onPress={() => navigateTo('/profile')}
                    accessibilityRole="button"
                    accessibilityLabel="WWIT 프로필로 이동"
                    className="flex-row items-center gap-3 rounded-2xl border border-border bg-card p-4 active:bg-accent">
                    <Avatar alt="WWIT" className="size-12">
                      <AvatarFallback>
                        <Text className="text-lg font-semibold">W</Text>
                      </AvatarFallback>
                    </Avatar>
                    <View className="flex-1 gap-0.5">
                      <Text className="text-base font-semibold">WWIT</Text>
                      <Text className="text-sm text-muted-foreground">내 프로필과 활동 관리</Text>
                    </View>
                    <Icon as={ChevronRightIcon} className="size-5 text-muted-foreground" />
                  </Pressable>

                  <View className="gap-3">
                    <Text className="px-1 text-xs font-semibold text-muted-foreground">
                      둘러보기
                    </Text>
                    <View className="gap-2">
                      {MENU_ITEMS.map((item) => (
                        <NavigationRow
                          key={item.href}
                          item={item}
                          isActive={pathname.endsWith(item.href)}
                          onPress={() => navigateTo(item.href)}
                        />
                      ))}
                    </View>
                  </View>

                  <Card className="gap-3 rounded-2xl py-4 shadow-none">
                    <View className="flex-row items-center gap-2 px-4">
                      <View className="size-8 items-center justify-center rounded-xl bg-secondary">
                        <Icon as={SparklesIcon} className="size-4" />
                      </View>
                      <Text className="text-sm font-semibold">Standard RN 소식</Text>
                    </View>
                    <Separator />
                    <View className="gap-1 px-4">
                      <Text className="text-sm">더 편한 탐색 경험을 준비하고 있어요.</Text>
                      <Text className="text-xs text-muted-foreground">
                        새로운 기능은 알림에서 가장 먼저 알려드려요.
                      </Text>
                    </View>
                  </Card>
                </ScrollView>
              </SafeAreaView>
            </Animated.View>
          </View>
        </SafeAreaProvider>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  menuContent: {
    gap: 24,
    paddingBottom: 32,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
});
