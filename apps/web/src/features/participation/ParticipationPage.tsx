import { MapPin, QrCode, Users } from "lucide-react";

export function ParticipationPage() {
  return (
    <div className="page-stack">
      <section className="page-intro">
        <p className="eyebrow">Participation</p>
        <h1>Move where the community already is</h1>
        <p>
          KiaGyms and KiaStops will connect school gyms, exercise corners and community
          activities through location-aware challenges.
        </p>
      </section>

      <section className="map-placeholder" aria-label="KiaStop map placeholder">
        <div className="map-grid" />
        <div className="map-pin map-pin-primary">
          <MapPin size={24} aria-hidden="true" />
        </div>
        <div className="map-pin map-pin-secondary">
          <MapPin size={20} aria-hidden="true" />
        </div>
        <div className="map-caption">
          <strong>KiaStop map</strong>
          <span>Leaflet and PostGIS integration comes next.</span>
        </div>
      </section>

      <div className="mini-grid">
        <article className="mini-card">
          <QrCode size={24} aria-hidden="true" />
          <h2>Verified check-ins</h2>
          <p>Combine station QR, proximity and a server timestamp.</p>
        </article>
        <article className="mini-card">
          <Users size={24} aria-hidden="true" />
          <h2>Community momentum</h2>
          <p>Use team goals and streaks to make showing up feel rewarding.</p>
        </article>
      </div>
    </div>
  );
}
