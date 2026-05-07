import { useEffect, useState } from 'react';
import customersService from '../../services/customersService.js';

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ user_id: '', company_name: '', phone: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await customersService.fetchCustomers();
        setCustomers(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadCustomers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingId) {
        const updated = await customersService.updateCustomer(editingId, form);
        setCustomers((prev) => prev.map((item) => (item.id === editingId ? updated : item)));
      } else {
        const created = await customersService.createCustomer(form);
        setCustomers((prev) => [created, ...prev]);
      }
      setForm({ user_id: '', company_name: '', phone: '', email: '' });
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (customer) => {
    setEditingId(customer.id);
    setForm({ user_id: customer.user_id || '', company_name: customer.company_name, phone: customer.phone, email: customer.email });
  };

  const handleDelete = async (id) => {
    await customersService.deleteCustomer(id);
    setCustomers((prev) => prev.filter((customer) => customer.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Customer management</h2>
            <p className="mt-1 text-sm text-slate-500">Manage customer records and contact information.</p>
          </div>
        </div>
        <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-200 bg-slate-50">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 font-medium text-slate-600">Name</th>
                <th className="px-6 py-4 font-medium text-slate-600">Email</th>
                <th className="px-6 py-4 font-medium text-slate-600">Phone</th>
                <th className="px-6 py-4 font-medium text-slate-600">Owner</th>
                <th className="px-6 py-4 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="bg-white hover:bg-slate-50">
                  <td className="px-6 py-4">{customer.company_name}</td>
                  <td className="px-6 py-4">{customer.email}</td>
                  <td className="px-6 py-4">{customer.phone}</td>
                  <td className="px-6 py-4">{customer.owner}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button onClick={() => handleEdit(customer)} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(customer.id)} className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <h3 className="text-xl font-semibold text-slate-900">{editingId ? 'Edit customer' : 'Create new customer'}</h3>
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
            Company name
            <input
              required
              value={form.company_name}
              onChange={(event) => setForm((prev) => ({ ...prev, company_name: event.target.value }))}
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
            Email
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>
          <div className="sm:col-span-2 flex gap-3">
            <button type="submit" className="rounded-2xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700">
              {editingId ? 'Save changes' : 'Create customer'}
            </button>
            {editingId && (
              <button onClick={() => { setEditingId(null); setForm({ user_id: '', company_name: '', phone: '', email: '' }); }} type="button" className="rounded-2xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomersPage;
