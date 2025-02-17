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
    Button,
} from "@mui/material";

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
        <Box sx={{ p: 4 }}>
            {/* Titre de la page */}
            <Typography variant="h3" gutterBottom>
                Gestion des Dossiers
            </Typography>

            {/* Liste des dossiers */}
            <Typography variant="h5" gutterBottom>
                Liste des dossiers
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Client</TableCell>
                            <TableCell>Véhicule</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Statut</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dossiers.map((dossier) => (
                            <TableRow key={dossier.id}>
                                <TableCell>{dossier.client}</TableCell>
                                <TableCell>{dossier.vehicle}</TableCell>
                                <TableCell>{dossier.type}</TableCell>
                                <TableCell>{dossier.status}</TableCell>
                                <TableCell>
                                    {dossier.status === "en attente" ? (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="success"
                                                onClick={() => handleValidation(dossier.id)}
                                                sx={{ mr: 1 }}
                                            >
                                                Valider
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => handleRefus(dossier.id)}
                                            >
                                                Refuser
                                            </Button>
                                        </>
                                    ) : (
                                        <Typography>{dossier.status}</Typography>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}