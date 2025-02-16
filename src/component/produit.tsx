import React from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; 
import v1 from '../image/v1.jpg'
import v2 from '../image/v2.jpg'
import v3 from '../image/v3.jpg'
import v4 from '../image/v4.jpg'
import v5 from '../image/v5.jpg'
import v6 from '../image/v6.jpg'

// Données de produits (à remplacer par une API ou une base de données)
const products = [
    {
        id: 1,
        name: 'Produit 1',
        image: v1,
        description: 'Description du produit 1.',
    },
    {
        id: 2,
        name: 'Produit 2',
        image: v2,
        description: 'Description du produit 2.',
    },
    {
        id: 3,
        name: 'Produit 3',
        image: v3,
        description: 'Description du produit 3.',
    },
    {
        id: 4,
        name: 'Produit 4',
        image: v4,
        description: 'Description du produit 4.',
    },
    {
        id: 5,
        name: 'Produit 5',
        image: v5,
        description: 'Description du produit 5.',
    },
    {
        id: 6,
        name: 'Produit 6',
        image: v6,
        description: 'Description du produit 6.',
    },
];
function ProductPage() {
    return (
        <Container sx={{ py: 4, marginTop:'2vh'}}>
            <Grid container spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} sx={{marginTop:'10vh'}}>
                        <Link to={`/produit/${product.id}`} style={{ textDecoration: 'none' }}>
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
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default ProductPage;