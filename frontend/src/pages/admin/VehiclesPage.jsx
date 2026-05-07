import { useEffect, useState } from 'react';
import vehiclesService from '../../services/vehiclesService.js';

function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({ plate_number: '', model: '', capacity: '', status: 'Active' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const data = await vehiclesService.fetchVehicles();
        setVehicles(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadVehicles();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingId) {
        const updated = await vehiclesService.updateVehicle(editingId, form);
        setVehicles((prev) => prev.map((item) => (item.id === editingId ? updated : item)));
      } else {
        const created = await vehiclesService.createVehicle(form);
        setVehicles((prev) => [created, ...prev]);
      }
      setForm({ plate_number: '', model: '', capacity: '', status: 'Active' });
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (vehicle) => {
    setEditingId(vehicle.id);
    setForm({ plate_number: vehicle.plate_number, model: vehicle.model, capacity: vehicle.capacity, status: vehicle.status });
  };

  const handleDelete = async (id) => {
    await vehiclesService.deleteVehicle(id);
    setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Vehicle management</h2>
            <p className="mt-1 text-sm text-slate-500">Maintain the fleet inventory and vehicle statuses.</p>
          </div>
        </div>
        <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-200 bg-slate-50">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 font-medium text-slate-600">Plate</th>
                <th className="px-6 py-4 font-medium text-slate-600">Model</th>
                <th className="px-6 py-4 font-medium text-slate-600">Capacity</th>
                <th className="px-6 py-4 font-medium text-slate-600">Status</th>
                <th className="px-6 py-4 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="bg-white hover:bg-slate-50">
                  <td className="px-6 py-4">{vehicle.plate_number}</td>
                  <td className="px-6 py-4">{vehicle.model}</td>
                  <td className="px-6 py-4">{vehicle.capacity}</td>
                  <td className="px-6 py-4">{vehicle.status}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button onClick={() => handleEdit(vehicle)} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">Edit</button>
                    <button onClick={() => handleDelete(vehicle.id)} className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <h3 className="text-xl font-semibold text-slate-900">{editingId ? 'Edit vehicle' : 'Add new vehicle'}</h3>
        <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700">
            Plate number
            <input
              required
              value={form.plate_number}
              onChange={(event) => setForm((prev) => ({ ...prev, plate_number: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Model
            <input
              required
              value={form.model}
              onChange={(event) => setForm((prev) => ({ ...prev, model: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Capacity
            <input
              value={form.capacity}
              onChange={(event) => setForm((prev) => ({ ...prev, capacity: event.target.value }))}
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
              <option>Active</option>
              <option>Maintenance</option>
              <option>Inactive</option>
            </select>
          </label>
          <div className="sm:col-span-2 flex gap-3">
            <button type="submit" className="rounded-2xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700">
              {editingId ? 'Save changes' : 'Save vehicle'}
            </button>
            {editingId && (
              <button onClick={() => { setEditingId(null); setForm({ plate_number: '', model: '', capacity: '', status: 'Active' }); }} type="button" className="rounded-2xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default VehiclesPage;
