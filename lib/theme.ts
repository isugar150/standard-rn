import { DarkTheme, DefaultTheme, type Theme } from 'expo-router/react-navigation';
import { useColorScheme } from 'nativewind';

/**
 * Semantic color tokens. Driven by CSS variables in `global.css` (`:root` +
 * `.dark:root`); resolve via Tailwind classes (`bg-background`,
 * `text-foreground`, …) or `THEME[colorScheme]` for non-Tailwind components.
 */
export const THEME = {
  light: {
    background: 'hsl(0 0% 100%)',
    nativeBackground: 'rgb(255, 255, 255)',
    foreground: 'hsl(0 0% 3.9%)',
    card: 'hsl(0 0% 100%)',
    cardForeground: 'hsl(0 0% 3.9%)',
    popover: 'hsl(0 0% 100%)',
    popoverForeground: 'hsl(0 0% 3.9%)',
    primary: 'hsl(0 0% 9%)',
    primaryForeground: 'hsl(0 0% 98%)',
    secondary: 'hsl(0 0% 96.1%)',
    secondaryForeground: 'hsl(0 0% 9%)',
    muted: 'hsl(0 0% 96.1%)',
    mutedForeground: 'hsl(0 0% 45.1%)',
    accent: 'hsl(0 0% 96.1%)',
    accentForeground: 'hsl(0 0% 9%)',
    destructive: 'hsl(0 84.2% 60.2%)',
    border: 'hsl(0 0% 89.8%)',
    input: 'hsl(0 0% 89.8%)',
    ring: 'hsl(0 0% 63%)',
    radius: '0.625rem',
    chart1: 'hsl(12 76% 61%)',
    chart2: 'hsl(173 58% 39%)',
    chart3: 'hsl(197 37% 24%)',
    chart4: 'hsl(43 74% 66%)',
    chart5: 'hsl(27 87% 67%)',
  },
  dark: {
    background: 'hsl(0 0% 10%)',
    nativeBackground: 'rgb(26, 26, 26)',
    foreground: 'hsl(0 0% 98%)',
    card: 'hsl(0 0% 14%)',
    cardForeground: 'hsl(0 0% 98%)',
    popover: 'hsl(0 0% 14%)',
    popoverForeground: 'hsl(0 0% 98%)',
    primary: 'hsl(0 0% 98%)',
    primaryForeground: 'hsl(0 0% 9%)',
    secondary: 'hsl(0 0% 18%)',
    secondaryForeground: 'hsl(0 0% 98%)',
    muted: 'hsl(0 0% 18%)',
    mutedForeground: 'hsl(0 0% 70%)',
    accent: 'hsl(0 0% 18%)',
    accentForeground: 'hsl(0 0% 98%)',
    destructive: 'hsl(0 70.9% 59.4%)',
    border: 'hsl(0 0% 22%)',
    input: 'hsl(0 0% 18%)',
    ring: 'hsl(300 0% 45%)',
    radius: '0.625rem',
    chart1: 'hsl(220 70% 50%)',
    chart2: 'hsl(160 60% 45%)',
    chart3: 'hsl(30 80% 55%)',
    chart4: 'hsl(280 65% 60%)',
    chart5: 'hsl(340 75% 55%)',
  },
};

/**
 * Brand palette — light variant.
 *
 * Mirrored as CSS variables in `global.css` (`:root`) for solid tokens so
 * Tailwind classes (`bg-brand-cream`, `text-brand`, …) can switch with the
 * `.dark` class automatically. RGBA tokens are JS-only because Nativewind's
 * `hsl(var(--x))` doesn't compose cleanly with alpha values.
 */
export interface BrandPalette {
  brand: string;
  onBrand: string;
  accent: string;
  accentText: string;
  accentSoft: string;
  cream: string;
  surface: string;
  muted: string;
  mutedStrong: string;
  mutedText: string;
  overlay: string;
  subtle: string;
  subtleStrong: string;
  stripeBg: string;
  stripeBorder: string;
}

export const BRAND_LIGHT: BrandPalette = {
  /** Primary brand tone. Used for text/icons and solid CTA backgrounds. */
  brand: '#365154',
  /** Foreground color that contrasts with `brand` (e.g. text inside a brand button). */
  onBrand: '#FFFFFF',
  /** Accent / interactive highlight color (links, focused chips). */
  accent: '#21a3a3',
  /** Accent color for body text on light backgrounds (darker than `accent`). */
  accentText: '#1a7a7a',
  /** Soft accent fill — typically used as background for non-active accent pills. */
  accentSoft: 'rgba(33, 199, 199, 0.16)',
  /** Page-level canvas color (behind scroll content). */
  cream: '#F6F4EE',
  /** Card / sheet / modal surface color — lifts above `cream`. */
  surface: '#FFFFFF',
  /** Muted border color (chip outlines, dividers). */
  muted: 'rgba(54, 81, 84, 0.2)',
  /** Stronger muted border for hover/active states. */
  mutedStrong: 'rgba(54, 81, 84, 0.25)',
  /** Secondary / placeholder text color. */
  mutedText: '#7a8a8a',
  /** Semi-transparent overlay used by modal scrims. */
  overlay: 'rgba(54, 81, 84, 0.75)',
  /** Very subtle background tint (e.g. quick-action tiles). */
  subtle: 'rgba(54, 81, 84, 0.06)',
  /** Subtle background tint (slightly stronger than `subtle`). */
  subtleStrong: 'rgba(54, 81, 84, 0.08)',
  /** Placeholder stripe background (development image substitutes). */
  stripeBg: 'rgba(54, 81, 84, 0.06)',
  /** Placeholder stripe border. */
  stripeBorder: 'rgba(54, 81, 84, 0.12)',
} as const;

export const BRAND_DARK: BrandPalette = {
  /** Primary brand tone. Lighter muted teal for legibility on dark surfaces. */
  brand: '#B0C5BF',
  /** Foreground color that contrasts with `brand` (e.g. text inside a brand button). */
  onBrand: '#1A1A1A',
  /** Accent / interactive highlight color (links, focused chips). */
  accent: '#5BC8C5',
  /** Accent color for body text on dark surfaces. */
  accentText: '#5BC8C5',
  /** Soft accent fill — typically used as background for non-active accent pills. */
  accentSoft: 'rgba(91, 200, 197, 0.16)',
  /** Page-level canvas color (behind scroll content). */
  cream: '#1A1A1A',
  /** Card / sheet / modal surface color — lifts above `cream`. */
  surface: '#232323',
  /** Muted border color (chip outlines, dividers). */
  muted: 'rgba(255, 255, 255, 0.1)',
  /** Stronger muted border for hover/active states. */
  mutedStrong: 'rgba(255, 255, 255, 0.16)',
  /** Secondary / placeholder text color. */
  mutedText: '#8E8E8E',
  /** Semi-transparent overlay used by modal scrims. */
  overlay: 'rgba(0, 0, 0, 0.7)',
  /** Very subtle background tint (e.g. quick-action tiles). */
  subtle: 'rgba(255, 255, 255, 0.04)',
  /** Subtle background tint (slightly stronger than `subtle`). */
  subtleStrong: 'rgba(255, 255, 255, 0.07)',
  /** Placeholder stripe background (development image substitutes). */
  stripeBg: 'rgba(255, 255, 255, 0.04)',
  /** Placeholder stripe border. */
  stripeBorder: 'rgba(255, 255, 255, 0.1)',
} as const;

/**
 * Returns the brand palette for the active color scheme. Use in components
 * that render brand colors via inline styles or icon `color` props; for
 * static colors prefer Tailwind classes (`bg-brand-cream`, `text-brand`, …).
 */
export function useBrandColor(): BrandPalette {
  const { colorScheme } = useColorScheme();
  return colorScheme === 'dark' ? BRAND_DARK : BRAND_LIGHT;
}

/**
 * @deprecated Use `useBrandColor()` in components, or import `BRAND_LIGHT` /
 *   `BRAND_DARK` directly in static contexts (tests, snapshots, native deps).
 */
export const BRAND: BrandPalette = BRAND_LIGHT;

export const NAV_THEME: Record<'light' | 'dark', Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};