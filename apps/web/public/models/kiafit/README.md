# KiaFIT pose model

Keep `model.json`, `metadata.json` and `weights.bin` together in this directory. The web adapter loads them from `/models/kiafit/`.

The current classifier identifies the exercise category. Rep phases and form validation belong in `packages/pose-rules`; do not treat the classifier output as a validated repetition.
