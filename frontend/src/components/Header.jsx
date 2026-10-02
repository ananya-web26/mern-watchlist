import SearchBar from './searchbar'

function Header({ search, setSearch, onPlusClick }) {
  return (
    <header className="flex items-center justify-between gap-6">
      <h1 className="text-3xl font-bold tracking-wide">film dump</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
        onPlusClick={onPlusClick}
      />

      <button className="rounded-full bg-neutral-900 px-6 py-3 text-sm">
        Account
      </button>
    </header>
  )
}

export default Header