import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-xl rounded-3xl bg-white p-10 shadow-soft">
        <h1 className="text-5xl font-semibold text-slate-900">404</h1>
        <p className="mt-4 text-slate-600">Page not found. The dashboard route does not exist.</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-white transition hover:bg-brand-700"
        >
          Go back to home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
