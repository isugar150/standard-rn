import { StripePlaceholder } from '@/components/stripe-placeholder';
import { Text } from '@/components/ui/text';
import { useBrandColor } from '@/lib/theme';
import { useRouter } from 'expo-router';
import { ChevronLeftIcon } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type Stat = { id: string; value: string; label: string };

type GrowthTab = '몸무게' | '키';

type RecordItem = {
  id: string;
  emoji: string;
  title: string;
  time: string;
};

type DiaryEntry = {
  id: string;
  date: string;
  title: string;
};

const STATS: Stat[] = [
  { id: 'weight', value: '7.8kg', label: '몸무게' },
  { id: 'height', value: '68cm', label: '키' },
  { id: 'percentile', value: '상위 42%', label: '또래 성장률' },
];

const TODAY_RECORDS: RecordItem[] = [
  { id: '1', emoji: '😴', title: '낮잠 1시간 20분', time: '오후 1:10 – 2:30' },
  { id: '2', emoji: '🍼', title: '분유 150ml', time: '오전 11:40' },
  { id: '3', emoji: '🥣', title: '이유식 초기 · 완료', time: '오전 9:20' },
];

const DIARY_ENTRIES: DiaryEntry[] = [
  { id: '1', date: '7/9', title: '첫 뒤집기 성공!' },
  { id: '2', date: '7/8', title: '오늘은 낮잠을 푹 잤어요' },
  { id: '3', date: '7/7', title: '이유식 첫 시도' },
];

const SCREEN_PADDING = 20;
const BOTTOM_CTA_VERTICAL = 12;

export default function BabyDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = React.useState<GrowthTab>('몸무게');

  return (
    <SafeAreaView
      edges={['top']}
      className="flex-1 bg-brand-cream">
      <Header onBack={() => router.back()} />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 76 + insets.bottom,
        }}
        showsVerticalScrollIndicator={false}>
        <Hero />
        <StatsRow items={STATS} />
        <SectionHeader title="성장 그래프" action="전체 기록" />
        <GrowthChartCard activeTab={activeTab} onTabChange={setActiveTab} />
        <SectionHeader title="오늘의 기록" action="전체보기" />
        <TodayRecordsList items={TODAY_RECORDS} />
        <SectionHeader title="성장일기" action="전체보기" />
        <DiaryCarousel items={DIARY_ENTRIES} />
      </ScrollView>
      <BottomCta bottomInset={insets.bottom} />
    </SafeAreaView>
  );
}

function Header({ onBack }: { onBack: () => void }) {
  const palette = useBrandColor();
  return (
    <View
      className="flex-row items-center justify-between"
      style={{ paddingHorizontal: SCREEN_PADDING, paddingVertical: 16 }}>
      <Pressable
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel="뒤로 가기"
        onPress={onBack}
        className="-ml-1 p-1">
        <Icon name="chevron-left" color={palette.brand} size={22} />
      </Pressable>
      <Text className="text-[15px] font-bold text-foreground">아기 정보</Text>
      <Pressable hitSlop={10} accessibilityRole="button" accessibilityLabel="정보 수정">
        <Text className="text-[12.5px] font-bold text-brand-accent">
          정보 수정
        </Text>
      </Pressable>
    </View>
  );
}

function Icon({ name, color, size }: { name: 'chevron-left'; color: string; size: number }) {
  if (name === 'chevron-left') {
    return <ChevronLeftIcon size={size} color={color} />;
  }
  return null;
}

function Hero() {
  return (
    <View
      className="items-center"
      style={{ paddingTop: 12, paddingBottom: 20, paddingHorizontal: SCREEN_PADDING }}>
      <StripePlaceholder label="BABY" width={92} height={92} circle />
      <Text
        className="text-[19px] font-extrabold text-foreground"
        style={{ marginTop: 14 }}>
        이준이
      </Text>
      <Text className="mt-1 text-[12.5px] text-muted-foreground">
        2025.01.06 출생 · 남아 · D+186
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, marginTop: 14, paddingHorizontal: 0 }}>
        <ActionChip emoji="📝" label="일기 쓰기" primary />
        <ActionChip emoji="📏" label="성장 기록" />
      </ScrollView>
    </View>
  );
}

function ActionChip({
  emoji,
  label,
  primary,
}: {
  emoji: string;
  label: string;
  primary?: boolean;
}) {
  const palette = useBrandColor();
  return (
    <View
      className="flex-row items-center rounded-full"
      style={{
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 8,
        backgroundColor: primary ? palette.brand : palette.subtleStrong,
      }}>
      <Text className="text-[12.5px]">{emoji}</Text>
      <Text
        className="text-[12.5px] font-bold"
        style={{ color: primary ? palette.onBrand : palette.brand }}>
        {label}
      </Text>
    </View>
  );
}

function StatsRow({ items }: { items: Stat[] }) {
  return (
    <View
      className="flex-row"
      style={{ gap: 10, paddingHorizontal: SCREEN_PADDING, marginBottom: 22 }}>
      {items.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </View>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  const palette = useBrandColor();
  return (
    <View
      className="flex-1 items-center rounded-2xl bg-card"
      style={{
        paddingVertical: 12,
        shadowColor: palette.brand,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 1,
      }}>
      <Text className="text-[15px] font-extrabold text-foreground">{stat.value}</Text>
      <Text className="mt-0.5 text-[10.5px] text-muted-foreground">{stat.label}</Text>
    </View>
  );
}

function SectionHeader({ title, action }: { title: string; action: string }) {
  return (
    <View
      className="flex-row items-baseline justify-between"
      style={{ paddingHorizontal: SCREEN_PADDING, marginBottom: 12 }}>
      <Text className="text-[15px] font-bold text-foreground">{title}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel={action}>
        <Text className="text-[11.5px] font-semibold text-brand-accent">
          {action}
        </Text>
      </Pressable>
    </View>
  );
}

function GrowthChartCard({
  activeTab,
  onTabChange,
}: {
  activeTab: GrowthTab;
  onTabChange: (tab: GrowthTab) => void;
}) {
  const palette = useBrandColor();
  return (
    <View
      className="bg-card"
      style={{
        marginHorizontal: SCREEN_PADDING,
        marginBottom: 26,
        borderRadius: 18,
        padding: 16,
        shadowColor: palette.brand,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 1,
      }}>
      <View className="flex-row" style={{ gap: 8, marginBottom: 12 }}>
        <GrowthTab active={activeTab === '몸무게'} label="몸무게" onPress={() => onTabChange('몸무게')} />
        <GrowthTab active={activeTab === '키'} label="키" onPress={() => onTabChange('키')} />
      </View>
      <StripePlaceholder label="성장 그래프" height={150} />
    </View>
  );
}

function GrowthTab({ active, label, onPress }: { active: boolean; label: string; onPress: () => void }) {
  const palette = useBrandColor();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={label}
      onPress={onPress}
      className="rounded-full"
      style={{
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: active ? palette.brand : palette.stripeBg,
      }}>
      <Text
        className="text-[11.5px] font-bold"
        style={{ color: active ? palette.onBrand : palette.brand }}>
        {label}
      </Text>
    </Pressable>
  );
}

function TodayRecordsList({ items }: { items: RecordItem[] }) {
  return (
    <View style={{ paddingHorizontal: SCREEN_PADDING, marginBottom: 26, gap: 10 }}>
      {items.map((item) => (
        <RecordCard key={item.id} item={item} />
      ))}
    </View>
  );
}

function RecordCard({ item }: { item: RecordItem }) {
  const palette = useBrandColor();
  return (
    <View
      className="flex-row items-center bg-card"
      style={{
        gap: 12,
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
        shadowColor: palette.brand,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 1,
      }}>
      <View
        className="items-center justify-center"
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          backgroundColor: palette.stripeBg,
        }}>
        <Text className="text-base">{item.emoji}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-[13px] font-semibold text-foreground">{item.title}</Text>
        <Text className="mt-0.5 text-[11px] text-muted-foreground">{item.time}</Text>
      </View>
    </View>
  );
}

function DiaryCarousel({ items }: { items: DiaryEntry[] }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 14, paddingHorizontal: SCREEN_PADDING, marginBottom: 28 }}>
      {items.map((entry) => (
        <DiaryCard key={entry.id} entry={entry} />
      ))}
    </ScrollView>
  );
}

function DiaryCard({ entry }: { entry: DiaryEntry }) {
  const [, month, day] = entry.date.split('/');
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={entry.title}
      style={{ width: 130 }}>
      <StripePlaceholder label={`${month}/${day}`} width={130} height={130} />
      <Text
        className="mt-2 text-[11.5px] font-semibold text-foreground"
        style={{ lineHeight: 15 }}
        numberOfLines={2}>
        {entry.title}
      </Text>
      <Text className="mt-0.5 text-[10.5px] text-muted-foreground">{`${month}월 ${day}일`}</Text>
    </Pressable>
  );
}

function BottomCta({ bottomInset }: { bottomInset: number }) {
  const palette = useBrandColor();
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: palette.surface,
        borderTopWidth: 1,
        borderTopColor: palette.subtleStrong,
        paddingHorizontal: SCREEN_PADDING,
        paddingTop: BOTTOM_CTA_VERTICAL,
        paddingBottom: BOTTOM_CTA_VERTICAL + bottomInset,
      }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="오늘 일기 쓰기"
        className="flex-row items-center justify-center rounded-2xl"
        style={{ backgroundColor: palette.brand, paddingVertical: 14, gap: 6 }}>
        <Text className="text-[14px]">📝</Text>
        <Text className="text-[14.5px] font-bold text-primary-foreground">오늘 일기 쓰기</Text>
      </Pressable>
    </View>
  );
}