import { FLOATING_TAB_BAR_CLEARANCE } from '@/components/floating-tab-bar/constants';
import { StripePlaceholder } from '@/components/stripe-placeholder';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { BRAND } from '@/lib/theme';
import { useRouter } from 'expo-router';
import {
  CameraIcon,
  HeartIcon,
  SearchIcon,
} from 'lucide-react-native';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_PADDING = 20;
const PROMO_ACCENT = '#21C7C7';

type StatusKind = '모집중' | '마감임박' | 'NEW';

type Experience = {
  id: string;
  title: string;
  location: string;
  organizer?: string;
  status: StatusKind;
  applicants: number;
  capacity: number;
  liked?: boolean;
};

const STATUS_BG: Record<StatusKind, string> = {
  모집중: PROMO_ACCENT,
  마감임박: 'rgba(54,81,84,0.75)',
  NEW: '#365154',
};

const STATUS_TEXT_COLOR: Record<StatusKind, string> = {
  모집중: '#0a3d3d',
  마감임박: '#FFFFFF',
  NEW: '#FFFFFF',
};

const STATUS_FONT_SIZE: Record<StatusKind, number> = {
  모집중: 10.5,
  마감임박: 10.5,
  NEW: 10,
};

const RECOMMENDED_EXPERIENCE = {
  title: '뉴본 카시트 3일 체험단',
  subtitle: '서울 강남 · 라라베베 진행 · 신청마감 D-2',
};

const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    title: '뉴본 카시트 3일 체험단',
    location: '서울 강남',
    organizer: '라라베베',
    status: '모집중',
    applicants: 14,
    capacity: 20,
    liked: false,
  },
  {
    id: 'exp-2',
    title: '유모차 시승 클래스',
    location: '온라인',
    organizer: '뽀득',
    status: '마감임박',
    applicants: 15,
    capacity: 15,
    liked: false,
  },
  {
    id: 'exp-3',
    title: '이유식 원데이 클래스',
    location: '서울 성수',
    organizer: '소보송',
    status: '모집중',
    applicants: 4,
    capacity: 10,
    liked: true,
  },
  {
    id: 'exp-4',
    title: '신생아 마사지 체험 클래스',
    location: '서울 잠실',
    status: 'NEW',
    applicants: 2,
    capacity: 10,
    liked: false,
  },
  {
    id: 'exp-5',
    title: '저자극 스킨케어 체험단',
    location: '온라인',
    status: 'NEW',
    applicants: 17,
    capacity: 20,
    liked: false,
  },
];

export default function ExperienceScreen() {
  const router = useRouter();

  return (
    <SafeAreaView
      edges={['top']}
      className="flex-1"
      style={{ backgroundColor: BRAND.cream }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: FLOATING_TAB_BAR_CLEARANCE }}>
        <Header
          onSearchPress={() => router.push('/search' as never)}
          onWishlistPress={() => router.push('/profile' as never)}
        />
        <SNSCard />
        <StatusCard />
        <RecommendBanner />
        <View
          style={{
            paddingHorizontal: SCREEN_PADDING,
            marginBottom: 12,
          }}>
          <Text className="text-[15px] font-bold text-foreground">체험</Text>
        </View>
        <View
          style={{
            paddingHorizontal: SCREEN_PADDING,
            paddingBottom: 26,
            gap: 20,
          }}>
          {EXPERIENCES.map(experience => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Header({
  onSearchPress,
  onWishlistPress,
}: {
  onSearchPress: () => void;
  onWishlistPress: () => void;
}) {
  return (
    <View
      style={{
        paddingHorizontal: SCREEN_PADDING,
        paddingTop: 18,
        paddingBottom: 12,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          className="text-xl font-extrabold"
          style={{ color: BRAND.dark, letterSpacing: -0.3 }}>
          체험
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <Pressable
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="찜"
            onPress={onWishlistPress}>
            <View style={{ position: 'relative' }}>
              <Icon as={HeartIcon} size={21} color={BRAND.dark} />
              <View
                style={{
                  position: 'absolute',
                  top: -6,
                  right: -8,
                  backgroundColor: PROMO_ACCENT,
                  paddingHorizontal: 5,
                  paddingVertical: 1,
                  borderRadius: 999,
                }}>
                <Text
                  className="text-[9px] font-extrabold"
                  style={{ color: '#0a3d3d' }}>
                  5
                </Text>
              </View>
            </View>
          </Pressable>
          <Pressable
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="검색"
            onPress={onSearchPress}>
            <Icon as={SearchIcon} size={22} color={BRAND.dark} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function SNSCard() {
  return (
    <View
      style={{
        marginHorizontal: SCREEN_PADDING,
        marginBottom: 14,
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 14,
        paddingHorizontal: 16,
        shadowColor: BRAND.dark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 1,
      }}>
      <Text className="text-[13.5px] font-bold mb-3" style={{ color: '#2a2a2a' }}>
        나의 SNS 연결
      </Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="네이버 블로그 연결됨"
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            padding: 10,
            borderRadius: 14,
            backgroundColor: 'rgba(3,199,90,0.08)',
          }}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              backgroundColor: '#03C75A',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
            <Text className="text-[14px] font-extrabold" style={{ color: '#FFFFFF' }}>
              N
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text className="text-[12px] font-bold" style={{ color: '#2a2a2a' }}>
              네이버 블로그
            </Text>
            <Text
              className="mt-0.5 text-[10.5px] font-semibold"
              style={{ color: '#03A34A' }}>
              연결됨
            </Text>
          </View>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="인스타그램 연결하기"
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            padding: 10,
            borderRadius: 14,
            backgroundColor: 'rgba(54,81,84,0.05)',
          }}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              backgroundColor: '#ee2a7b',
            }}>
            <Icon as={CameraIcon} size={16} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text className="text-[12px] font-bold" style={{ color: '#2a2a2a' }}>
              인스타그램
            </Text>
            <Text className="mt-0.5 text-[10.5px] font-semibold" style={{ color: '#999' }}>
              연결하기 →
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

function StatusCard() {
  return (
    <View
      style={{
        marginHorizontal: SCREEN_PADDING,
        marginBottom: 22,
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
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
          나의 체험 현황
        </Text>
        <Text className="text-[11.5px] font-semibold" style={{ color: BRAND.accent }}>
          전체보기
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        {[
          { count: '1', label: '신청중', highlight: true },
          { count: '3', label: '체험완료' },
          { count: '1', label: '후기작성 대기' },
        ].map((stat, index, arr) => (
          <View
            key={stat.label}
            style={{
              flex: 1,
              alignItems: 'center',
              borderRightWidth: index < arr.length - 1 ? 1 : 0,
              borderRightColor: 'rgba(54,81,84,0.08)',
            }}>
            <Text
              className="text-[18px] font-extrabold"
              style={{ color: stat.highlight ? BRAND.dark : '#2a2a2a' }}>
              {stat.count}
            </Text>
            <Text className="mt-0.5 text-[10.5px]" style={{ color: '#888' }}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function RecommendBanner() {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${RECOMMENDED_EXPERIENCE.title} 신청하기`}
      style={{
        marginHorizontal: SCREEN_PADDING,
        marginBottom: 26,
        position: 'relative',
      }}>
      <StripePlaceholder
        label="추천 체험 배너"
        width="100%"
        height={190}
        square={false}
      />
      <View style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
        <Text
          className="text-[16px] font-extrabold text-white"
          style={{
            marginTop: 8,
            textShadowColor: 'rgba(0,0,0,0.25)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 6,
          }}>
          {RECOMMENDED_EXPERIENCE.title}
        </Text>
        <Text
          className="mt-1 text-[12px]"
          style={{
            color: '#EEEEEE',
            textShadowColor: 'rgba(0,0,0,0.25)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 4,
          }}>
          {RECOMMENDED_EXPERIENCE.subtitle}
        </Text>
      </View>
    </Pressable>
  );
}

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={experience.title}
      onPress={() => undefined}>
      <View style={{ position: 'relative' }}>
        <StripePlaceholder
          label="EXPERIENCE PHOTO"
          width="100%"
          height={180}
        />
        <View
          style={{
            position: 'absolute',
            top: 8,
            left: 8,
            backgroundColor: STATUS_BG[experience.status],
            paddingHorizontal: 8,
            paddingVertical: experience.status === 'NEW' ? 3 : 4,
            borderRadius: 999,
          }}>
          <Text
            className="font-bold"
            style={{
              color: STATUS_TEXT_COLOR[experience.status],
              fontSize: STATUS_FONT_SIZE[experience.status],
            }}>
            {experience.status}
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 26,
            height: 26,
            borderRadius: 13,
            backgroundColor: 'rgba(255,255,255,0.9)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            as={HeartIcon}
            size={14}
            color={experience.liked ? PROMO_ACCENT : BRAND.dark}
            fill={experience.liked ? PROMO_ACCENT : 'transparent'}
            strokeWidth={2}
          />
        </View>
      </View>
      <Text
        className="mt-2.5 text-[13.5px] font-semibold text-foreground"
        style={{ lineHeight: 18 }}>
        {experience.title}
      </Text>
      <Text className="mt-1 text-[11.5px]" style={{ color: '#888' }}>
        {experience.location}
        {experience.organizer ? ` · ${experience.organizer}` : ''}
      </Text>
      <Text className="mt-1.5 text-[11px]" style={{ color: '#999' }}>
        신청 {experience.applicants}명 · 모집 {experience.capacity}명
        {experience.status === '마감임박' ? ' (마감)' : ''}
      </Text>
    </Pressable>
  );
}