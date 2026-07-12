import { FLOATING_TAB_BAR_CLEARANCE } from '@/components/floating-tab-bar/constants';
import { StripePlaceholder } from '@/components/stripe-placeholder';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { BRAND } from '@/lib/theme';
import { useRouter } from 'expo-router';
import {
  BellIcon,
  BookmarkIcon,
  CalendarIcon,
  type LucideIcon,
  ChevronRightIcon,
  HeartIcon,
  LifeBuoyIcon,
  LogOutIcon,
  MessageCircleIcon,
  SettingsIcon,
  ShoppingBagIcon,
  StarIcon,
  UserPlusIcon,
} from 'lucide-react-native';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_PADDING = 20;
const ROW_HORIZONTAL_PADDING = 16;
const ROW_VERTICAL_PADDING = 13;
const DANGER_COLOR = '#b33';

type Baby = {
  id: string;
  name: string;
  dday: number;
};

type MenuRow = {
  id: string;
  label: string;
  icon: LucideIcon;
  count?: number;
  href?: string;
  isDanger?: boolean;
};

type MenuSection = {
  title: string;
  rows: MenuRow[];
};

const USER = {
  name: '채원님',
  email: 'chaewon@email.com',
};

const BABIES: Baby[] = [
  { id: 'baby-1', name: '이준이', dday: 186 },
  { id: 'baby-2', name: '하은이', dday: 920 },
];

const SECTIONS: MenuSection[] = [
  {
    title: '쇼핑',
    rows: [
      { id: 'orders', label: '주문 내역', icon: ShoppingBagIcon, count: 3 },
      { id: 'wishlist-products', label: '찜한 상품', icon: HeartIcon, count: 8 },
    ],
  },
  {
    title: '체험',
    rows: [
      {
        id: 'experience-applications',
        label: '체험 신청 내역',
        icon: CalendarIcon,
        count: 4,
        href: '/experience',
      },
      { id: 'wishlist-experiences', label: '찜한 체험', icon: HeartIcon, count: 5 },
    ],
  },
  {
    title: '커뮤니티',
    rows: [
      { id: 'posts', label: '작성한 글', icon: MessageCircleIcon, count: 6 },
      { id: 'reviews', label: '작성한 후기', icon: StarIcon, count: 3 },
      { id: 'mentors', label: '팔로우한 멘토', icon: UserPlusIcon, count: 4 },
      { id: 'saved', label: '저장한 콘텐츠', icon: BookmarkIcon, count: 11 },
    ],
  },
  {
    title: '설정',
    rows: [
      { id: 'notifications', label: '알림 설정', icon: BellIcon },
      { id: 'account', label: '계정 설정', icon: SettingsIcon },
      { id: 'support', label: '고객센터', icon: LifeBuoyIcon },
      { id: 'logout', label: '로그아웃', icon: LogOutIcon, isDanger: true },
    ],
  },
];

export default function ProfileScreen() {
  const router = useRouter();

  const handleRowPress = (row: MenuRow) => {
    if (row.href) {
      router.push(row.href as never);
    }
  };

  const handleBabyPress = (baby: Baby) => {
    router.push('/baby-detail' as never);
  };

  return (
    <SafeAreaView
      edges={['top']}
      className="flex-1"
      style={{ backgroundColor: BRAND.cream }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: FLOATING_TAB_BAR_CLEARANCE }}>
        <Header />
        <ProfileCard onEditPress={() => router.push('/profile-edit' as never)} />
        <BabyManagementCard babies={BABIES} onPress={handleBabyPress} />

        {SECTIONS.map((section, idx) => (
          <View key={section.title}>
            <View
              style={{
                paddingHorizontal: SCREEN_PADDING,
                paddingBottom: 10,
                paddingTop: idx === 0 ? 0 : 4,
              }}>
              <Text className="text-[13.5px] font-bold" style={{ color: '#2a2a2a' }}>
                {section.title}
              </Text>
            </View>
            <MenuSectionCard
              rows={section.rows}
              onPressRow={handleRowPress}
              isLast={idx === SECTIONS.length - 1}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function Header() {
  return (
    <View
      style={{
        paddingHorizontal: SCREEN_PADDING,
        paddingTop: 18,
        paddingBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text
        className="text-xl font-extrabold"
        style={{ color: BRAND.dark, letterSpacing: -0.3 }}>
        마이
      </Text>
      <Pressable hitSlop={10} accessibilityRole="button" accessibilityLabel="알림">
        <Icon as={BellIcon} size={22} color={BRAND.dark} />
      </Pressable>
    </View>
  );
}

function ProfileCard({ onEditPress }: { onEditPress: () => void }) {
  return (
    <Pressable
      onPress={onEditPress}
      accessibilityRole="button"
      accessibilityLabel="프로필 수정"
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        marginHorizontal: SCREEN_PADDING,
        marginTop: 6,
        marginBottom: 20,
      }}>
      <StripePlaceholder label="USER" circle width={60} height={60} />
      <View style={{ flex: 1 }}>
        <Text className="text-[16px] font-extrabold" style={{ color: '#2a2a2a' }}>
          {USER.name}
        </Text>
        <Text className="mt-0.5 text-[12px]" style={{ color: '#888' }}>
          {USER.email}
        </Text>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'rgba(54,81,84,0.2)',
          paddingHorizontal: 12,
          paddingVertical: 7,
          borderRadius: 999,
        }}>
        <Text className="text-[12px] font-bold" style={{ color: BRAND.dark }}>
          프로필 수정
        </Text>
      </View>
    </Pressable>
  );
}

function BabyManagementCard({
  babies,
  onPress,
}: {
  babies: Baby[];
  onPress: (baby: Baby) => void;
}) {
  return (
    <View
      style={{
        marginHorizontal: SCREEN_PADDING,
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 14,
        paddingHorizontal: 16,
        shadowColor: BRAND.dark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}>
        <Text className="text-[13.5px] font-bold" style={{ color: '#2a2a2a' }}>
          나의 아기 관리
        </Text>
        <Text className="text-[11.5px] font-semibold" style={{ color: BRAND.accent }}>
          + 아기 추가
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}>
        {babies.map(baby => (
          <Pressable
            key={baby.id}
            onPress={() => onPress(baby)}
            accessibilityRole="button"
            accessibilityLabel={`${baby.name} 상세`}
            style={{ width: 72, alignItems: 'center' }}>
            <StripePlaceholder label="BABY" circle width={56} height={56} />
            <Text className="mt-1.5 text-[12px] font-bold" style={{ color: '#2a2a2a' }}>
              {baby.name}
            </Text>
            <Text className="mt-0.5 text-[10px]" style={{ color: '#999' }}>
              D+{baby.dday}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

function MenuSectionCard({
  rows,
  onPressRow,
  isLast,
}: {
  rows: MenuRow[];
  onPressRow: (row: MenuRow) => void;
  isLast: boolean;
}) {
  return (
    <View
      style={{
        marginHorizontal: SCREEN_PADDING,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: BRAND.dark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 1,
        marginBottom: isLast ? 26 : 20,
      }}>
      {rows.map((row, idx) => (
        <MenuRowItem
          key={row.id}
          row={row}
          isLast={idx === rows.length - 1}
          onPress={() => onPressRow(row)}
        />
      ))}
    </View>
  );
}

function MenuRowItem({
  row,
  isLast,
  onPress,
}: {
  row: MenuRow;
  isLast: boolean;
  onPress: () => void;
}) {
  const iconColor = row.isDanger ? DANGER_COLOR : BRAND.dark;
  const labelColor = row.isDanger ? DANGER_COLOR : '#2a2a2a';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={row.label}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: ROW_VERTICAL_PADDING,
        paddingHorizontal: ROW_HORIZONTAL_PADDING,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: 'rgba(54,81,84,0.07)',
      }}>
      <Icon as={row.icon} size={19} color={iconColor} strokeWidth={2} />
      <Text className="flex-1 text-[13.5px] font-medium" style={{ color: labelColor }}>
        {row.label}
      </Text>
      {row.count !== undefined ? (
        <Text className="text-[12px] font-bold mr-0.5" style={{ color: BRAND.accent }}>
          {row.count}
        </Text>
      ) : null}
      <Icon as={ChevronRightIcon} size={16} color="#c3cccc" strokeWidth={2} />
    </Pressable>
  );
}