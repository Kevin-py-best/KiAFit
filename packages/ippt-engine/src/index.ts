export const IPPT_RULESET_STATUS = "pending-official-validation" as const;

export type IpptComponentId = "push_ups" | "sit_ups" | "two_point_four_km";
export type ImprovementDirection = "higher-is-better" | "lower-is-better";

export interface TrainingTarget {
  component: IpptComponentId;
  currentValue: number;
  targetValue: number;
  direction: ImprovementDirection;
  targetDate: string;
}

export interface RoadmapMilestone extends TrainingTarget {
  id: string;
  title: string;
  completed: boolean;
}

export function calculateTargetProgress(target: TrainingTarget): number {
  const { currentValue, targetValue, direction } = target;

  if (currentValue < 0 || targetValue <= 0) {
    return 0;
  }

  if (direction === "lower-is-better" && currentValue === 0) {
    return 0;
  }

  const ratio =
    direction === "higher-is-better"
      ? currentValue / targetValue
      : targetValue / Math.max(currentValue, Number.EPSILON);

  return Math.round(Math.min(1, Math.max(0, ratio)) * 100);
}
