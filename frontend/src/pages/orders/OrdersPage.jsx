import { useEffect, useState } from 'react';
import orderService from '../../services/orderService.js';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ customerName: '', pickup: '', destination: '', details: '' });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await orderService.fetchOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.customerName?.toLowerCase().includes(search.toLowerCase()) ||
    order.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async (event) => {
    event.preventDefault();
    setCreating(true);
    setError('');

    try {
      const newOrder = await orderService.createOrder(form);
      setOrders((prev) => [newOrder, ...prev]);
      setForm({ customerName: '', pickup: '', destination: '', details: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create order.');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Orders Management</h2>
            <p className="mt-1 text-sm text-slate-500">Search, create, and review customer orders.</p>
          </div>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search orders"
            className="w-full max-w-sm rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
          />
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.65fr]">
          <div>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-white">
                  <tr>
                    <th className="px-6 py-4 font-medium text-slate-600">Order</th>
                    <th className="px-6 py-4 font-medium text-slate-600">Customer</th>
                    <th className="px-6 py-4 font-medium text-slate-600">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredOrders.slice(0, 8).map((order) => (
                    <tr key={order.id} className="bg-white hover:bg-slate-50">
                      <td className="px-6 py-4">#{order.id}</td>
                      <td className="px-6 py-4">{order.customerName || 'Guest'}</td>
                      <td className="px-6 py-4 text-slate-600">{order.status || 'Pending'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-slate-900">Create a new order</h3>
            <form className="mt-5 space-y-4" onSubmit={handleCreate}>
              <label className="block text-sm font-medium text-slate-700">
                Customer name
                <input
                  value={form.customerName}
                  onChange={(event) => setForm({ ...form, customerName: event.target.value })}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Pickup location
                <input
                  value={form.pickup}
                  onChange={(event) => setForm({ ...form, pickup: event.target.value })}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Destination
                <input
                  value={form.destination}
                  onChange={(event) => setForm({ ...form, destination: event.target.value })}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Details
                <textarea
                  value={form.details}
                  onChange={(event) => setForm({ ...form, details: event.target.value })}
                  className="mt-2 h-24 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
                />
              </label>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={creating}
                className="w-full rounded-2xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {creating ? 'Submitting…' : 'Create order'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
