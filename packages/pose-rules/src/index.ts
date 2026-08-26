import type { ExerciseId } from "@kiafit/contracts";

export interface PosePoint {
  x: number;
  y: number;
  confidence: number;
}

export type RepPhase = "idle" | "ready" | "lowering" | "bottom" | "rising";

export interface RepCounterState {
  exercise: ExerciseId;
  phase: RepPhase;
  validReps: number;
  invalidReps: number;
  lastTransitionAt: number;
}

export function createRepCounterState(
  exercise: ExerciseId,
  now = Date.now()
): RepCounterState {
  return {
    exercise,
    phase: "idle",
    validReps: 0,
    invalidReps: 0,
    lastTransitionAt: now
  };
}

export function hasMinimumConfidence(
  points: readonly PosePoint[],
  minimumConfidence = 0.55
) {
  return (
    points.length > 0 &&
    points.every((point) => Number.isFinite(point.confidence) && point.confidence >= minimumConfidence)
  );
}

export function calculateAngle(
  first: PosePoint,
  vertex: PosePoint,
  third: PosePoint
): number | null {
  const firstVector = { x: first.x - vertex.x, y: first.y - vertex.y };
  const thirdVector = { x: third.x - vertex.x, y: third.y - vertex.y };
  const firstLength = Math.hypot(firstVector.x, firstVector.y);
  const thirdLength = Math.hypot(thirdVector.x, thirdVector.y);

  if (firstLength === 0 || thirdLength === 0) {
    return null;
  }

  const cosine =
    (firstVector.x * thirdVector.x + firstVector.y * thirdVector.y) /
    (firstLength * thirdLength);
  const clampedCosine = Math.min(1, Math.max(-1, cosine));

  return (Math.acos(clampedCosine) * 180) / Math.PI;
}
