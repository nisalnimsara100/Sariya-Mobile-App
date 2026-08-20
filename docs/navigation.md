# Navigation

## Route map

| Route | File | Notes |
|---|---|---|
| `/` | `app/index.tsx` | Redirects immediately to `/(tabs)/Home` — not a visible screen |
| `/Home` | `app/(tabs)/Home.tsx` | Default tab, app's real landing screen |
| `/Chat` | `app/(tabs)/Chat.tsx` | |
| `/Notifications` | `app/(tabs)/Notifications.tsx` | Stub |
| `/Profile` | `app/(tabs)/Profile.tsx` | Logout button, "All Screens" link to the dev picker |
| `/screens/welcome` | `app/screens/welcome/index.tsx` | Logout's destination |
| `/screens/login` | `app/screens/login/index.tsx` | "Continue" button is currently a no-op — see conventions.md |
| `/screens/register` | `app/screens/register/index.tsx` | |
| `/screens/onboard` | `app/screens/onboard/index.tsx` | Carousel; "Get Started" `onFinish` isn't wired to navigate anywhere yet |
| `/screens/splashScreen` | `app/screens/splashScreen/index.tsx` | |
| `/screens/dashboard` | `app/screens/dashboard/index.tsx` | **Empty file (0 bytes)** — renders blank. Known gap, not yet implemented |
| `/screens/dev` | `app/screens/dev/index.tsx` | Dev-only "Screen Buttons" picker linking to every screen in the app. Reachable from Profile → "All Screens" |
| `/screens/home/BusDetails` | `app/screens/home/BusDetails/index.tsx` | |
| `/screens/chat/NewConversation` | `app/screens/chat/NewConversation/index.tsx` | |
| `/components/RegistrationSuccessful` | `app/components/RegistrationSuccessful.tsx` | Reachable as a route because it lives under `app/` |

## Tab bar

Defined in `app/(tabs)/_layout.tsx` using `@react-navigation/bottom-tabs` (via expo-router's `<Tabs>`). Order = declaration order = default tab:

1. **Home** (default/first)
2. **Chat**
3. **Notifications**
4. **Profile**

Each tab supplies a `tabBarIcon` that swaps a `Bold` SVG (focused) for a `Light` SVG (unfocused) — see [design.md](./design.md#icons). To add a tab: create `app/(tabs)/NewTab.tsx`, then add a matching `<Tabs.Screen name="NewTab" ... />` entry, plus a `Bold`/`Light` icon pair.

## Boot flow

`app/_layout.tsx` sets `initialRouteName="index"` on the root `<Stack>`. `index.tsx` immediately renders `<Redirect href="/(tabs)/Home" />`, so the app boots straight into the tab bar with no visible intermediate screen.

**Why a redirect and not just `initialRouteName="(tabs)"` on the Stack:** `initialRouteName` only controls React Navigation's *uncontrolled-mount* fallback. Expo Router still resolves the incoming URL (`"/"`, even on a plain cold launch) against the file-based route table first — and since `(tabs)` has no `index` child screen, there is no route that matches bare `"/"`. Setting `initialRouteName="(tabs)"` alone produces an **"Unmatched Route"** screen instead of the tab bar. A real `index.tsx` that matches `"/"` and redirects is the reliable, documented pattern — don't remove it in favor of the `initialRouteName` prop alone.

## Linking rules (the gotcha that caused the original bug)

- **`(parenthesized)` folder names are route *groups*** — stripped from the URL. A screen at `(tabs)/Home.tsx` is linked to as `href="/Home"` (or the disambiguated `href="/(tabs)/Home"`), **never** `href="(tabs)"`. Linking to a bare group name is not a valid path and will 404 to "Unmatched Route" — this was the root cause of the original "tab bar not opening" bug.
- Plain folder names (`screens/`) **do** appear in the URL — `href="/screens/login"` is a real path segment.
- Relative-looking hrefs without a leading `.` or `/` (e.g. `href="screens/welcome"`) resolve as **absolute** paths, not relative to the current file — Expo Router only treats hrefs starting with a literal `.` as file-relative. Don't assume moving a file breaks its plain-string hrefs; it won't.
- For navigation buttons, prefer `<Link href="..." asChild>` wrapping a `Pressable` over calling `router.push` in `onPress` (see [design.md](./design.md#navigating-buttons-no-imperative-logic)). Reserve `router.replace` / `router.back()` for actions that also carry side effects (logout, form submit, dismiss).

## Deep linking (for manual testing)

App scheme is `sariya` (`app.json` → `expo.scheme`). In Expo Go during development, the scheme is the dev server URL instead. To jump straight to a route in the iOS Simulator without navigating by hand:
```bash
xcrun simctl openurl <device-id> "exp://127.0.0.1:<port>/--/Profile"
```
Useful for testing a screen that's hard to reach via taps (e.g. verifying a redirect target renders before wiring up the button that triggers it).
