import { useEffect, useState } from 'react';
import driversService from '../../services/driversService.js';

function DriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState({ user_id: '', license_number: '', phone: '', vehicle_id: '', status: 'Available' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const loadDrivers = async () => {
      try {
        const data = await driversService.fetchDrivers();
        setDrivers(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadDrivers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingId) {
        const updated = await driversService.updateDriver(editingId, form);
        setDrivers((prev) => prev.map((item) => (item.id === editingId ? updated : item)));
      } else {
        const created = await driversService.createDriver(form);
        setDrivers((prev) => [created, ...prev]);
      }
      setForm({ user_id: '', license_number: '', phone: '', vehicle_id: '', status: 'Available' });
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (driver) => {
    setEditingId(driver.id);
    setForm({ user_id: driver.user_id || '', license_number: driver.license_number, phone: driver.phone, vehicle_id: driver.vehicle_id || '', status: driver.status });
  };

  const handleDelete = async (id) => {
    await driversService.deleteDriver(id);
    setDrivers((prev) => prev.filter((driver) => driver.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Driver management</h2>
            <p className="mt-1 text-sm text-slate-500">Track license, assignments, and driver availability.</p>
          </div>
        </div>
        <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-200 bg-slate-50">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 font-medium text-slate-600">Driver</th>
                <th className="px-6 py-4 font-medium text-slate-600">License</th>
                <th className="px-6 py-4 font-medium text-slate-600">Phone</th>
                <th className="px-6 py-4 font-medium text-slate-600">Vehicle</th>
                <th className="px-6 py-4 font-medium text-slate-600">Status</th>
                <th className="px-6 py-4 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {drivers.map((driver) => (
                <tr key={driver.id} className="bg-white hover:bg-slate-50">
                  <td className="px-6 py-4">{driver.username}</td>
                  <td className="px-6 py-4">{driver.license_number}</td>
                  <td className="px-6 py-4">{driver.phone}</td>
                  <td className="px-6 py-4">{driver.vehicle || 'None'}</td>
                  <td className="px-6 py-4">{driver.status}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button onClick={() => handleEdit(driver)} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">Edit</button>
                    <button onClick={() => handleDelete(driver.id)} className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <h3 className="text-xl font-semibold text-slate-900">{editingId ? 'Edit driver' : 'Create new driver'}</h3>
        <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700">
            User ID
            <input
              required
              value={form.user_id}
              onChange={(event) => setForm((prev) => ({ ...prev, user_id: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            License number
            <input
              required
              value={form.license_number}
              onChange={(event) => setForm((prev) => ({ ...prev, license_number: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Phone
            <input
              required
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Vehicle ID
            <input
              value={form.vehicle_id}
              onChange={(event) => setForm((prev) => ({ ...prev, vehicle_id: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Status
            <select
              value={form.status}
              onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            >
              <option>Available</option>
              <option>On duty</option>
              <option>Offline</option>
            </select>
          </label>
          <div className="sm:col-span-2 flex gap-3">
            <button type="submit" className="rounded-2xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700">
              {editingId ? 'Save changes' : 'Create driver'}
            </button>
            {editingId && (
              <button onClick={() => { setEditingId(null); setForm({ user_id: '', license_number: '', phone: '', vehicle_id: '', status: 'Available' }); }} type="button" className="rounded-2xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default DriversPage;
