# Coding Conventions

## Imports

- **Path alias:** `~/*` maps to `src/*` (`tsconfig.json`). Prefer `~/app/assets/icon.png` over relative `../../../assets/icon.png` chains for anything more than one level deep — it survives files being moved. Both styles currently exist in the codebase (`Home.tsx` mixes `src/app/...`, `~/app/...`, and multi-level relative `require(...)` for the same asset directory) — don't add a fourth style; pick `~/...` for new code.
- **Global CSS:** `global.css` (NativeWind's Tailwind entry point) only needs to be imported **once per navigator subtree** — `(tabs)/_layout.tsx` imports it for all four tab screens, so `Home.tsx`/`Chat.tsx`/etc. don't re-import it. Screens under `screens/*` are each their own subtree (no shared layout importing it), so each currently imports `global.css` directly — keep doing that for new `screens/*` additions unless you introduce a shared `_layout.tsx` for them.

## Component style

- Functional components, arrow-function style, default export at the bottom:
  ```tsx
  const ScreenName = () => { ... }
  export default ScreenName
  ```
  (A few screens use `export default function ScreenName() {}` instead — both are fine, but don't mix the two conventions within one file.)
- Local `const COLORS = { primary: '#266FEF', ... }` objects are the current way screens define their color usage (see `login/index.tsx`, `Profile.tsx`). Until the palette is promoted into `tailwind.config.js` (see [design.md](./design.md)), copy this pattern rather than re-hardcoding raw hex strings inline throughout a component.
- `SafeAreaView`: always import from **`react-native-safe-area-context`**, never from `react-native` directly — the latter is deprecated and RN warns on it at runtime. (`Home.tsx` currently imports the deprecated one from `react-native` — treat that as a bug to fix opportunistically, not a pattern to copy.)

## State & data

- No global state library in use (no Redux/Zustand/Context providers found). Screens use local `useState` only. If cross-screen state becomes necessary (e.g. real auth/session state for logout), that's a deliberate architecture decision — flag it before adding a dependency.
- Static/mock content (e.g. onboarding slides) lives in `src/app/data/`, typed and imported, rather than inlined in the component.

## Known inconsistencies (don't copy these forward)

These exist in the current codebase. They're documented here so new code doesn't imitate them — fix opportunistically if you're already touching the surrounding code, but they're out of scope to mass-fix on their own.

- **`font-poppinsRegulary`** — typo'd Tailwind font class in `tailwind.config.js` (should be `poppinsRegular`). Several screens use it as-is since renaming it is a breaking change for every existing usage. New code: use `font-poppinsMedium` for body text instead of chasing this class.
- **`Home.tsx`** imports `SafeAreaView` from `react-native` instead of `react-native-safe-area-context`.
- **`screens/dashboard/index.tsx`** is an empty file (renders blank) — not implemented yet.
- **`(tabs)/Home.tsx`**'s "Complete The Setup" button links to `screens/setup`, which doesn't exist.
- **`screens/login/index.tsx`**'s "Continue" button and **`screens/register/index.tsx`**'s "Continue" button both have no-op `onPress={() => {}}` — they don't submit or navigate anywhere yet.
- **`screens/onboard/index.tsx`**'s "Get Started" button (last carousel slide) doesn't pass an `onFinish` callback, so completing onboarding just logs to console instead of navigating into the app.

## Linting & formatting

- `npm run lint` runs ESLint + Prettier check. `npm run format` auto-fixes both.
- Run `npm run lint` before committing UI changes — Prettier is configured with `prettier-plugin-tailwindcss`, which also sorts `className` utility order, so it will reformat any Tailwind classes you write.
