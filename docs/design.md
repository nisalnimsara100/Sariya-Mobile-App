# Design System

Styling is done with **NativeWind** (Tailwind classes via `className`) for layout/typography/borders, and inline `style={{ ... }}` for one-off hex colors that aren't in `tailwind.config.js` yet. Both patterns exist side by side in the codebase today — prefer the steps below for new work so the app converges on one system over time.

## Color palette

No colors are registered in `tailwind.config.js` yet, so every screen currently hardcodes hex values via `style={{ color: '#266FEF' }}` or `className="text-[#266FEF]"`. These are the values already in use, grouped by role:

| Role | Hex | Used in |
|---|---|---|
| Primary (brand blue) | `#266FEF` | Buttons, links, active tab tint, primary CTAs |
| Primary — dark navy | `#000F29` | Onboarding gradient end-state |
| Primary — light tints | `#669EFF`, `#4689FE`, `#328DFF`, `#3B8DDD` | Gradients, secondary accents |
| Text — primary | `#23252F` | Headings, body copy |
| Text — secondary | `#6F6F71`, `#959595`, `#A1A1A1` | Subtext, placeholders, helper copy |
| Border — light blue | `#BCD1FF`, `#B8D7FF`, `#BED2F4`, `#D7E5FD`, `#D4E2FB` | Input borders, card borders |
| Neutral / dividers | `#ECECEC`, `#D8D8D8`, `#EBEBEB`, `#D9D9D9`, `#d0d0d0`, `#e8e8e8` | Dividers, disabled states, chips |
| Accent — yellow | `#F2C700` | Onboarding/status accents |
| Alert / destructive | `#FF2D2D` | Logout, errors, destructive actions |
| Surface | `#FFFFFF` / `#000000` | Backgrounds, text-on-color |

**When adding a new screen:** reuse one of these values instead of inventing a new hex code. If you need a color not on this list, add it here first, then use it — that keeps this table the source of truth.

**Recommended next step:** register this palette in `tailwind.config.js` under `theme.extend.colors` (e.g. `primary: '#266FEF'`) so new code can use `bg-primary` / `text-primary` instead of `bg-[#266FEF]`. Not done yet — flagged here so it isn't lost.

## Typography

Fonts are Poppins, loaded as local TTFs in `src/app/_layout.tsx` via `useFonts`, and exposed as NativeWind classes in `tailwind.config.js`:

| Weight | Font family (loaded) | NativeWind class |
|---|---|---|
| Regular | `PoppinsRegular` | `font-poppinsRegulary` ⚠️ *(typo — see [conventions.md](./conventions.md))* |
| Light | `PoppinsLight` | `font-poppinsLight` |
| Medium | `PoppinsMedium` | `font-poppinsMedium` |
| SemiBold | `PoppinsSemiBold` | `font-poppinsSemiBold` |
| Bold | `PoppinsBold` | `font-poppinsBold` |

Usage pattern:
- Screen titles: `text-2xl` / `text-3xl` + `font-poppinsBold`
- Section/body headings: `font-poppinsSemiBold`
- Body copy: `font-poppinsMedium` or `font-poppinsRegulary`
- Helper/secondary text: `font-poppinsMedium` + a secondary text color (`#6F6F71` / `#959595`)

Always set a `font-poppins*` class explicitly — there is no default font fallback configured, so unstyled `<Text>` falls back to the system font, which reads as inconsistent next to Poppins headings.

## Spacing & layout

- Screen root: `SafeAreaView` from `react-native-safe-area-context` (not the deprecated `react-native` one — see [conventions.md](./conventions.md)), typically `className="flex-1 bg-white"` with `edges={['top']}`.
- Horizontal screen padding: `px-6` is the standard content inset (used in `welcome`, `login`, `register`, `Profile`).
- Vertical rhythm between stacked elements: `mt-2` (tight), `mt-3`/`mt-4` (related fields), `mt-10` (section breaks).
- Rounded corners: `rounded-xl` (9–12px) for buttons and inputs is standard across `login`, `welcome`, `register`, `Profile`.

## Component patterns

### Primary button
```tsx
<Pressable
  className="rounded-xl py-3"
  style={{ backgroundColor: '#266FEF' }}
  onPress={handlePress}
>
  <Text className="text-white text-center font-poppinsSemiBold">Label</Text>
</Pressable>
```

### Destructive / outlined button
```tsx
<Pressable className="rounded-xl border py-3" style={{ borderColor: '#FF2D2D' }} onPress={handlePress}>
  <Text className="text-center font-poppinsSemiBold" style={{ color: '#FF2D2D' }}>Logout</Text>
</Pressable>
```

### Navigating buttons (no imperative logic)
Wrap the `Pressable` in expo-router's `Link` with `asChild` rather than calling `router.push` from `onPress`:
```tsx
<Link href="/screens/login" asChild>
  <Pressable className="rounded-xl bg-[#266FEF] py-3">
    <Text className="text-white text-center font-poppinsSemiBold">Login</Text>
  </Pressable>
</Link>
```
Reserve imperative `router.replace(...)` / `router.back()` for actions with side effects first (e.g. logout, form submit) — see `Profile.tsx` and `screens/register/index.tsx`.

### Text input
```tsx
<View className="mt-1 h-[48px] rounded-[9px] border" style={{ borderColor: '#BCD1FF' }}>
  <TextInput
    placeholder="..."
    placeholderTextColor="#959595"
    className="px-4 text-[#23252F] font-poppinsMedium"
  />
</View>
```

### Icons
Tab bar and inline icons are `.svg` files imported directly as React components (via `react-native-svg-transformer`), not an icon font:
```tsx
import HomeBold from '../assets/icons/Bold/Home.svg';
import HomeOutline from '../assets/icons/Light/Home.svg';
```
Icons ship in `Bold`/`Light` pairs per concept (active vs. inactive state) under `src/app/assets/icons/`. Follow this pairing when adding a new tab or toggled icon.
