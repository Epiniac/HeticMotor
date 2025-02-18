import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Container,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Box,
    TextField,
    Button,
} from "@mui/material";

const API_URL = "http://127.0.0.1:5000/api/vehicles";

function VehicleDetail() {
    const { id } = useParams(); // 🔹 Récupère l'ID du véhicule depuis l'URL
    const [vehicle, setVehicle] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        type: "",
    });

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}`);
                const data = await response.json();
                setVehicle(data);

                setFormData((prevFormData) => ({
                    ...prevFormData,
                    type: data.option,
                }));
            } catch (error) {
                console.error("Erreur lors du chargement du véhicule:", error);
            }
        };
        fetchVehicle();
    }, [id]);

    if (!vehicle) {
        return <Typography variant="h4" align="center">Chargement...</Typography>;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Données envoyées:", { email: formData.email, vehicle_id: vehicle.id, type: formData.type, message: formData.message });

        try {
            const response = await fetch("http://127.0.0.1:5000/api/request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,  // Utilise l'email pour retrouver l'utilisateur
                    vehicle_id: vehicle.id,
                    type: formData.type,
                    message: formData.message
                }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'envoi de la demande");
            }

            alert("Votre demande a bien été envoyée !");
            setFormData({ name: "", email: "", phone: "", message: "", type: vehicle.option });
        } catch (error) {
            console.error("Erreur lors de l'envoi de la demande:", error);
        }
    };


    return (
        <Container sx={{ py: 4 }}>
            <Card sx={{ display: "flex", flexDirection: "column", mb: 4 }}>
                <CardMedia
                    component="img"
                    image={vehicle.image || "https://placehold.co/200x200"}
                    alt={vehicle.model}
                    sx={{ height: 300, objectFit: "cover" }}
                />
                <CardContent>
                    <Typography variant="h4">{vehicle.model}</Typography>
                    <Typography variant="h6" color="text.secondary">{vehicle.description}</Typography>
                    <Typography variant="h5" color="primary" sx={{ mt: 2 }}>
                        {vehicle.price}€ {vehicle.option === "rent" ? "/ jour" : ""}
                    </Typography>
                </CardContent>
            </Card>

            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: "auto" }}>
                <Typography variant="h5" gutterBottom>
                    Faire une demande de {vehicle.option === "rent" ? "Location" : "Achat"}
                </Typography>

                <TextField
                    label="Nom"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Téléphone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" fullWidth>
                    Envoyer la demande
                </Button>
            </Box>
        </Container>
    );
}

export default VehicleDetail;
