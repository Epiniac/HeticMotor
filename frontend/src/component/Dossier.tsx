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

const API_URL = "http://127.0.0.1:5000/api/dossiers";

export default function Dossiers() {
    const [dossiers, setDossiers] = useState([]);

    useEffect(() => {
        fetchDossiers();
    }, []);

    const fetchDossiers = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setDossiers(data);
        } catch (error) {
            console.error("Erreur lors du chargement des dossiers:", error);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) throw new Error("Erreur lors de la mise à jour");

            setDossiers(dossiers.map(dossier =>
                dossier.id === id ? { ...dossier, status } : dossier
            ));
        } catch (error) {
            console.error("Erreur lors de la mise à jour du statut:", error);
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Gestion des Dossiers
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
                                                onClick={() => updateStatus(dossier.id, "validé")}
                                                sx={{ mr: 1 }}
                                            >
                                                Valider
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => updateStatus(dossier.id, "refusé")}
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
