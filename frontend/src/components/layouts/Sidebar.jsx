import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.jsx';

const navigation = {
  Administrator: [
    { name: 'Dashboard', to: '/dashboard' },
    { name: 'Orders', to: '/orders' },
    { name: 'Shipments', to: '/shipments' },
    { name: 'Users', to: '/admin/users' },
    { name: 'Customers', to: '/admin/customers' },
    { name: 'Drivers', to: '/admin/drivers' },
    { name: 'Vehicles', to: '/admin/vehicles' },
    { name: 'Invoices', to: '/admin/invoices' },
    { name: 'Payments', to: '/admin/payments' },
    { name: 'Profile', to: '/profile' },
  ],
  Driver: [
    { name: 'My Shipments', to: '/driver' },
    { name: 'Tracking', to: '/tracking' },
    { name: 'Profile', to: '/profile' },
  ],
  Customer: [
    { name: 'Orders', to: '/orders' },
    { name: 'Tracking', to: '/tracking' },
    { name: 'Profile', to: '/profile' },
  ],
};

function Sidebar() {
  const { auth } = useAuth();
  const links = auth?.user ? navigation[auth.user.role] || [] : [];

  return (
    <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white px-6 py-8 lg:flex">
      <div className="mb-10 flex items-center gap-3">
        <div className="h-12 w-12 rounded-3xl bg-brand-600" />
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">LogistiCompany</p>
          <p className="mt-1 text-sm text-slate-500">Control center</p>
        </div>
      </div>
      <nav className="space-y-2">
        {links.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
