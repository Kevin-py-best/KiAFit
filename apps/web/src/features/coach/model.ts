export const KIAFIT_MODEL_PATHS = {
  model: "/models/kiafit/model.json",
  metadata: "/models/kiafit/metadata.json"
} as const;

export async function loadKiaFitPoseModel() {
  const teachableMachinePose = await import("@teachablemachine/pose");

  return teachableMachinePose.load(
    KIAFIT_MODEL_PATHS.model,
    KIAFIT_MODEL_PATHS.metadata
  );
}
