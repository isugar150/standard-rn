export const FLOATING_TAB_BAR_HEIGHT = 64;
export const FLOATING_TAB_BAR_BOTTOM_MARGIN = 12;
/** Bottom padding screen content should reserve so it doesn't sit under the floating tab bar. */
export const FLOATING_TAB_BAR_CLEARANCE =
  FLOATING_TAB_BAR_HEIGHT + FLOATING_TAB_BAR_BOTTOM_MARGIN + 16;

export const ROW_HORIZONTAL_PADDING = 8;
export const TAB_ITEM_HEIGHT = 48;

// Let the selected background bleed into neighboring tab slots a little so the
// active state feels broader than the icon + label column.
export const INDICATOR_HORIZONTAL_OVERLAP = 3;
export const INDICATOR_HEIGHT = 56;
export const INDICATOR_TOP = (FLOATING_TAB_BAR_HEIGHT - INDICATOR_HEIGHT) / 2;
export const INDICATOR_SPRING = { damping: 20, stiffness: 220, mass: 0.6 };
export const INDICATOR_COLOR = {
  light: 'rgba(0, 0, 0, 0.09)',
  dark: 'rgba(255, 255, 255, 0.16)',
};

export const TAB_BAR_FADE_COLOR = {
  light: '#FFFFFF',
  dark: '#0A0A0A',
};
export const TAB_BAR_FADE_EXTRA_HEIGHT = 36;

export const TAB_ICON_SIZE = 25;
export const TAB_PRESS_SCALE = 1.08;
export const TAB_PRESS_SPRING = { damping: 14, stiffness: 420, mass: 0.45 };
