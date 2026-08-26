import { z } from "zod";

export const ExerciseIdSchema = z.enum(["push_up", "sit_up", "plank", "squat"]);
export type ExerciseId = z.infer<typeof ExerciseIdSchema>;

export const StudentIdentifierSchema = z
  .string()
  .trim()
  .min(1, "Enter an admin number.")
  .max(32)
  .regex(/^[a-zA-Z0-9-]+$/, "Use letters, numbers or hyphens only.");

export const WorkoutSummarySchema = z.object({
  exercise: ExerciseIdSchema,
  validReps: z.number().int().nonnegative(),
  invalidReps: z.number().int().nonnegative(),
  durationSeconds: z.number().nonnegative(),
  formIssues: z.record(z.string(), z.number().int().nonnegative()),
  completedAt: z.iso.datetime()
});
export type WorkoutSummary = z.infer<typeof WorkoutSummarySchema>;

export const KiaStopSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1).max(120),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  supportedExercises: z.array(ExerciseIdSchema)
});
export type KiaStop = z.infer<typeof KiaStopSchema>;

export const HealthResponseSchema = z.object({
  status: z.literal("ok"),
  service: z.literal("kiafit-api"),
  timestamp: z.iso.datetime(),
  focus: z.tuple([z.literal("participation"), z.literal("ippt-improvement")])
});
export type HealthResponse = z.infer<typeof HealthResponseSchema>;
