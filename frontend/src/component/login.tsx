import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Erreur lors de la connexion");

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify({ name: data.username, lastname: data.lastname, role: data.role }));

            alert("Connexion réussie !");
            navigate("/produit");
            window.location.reload();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3, boxShadow: 3, borderRadius: 2 }}>
                <LockOutlined sx={{ fontSize: 40, color: 'primary.main' }} />
                <Typography component="h1" variant="h5" sx={{ mt: 2 }}>Connexion</Typography>
                {error && <Typography color="error">{error}</Typography>}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                    <TextField margin="normal" required fullWidth label="Adresse Email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField margin="normal" required fullWidth type="password" label="Mot de passe" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>Se connecter</Button>
                    <Typography variant="body2" sx={{ textAlign: 'center' }}>Pas de compte ? <Link href="/inscription" underline="hover">S'inscrire</Link></Typography>
                </Box>
            </Box>
        </Container>
    );
}

export default LoginForm;
