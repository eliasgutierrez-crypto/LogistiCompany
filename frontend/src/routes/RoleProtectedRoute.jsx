import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

function RoleProtectedRoute({ allowedRoles, children }) {
  const { auth, isAuthenticated } = useContext(AuthContext);
  const userRole = auth?.user?.role;
  const hasAccess = isAuthenticated && userRole && allowedRoles.includes(userRole);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!hasAccess) {
    const fallback = userRole === 'Driver' ? '/driver' : userRole === 'Customer' ? '/customer' : '/dashboard';
    return <Navigate to={fallback} replace />;
  }

  return children;
}

export default RoleProtectedRoute;
