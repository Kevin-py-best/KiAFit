import { Camera, LockKeyhole, ScanLine } from "lucide-react";

import { KIAFIT_MODEL_PATHS } from "./model";

export function CoachPage() {
  return (
    <div className="page-stack">
      <section className="page-intro">
        <p className="eyebrow">Exercise coach</p>
        <h1>Quality movement, counted locally</h1>
        <p>
          The current model recognises the exercise. KiaFIT's TypeScript pose rules will
          validate phases, depth and form before counting a repetition.
        </p>
      </section>

      <section className="camera-placeholder">
        <ScanLine className="scan-icon" size={54} aria-hidden="true" />
        <div>
          <strong>Camera session scaffold</strong>
          <span>Camera permission will only be requested after the user starts.</span>
        </div>
      </section>

      <div className="mini-grid">
        <article className="mini-card">
          <Camera size={24} aria-hidden="true" />
          <h2>Model assets ready</h2>
          <p className="code-path">{KIAFIT_MODEL_PATHS.model}</p>
        </article>
        <article className="mini-card">
          <LockKeyhole size={24} aria-hidden="true" />
          <h2>Private by default</h2>
          <p>Video frames stay on the phone; only workout summaries go to the API.</p>
        </article>
      </div>
    </div>
  );
}
