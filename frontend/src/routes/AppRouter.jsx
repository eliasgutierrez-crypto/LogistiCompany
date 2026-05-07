import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';
import AdminDashboard from '../pages/dashboard/AdminDashboard.jsx';
import DriverDashboard from '../pages/dashboard/DriverDashboard.jsx';
import CustomerDashboard from '../pages/dashboard/CustomerDashboard.jsx';
import DashboardHome from '../pages/dashboard/DashboardHome.jsx';
import OrdersPage from '../pages/orders/OrdersPage.jsx';
import ShipmentsPage from '../pages/shipments/ShipmentsPage.jsx';
import TrackingPage from '../pages/tracking/Tracking.jsx';
import ProfilePage from '../pages/profile/Profile.jsx';
import UsersPage from '../pages/admin/UsersPage.jsx';
import CustomersPage from '../pages/admin/CustomersPage.jsx';
import DriversPage from '../pages/admin/DriversPage.jsx';
import VehiclesPage from '../pages/admin/VehiclesPage.jsx';
import InvoicesPage from '../pages/admin/InvoicesPage.jsx';
import PaymentsPage from '../pages/admin/PaymentsPage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import RoleProtectedRoute from './RoleProtectedRoute.jsx';
import DashboardLayout from '../components/layouts/DashboardLayout.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

function AppRouter() {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route
          path="dashboard"
          element={
            <RoleProtectedRoute allowedRoles={['Administrator']}>
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="driver"
          element={
            <RoleProtectedRoute allowedRoles={['Driver']}>
              <DriverDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="customer"
          element={
            <RoleProtectedRoute allowedRoles={['Customer']}>
              <CustomerDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="admin/users"
          element={
            <RoleProtectedRoute allowedRoles={['Administrator']}>
              <UsersPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="admin/customers"
          element={
            <RoleProtectedRoute allowedRoles={['Administrator']}>
              <CustomersPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="admin/drivers"
          element={
            <RoleProtectedRoute allowedRoles={['Administrator']}>
              <DriversPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="admin/vehicles"
          element={
            <RoleProtectedRoute allowedRoles={['Administrator']}>
              <VehiclesPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="admin/invoices"
          element={
            <RoleProtectedRoute allowedRoles={['Administrator']}>
              <InvoicesPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="admin/payments"
          element={
            <RoleProtectedRoute allowedRoles={['Administrator']}>
              <PaymentsPage />
            </RoleProtectedRoute>
          }
        />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="shipments" element={<ShipmentsPage />} />
        <Route path="tracking" element={<TrackingPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
}

export default AppRouter;
