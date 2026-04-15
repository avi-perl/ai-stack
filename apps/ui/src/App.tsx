import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "@/pages/home";
import HealthcheckPage from "@/pages/healthcheck";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/healthcheck" element={<HealthcheckPage />} />
      </Routes>
    </BrowserRouter>
  );
}
