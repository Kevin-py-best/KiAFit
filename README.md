# KiaFIT

KiaFIT is a mobile-first fitness platform that helps users work toward performance and health goals through a goal-based roadmap, adaptive daily tasks, camera-assisted movement guidance, community exercise locations, progress analysis and consistency-focused rewards.

The initial priority is youth participation and confidence toward IPPT preparation. The architecture also supports goals such as running 5 km, improving pace, building core strength and developing exercise consistency. KiaFIT focuses on movement quality and sustainable progress rather than appearance-based outcomes.

The first delivery is a React Progressive Web App backed by a TypeScript and Express API. Exercise-camera inference is designed to stay on the user’s device; the API receives structured summaries rather than camera frames, recordings or raw pose timelines.

## Product and design documents

These documents are the canonical target design. They distinguish planned functionality from the current scaffold:

- [Product requirements](docs/PRODUCT_REQUIREMENTS.md) — purpose, terminology, navigation, behavior, safety and acceptance requirements.
- [High-level design](docs/HIGH_LEVEL_DESIGN.md) — current reuse assessment, target architecture, service boundaries, privacy and deployment direction.
- [Low-level design](docs/LOW_LEVEL_DESIGN.md) — routes, UI composition, data models, service contracts, algorithms, APIs, persistence and test design.
- [Posture tracking and AI coaching architecture](docs/POSTURE_TRACKING_AI_COACHING_ARCHITECTURE.md) — camera ownership, pose-provider abstraction, movement/state/rule pipeline, correction events, progress metrics and optional asynchronous AI reasoning.

The target primary navigation is **Home**, **Camera**, **Map** and **Rewards**. Home is the Roadmap page and includes today’s tasks; there is no separate Daily page.

## Workspace

```text
fitness-thingy/
├─ apps/
│  ├─ web/                  React PWA
│  └─ api/                  Express API
├─ docs/
│  ├─ PRODUCT_REQUIREMENTS.md
│  ├─ HIGH_LEVEL_DESIGN.md
│  ├─ LOW_LEVEL_DESIGN.md
│  └─ POSTURE_TRACKING_AI_COACHING_ARCHITECTURE.md
├─ packages/
│  ├─ contracts/            Shared validation and API types
│  ├─ pose-rules/           Exercise angles and rep-state logic
│  └─ ippt-engine/          Versioned IPPT roadmap logic
├─ package.json
├─ pnpm-workspace.yaml
└─ tsconfig.base.json
```

The Teachable Machine files live together at `apps/web/public/models/kiafit/` so `model.json` can resolve `weights.bin` in both development and production builds.

## Current implementation status

The repository currently provides a reusable foundation, not the completed target product:

- React/Vite PWA shell with placeholder Home, participation, IPPT and coach screens.
- Express API middleware and a health endpoint.
- Shared Zod contracts for early workout and location data.
- Basic target-progress calculations and pose-angle utilities.
- Local Teachable Machine model assets for classifying push-ups, sit-ups, planking and squats.
- Declared Leaflet, PostgreSQL and PostGIS-oriented tooling, without connected production providers or database migrations yet.

Roadmap scheduling, persisted camera summaries, technique analysis, real location/routing, weather safety, check-in verification, KiAPoints, rewards, authentication and student verification remain target functionality. Development simulations must be visibly labelled and must not be presented as live services.

The current classifier is not a complete posture tracker or AI coach. The target camera subsystem uses a provider-neutral pose tracker, KiaFIT-owned movement calculations, exercise-specific state machines, deterministic form rules and optional asynchronous AI coaching over structured summaries. NVIDIA Cosmos Reasoner is a candidate provider behind `CoachingService`; it is not currently connected and real-time tracking must not depend on it.

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

## Product boundaries

- **Roadmap:** selected goal, stages, today’s tasks, adaptive scheduling and progress explanation.
- **Camera:** on-device pose inference, deterministic exercise-specific rules and structured summaries without saved video.
- **AI coaching:** optional, asynchronous, evidence-linked reasoning over approved structured movement summaries; no continuous frame upload and no dependency from core tracking.
- **Map:** KIAStops, KIAGyms, route safety and verified check-ins through replaceable providers.
- **Rewards:** server-authoritative KiAPoints ledger focused on consistency and roadmap adherence.
- **Student verification:** requires an authorised identity source; an admin number alone is not proof of identity.
- **Safety:** KiaFIT offers fitness guidance, not medical assessment or a guarantee that a movement, machine setting or selected weight is safe.
- **Native delivery:** evaluate Capacitor after validating the PWA. Expo would be a separate React Native client, not a direct wrapper.

## Pose-model compatibility

The imported model was created with Teachable Machine Pose `0.8.6` and TensorFlow.js `1.7.4`. Those versions are pinned initially. Modernising the runtime should happen behind the pose adapter and only after the existing model's predictions have been regression-tested.
