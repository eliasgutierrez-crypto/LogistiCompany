import { useEffect, useState } from 'react';
import orderService from '../../services/orderService.js';

function CustomerDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await orderService.fetchOrders();
        setOrders(data.slice(0, 4));
      } catch (error) {
        console.error(error);
      }
    };
    loadOrders();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-brand-600">Customer corner</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Order summary</h2>
          </div>
          <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">Track deliveries easily</div>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-500">Open orders</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">{orders.length}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-500">Last placed</p>
            <p className="mt-3 text-2xl font-semibold text-brand-700">3 days ago</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-500">Estimated delivery</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">4 days</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-500">Support</p>
            <p className="mt-3 text-2xl font-semibold text-brand-700">24/7</p>
          </div>
        </div>
      </div>
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <h3 className="text-xl font-semibold text-slate-900">Recent orders</h3>
        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="font-semibold text-slate-900">Order #{order.id}</p>
              <p className="mt-1 text-sm text-slate-600">{order.description || 'Shipment order for a customer'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
