const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center gap-8" style={{ minHeight: '55vh' }} role="status">
    {/* Concentric rings */}
    <div className="relative w-24 h-24 flex items-center justify-center">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }} />

      {/* Ring 1 */}
      <div className="absolute inset-0 rounded-full"
        style={{ border: '2px solid rgba(124,58,237,0.15)' }} />

      {/* Ring 2 — spinning */}
      <div className="absolute inset-0 rounded-full"
        style={{
          border: '2px solid transparent',
          borderTopColor: '#7c3aed',
          borderRightColor: '#db2777',
          animation: 'spin 1s linear infinite',
        }} />

      {/* Ring 3 — counter spinning */}
      <div className="absolute inset-3 rounded-full"
        style={{
          border: '2px solid transparent',
          borderTopColor: '#db2777',
          borderLeftColor: '#7c3aed',
          animation: 'spin 0.75s linear infinite reverse',
        }} />

      {/* Centre dot */}
      <div className="w-3 h-3 rounded-full animate-pulse"
        style={{ background: 'linear-gradient(135deg,#7c3aed,#db2777)' }} />
    </div>

    <div className="text-center">
      <p className="text-white font-semibold text-lg">Loading photos</p>
      <p className="text-slate-600 text-sm mt-1 font-medium">Fetching from Picsum Photos…</p>
    </div>
  </div>
);

export default LoadingSpinner;
