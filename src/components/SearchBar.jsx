import { memo } from 'react';

const SearchBar = memo(({ value, onChange, totalCount, filteredCount }) => {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className="search-input flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Search icon */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
          className="w-5 h-5 flex-shrink-0" style={{ color: '#7c3aed' }}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>

        <input
          id="search-input"
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search by photographer…"
          autoComplete="off"
          spellCheck={false}
          className="flex-1 bg-transparent outline-none text-white placeholder-slate-600 text-sm font-medium"
          aria-label="Search photos by author name"
        />

        {/* Live count pill */}
        {value ? (
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(124,58,237,0.2)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.3)' }}>
              {filteredCount}/{totalCount}
            </span>
            <button
              id="search-clear-btn"
              onClick={() => onChange({ target: { value: '' } })}
              className="flex items-center justify-center w-6 h-6 rounded-full transition-colors cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.07)', color: '#94a3b8' }}
              aria-label="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <kbd className="hidden sm:flex items-center gap-1 text-xs px-2 py-0.5 rounded-lg flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.05)', color: '#475569', border: '1px solid rgba(255,255,255,0.07)' }}>
            ⌘K
          </kbd>
        )}
      </div>

      {/* No results hint */}
      {value && filteredCount === 0 && (
        <p className="text-center text-slate-600 text-xs mt-2">
          No photographer named "<span style={{ color: '#a78bfa' }}>{value}</span>"
        </p>
      )}
    </div>
  );
});

SearchBar.displayName = 'SearchBar';
export default SearchBar;
