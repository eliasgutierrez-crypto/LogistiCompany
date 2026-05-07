import { useEffect, useState } from 'react';
import orderService from '../../services/orderService.js';
import shipmentService from '../../services/shipmentService.js';

function AdminDashboard() {
  const [stats, setStats] = useState({ orders: 0, shipments: 0, activeDrivers: 0, delivered: 0 });

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const orders = await orderService.fetchOrders();
        const shipments = await shipmentService.fetchShipments();
        setStats({
          orders: orders.length,
          shipments: shipments.length,
          activeDrivers: 12,
          delivered: shipments.filter((item) => item.status === 'Delivered').length,
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadMetrics();
  }, []);

  const cards = [
    { label: 'Total orders', value: stats.orders, icon: '📦' },
    { label: 'Shipments', value: stats.shipments, icon: '🚚' },
    { label: 'Active drivers', value: stats.activeDrivers, icon: '👷' },
    { label: 'Delivered', value: stats.delivered, icon: '✅' },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-brand-600">Admin dashboard</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Operational overview</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div key={card.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-semibold text-slate-900">{card.label}</p>
                <div className="rounded-2xl bg-white px-3 py-2 text-xl">{card.icon}</div>
              </div>
              <p className="mt-6 text-4xl font-bold text-brand-700">{card.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-soft">
          <h3 className="text-xl font-semibold text-slate-900">Live shipment status</h3>
          <p className="mt-2 text-sm text-slate-500">Track progress and delivery health across the fleet.</p>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Warehouse staging</p>
              <p className="mt-2 text-sm text-slate-600">Loading orders and preparing routes for the day.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Driver assignments</p>
              <p className="mt-2 text-sm text-slate-600">Assigning drivers to priority shipments in real time.</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-soft">
          <h3 className="text-xl font-semibold text-slate-900">Latest order activity</h3>
          <p className="mt-2 text-sm text-slate-500">Review recent request trends and customer demand.</p>
          <div className="mt-6 space-y-3">
            <div className="rounded-3xl bg-brand-50 p-5">
              <p className="text-sm font-semibold text-brand-700">Bulk order staging</p>
              <p className="mt-1 text-sm text-slate-600">A major customer placed 30 new orders for next-week delivery.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Route update</p>
              <p className="mt-1 text-sm text-slate-600">Route efficiency improved by 14% after optimizing returns.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
