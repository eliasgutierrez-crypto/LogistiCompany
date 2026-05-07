function Toast({ message, type = 'info' }) {
  const colorMap = {
    info: 'bg-slate-900 text-white',
    success: 'bg-emerald-600 text-white',
    warning: 'bg-amber-600 text-white',
    error: 'bg-red-600 text-white',
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 rounded-3xl px-5 py-4 shadow-soft ${colorMap[type]}`}>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

export default Toast;
