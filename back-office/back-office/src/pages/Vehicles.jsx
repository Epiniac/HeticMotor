import { useState, useEffect } from "react";
import "../styles/vehicles.css";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    status: "location",  // Par défaut à la location
  });

  // Fetching vehicles from the API (exemple)
  useEffect(() => {
    // Ici, tu peux connecter l'API pour récupérer les véhicules
    // fetch("API_URL/vehicles")
    //   .then(response => response.json())
    //   .then(data => setVehicles(data));

    // Exemple de données fictives
    setVehicles([
      { id: 1, make: "Toyota", model: "Corolla", year: 2020, price: 15000, status: "location" },
      { id: 2, make: "Honda", model: "Civic", year: 2018, price: 13000, status: "vente" },
    ]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoyer le véhicule au back-end
    // fetch("API_URL/vehicles", { method: "POST", body: JSON.stringify(newVehicle) })
    //   .then(response => response.json())
    //   .then(data => setVehicles([...vehicles, data]));

    // Ajouter un véhicule manuellement pour l'exemple
    setVehicles([...vehicles, { id: Date.now(), ...newVehicle }]);
    setNewVehicle({ make: "", model: "", year: "", price: "", status: "location" });
  };

  const toggleStatus = (id) => {
    setVehicles(vehicles.map((vehicle) =>
      vehicle.id === id ? { ...vehicle, status: vehicle.status === "location" ? "vente" : "location" } : vehicle
    ));
  };

  return (
    <div className="vehicles">
      <h1>Gestion des Véhicules</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="make"
          placeholder="Marque"
          value={newVehicle.make}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="model"
          placeholder="Modèle"
          value={newVehicle.model}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Année"
          value={newVehicle.year}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Prix"
          value={newVehicle.price}
          onChange={handleChange}
          required
        />
        <select name="status" value={newVehicle.status} onChange={handleChange}>
          <option value="location">Location</option>
          <option value="vente">Vente</option>
        </select>
        <button type="submit">Ajouter un véhicule</button>
      </form>

      <div className="vehicle-list">
        <h2>Liste des véhicules</h2>
        <table>
          <thead>
            <tr>
              <th>Marque</th>
              <th>Modèle</th>
              <th>Année</th>
              <th>Prix</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(vehicle => (
              <tr key={vehicle.id}>
                <td>{vehicle.make}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.year}</td>
                <td>{vehicle.price}€</td>
                <td>{vehicle.status}</td>
                <td>
                  <button onClick={() => toggleStatus(vehicle.id)}>
                    Basculer vers {vehicle.status === "location" ? "Vente" : "Location"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
