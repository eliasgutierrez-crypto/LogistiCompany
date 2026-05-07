import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.jsx';

function DashboardHome() {
  const { auth } = useAuth();
  const role = auth?.user?.role;

  if (role === 'Admin') return <Navigate to="/dashboard" replace />;
  if (role === 'Driver') return <Navigate to="/driver" replace />;
  if (role === 'Customer') return <Navigate to="/orders" replace />;

  return <Navigate to="/auth/login" replace />;
}

export default DashboardHome;
