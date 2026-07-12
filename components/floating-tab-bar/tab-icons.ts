import type { ImageSourcePropType } from 'react-native';

export type TabIconConfig = {
  default: ImageSourcePropType;
  selected: ImageSourcePropType;
  size?: number;
  selectedOffsetY?: number;
};

export const TAB_ICONS: Record<string, TabIconConfig> = {
  home: {
    default: require('@/assets/icons/tabbar/home-outline.png'),
    selected: require('@/assets/icons/tabbar/home-solid.png'),
  },
  search: {
    default: require('@/assets/icons/tabbar/shopping-outline.png'),
    selected: require('@/assets/icons/tabbar/shopping-solid.png'),
  },
  community: {
    default: require('@/assets/icons/tabbar/community-outline.png'),
    selected: require('@/assets/icons/tabbar/community-solid.png'),
  },
  experience: {
    default: require('@/assets/icons/tabbar/experience-outline.png'),
    selected: require('@/assets/icons/tabbar/experience-solid.png'),
  },
  profile: {
    default: require('@/assets/icons/tabbar/profile-outline.png'),
    selected: require('@/assets/icons/tabbar/profile-solid.png'),
  },
};

export const DEFAULT_TAB_ICON = TAB_ICONS.home;
