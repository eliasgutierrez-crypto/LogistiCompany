import { useEffect, useState } from 'react';
import invoicesService from '../../services/invoicesService.js';

function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [form, setForm] = useState({ order_id: '', amount_due: '', due_date: '', status: 'Unpaid' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const data = await invoicesService.fetchInvoices();
        setInvoices(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadInvoices();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingId) {
        const updated = await invoicesService.updateInvoice(editingId, form);
        setInvoices((prev) => prev.map((item) => (item.id === editingId ? updated : item)));
      } else {
        const created = await invoicesService.createInvoice(form);
        setInvoices((prev) => [created, ...prev]);
      }
      setForm({ order_id: '', amount_due: '', due_date: '', status: 'Unpaid' });
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (invoice) => {
    setEditingId(invoice.id);
    setForm({ order_id: invoice.order_id || '', amount_due: invoice.amount_due, due_date: invoice.due_date?.slice(0, 10) || '', status: invoice.status });
  };

  const handleDelete = async (id) => {
    await invoicesService.deleteInvoice(id);
    setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Invoice management</h2>
            <p className="mt-1 text-sm text-slate-500">Review invoices, payment status, and outstanding balances.</p>
          </div>
        </div>
        <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-200 bg-slate-50">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 font-medium text-slate-600">Invoice #</th>
                <th className="px-6 py-4 font-medium text-slate-600">Customer</th>
                <th className="px-6 py-4 font-medium text-slate-600">Amount</th>
                <th className="px-6 py-4 font-medium text-slate-600">Due date</th>
                <th className="px-6 py-4 font-medium text-slate-600">Status</th>
                <th className="px-6 py-4 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="bg-white hover:bg-slate-50">
                  <td className="px-6 py-4">#{invoice.id}</td>
                  <td className="px-6 py-4">{invoice.customer || 'N/A'}</td>
                  <td className="px-6 py-4">${invoice.amount_due}</td>
                  <td className="px-6 py-4">{invoice.due_date?.slice(0, 10)}</td>
                  <td className="px-6 py-4">{invoice.status}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button onClick={() => handleEdit(invoice)} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">Edit</button>
                    <button onClick={() => handleDelete(invoice.id)} className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <h3 className="text-xl font-semibold text-slate-900">{editingId ? 'Edit invoice' : 'Create new invoice'}</h3>
        <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700">
            Order ID
            <input
              required
              value={form.order_id}
              onChange={(event) => setForm((prev) => ({ ...prev, order_id: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Amount due
            <input
              required
              value={form.amount_due}
              type="number"
              step="0.01"
              onChange={(event) => setForm((prev) => ({ ...prev, amount_due: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Due date
            <input
              required
              type="date"
              value={form.due_date}
              onChange={(event) => setForm((prev) => ({ ...prev, due_date: event.target.value }))}
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
              <option>Unpaid</option>
              <option>Paid</option>
            </select>
          </label>
          <div className="sm:col-span-2 flex gap-3">
            <button type="submit" className="rounded-2xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700">
              {editingId ? 'Save invoice' : 'Create invoice'}
            </button>
            {editingId && (
              <button onClick={() => { setEditingId(null); setForm({ order_id: '', amount_due: '', due_date: '', status: 'Unpaid' }); }} type="button" className="rounded-2xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default InvoicesPage;
