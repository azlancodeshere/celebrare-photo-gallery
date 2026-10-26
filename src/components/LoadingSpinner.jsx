const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-[55vh] gap-8" role="status">
    <div className="relative w-24 h-24 flex items-center justify-center">
      <div className="spinner-glow absolute inset-0 rounded-full opacity-20" />
      <div className="spinner-track absolute inset-0 rounded-full" />
      <div className="spinner-ring1 absolute inset-0 rounded-full" />
      <div className="spinner-ring2 absolute inset-3 rounded-full" />
      <div className="spinner-dot w-3 h-3 rounded-full animate-pulse" />
    </div>
    <div className="text-center">
      <p className="text-slate-50 font-semibold text-lg">Loading photos</p>
      <p className="text-slate-600 text-sm mt-1 font-medium">Fetching from Picsum Photos…</p>
    </div>
  </div>
);

export default LoadingSpinner;
