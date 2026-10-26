import { memo } from 'react';

const SearchBar = memo(({ value, onChange, totalCount, filteredCount }) => {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="glass-search search-input flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 shrink-0 text-violet-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>

        <input
          id="search-input"
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search by photographer…"
          autoComplete="off"
          spellCheck={false}
          className="flex-1 bg-transparent outline-none text-slate-50 placeholder-slate-700 text-sm font-medium"
          aria-label="Search photos by author name"
        />

        {value ? (
          <div className="flex items-center gap-2 shrink-0">
            <span className="search-count tab-count text-xs font-semibold px-2 py-0.5 rounded-full">
              {filteredCount}/{totalCount}
            </span>
            <button
              id="search-clear-btn"
              onClick={() => onChange({ target: { value: '' } })}
              className="search-clear flex items-center justify-center w-6 h-6 rounded-full transition-colors cursor-pointer hover:text-slate-300"
              aria-label="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <kbd className="hidden sm:flex items-center gap-1 text-xs px-2 py-0.5 rounded-lg shrink-0 bg-white/5 text-slate-600 border border-white/[0.07]">
            ⌘K
          </kbd>
        )}
      </div>

      {value && filteredCount === 0 && (
        <p className="text-center text-slate-700 text-xs mt-2">
          No photographer named &quot;<span className="text-violet-400">{value}</span>&quot;
        </p>
      )}
    </div>
  );
});

SearchBar.displayName = 'SearchBar';
export default SearchBar;
