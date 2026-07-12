import {
  CompassIcon,
  HouseIcon,
  SearchIcon,
  UserRoundIcon,
  UsersIcon,
  type LucideIcon,
} from 'lucide-react-native';

export type MenuDestination = {
  readonly title: string;
  readonly description: string;
  readonly href: '/home' | '/search' | '/community' | '/experience' | '/profile';
  readonly icon: LucideIcon;
  readonly badge?: string;
};

export const MENU_ITEMS: readonly MenuDestination[] = [
  { title: '홈', description: '지금 올라온 이야기를 둘러보세요', href: '/home', icon: HouseIcon },
  {
    title: '검색 & 카테고리',
    description: '관심 있는 주제와 카테고리를 찾아보세요',
    href: '/search',
    icon: SearchIcon,
  },
  {
    title: '커뮤니티&멘토',
    description: '커뮤니티와 멘토 콘텐츠를 확인하세요',
    href: '/community',
    icon: UsersIcon,
  },
  {
    title: '체험',
    description: '새로운 체험 콘텐츠를 둘러보세요',
    href: '/experience',
    icon: CompassIcon,
  },
  {
    title: '마이페이지',
    description: '내 게시물과 활동을 관리하세요',
    href: '/profile',
    icon: UserRoundIcon,
  },
];
