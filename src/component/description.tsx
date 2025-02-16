import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
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

function ProductDetails() {
  const { productId } = useParams<{ productId: string }>();
  const product = products.find((p) => p.id === parseInt(productId as string, 10));
  const navigate = useNavigate();

  if (!product) {
    return <Typography variant="h4">Produit non trouvé</Typography>;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Button variant="contained" onClick={() => navigate('/produit')} sx={{ mb: 2 }}>
        Retour
      </Button>
      <Card>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{ height: 400, objectFit: 'cover' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="h1">
            {product.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProductDetails;