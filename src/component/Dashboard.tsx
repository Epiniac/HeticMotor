import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <Box sx={{ p: 4, }}>
            <Typography variant="h3" gutterBottom>
                Tableau de bord
            </Typography>
            <Typography variant="body1" paragraph>
                Bienvenue sur le tableau de bord de l'admin.
            </Typography>
            <Grid container spacing={4} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={4}>
                    <Box
                        sx={{
                            p: 3,
                            backgroundColor: 'background.paper',
                            borderRadius: 2,
                            boxShadow: 1,
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h5" gutterBottom>
                            Véhicules à la location
                        </Typography>
                        <Typography variant="h4">5 véhicules disponibles</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box
                        sx={{
                            p: 3,
                            backgroundColor: 'background.paper',
                            borderRadius: 2,
                            boxShadow: 1,
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h5" gutterBottom>
                            Véhicules à vendre
                        </Typography>
                        <Typography variant="h4">3 véhicules en vente</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box
                        sx={{
                            p: 3,
                            backgroundColor: 'background.paper',
                            borderRadius: 2,
                            boxShadow: 1,
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h5" gutterBottom>
                            Dossiers en attente
                        </Typography>
                        <Typography variant="h4">2 dossiers à valider</Typography>
                    </Box>
                </Grid>
            </Grid>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center', // Centre horizontalement
                    alignItems: 'center', // Centre verticalement
                    minHeight: '20vh', // Ajustez la hauteur si nécessaire
                    gap: 2, // Espacement entre les boutons
                }}
            >
                <Button
                    variant="contained"
                    component={Link}
                    to="/vehicles"
                    sx={{ textTransform: 'none' }}
                >
                    Gérer les véhicules
                </Button>
                <Button
                    variant="contained"
                    component={Link}
                    to="/dossiers"
                    sx={{ textTransform: 'none' }}
                >
                    Gérer les dossiers
                </Button>
            </Box>
        </Box>
    );
}

export default Dashboard;