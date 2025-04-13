import { useEffect, useState, ChangeEvent } from "react";

import {

  Box,

  Typography,

  Table,

  TableBody,

  TableCell,

  TableContainer,

  TableHead,

  TableRow,

  Paper,

  TextField,

  Button,

  Select,

  MenuItem,

  FormControl,

  InputLabel,

  SelectChangeEvent,

} from "@mui/material";

import { Vehicle, VehicleInput } from "../types/vehicle";


const API_URL = "http://15.237.137.70:8000/api/vehicles";


function Vehicles() {

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const [newVehicle, setNewVehicle] = useState<VehicleInput>({

    model: "",

    price: "",

    description: "",

    availability: "true",

    image: "",

    option: "rent",

  });


  const getStatusColor = (status: boolean) => (status ? "primary" : "secondary");


  useEffect(() => {

    const fetchVehicles = async () => {

      try {

        const response = await fetch(API_URL);

        const data = await response.json();

        setVehicles(data);

      } catch (error) {

        console.error("Erreur lors du chargement des véhicules:", error);

      }

    };

    fetchVehicles();

  }, []);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    const { name, value } = e.target;

    setNewVehicle((prev) => ({ ...prev, [name]: value }));

  };


  const handleSelectChange = (e: SelectChangeEvent) => {

    const { name, value } = e.target;

    setNewVehicle((prev) => ({ ...prev, [name]: value }));

  };


  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();


    const formattedVehicle = {

      ...newVehicle,

      availability: newVehicle.availability === "true",

    };


    try {

      const response = await fetch(API_URL, {

        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(formattedVehicle),

      });


      if (!response.ok) throw new Error("Erreur lors de l'ajout du véhicule");


      const addedVehicle = await response.json();

      setVehicles([...vehicles, addedVehicle]);

      setNewVehicle({

        model: "",

        price: "",

        description: "",

        availability: "true",

        image: "",

        option: "rent",

      });

    } catch (error) {

      console.error("Erreur lors de l'ajout du véhicule:", error);

    }

  };


  const handleDelete = async (id: number) => {

    try {

      const response = await fetch(`${API_URL}/${id}`, {

        method: "DELETE",

      });


      if (!response.ok) throw new Error("Erreur lors de la suppression du véhicule");


      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));

    } catch (error) {

      console.error("Erreur lors de la suppression du véhicule:", error);

    }

  };


  return (

    <Box sx={{ p: 4 }}>

      <Typography variant="h4" gutterBottom>

        Gestion des Véhicules

      </Typography>

      <Box component="form" onSubmit={handleSubmit}>

        <TextField

          label="Modèle"

          name="model"

          value={newVehicle.model}

          onChange={handleInputChange}

          required

          fullWidth

          sx={{ mb: 2 }}

        />

        <TextField

          label="Prix"

          name="price"

          type="number"

          value={newVehicle.price}

          onChange={handleInputChange}

          required

          fullWidth

          sx={{ mb: 2 }}

        />

        <TextField

          label="Description"

          name="description"

          value={newVehicle.description}

          onChange={handleInputChange}

          fullWidth

          sx={{ mb: 2 }}

        />

        <FormControl fullWidth sx={{ mb: 2 }}>

          <InputLabel>Disponibilité</InputLabel>

          <Select

            name="availability"

            value={newVehicle.availability}

            onChange={handleSelectChange}

            label="Disponibilité"

          >

            <MenuItem value="true">Disponible</MenuItem>

            <MenuItem value="false">Non Disponible</MenuItem>

          </Select>

        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>

          <InputLabel>Option</InputLabel>

          <Select

            name="option"

            value={newVehicle.option}

            onChange={handleSelectChange}

            label="Option"

          >

            <MenuItem value="rent">Location</MenuItem>

            <MenuItem value="buy">Vente</MenuItem>

          </Select>

        </FormControl>


        <TextField

          label="URL Image"

          name="image"

          value={newVehicle.image}

          onChange={handleInputChange}

          fullWidth

          sx={{ mb: 2 }}

        />

        <Box sx={{ textAlign: "center" }}>

          <Button type="submit" variant="contained">

            Ajouter un véhicule

          </Button>

        </Box>

      </Box>


      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>

        Liste des véhicules

      </Typography>

      <TableContainer component={Paper}>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>Modèle</TableCell>

              <TableCell>Prix</TableCell>

              <TableCell>Description</TableCell>

              <TableCell>Disponibilité</TableCell>

              <TableCell>Type</TableCell>

              <TableCell>Actions</TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {vehicles.map((vehicle) => (

              <TableRow key={vehicle.id}>

                <TableCell>{vehicle.model}</TableCell>

                <TableCell>{vehicle.price}€</TableCell>

                <TableCell>{vehicle.description}</TableCell>

                <TableCell>

                  <Button

                    variant="contained"

                    color={getStatusColor(vehicle.availability)}

                  >

                    {vehicle.availability ? "Disponible" : "Indisponible"}

                  </Button>

                </TableCell>

                <TableCell>{vehicle.option === "rent" ? "Location" : "Vente"}</TableCell>

                <TableCell>

                  <Button

                    variant="contained"

                    color="error"

                    onClick={() => handleDelete(vehicle.id)}

                  >

                    Supprimer

                  </Button>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </TableContainer>

    </Box>

  );

}


export default Vehicles;

