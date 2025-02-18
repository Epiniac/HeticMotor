import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
import { PersonAddOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        if (!name || !lastname || !email || !password) {
            setError("Tous les champs sont obligatoires.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, lastname, email, password })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Erreur lors de l'inscription");

            alert("Inscription réussie ! Redirection vers la page de connexion...");
            navigate("/login");
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Container maxWidth="xs" sx={{ backgroundColor: 'white', padding: 4, borderRadius: 2, boxShadow: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <PersonAddOutlined sx={{ fontSize: 40, color: 'primary.main' }} />
                    <Typography component="h1" variant="h5" sx={{ mt: 2 }}>Inscription</Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Prénom"
                            autoComplete="given-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Nom"
                            autoComplete="family-name"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Adresse Email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            label="Mot de passe"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            label="Confirmer le mot de passe"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>
                            S'inscrire
                        </Button>
                        <Typography variant="body2" sx={{ textAlign: 'center' }}>
                            Déjà un compte ? <Link href="/login" underline="hover">Se connecter</Link>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default SignupForm;
