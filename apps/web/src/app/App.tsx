import { Navigate, Route, Routes } from "react-router";

import { AppShell } from "../components/AppShell";
import { CoachPage } from "../features/coach/CoachPage";
import { HomePage } from "../features/home/HomePage";
import { IpptPage } from "../features/ippt/IpptPage";
import { ParticipationPage } from "../features/participation/ParticipationPage";

export function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="participate" element={<ParticipationPage />} />
        <Route path="ippt" element={<IpptPage />} />
        <Route path="coach" element={<CoachPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
