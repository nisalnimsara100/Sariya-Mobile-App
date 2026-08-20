# Project Structure

Routing is **file-based** via Expo Router: every file under `src/app/` becomes a route, mirroring its path on disk. `app.json` points Expo Router at `src/app` via the `expo-router` plugin + `experiments.tsconfigPaths`.

## Top-level layout

```
src/
  app/                      # expo-router root — every file here is a route
    _layout.tsx              # root Stack navigator, loads fonts, wraps the whole app
    index.tsx                 # "/" — redirects straight into (tabs)/Home
    (tabs)/                   # route GROUP — folder name stripped from the URL
      _layout.tsx              # <Tabs> navigator: Home, Chat, Notifications, Profile
      Home.tsx                 # "/Home"
      Chat.tsx                 # "/Chat"
      Notifications.tsx        # "/Notifications"
      Profile.tsx               # "/Profile"
    screens/                  # everything that is NOT a main tab
      welcome/index.tsx         # "/screens/welcome"
      login/index.tsx           # "/screens/login"
      register/index.tsx        # "/screens/register"
      onboard/index.tsx         # "/screens/onboard"
      splashScreen/index.tsx    # "/screens/splashScreen"
      dashboard/index.tsx       # "/screens/dashboard" (currently empty — see navigation.md)
      dev/index.tsx              # "/screens/dev" — dev-only "Screen Buttons" picker
      home/BusDetails/index.tsx  # "/screens/home/BusDetails"
      chat/NewConversation/index.tsx
    components/                # shared, non-route components
      Onboard/                  # Button, Dot, Pagination, RenderItem — onboarding carousel
      NewChatModal.tsx
      RegistrationSuccessful.tsx
    assets/
      fonts/                    # Poppins .ttf files, loaded in root _layout.tsx
      icons/Bold/, icons/Light/  # SVG tab icons, active/inactive pairs
      icons/chatss/               # chat-specific SVGs (avatars, search, etc.)
      animations/, lotties/       # Lottie JSON files
    data/data.tsx               # static/local data (e.g. onboarding slide content)
  types/
    svg.d.ts                    # module declaration so `import X from '*.svg'` type-checks
```

## Where new code goes

| Adding... | Goes in |
|---|---|
| A new bottom-tab screen | `src/app/(tabs)/YourScreen.tsx` + register it in `(tabs)/_layout.tsx` |
| A new full-screen flow (auth, forms, detail pages) | `src/app/screens/<name>/index.tsx` (+ `_layout.tsx` if it needs its own `Stack` options) |
| A component reused across 2+ screens | `src/app/components/` |
| A component specific to one feature area (e.g. onboarding-only) | `src/app/components/<Feature>/` — mirrors the `Onboard/` pattern |
| A static data set / mock content | `src/app/data/` |
| A new icon | `src/app/assets/icons/` — if it's a tab icon, add both a `Bold/` and `Light/` variant |

## Route groups vs. plain folders

- **`(tabs)`** is a *route group*: parentheses mean the segment name is stripped from the URL. `Home.tsx` inside it is reachable at `/Home`, not `/(tabs)/Home` (though `/(tabs)/Home` also resolves and is the disambiguated form used internally). Groups exist purely to share a layout (the `<Tabs>` navigator) without adding a URL segment.
- **`screens/`** is a *plain folder*: it does appear in the URL (`/screens/login`, etc.). It exists only for organization, not routing behavior.

Don't nest a new route group inside `screens/` unless you specifically need another shared layout — plain folders are the default.

## `_layout.tsx` files

Every folder that needs shared chrome (header options, a navigator) gets a `_layout.tsx`. Two flavors are used in this codebase:
- **Stack wrapper**, for a single screen that just needs consistent header options:
  ```tsx
  import { Stack } from 'expo-router'
  export default function SomeLayout() {
    return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#ffffff' } }} />
  }
  ```
  (see `screens/login/_layout.tsx`, `screens/register/_layout.tsx`, `screens/welcome/_layout.tsx`)
- **Navigator**, for a group of sibling screens sharing a chrome type (only `(tabs)/_layout.tsx` today, using `<Tabs>`).

A bare `index.tsx` with **no** `_layout.tsx` is valid too (`screens/onboard/`, `screens/splashScreen/`, `screens/dev/`) — it just inherits `headerShown: false` from the root `_layout.tsx`. Only add a `_layout.tsx` if a screen needs options that differ from the root defaults.
