import { useState, useEffect } from "react";
import "../styles/dossiers.css";

export default function Dossiers() {
  const [dossiers, setDossiers] = useState([]);

  // Exemple de récupération de dossiers depuis l'API
  useEffect(() => {
    // fetch("API_URL/dossiers")
    //   .then(response => response.json())
    //   .then(data => setDossiers(data));

    setDossiers([
      { id: 1, client: "John Doe", vehicle: "Toyota Corolla", type: "location", status: "en attente" },
      { id: 2, client: "Jane Smith", vehicle: "Honda Civic", type: "vente", status: "validé" },
    ]);
  }, []);

  const handleValidation = (id) => {
    setDossiers(dossiers.map(dossier => 
      dossier.id === id ? { ...dossier, status: "validé" } : dossier
    ));
  };

  const handleRefus = (id) => {
    setDossiers(dossiers.map(dossier => 
      dossier.id === id ? { ...dossier, status: "refusé" } : dossier
    ));
  };

  return (
    <div className="dossiers">
      <h1>Gestion des Dossiers</h1>
      <div className="dossier-list">
        <h2>Liste des dossiers</h2>
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Véhicule</th>
              <th>Type</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dossiers.map(dossier => (
              <tr key={dossier.id}>
                <td>{dossier.client}</td>
                <td>{dossier.vehicle}</td>
                <td>{dossier.type}</td>
                <td>{dossier.status}</td>
                <td>
                  {dossier.status === "en attente" ? (
                    <>
                      <button onClick={() => handleValidation(dossier.id)}>Valider</button>
                      <button onClick={() => handleRefus(dossier.id)}>Refuser</button>
                    </>
                  ) : (
                    <span>{dossier.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
