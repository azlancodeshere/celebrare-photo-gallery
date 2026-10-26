const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6" role="status" aria-live="polite">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-slate-700" />
        <div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-500 border-r-pink-500"
          style={{ animation: 'spin 0.9s linear infinite' }}
        />
        <div
          className="absolute inset-2 rounded-full border-4 border-transparent border-t-pink-400 border-r-violet-400"
          style={{ animation: 'spin 1.4s linear infinite reverse' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-violet-400 animate-pulse" />
        </div>
      </div>

      <div className="text-center">
        <p className="text-white font-semibold text-lg">Loading photos…</p>
        <p className="text-slate-500 text-sm mt-1">Fetching from Picsum Photos API</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
