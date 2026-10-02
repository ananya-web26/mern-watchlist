import { useEffect, useState } from 'react'
import Header from './components/Header'
import MovieCard from './components/moviecard'

function App() {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')
  const [title, setTitle] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5001/api/movies')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load movies')
        }
        return response.json()
      })
      .then((data) => {
        setMovies(data)
        setIsLoading(false)
      })
      .catch(() => {
        setError('Could not load movies. Is the backend running?')
        setIsLoading(false)
      })
  }, [])

  const addMovie = (event) => {
    event.preventDefault()
    if (!title.trim()) return

    fetch('http://localhost:5001/api/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title.trim() }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not add movie')
        }
        return response.json()
      })
      .then((newMovie) => {
        setMovies((currentMovies) => [...currentMovies, newMovie])
        setTitle('')
        setShowForm(false)
      })
      .catch(() => {
        setError('Could not add movie.')
      })
  }

  const handlePlusClick = () => {
    const searchedTitle = search.trim()
    const hasMatchingMovie = movies.some((movie) =>
      movie.title.toLowerCase().includes(searchedTitle.toLowerCase())
    )

    if (!searchedTitle || hasMatchingMovie) {
      setShowForm((currentlyShown) => !currentlyShown)
      return
    }

    fetch('http://localhost:5001/api/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: searchedTitle }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not add movie')
        }
        return response.json()
      })
      .then((newMovie) => {
        setMovies((currentMovies) => [...currentMovies, newMovie])
        setShowForm(false)
      })
      .catch(() => {
        setError('Could not add movie.')
      })
  }

  const deleteMovie = (id) => {
    fetch(`http://localhost:5001/api/movies/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not delete movie')
        }
        setMovies((currentMovies) =>
          currentMovies.filter((movie) => movie._id !== id)
        )
      })
      .catch(() => {
        setError('Could not delete movie.')
      })
  }

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-[#0f0f0f] px-12 py-10 text-white">
      <Header
        search={search}
        setSearch={setSearch}
        onPlusClick={handlePlusClick}
      />

      {showForm && (
        <form onSubmit={addMovie} className="mt-6 flex gap-3">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Movie title"
            className="w-72 rounded-full bg-neutral-900 px-5 py-3 text-sm outline-none placeholder:text-neutral-500"
          />
          <button
            type="submit"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
          >
            Add movie
          </button>
        </form>
      )}

      <h2 className="mt-10 text-4xl font-medium">
        Movie Results
      </h2>

      {isLoading && <p className="mt-6">Loading movies...</p>}
      {error && <p className="mt-6 text-red-400">{error}</p>}

      {!isLoading && !error && filteredMovies.length === 0 && (
        <p className="mt-6 text-neutral-400">No movies found.</p>
      )}

      {!isLoading && !error && (
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onDelete={deleteMovie}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default App