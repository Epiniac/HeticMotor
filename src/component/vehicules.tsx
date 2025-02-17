import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import { ButtonProps } from "@mui/material";

function Vehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [newVehicle, setNewVehicle] = useState({
        make: "",
        model: "",
        year: "",
        price: "",
        status: "location",
    });

    const getStatusColor = (status: string): ButtonProps["color"] => {
        switch (status) {
            case "location":
                return "primary";
            case "vente":
                return "secondary";
            default:
                return "inherit";
        }
    };

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
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Gestion des Véhicules
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    label="Marque"
                    name="make"
                    value={newVehicle.make}
                    onChange={handleChange}
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Modèle"
                    name="model"
                    value={newVehicle.model}
                    onChange={handleChange}
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Année"
                    name="year"
                    type="number"
                    value={newVehicle.year}
                    onChange={handleChange}
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Prix"
                    name="price"
                    type="number"
                    value={newVehicle.price}
                    onChange={handleChange}
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Statut</InputLabel>
                    <Select
                        name="status"
                        value={newVehicle.status}
                        onChange={handleChange}
                        label="Statut"
                    >
                        <MenuItem value="location">Location</MenuItem>
                        <MenuItem value="vente">Vente</MenuItem>
                    </Select>
                </FormControl>
                <Box sx={{ textAlign: "center", alignItems: "center", justifyContent: "center" }}>
                    <Button type="submit" variant="contained">
                        Ajouter un véhicule
                    </Button>
                </Box>
            </Box>
            <Typography variant="h5" gutterBottom>
                Liste des véhicules
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Marque</TableCell>
                            <TableCell>Modèle</TableCell>
                            <TableCell>Année</TableCell>
                            <TableCell>Prix</TableCell>
                            <TableCell>Statut</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vehicles.map((vehicle) => (
                            <TableRow key={vehicle.id}>
                                <TableCell>{vehicle.make}</TableCell>
                                <TableCell>{vehicle.model}</TableCell>
                                <TableCell>{vehicle.year}</TableCell>
                                <TableCell>{vehicle.price}€</TableCell>
                                <TableCell>{vehicle.status}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color={getStatusColor(vehicle.status)} // Utilisez la fonction utilitaire
                                        onClick={() => toggleStatus(vehicle.id)}
                                    >
                                        Basculer vers {vehicle.status === "location" ? "Vente" : "Location"}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default Vehicles;