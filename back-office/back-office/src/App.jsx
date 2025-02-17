import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Dossiers from "./pages/Dossiers";
import "./styles.css";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="container">
          <aside className="sidebar">
            <nav>
              <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/vehicles">Gestion des Véhicules</Link></li>
                <li><Link to="/dossiers">Gestion des Dossiers</Link></li>
              </ul>
            </nav>
          </aside>
          <main className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/dossiers" element={<Dossiers />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}
