import { memo } from 'react';

const SearchBar = memo(({ value, onChange, totalCount, filteredCount }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-slate-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>

        <input
          id="search-input"
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search by photographer name…"
          autoComplete="off"
          spellCheck={false}
          className="
            search-input
            w-full pl-12 pr-12 py-3.5 rounded-2xl
            bg-slate-800/70 backdrop-blur
            border border-slate-700/60
            text-white placeholder-slate-500
            text-sm font-medium
            outline-none
            transition-all duration-200
            focus:border-violet-500/60
          "
          aria-label="Search photos by author name"
        />

        {value && (
          <button
            id="search-clear-btn"
            onClick={() => onChange({ target: { value: '' } })}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {value && (
        <p className="text-center text-slate-500 text-xs mt-2">
          {filteredCount === 0
            ? 'No photographers match your search'
            : `Showing ${filteredCount} of ${totalCount} photos`}
        </p>
      )}
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
