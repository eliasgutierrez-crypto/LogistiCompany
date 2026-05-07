import { useEffect, useState } from 'react';
import shipmentService from '../../services/shipmentService.js';

function ShipmentsPage() {
  const [shipments, setShipments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const loadShipments = async () => {
      try {
        const data = await shipmentService.fetchShipments();
        setShipments(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadShipments();
  }, []);

  const statuses = ['All', 'Pending', 'In Transit', 'Delivered'];
  const filtered = shipments.filter((shipment) =>
    statusFilter === 'All' ? true : shipment.status === statusFilter
  );

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Shipment operations</h2>
            <p className="mt-1 text-sm text-slate-500">Monitor the fleet and update shipment statuses.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {statuses.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                  status === statusFilter ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-200 bg-slate-50">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 font-medium text-slate-600">Shipment</th>
                <th className="px-6 py-4 font-medium text-slate-600">Destination</th>
                <th className="px-6 py-4 font-medium text-slate-600">Status</th>
                <th className="px-6 py-4 font-medium text-slate-600">Driver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.slice(0, 10).map((shipment) => (
                <tr key={shipment.id} className="bg-white hover:bg-slate-50">
                  <td className="px-6 py-4">#{shipment.id}</td>
                  <td className="px-6 py-4">{shipment.destination || 'TBD'}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
                      {shipment.status || 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4">{shipment.driverName || 'Unassigned'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ShipmentsPage;
