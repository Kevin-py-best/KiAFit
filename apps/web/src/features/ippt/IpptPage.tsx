import { Flag, Route, Target } from "lucide-react";

const steps = [
  {
    icon: Flag,
    title: "Record a baseline",
    text: "Capture a safe starting point before KiaFIT recommends weekly targets."
  },
  {
    icon: Target,
    title: "Choose a milestone",
    text: "Work toward the next realistic improvement, not an intimidating final score."
  },
  {
    icon: Route,
    title: "Follow the roadmap",
    text: "Complete sessions, review trends and adjust the plan as your ability changes."
  }
] as const;

export function IpptPage() {
  return (
    <div className="page-stack">
      <section className="page-intro">
        <p className="eyebrow">IPPT improvement</p>
        <h1>A roadmap built from your current level</h1>
        <p>
          The scoring tables will be versioned and verified before release. This screen is
          ready for the baseline, targets and progress modules.
        </p>
      </section>

      <section className="step-list" aria-label="IPPT roadmap steps">
        {steps.map(({ icon: Icon, title, text }, index) => (
          <article className="step-card" key={title}>
            <div className="step-icon">
              <Icon size={22} aria-hidden="true" />
            </div>
            <div>
              <span className="step-number">Step {index + 1}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
