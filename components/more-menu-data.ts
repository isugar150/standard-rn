import {
  BellIcon,
  HouseIcon,
  SearchIcon,
  SquarePenIcon,
  UserRoundIcon,
  type LucideIcon,
} from 'lucide-react-native';

export type MenuDestination = {
  readonly title: string;
  readonly description: string;
  readonly href: '/home' | '/search' | '/create' | '/notifications' | '/profile';
  readonly icon: LucideIcon;
  readonly badge?: string;
};

export const MENU_ITEMS: readonly MenuDestination[] = [
  { title: '홈', description: '지금 올라온 이야기를 둘러보세요', href: '/home', icon: HouseIcon },
  {
    title: '검색',
    description: '관심 있는 주제와 글을 찾아보세요',
    href: '/search',
    icon: SearchIcon,
  },
  {
    title: '글쓰기',
    description: '새로운 이야기를 남겨보세요',
    href: '/create',
    icon: SquarePenIcon,
  },
  {
    title: '알림',
    description: '내 활동과 새로운 소식을 확인하세요',
    href: '/notifications',
    icon: BellIcon,
    badge: '2',
  },
  {
    title: '마이',
    description: '내 게시물과 활동을 관리하세요',
    href: '/profile',
    icon: UserRoundIcon,
  },
];
