# KiaFIT Product Requirements

**Status:** Target product definition  
**Last updated:** 30 August 2026  
**Implementation note:** This document describes the intended product. It does not imply that every feature is already implemented. The current implementation status is summarised in the repository `README.md` and the high-level design.

**Related design:** [Posture tracking and AI coaching architecture](POSTURE_TRACKING_AI_COACHING_ARCHITECTURE.md)

## 1. Product purpose

KiaFIT is a mobile-first fitness application that helps users make consistent progress toward performance and health goals. It connects a goal-based roadmap with daily tasks, camera-assisted movement guidance, community exercise locations, progress analysis and rewards.

The initial product priority is youth participation and confidence toward IPPT preparation. The design must also support other performance-focused goals without rebuilding the platform, including:

- Prepare for IPPT.
- Run 5 km.
- Improve running pace.
- Improve core strength.
- Build exercise consistency.

KiaFIT focuses on participation, movement quality, consistency and achievable progress. It does not use appearance-based promises such as “get abs.”

## 2. Intended audience

The initial audience includes:

- Pre-NS youths preparing for physical assessments.
- Students who benefit from a structured, encouraging fitness plan.
- Gym users and community exercise participants.
- New or returning exercisers who need clear next steps rather than an advanced training dashboard.

The experience must be inclusive and usable without assumptions about gender, body type, current performance or exercise experience.

## 3. Product outcomes

KiaFIT should help a user:

1. Understand their current goal and the full path toward it.
2. Know what useful activity to complete today.
3. Recover from a missed day without losing previous progress.
4. Reach suitable community exercise locations safely.
5. Practise supported movements with immediate, understandable guidance.
6. See whether their technique and consistency are improving over time.
7. Earn rewards for following a sustainable plan rather than maximising workout volume.

## 4. Product principles

### 4.1 Progress without punishment

A missed task is “Missed” or “Not completed,” never “Failed.” Completed progress is never erased because of a missed day. The roadmap adapts to the user’s circumstances.

### 4.2 Consistency over volume

Rewards and progress messaging should value planned participation, weekly consistency, progress checks and recovery. Repeating activities indefinitely must not create unlimited value.

### 4.3 One clear next action

The Roadmap Home page is the centre of the experience. Today’s task opens the relevant capability directly: Map for location tasks, Camera for posture-guided tasks, or an inline completion flow for recovery tasks.

### 4.4 Privacy by design

Camera frames, recordings and raw pose timelines are not persisted. Pose processing should occur in memory on the user’s device whenever technically possible. Only structured, derived session summaries are stored.

### 4.5 Honest capabilities

Development simulations, mock location data, mock weather conditions and unconnected services must be labelled clearly. KiaFIT must not claim a real AI, GPS, weather, school-verification or commercial-partner connection when none exists.

### 4.6 Safe, neutral guidance

KiaFIT provides fitness guidance, not medical diagnosis. Corrections are exercise-specific, concise and neutral. The application must not claim that a machine setting, selected weight, exercise or movement is medically safe.

## 5. Canonical terminology

| Term | Meaning |
| --- | --- |
| **KiaFIT** | Product name used in application and repository documentation. |
| **Roadmap Home** | Main Home screen containing the active goal, roadmap stages, today’s tasks and progress signals. |
| **KIAStop** | Public fitness corner, community exercise location, park checkpoint or other suitable activity checkpoint. |
| **KIAGym** | KiaFIT’s category for a gym location. It does not imply a partnership. |
| **KiAPoints** | KiaFIT’s internal reward currency. A location or gym does not provide the points unless a confirmed relationship says otherwise. |
| **Camera** | On-device exercise session experience with pose detection, rep counting and movement corrections. |
| **Analysis coverage** | Analysable repetitions divided by detected repetitions. It shows whether enough of the session was visible and reliable. |
| **Correction rate** | User-facing shorthand for corrected-repetition rate: unique analysable repetitions requiring one or more corrections divided by analysable repetitions. |
| **Correction events per analysable rep** | Meaningful deduplicated correction occurrences divided by analysable repetitions. It is distinct from correction rate because one rep may have several correction events. |
| **Form consistency rate** | Correct repetitions divided by analysable repetitions. |
| **AI coaching insight** | Optional, asynchronous, evidence-linked explanation produced from approved structured movement summaries—not continuous camera frames. |

Display labels use `KIAStop`, `KIAGym` and `KiAPoints`. Internal identifiers may use conventional code casing while preserving these user-facing labels.

## 6. Primary navigation and journey

The application has four primary navigation destinations:

1. **Home** — the Roadmap Home page.
2. **Camera** — exercise selection and camera guidance.
3. **Map** — KIAStops, KIAGyms, routes and check-ins.
4. **Rewards** — KiAPoints, vouchers, redemptions and transaction history.

There is no separate Daily page. Today’s tasks are part of the Roadmap Home page.

The primary journey is:

```text
Roadmap Home
  → Today’s task
  → Camera, Map, or inline recovery action
  → Activity result
  → Roadmap and progress update
  → KiAPoints transaction when eligible
```

## 7. Functional requirements

### 7.1 Roadmap Home

| ID | Requirement |
| --- | --- |
| HOME-001 | The application opens on Roadmap Home. |
| HOME-002 | Show the selected goal, current stage, overall progress, current roadmap week or period, weekly consistency and next progress check. |
| HOME-003 | Provide a clear way to view or change the goal. |
| HOME-004 | Show all roadmap stages as `Completed`, `Current` or `Upcoming`. |
| HOME-005 | Visually highlight the current stage while keeping upcoming stages visible. |
| HOME-006 | Show today’s tasks inside Home, including name, purpose, estimated duration, type, status and main action. |
| HOME-007 | A location task opens Map with the task context already selected. |
| HOME-008 | A posture-guided task opens Camera with the exercise and task context already selected. |
| HOME-009 | A recovery task can be completed without opening Camera. |
| HOME-010 | Show technique and consistency progress only when sufficient comparable data exists. |
| HOME-011 | Goal targets, including IPPT-related values, remain configurable and versioned rather than hard-coded without verified data. |

Example roadmap stages for an IPPT-oriented goal are starting-point assessment, build consistency, improve technique and performance, readiness check and progress review.

### 7.2 Adaptive roadmap scheduling

| ID | Requirement |
| --- | --- |
| SCHED-001 | Missing a task never resets completed roadmap progress. |
| SCHED-002 | Mark a missed task as `Missed` or `Not completed`, not `Failed`. |
| SCHED-003 | Move the task to the next suitable available day when appropriate. |
| SCHED-004 | Preserve recovery days. |
| SCHED-005 | Do not place multiple demanding tasks on the same day. |
| SCHED-006 | Shift later tasks or milestones only when required to preserve schedule constraints. |
| SCHED-007 | Optionally capture the reason: Busy, Not feeling well, Schedule changed, Weather or Other. |
| SCHED-008 | Recalculate a manageable upcoming plan after repeated misses instead of endlessly moving individual tasks. |
| SCHED-009 | Explain what changed in plain language. |
| SCHED-010 | Store an audit record containing what changed, why, the triggering task and the adjustment time. |
| SCHED-011 | Scheduling logic is a separate, deterministic and testable service. |

Example explanation: “Monday’s run was moved to Wednesday. Tuesday remains a recovery day.”

### 7.3 Camera and posture guidance

| ID | Requirement |
| --- | --- |
| CAM-001 | Camera is reachable from primary navigation and directly from a roadmap task. |
| CAM-002 | Request camera permission only after explaining why it is needed. |
| CAM-003 | Allow exercise selection when no exercise was supplied by a task. |
| CAM-004 | Explain how to position the full body or required joints in frame. |
| CAM-005 | Show pose-detection status, total repetitions and correct repetitions. |
| CAM-006 | Show at most one important real-time correction at a time. |
| CAM-007 | Support pause, resume and end-session actions. |
| CAM-008 | Offer voice corrections as an optional, user-controlled enhancement. |
| CAM-009 | Corrections are exercise-specific and may cover alignment, range, stability, tempo, joint tracking, starting position and visibility. |
| CAM-010 | Ending a session produces a structured summary without saving video. |
| CAM-011 | Stop all camera tracks when the session ends or the user leaves Camera. |
| CAM-012 | Clearly distinguish an actual pose model from a development simulation. |
| CAM-013 | Machine-exercise feedback is limited to visible posture and movement; it does not assess medical safety, selected weight or machine settings. |
| CAM-014 | Use manual or roadmap-driven exercise selection for the MVP; automatic recognition is optional and must request confirmation. |
| CAM-015 | Real-time pose tracking, rep counting and deterministic corrections continue without an AI coaching provider. |

Initial supported exercises may be narrower than the long-term list. The existing model recognises push-ups, sit-ups, planking and squats. Pull-ups and gym-machine exercises require separate validated pose and correction rules before being presented as supported.

### 7.4 Camera privacy

| ID | Requirement |
| --- | --- |
| PRIV-001 | Never save or upload camera frames. |
| PRIV-002 | Never save video recordings. |
| PRIV-003 | Process pose points in memory whenever technically possible. |
| PRIV-004 | Do not store the full raw pose-point timeline by default. |
| PRIV-005 | Delete or release temporary pose data after deriving the current correction or session summary. |
| PRIV-006 | Persist structured correction results and derived metrics only. |
| PRIV-007 | Communicate this behaviour before a camera session begins. |
| PRIV-008 | Do not send frames, recordings or full raw pose timelines to an AI coaching provider in the baseline architecture. |

Intended flow:

```text
Camera frame
  → temporary pose points
  → rep and correction detection
  → structured session summary
  → temporary pose points discarded
```

### 7.5 Exercise-session summary and progress

| ID | Requirement |
| --- | --- |
| PROG-001 | Store the session, user, roadmap, task, exercise, equipment, timing, duration, rep counts, confidence, model version and completion status. |
| PROG-002 | For each correction category, store its type, user-facing message, affected-repetition count, affected repetition numbers when available, confidence and whether it improved. |
| PROG-003 | Count each affected repetition once in the overall correction rate even when it has multiple correction categories. |
| PROG-004 | Allow the same repetition to count once within each applicable correction category. |
| PROG-005 | Calculate correction rate as unique affected analysable repetitions ÷ analysable repetitions × 100. When every detected rep is analysable, this equals the earlier total-detected-repetition formula. |
| PROG-006 | Calculate form consistency as correct repetitions ÷ analysable repetitions × 100. |
| PROG-007 | Compare only compatible sessions involving the same exercise and relevant equipment/configuration, acceptable visibility and confidence, and compatible model/rule versions. |
| PROG-008 | Display `Insufficient data` when the comparability gate fails. |
| PROG-009 | Show trends, total and correct repetitions, improving and recurring corrections, recent history and comparison with the user’s own earlier sessions. |
| PROG-010 | Use encouraging language and never compare the user’s body or performance with another user. |
| PROG-011 | Describe results as technique progress, not medical assessment or proof of injury-free movement. |
| PROG-012 | Calculate and display analysis coverage when some detected repetitions could not be analysed reliably. |
| PROG-013 | Keep correction events per analysable rep separate from corrected-repetition rate. |

### 7.6 Optional AI coaching

| ID | Requirement |
| --- | --- |
| AI-001 | AI coaching is optional and sits above deterministic pose, movement, state, form and progress engines. |
| AI-002 | AI coaching must not own the camera, track landmarks continuously or count authoritative repetitions. |
| AI-003 | Do not send every camera frame or a full raw pose timeline to a cloud reasoning model. |
| AI-004 | Use approved structured movement, rep, correction, confidence and deterministic comparison summaries as input. |
| AI-005 | Run coaching asynchronously so session completion and live feedback never wait for it. |
| AI-006 | Core posture tracking and progress continue when AI is disabled, slow or unavailable. |
| AI-007 | AI observations must cite deterministic evidence and pass schema, wording and safety validation before display. |
| AI-008 | Reject medical claims, safety guarantees, unsupported causes, appearance comparisons and conclusions that contradict deterministic metrics. |
| AI-009 | Disclose that an accepted insight is AI-generated and store provider/model/prompt/guardrail versions. |
| AI-010 | Access NVIDIA Cosmos Reasoner or another provider only through a provider-neutral `CoachingService`; no provider is considered connected until implemented and verified. |

The baseline architecture sends no images or clips to AI. A future visual-AI experiment requires a separate explicit opt-in, privacy review and non-visual alternative.

### 7.7 Map and locations

| ID | Requirement |
| --- | --- |
| MAP-001 | Show current location after explicit permission. |
| MAP-002 | Show and filter KIAStop and KIAGym markers. |
| MAP-003 | Each location shows its name, category, distance, estimated route time, available opening hours and eligible KiAPoints. |
| MAP-004 | Every KIAGym shows the real gym name underneath the `KIAGym` category. |
| MAP-005 | A KIAGym may exist without being a partner. |
| MAP-006 | Do not show `Official partner`, `Sponsored` or equivalent language unless confirmed partnership data exists. |
| MAP-007 | Provide route preview, start route, arrival and check-in flows. |
| MAP-008 | Handle loading, empty, permission-denied, route-unavailable and provider-error states. |
| MAP-009 | Hide or clearly label simulated GPS, mock locations and mock routing. |
| MAP-010 | Use a replaceable Location Service rather than coupling UI directly to one map or GPS provider. |

### 7.8 Route safety

| ID | Requirement |
| --- | --- |
| SAFE-001 | Warn about configured late-night conditions. |
| SAFE-002 | Warn about configured extreme-heat conditions. |
| SAFE-003 | Warn about configured poor-weather conditions. |
| SAFE-004 | Suggest a well-lit route, cooler time or indoor task without frightening language. |
| SAFE-005 | Use current services when connected; otherwise clearly label mock weather states. |
| SAFE-006 | A weather-service failure must not be represented as safe weather. Show that safety data is unavailable. |
| SAFE-007 | Preserve roadmap recovery days when suggesting alternatives. |

### 7.9 Rewards and KiAPoints

| ID | Requirement |
| --- | --- |
| REWARD-001 | Award points through an auditable transaction ledger. |
| REWARD-002 | Eligible reasons include scheduled-task completion, verified location arrival, weekly consistency, planned progress checks and applicable recovery adherence. |
| REWARD-003 | Consistency and roadmap adherence influence rewards more than repeated workout volume. |
| REWARD-004 | Prevent duplicate rewards for the same qualifying event. |
| REWARD-005 | Do not introduce a hard daily points cap unless a separate product rule requires one. |
| REWARD-006 | Do not allow rewards to grow endlessly from repeated visits or unscheduled workout volume. |
| REWARD-007 | Show balance, vouchers, details, required points, redemption action, redemption history and point history. |
| REWARD-008 | Every point transaction shows why it was awarded. |
| REWARD-009 | Do not imply a gym provides a voucher or reward unless confirmed relationship data supports that claim. |
| REWARD-010 | Reward calculation is a separate, configurable and testable service. |

## 8. Required states

Each relevant screen must provide useful handling for:

- Loading.
- No active roadmap.
- Empty task list.
- Camera permission denied.
- Location permission denied.
- Pose not detected.
- Required body area outside frame.
- Low pose confidence.
- Weather service unavailable.
- Route unavailable.
- No nearby locations.
- No comparable progress history.
- Reward redemption success.
- Reward redemption rejection or provider error.
- Offline or API-unavailable conditions.

Errors must say what happened and what the user can do next. Hover cannot be required for any interaction.

## 9. Visual and content direction

The product is mobile-first, responsive, calm and performance-oriented. The Roadmap is the strongest visual element on Home.

Use:

- Green as the main accent.
- Light, calm backgrounds.
- Rounded but restrained cards.
- Clear progress indicators.
- Simple icons with text labels.
- One primary action per section.
- Sufficient colour contrast, keyboard access and visible focus states.
- Language that is supportive, concise and non-judgemental.

Avoid:

- Appearance promises.
- Crowded dashboards.
- Corrections competing for attention.
- Hidden permission requirements.
- Unverified safety, partnership or AI claims.
- Treating missed activity as personal failure.

## 10. Minimum end-to-end acceptance journey

The target release is coherent when the following journey works:

1. The application opens on Roadmap Home.
2. The user can view their goal, current stage and progress.
3. Today’s tasks are visible inside the roadmap.
4. Selecting a running or checkpoint task opens Map with task context.
5. Selecting a posture exercise opens Camera with exercise context.
6. A camera session produces structured correction events.
7. Ending the session creates a summary without saving video.
8. The summary updates comparable technique-progress analysis.
9. Completing the activity updates its roadmap task.
10. Missing a task adjusts the schedule without resetting progress or removing recovery.
11. A KIAStop or KIAGym can be selected from Map.
12. A KIAGym card shows both the category and actual gym name.
13. Configured time or weather conditions produce a safety warning.
14. A verified check-in creates an idempotent KiAPoints transaction.
15. Rewards displays the updated balance and transaction reason.

## 11. Delivery priorities

### Phase 1 — coherent MVP

- Roadmap Home with one active goal, stages and today’s tasks.
- Adaptive scheduling with recovery preservation and explanations.
- Camera flow for exercises with validated model and pose-rule support.
- Structured session summaries and basic technique trends.
- KIAStop/KIAGym map with clearly labelled development data where needed.
- Route-safety warnings through a replaceable service.
- KiAPoints ledger and simple reward catalogue.
- Complete loading, permission, low-confidence and empty states.

AI coaching is not required for the coherent MVP. The deterministic tracker must work first.

### Phase 2 — connected services

- Authorised school identity verification.
- Production map, geocoding, routing and GPS provider.
- Production weather and heat-safety data.
- Expanded exercise and machine-specific rule sets.
- Voice corrections and accessibility preferences.
- Optional asynchronous AI coaching over structured movement summaries after provider, privacy and guardrail validation.
- Confirmed voucher partners and fulfilment integrations.
- Native packaging only when validated PWA limitations justify it.

## 12. Explicit non-goals and constraints

- KiaFIT is not a medical device and does not diagnose injury or guarantee safety.
- An admin number alone is not sufficient identity verification.
- Official IPPT targets are not hard-coded without verified, versioned source data.
- A gym being shown as a KIAGym does not make it a partner.
- Camera recordings and raw frame data are never stored.
- Low-confidence results are not used to claim improvement.
- The first release does not require a paid AI coach, subscription or unlimited exercise catalogue.
- NVIDIA Cosmos Reasoner is a candidate provider, not an existing KiaFIT integration or a dependency of real-time tracking.

## 13. Open product decisions

The following require product or provider confirmation before production implementation:

- Authorised student-verification method and data owner.
- Verified IPPT rule source, versioning and effective dates.
- Initial list of validated exercises and supported camera viewpoints.
- Minimum camera-confidence and visibility thresholds per exercise.
- First pose-provider adapter after measured comparison of the current tracker and MediaPipe candidate.
- AI coaching opt-in/disclosure, provider deployment, data handling, region, retention, cost and output-guardrail policy.
- Location data source, check-in radius and GPS accuracy requirements.
- Route provider and whether detailed route traces may ever be retained.
- Weather provider and locally appropriate heat/late-night thresholds.
- KiAPoints rule values, anti-abuse rules and voucher fulfilment owners.
- Data-retention periods for session summaries, location check-ins and account deletion.
