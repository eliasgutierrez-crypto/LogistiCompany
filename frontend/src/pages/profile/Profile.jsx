import { useState } from 'react';
import useAuth from '../../hooks/useAuth.jsx';

function ProfilePage() {
  const { auth } = useAuth();
  const [profile, setProfile] = useState({
    name: auth?.user?.name || '',
    email: auth?.user?.email || '',
    role: auth?.user?.role || '',
  });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus('Profile updates are saved locally for demo mode.');
    setTimeout(() => setSaving(false), 600);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">My profile</h2>
            <p className="mt-1 text-sm text-slate-500">Manage your personal account details and preferences.</p>
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Full name
              <input
                value={profile.name}
                onChange={(event) => setProfile((prev) => ({ ...prev, name: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Email address
              <input
                type="email"
                value={profile.email}
                disabled
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Role</label>
            <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900">
              {profile.role}
            </div>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="rounded-2xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>
          {status && <p className="text-sm text-brand-700">{status}</p>}
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
