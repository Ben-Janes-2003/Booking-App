import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../state/authStore';

const AdminRoute = () => {
  const { user } = useAuthStore();

  if (user?.role !== 'Admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;