import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';

export type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

// Ionicons ships real outline/filled pairs, so the selected tab can swap the
// glyph itself instead of faking a "solid" look by filling an outline icon.
export const TAB_ICONS: Record<string, { outline: IoniconsName; filled: IoniconsName }> = {
  index: { outline: 'home-outline', filled: 'home' },
  menu2: { outline: 'search-outline', filled: 'search' },
  menu3: { outline: 'add-circle-outline', filled: 'add-circle' },
  menu4: { outline: 'notifications-outline', filled: 'notifications' },
  menu5: { outline: 'person-outline', filled: 'person' },
};

export const DEFAULT_TAB_ICON = TAB_ICONS.index;
