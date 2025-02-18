import React, { useState, useEffect } from "react";
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Tabs,
    Tab,
    Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const API_URL = "http://127.0.0.1:5000/api/vehicles";

function ProductPage() {
    const [vehicles, setVehicles] = useState([]);
    const [tabValue, setTabValue] = useState(0); // 0 = Location, 1 = Achat

    // 🚀 Récupérer les véhicules depuis l'API Flask
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

    const rentalVehicles = vehicles.filter((v) => v.option === "rent");
    const buyVehicles = vehicles.filter((v) => v.option === "buy");

    return (
        <Container sx={{ py: 4, marginTop: "2vh" }}>
            <Tabs
                value={tabValue}
                onChange={(event, newValue) => setTabValue(newValue)}
                centered
            >
                <Tab label="Location" />
                <Tab label="Achat" />
            </Tabs>
            <Box sx={{ mt: 4 }}>
                {tabValue === 0 ? (
                    <Grid container spacing={4}>
                        {rentalVehicles.map((vehicle) => (
                            <Grid item key={vehicle.id} xs={12} sm={6} md={4}>
                                <Link to={`/produit/${vehicle.id}`} style={{ textDecoration: "none" }}>
                                    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                        <CardMedia
                                            component="img"
                                            image={vehicle.image || "https://placehold.co/200x200"}
                                            alt={vehicle.model}
                                            sx={{ height: 200, objectFit: "cover" }}
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {vehicle.model}
                                            </Typography>
                                            <Typography>{vehicle.description}</Typography>
                                            <Typography variant="h6" color="primary">
                                                {vehicle.price}€&nbsp;/&nbsp;Jour
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Grid container spacing={4}>
                        {buyVehicles.map((vehicle) => (
                            <Grid item key={vehicle.id} xs={12} sm={6} md={4}>
                                <Link to={`/produit/${vehicle.id}`} style={{ textDecoration: "none" }}>
                                    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                        <CardMedia
                                            component="img"
                                            image={vehicle.image || "https://placehold.co/200x200"}
                                            alt={vehicle.model}
                                            sx={{ height: 200, objectFit: "cover" }}
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {vehicle.model}
                                            </Typography>
                                            <Typography>{vehicle.description}</Typography>
                                            <Typography variant="h6" color="secondary">
                                                {vehicle.price}€
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Container>
    );
}

export default ProductPage;