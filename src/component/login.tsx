import { useState } from 'react';
import {TextField, Button, Container, Typography, Box, Link} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import * as React from "react";

function LoginForm () {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Ici, vous pouvez ajouter la logique pour gérer la soumission du formulaire
        console.log('Email:', email);
        console.log('Password:', password);
    };


    return (
        <Container
            maxWidth="xs"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '90vh',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            >
                <LockOutlined sx={{ fontSize: 40, color: 'primary.main' }} />
                <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
                    Connexion
                </Typography>
                <Box component="form" onSubmit={handleSubmit}
                    sx={{ mt: 3,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center', }} >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Adresse Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Se connecter
                    </Button>
                    <Typography variant="body2" sx={{ textAlign: 'center' }}>
                        Pas de compte ?{' '}
                        <Link href="/inscription" underline="hover">
                            S'inscrire
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginForm;