import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token"); // 🔹 Vérifie si l'utilisateur est connecté

    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
