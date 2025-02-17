import "../styles/dashboard.css";
import { Link } from "react-router-dom";  

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Tableau de bord</h1>
      <p>Bienvenue sur le tableau de bord de l'admin.</p>

      <div className="dashboard-stats">
        <div className="stat">
          <h3>Véhicules à la location</h3>
          <p>5 véhicules disponibles</p>
        </div>
        <div className="stat">
          <h3>Véhicules à vendre</h3>
          <p>3 véhicules en vente</p>
        </div>
        <div className="stat">
          <h3>Dossiers en attente</h3>
          <p>2 dossiers à valider</p>
        </div>
      </div>

      <div className="dashboard-links">
        <Link to="/vehicles" className="btn">Gérer les véhicules</Link>
        <Link to="/dossiers" className="btn">Gérer les dossiers</Link>
      </div>
    </div>
  );
}
