import { useEffect, useState } from 'react';
import usersService from '../../services/usersService.js';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: '', role: 'Customer' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const data = await usersService.fetchUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingId) {
        const updated = await usersService.updateUser(editingId, form);
        setUsers((prev) => prev.map((user) => (user.id === editingId ? updated : user)));
        setEditingId(null);
      } else {
        const created = await usersService.createUser(form);
        setUsers((prev) => [created, ...prev]);
      }
      setForm({ username: '', role: 'Customer' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setForm({ username: user.username, role: user.role });
  };

  const handleDelete = async (id) => {
    await usersService.deleteUser(id);
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">User management</h2>
            <p className="mt-1 text-sm text-slate-500">Create, edit and remove portal users.</p>
          </div>
        </div>
        <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-200 bg-slate-50">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 font-medium text-slate-600">Username</th>
                <th className="px-6 py-4 font-medium text-slate-600">Role</th>
                <th className="px-6 py-4 font-medium text-slate-600">Created</th>
                <th className="px-6 py-4 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr><td colSpan="4" className="px-6 py-6">Loading users…</td></tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="bg-white hover:bg-slate-50">
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">{new Date(user.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button onClick={() => handleEdit(user)} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(user.id)} className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <h3 className="text-xl font-semibold text-slate-900">{editingId ? 'Edit user' : 'Create new user'}</h3>
        <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700">
            Username
            <input
              required
              value={form.username}
              onChange={(event) => setForm((prev) => ({ ...prev, username: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Role
            <select
              value={form.role}
              onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            >
              <option>Administrator</option>
              <option>Driver</option>
              <option>Customer</option>
            </select>
          </label>
          <div className="sm:col-span-2 flex gap-3">
            <button type="submit" className="rounded-2xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700">
              {editingId ? 'Save changes' : 'Create user'}
            </button>
            {editingId && (
              <button onClick={() => { setEditingId(null); setForm({ username: '', role: 'Customer' }); }} type="button" className="rounded-2xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default UsersPage;
