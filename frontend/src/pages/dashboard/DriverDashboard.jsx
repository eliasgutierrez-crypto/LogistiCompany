import { useEffect, useState } from 'react';
import shipmentService from '../../services/shipmentService.js';

function DriverDashboard() {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    const loadShipments = async () => {
      try {
        const allShipments = await shipmentService.fetchShipments();
        setShipments(allShipments.slice(0, 4));
      } catch (error) {
        console.error(error);
      }
    };
    loadShipments();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-brand-600">Driver hub</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Assigned deliveries</h2>
          </div>
          <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">Review and update statuses</div>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-500">Next stop</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">Warehouse B</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-500">Total stops</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">8</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-500">In transit</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">3</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-500">On-time rate</p>
            <p className="mt-3 text-2xl font-semibold text-brand-700">92%</p>
          </div>
        </div>
      </div>
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <h3 className="text-xl font-semibold text-slate-900">Active delivery list</h3>
        <div className="mt-6 space-y-4">
          {shipments.map((shipment) => (
            <div key={shipment.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{shipment.reference || `Shipment #${shipment.id}`}</p>
                  <p className="mt-1 text-sm text-slate-600">Destination: {shipment.destination || 'Unknown'}</p>
                </div>
                <span className="rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-700">
                  {shipment.status || 'Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DriverDashboard;
