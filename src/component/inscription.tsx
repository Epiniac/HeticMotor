import { useState } from 'react';
import * as React from 'react';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
import { PersonAddOutlined } from '@mui/icons-material';

function SignupForm  () {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Container
                maxWidth="xs"
                sx={{
                    backgroundColor: 'white',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <PersonAddOutlined sx={{ fontSize: 40, color: 'primary.main' }} />
                    <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
                        Inscription
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}
                        sx={{ mt: 3,
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center', }}>
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
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirmer le mot de passe"
                            type="password"
                            id="confirmPassword"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            S'inscrire
                        </Button>
                        <Typography variant="body2" sx={{ textAlign: 'center' }}>
                            Déjà un compte ?{' '}
                            <Link href="/login" underline="hover">
                                Se connecter
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default SignupForm;