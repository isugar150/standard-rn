import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';

export type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

export type TabIconConfig = {
  outline: IoniconsName;
  filled: IoniconsName;
  size?: number;
  showLabel?: boolean;
};

// Ionicons ships real outline/filled pairs, so the selected tab can swap the
// glyph itself instead of faking a "solid" look by filling an outline icon.
export const TAB_ICONS: Record<string, TabIconConfig> = {
  home: { outline: 'home-outline', filled: 'home' },
  search: { outline: 'search-outline', filled: 'search' },
  create: { outline: 'add-circle-outline', filled: 'add-circle', size: 32, showLabel: false },
  notifications: { outline: 'notifications-outline', filled: 'notifications' },
  profile: { outline: 'person-outline', filled: 'person' },
};

export const DEFAULT_TAB_ICON = TAB_ICONS.home;
