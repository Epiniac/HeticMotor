import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";

function Barapp() {
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Automobile
                    </Typography>
                    <Button color="inherit"  onClick={() => navigate('/login')}>Connexion</Button>
                    <Button color="inherit"  onClick={() => navigate('/produit')}>Produit</Button>
                    <Button color="inherit"  onClick={() => navigate('/dashboard')}>Dashboard</Button>
                    <Button color="inherit"  onClick={() => navigate('/vehicules')}>Vehicules</Button>
                    <Button color="inherit"  onClick={() => navigate('/dossier')}>Dossier</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default Barapp;