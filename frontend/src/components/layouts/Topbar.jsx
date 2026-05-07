import useAuth from '../../hooks/useAuth.jsx';
import { Link } from 'react-router-dom';

function Topbar() {
  const { auth, logout } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Welcome back</h1>
          <p className="text-sm text-slate-500">Manage orders, shipments and workflow efficiently.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700 md:block">
            {auth?.user?.name} · {auth?.user?.role}
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center rounded-2xl bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
