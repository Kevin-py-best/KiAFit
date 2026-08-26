import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CheckCircle2, CircleAlert } from "lucide-react";
import { Link } from "react-router";

import type { HealthResponse } from "@kiafit/contracts";

async function getHealth(): Promise<HealthResponse> {
  const response = await fetch("/api/health");

  if (!response.ok) {
    throw new Error("The API is unavailable.");
  }

  return response.json() as Promise<HealthResponse>;
}

const journeys = [
  {
    eyebrow: "Participate",
    title: "Find a KiaStop",
    description: "Check in, move with the community and keep your weekly streak alive.",
    to: "/participate"
  },
  {
    eyebrow: "Improve",
    title: "Build your IPPT roadmap",
    description: "Turn your current ability into small, achievable training targets.",
    to: "/ippt"
  },
  {
    eyebrow: "Practise",
    title: "Train with the camera coach",
    description: "Count quality movement while pose processing stays on your device.",
    to: "/coach"
  }
] as const;

export function HomePage() {
  const healthQuery = useQuery({
    queryKey: ["health"],
    queryFn: getHealth,
    retry: 1,
    refetchInterval: 30_000
  });

  const apiReady = healthQuery.isSuccess;

  return (
    <div className="page-stack">
      <section className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Participation first</p>
          <h1>Show up today. Build confidence for tomorrow.</h1>
          <p>
            KiaFIT turns community exercise and IPPT preparation into one clear,
            encouraging journey.
          </p>
        </div>
        <div className="hero-stat" aria-label="First weekly target">
          <strong>3</strong>
          <span>active days</span>
        </div>
      </section>

      <div className={apiReady ? "status-strip status-ready" : "status-strip"}>
        {apiReady ? (
          <CheckCircle2 size={19} aria-hidden="true" />
        ) : (
          <CircleAlert size={19} aria-hidden="true" />
        )}
        <span>
          {healthQuery.isPending && "Connecting to the KiaFIT API…"}
          {healthQuery.isError && "API offline — start the Express workspace to connect."}
          {apiReady && "KiaFIT web and API workspaces are connected."}
        </span>
      </div>

      <section aria-labelledby="journey-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Your journey</p>
            <h2 id="journey-heading">Start with one action</h2>
          </div>
        </div>

        <div className="journey-grid">
          {journeys.map((journey) => (
            <Link className="journey-card" to={journey.to} key={journey.to}>
              <p className="eyebrow">{journey.eyebrow}</p>
              <h3>{journey.title}</h3>
              <p>{journey.description}</p>
              <span className="card-link">
                Open <ArrowRight size={17} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
