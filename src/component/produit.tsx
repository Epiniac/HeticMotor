import React from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';

// Données de produits (à remplacer par une API ou une base de données)
const products = [
    {
        id: 1,
        name: 'Produit 1',
        image: 'https://via.placeholder.com/300',
        description: 'Description du produit 1.',
    },
    {
        id: 2,
        name: 'Produit 2',
        image: 'https://via.placeholder.com/300',
        description: 'Description du produit 2.',
    },
    {
        id: 3,
        name: 'Produit 3',
        image: 'https://via.placeholder.com/300',
        description: 'Description du produit 3.',
    },
    {
        id: 4,
        name: 'Produit 4',
        image: 'https://via.placeholder.com/300',
        description: 'Description du produit 4.',
    },
    {
        id: 5,
        name: 'Produit 5',
        image: 'https://via.placeholder.com/300',
        description: 'Description du produit 5.',
    },
    {
        id: 6,
        name: 'Produit 6',
        image: 'https://via.placeholder.com/300',
        description: 'Description du produit 6.',
    },
];

function ProductPage() {
    return (
        <Container sx={{ py: 4, marginTop:'2vh'}}>
            <Grid container spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} sx={{marginTop:'10vh'}}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                image={product.image}
                                alt={product.name}
                                sx={{ height: 200, objectFit: 'cover' }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {product.name}
                                </Typography>
                                <Typography>{product.description}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default ProductPage;