import { useEffect, useState } from 'react';
import paymentsService from '../../services/paymentsService.js';

function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({ invoice_id: '', amount: '', paid_date: '', method: 'Credit Card', status: 'Paid' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const data = await paymentsService.fetchPayments();
        setPayments(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadPayments();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingId) {
        const updated = await paymentsService.updatePayment(editingId, form);
        setPayments((prev) => prev.map((item) => (item.id === editingId ? updated : item)));
      } else {
        const created = await paymentsService.createPayment(form);
        setPayments((prev) => [created, ...prev]);
      }
      setForm({ invoice_id: '', amount: '', paid_date: '', method: 'Credit Card', status: 'Paid' });
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (payment) => {
    setEditingId(payment.id);
    setForm({ invoice_id: payment.invoice_id || '', amount: payment.amount, paid_date: payment.paid_date?.slice(0, 10) || '', method: payment.method, status: payment.status });
  };

  const handleDelete = async (id) => {
    await paymentsService.deletePayment(id);
    setPayments((prev) => prev.filter((payment) => payment.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Payments management</h2>
            <p className="mt-1 text-sm text-slate-500">Record and update payment information for invoices.</p>
          </div>
        </div>
        <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-200 bg-slate-50">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 font-medium text-slate-600">Payment #</th>
                <th className="px-6 py-4 font-medium text-slate-600">Invoice</th>
                <th className="px-6 py-4 font-medium text-slate-600">Amount</th>
                <th className="px-6 py-4 font-medium text-slate-600">Date</th>
                <th className="px-6 py-4 font-medium text-slate-600">Method</th>
                <th className="px-6 py-4 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="bg-white hover:bg-slate-50">
                  <td className="px-6 py-4">#{payment.id}</td>
                  <td className="px-6 py-4">{payment.invoice_id}</td>
                  <td className="px-6 py-4">${payment.amount}</td>
                  <td className="px-6 py-4">{payment.paid_date?.slice(0, 10)}</td>
                  <td className="px-6 py-4">{payment.method}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button onClick={() => handleEdit(payment)} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">Edit</button>
                    <button onClick={() => handleDelete(payment.id)} className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <h3 className="text-xl font-semibold text-slate-900">{editingId ? 'Edit payment' : 'Record new payment'}</h3>
        <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700">
            Invoice ID
            <input
              required
              value={form.invoice_id}
              onChange={(event) => setForm((prev) => ({ ...prev, invoice_id: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Amount
            <input
              required
              type="number"
              step="0.01"
              value={form.amount}
              onChange={(event) => setForm((prev) => ({ ...prev, amount: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Paid date
            <input
              required
              type="date"
              value={form.paid_date}
              onChange={(event) => setForm((prev) => ({ ...prev, paid_date: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Method
            <select
              value={form.method}
              onChange={(event) => setForm((prev) => ({ ...prev, method: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            >
              <option>Credit Card</option>
              <option>Bank Transfer</option>
              <option>Cash</option>
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Status
            <select
              value={form.status}
              onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            >
              <option>Paid</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </label>
          <div className="sm:col-span-2 flex gap-3">
            <button type="submit" className="rounded-2xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700">
              {editingId ? 'Save payment' : 'Record payment'}
            </button>
            {editingId && (
              <button onClick={() => { setEditingId(null); setForm({ invoice_id: '', amount: '', paid_date: '', method: 'Credit Card', status: 'Paid' }); }} type="button" className="rounded-2xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentsPage;
