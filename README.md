# KiaFIT

KiaFIT is a mobile-first fitness platform focused on increasing youth participation and helping pre-NS users improve toward their IPPT goals.

The first release is a React Progressive Web App backed by a TypeScript and Express API. Exercise-camera inference stays on the user's device; the API receives workout summaries rather than video frames.

## Workspace

```text
fitness-thingy/
├─ apps/
│  ├─ web/                  React PWA
│  └─ api/                  Express API
├─ packages/
│  ├─ contracts/            Shared validation and API types
│  ├─ pose-rules/           Exercise angles and rep-state logic
│  └─ ippt-engine/          Versioned IPPT roadmap logic
├─ package.json
├─ pnpm-workspace.yaml
└─ tsconfig.base.json
```

The Teachable Machine files live together at `apps/web/public/models/kiafit/` so `model.json` can resolve `weights.bin` in both development and production builds.

## Get started

The project uses Node.js 24 and pnpm workspaces.

```powershell
pnpm install
Copy-Item apps/api/.env.example apps/api/.env
pnpm dev
```

The web app runs at `http://localhost:5173`. Vite proxies `/api` requests to the Express API at `http://localhost:3000`.

## Main commands

```powershell
pnpm dev
pnpm build
pnpm typecheck
pnpm test
```

## MVP boundaries

- Participation: KiaStops, location-aware check-ins, streaks and rewards.
- IPPT improvement: goals, training roadmap and progress history.
- Exercise coach: on-device pose inference and deterministic rep/form rules.
- Student verification: requires an authorised school identity source; an admin number alone is not proof of identity.
- Native delivery: evaluate Capacitor after validating the PWA. Expo would be a separate React Native client, not a direct wrapper.

## Pose-model compatibility

The imported model was created with Teachable Machine Pose `0.8.6` and TensorFlow.js `1.7.4`. Those versions are pinned initially. Modernising the runtime should happen behind the pose adapter and only after the existing model's predictions have been regression-tested.
