const ErrorMessage = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center gap-6 px-4" style={{ minHeight: '50vh' }} role="alert">
    {/* Icon */}
    <div className="w-20 h-20 rounded-full flex items-center justify-center"
      style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f87171" className="w-9 h-9">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    </div>

    <div className="text-center max-w-sm">
      <h2 className="text-white font-bold text-xl mb-2">Something went wrong</h2>
      <p className="text-slate-500 text-sm leading-relaxed">{message}</p>
    </div>

    <button
      id="retry-btn"
      onClick={onRetry}
      className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-95"
      style={{ background: 'linear-gradient(135deg,#7c3aed,#6d28d9)', boxShadow: '0 8px 24px rgba(124,58,237,0.35)' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 32px rgba(124,58,237,0.5)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(124,58,237,0.35)'}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
      Try Again
    </button>
  </div>
);

export default ErrorMessage;
