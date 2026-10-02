function SearchBar({ search, setSearch, onPlusClick }) {
  return (
    <div className="flex w-full max-w-xl items-center gap-3">
      <div className="flex flex-1 items-center gap-3 rounded-full bg-neutral-900 px-6 py-4">
        <span>🔍</span>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="What would you like to watch?"
          className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-500"
        />
      </div>

      <button
        type="button"
        onClick={onPlusClick}
        aria-label={search.trim() ? `Add ${search.trim()} or open add form` : 'Open add movie form'}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-2xl hover:bg-neutral-800"
      >
        +
      </button>
    </div>
  )
}

export default SearchBar