import { useState } from 'react';

function TrackingPage() {
  const [trackingId, setTrackingId] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setResult({
      id: trackingId,
      status: 'In Transit',
      location: 'Distribution hub - West Dock',
      eta: 'Today, 5:30 PM',
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Track your shipment</h2>
            <p className="mt-1 text-sm text-slate-500">Enter a shipment or order reference to view live status.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 sm:flex-row">
          <input
            value={trackingId}
            onChange={(event) => setTrackingId(event.target.value)}
            placeholder="Enter shipment tracking ID"
            required
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
          />
          <button className="rounded-2xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
            Search
          </button>
        </form>
        {result && (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-lg font-semibold text-slate-900">Shipment #{result.id}</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white p-4 shadow-soft">
                <p className="text-sm text-slate-500">Status</p>
                <p className="mt-2 font-semibold text-slate-900">{result.status}</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-soft">
                <p className="text-sm text-slate-500">Current location</p>
                <p className="mt-2 font-semibold text-slate-900">{result.location}</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-soft">
                <p className="text-sm text-slate-500">ETA</p>
                <p className="mt-2 font-semibold text-slate-900">{result.eta}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackingPage;
