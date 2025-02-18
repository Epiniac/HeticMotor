import * as React from "react";
import { useEffect, useState } from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Barapp() {
    const navigate = useNavigate();
    const [user, setUser] = useState<{ name: string; lastname: string; role: string } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Automobile
                    </Typography>

                    {user ? (
                        <>
                            <Typography variant="subtitle1" sx={{ mr: 2 }}>
                                Bonjour, {user.name} {user.lastname}
                            </Typography>
                            <Button color="inherit" onClick={handleLogout}>Déconnexion</Button>
                        </>
                    ) : (
                        <Button color="inherit" onClick={() => navigate('/login')}>Connexion</Button>
                    )}

                    <Button color="inherit" onClick={() => navigate('/produit')}>Produit</Button>

                    {user?.role === "admin" && (
                        <>
                            <Button color="inherit" onClick={() => navigate('/vehicules')}>Véhicules</Button>
                            <Button color="inherit" onClick={() => navigate('/dossier')}>Dossier</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Barapp;
