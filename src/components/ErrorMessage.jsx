const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[50vh] gap-6 px-4"
      role="alert"
      aria-live="assertive"
    >
      <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 text-red-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      </div>

      <div className="text-center max-w-md">
        <h2 className="text-white font-bold text-xl mb-2">Failed to Load Photos</h2>
        <p className="text-slate-400 text-sm leading-relaxed">{message}</p>
      </div>

      <button
        id="retry-btn"
        onClick={onRetry}
        className="
          px-6 py-3 rounded-xl
          bg-violet-600 hover:bg-violet-500
          text-white font-semibold text-sm
          transition-all duration-200
          hover:shadow-lg hover:shadow-violet-500/30
          active:scale-95
          cursor-pointer
        "
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;
