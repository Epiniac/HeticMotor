import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Barapp from './component/appBar.tsx';
import LoginForm from './component/login.tsx';
import SignupForm from './component/inscription.tsx';
import Produit from "./component/produit.tsx";
import ProductDetails from './component/description.tsx';

function App() {
    return (
        <Router>
            <div>
                <Barapp />
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/inscription" element={<SignupForm />} />
                    <Route path="/produit" element={<Produit />} />
                    <Route path="/produit/:produitId" element={<ProductDetails />} />
                    <Route path="/" element={<LoginForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

