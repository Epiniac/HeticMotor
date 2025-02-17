import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Barapp from './component/appBar.tsx';
import LoginForm from './component/login.tsx';
import SignupForm from './component/inscription.tsx';
import Produit from "./component/produit.tsx";
import ProductDetails from './component/description.tsx';
import Dashboard from "./component/Dashboard.tsx";
import Dossiers from "./component/Dossier.tsx";
import Vehicules from "./component/vehicules.tsx";

function App() {
    return (
        <Router>
            <div>
                <Barapp />
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/inscription" element={<SignupForm />} />
                    <Route path="/produit" element={<Produit />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/produit" element={<Produit />} />
                    <Route path="/dossier" element={<Dossiers />} />
                    <Route path="/vehicules" element={<Vehicules />} />
                    <Route path="/produit/:produitId" element={<ProductDetails />} />
                    <Route path="/" element={<LoginForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

