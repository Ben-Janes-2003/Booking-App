import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../state/authStore';

const ProtectedRoute = () => {
    const { token } = useAuthStore();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;