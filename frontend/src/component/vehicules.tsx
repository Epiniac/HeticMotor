import React, { useState, useEffect } from "react";
import { ButtonProps } from "@mui/material";
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

const API_URL = "http://127.0.0.1:5000/api/vehicles";

function Vehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [newVehicle, setNewVehicle] = useState({
        model: "",
        price: "",
        description: "",
        availability: "true",
        image: "",
    });

    const getStatusColor = (status) => (status ? "primary" : "secondary");

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setVehicles(data);
            } catch (error) {
                console.error("Erreur lors du chargement des véhicules:", error);
            }
        };
        fetchVehicles();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewVehicle({ ...newVehicle, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedVehicle = {
            ...newVehicle,
            availability: newVehicle.availability === "true",
        };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedVehicle),
            });

            if (!response.ok) throw new Error("Erreur lors de l'ajout du véhicule");

            const addedVehicle = await response.json();
            setVehicles([...vehicles, addedVehicle]);
            setNewVehicle({ model: "", price: "", description: "", availability: "true", image: "", option: "rent" });
        } catch (error) {
            console.error("Erreur lors de l'ajout du véhicule:", error);
        }
    };


    // 🚀 Supprimer un véhicule
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la suppression du véhicule");
            }

            // Mettre à jour l'état après suppression
            setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression du véhicule:", error);
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Gestion des Véhicules
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
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
                    label="Prix"
                    name="price"
                    type="number"
                    value={newVehicle.price}
                    onChange={handleChange}
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Description"
                    name="description"
                    value={newVehicle.description}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Disponibilité</InputLabel>
                    <Select
                        name="availability"
                        value={newVehicle.availability}
                        onChange={handleChange}
                        label="Disponibilité"
                    >
                        <MenuItem value="true">Disponible</MenuItem>
                        <MenuItem value="false">Non Disponible</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Option</InputLabel>
                    <Select
                        name="option"
                        value={newVehicle.option}
                        onChange={handleChange}
                        label="Option"
                    >
                        <MenuItem value="rent">Location</MenuItem>
                        <MenuItem value="buy">Vente</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="URL Image"
                    name="image"
                    value={newVehicle.image}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <Box sx={{ textAlign: "center", alignItems: "center", justifyContent: "center" }}>
                    <Button type="submit" variant="contained">
                        Ajouter un véhicule
                    </Button>
                </Box>
            </Box>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                Liste des véhicules
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Modèle</TableCell>
                            <TableCell>Prix</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Disponibilité</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {vehicles.map((vehicle) => (
                            <TableRow key={vehicle.id}>
                                <TableCell>{vehicle.model}</TableCell>
                                <TableCell>{vehicle.price}€</TableCell>
                                <TableCell>{vehicle.description}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color={getStatusColor(vehicle.availability)}
                                    >
                                        {vehicle.availability ? "Disponible" : "Indisponible"}
                                    </Button>
                                </TableCell>
                                <TableCell>{vehicle.option === "rent" ? "Location" : "Vente"}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDelete(vehicle.id)}
                                    >
                                        Supprimer
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
