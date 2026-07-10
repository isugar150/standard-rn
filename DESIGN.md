# Standard RN Design System

## 1. Atmosphere & Identity

Standard RN is a quiet, content-first community app. Its signature is calm, neutral layering: concise cards and soft tonal surfaces give each action a clear home without making the interface feel boxed in.

## 2. Color

### Palette

| Role               | Token                 | Light                | Dark                 | Usage                              |
| ------------------ | --------------------- | -------------------- | -------------------- | ---------------------------------- |
| Surface/primary    | `--background`        | `hsl(0 0% 100%)`     | `hsl(0 0% 3.9%)`     | Screen background                  |
| Surface/secondary  | `--secondary`         | `hsl(0 0% 96.1%)`    | `hsl(0 0% 14.9%)`    | Grouped content and icon tiles     |
| Surface/elevated   | `--card`, `--popover` | `hsl(0 0% 100%)`     | `hsl(0 0% 3.9%)`     | Cards, sheets, and menus           |
| Text/primary       | `--foreground`        | `hsl(0 0% 3.9%)`     | `hsl(0 0% 98%)`      | Titles and body text               |
| Text/secondary     | `--muted-foreground`  | `hsl(0 0% 45.1%)`    | `hsl(0 0% 63.9%)`    | Supporting copy and metadata       |
| Border/default     | `--border`            | `hsl(0 0% 89.8%)`    | `hsl(0 0% 14.9%)`    | Dividers and outlined surfaces     |
| Accent/interaction | `--accent`            | `hsl(0 0% 96.1%)`    | `hsl(0 0% 14.9%)`    | Pressed and focused states         |
| Primary/action     | `--primary`           | `hsl(0 0% 9%)`       | `hsl(0 0% 98%)`      | Primary controls and active labels |
| Status/destructive | `--destructive`       | `hsl(0 84.2% 60.2%)` | `hsl(0 70.9% 59.4%)` | Destructive actions only           |

Use the existing NativeWind semantic classes; new raw colors are not introduced.
For React Native surfaces that require an inline color (such as animated modal containers), use the
matching `nativeBackground` value from `lib/theme.ts`; it is the platform-compatible form of the
same primary-surface token.

## 3. Typography

### Scale

| Level   | Size | Weight | Usage                        |
| ------- | ---- | ------ | ---------------------------- |
| H1      | 36px | 800    | Page-level display           |
| H2      | 30px | 600    | Major sections               |
| H3      | 24px | 600    | Card headings                |
| H4      | 20px | 600    | Sheet titles                 |
| Body    | 16px | 400    | Default content              |
| Body/sm | 14px | 400    | Supporting copy              |
| Caption | 12px | 500    | Labels, badges, and metadata |

- Primary font: platform system sans-serif via React Native defaults.
- Body text never falls below 12px; interactive labels use at least 14px.

## 4. Spacing & Layout

All spacing uses a 4px base unit.

| Token       | Value | Usage                           |
| ----------- | ----: | ------------------------------- |
| `--space-1` |   4px | Tight icon and label rhythm     |
| `--space-2` |   8px | Compact rows                    |
| `--space-3` |  12px | List and card gaps              |
| `--space-4` |  16px | Screen gutters and card padding |
| `--space-5` |  20px | Menu row padding                |
| `--space-6` |  24px | Group separation                |
| `--space-8` |  32px | Section separation              |

- Mobile gutter: 16px.
- Full-screen sheets respect top and bottom safe areas.
- Menu rows use 16px horizontal and 12px vertical padding.

## 5. Components

### Header action

- **Structure**: icon-only `Button` with a 40px touch target.
- **Variants**: ghost.
- **States**: default, pressed, focus-visible on web, disabled.
- **Accessibility**: explicit Korean accessibility label.

### Navigation sheet

- **Structure**: branded header, account summary, grouped navigation rows, optional informational card.
- **Spacing**: 16px screen gutter; 12px between rows; 24px between groups.
- **States**: active destination uses `secondary`; press uses `accent`; badge communicates unread state.
- **Accessibility**: modal can be dismissed by the close control or native back action; every row has a descriptive label.
- **Motion**: horizontal translation only; 220ms open and 180ms close.

### Navigation row

- **Structure**: pressable row with a secondary icon tile, title, supporting description, optional badge, and chevron.
- **States**: default, active, pressed, focus-visible on web.
- **Accessibility**: full row is the target with a contextual label.

### Account summary

- **Structure**: avatar, name, supporting label, and chevron in an outlined card.
- **States**: default and pressed.

## 6. Motion & Interaction

| Type     |  Duration | Usage                           |
| -------- | --------: | ------------------------------- |
| Micro    | 100-150ms | Button press feedback           |
| Standard | 180-220ms | Navigation sheet open and close |

Only `transform` and `opacity` animate. Press feedback uses the platform’s active-state styling; the sheet uses horizontal translation.

## 7. Depth & Surface

**Strategy: mixed.** Grouped surfaces use subtle tonal shifts and a single `border` token; modal sheets use the existing soft shadow treatment. Rounded corners are tighter inside rows and softer on cards/sheets.

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- Target WCAG 2.2 AA: 4.5:1 for body copy and a visible web focus state for every interactive control.
- Icon-only controls always have accessibility labels.
- Menu actions have a minimum 40px visual touch target and are reachable through native modal controls.
- Motion is short and limited to a purposeful panel transition.

### Accepted Debt

| Item                            | Location         | Why accepted                                                                                                                    | Owner / Exit                                                            |
| ------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| No custom reduced-motion branch | Navigation sheet | React Native’s default animation remains brief and non-essential; no system preference hook is currently shared in the project. | Add a shared preference when the app introduces more persistent motion. |
