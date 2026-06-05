import { useState } from "react";
import "./App.css";

function Header({ title }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <p>Movie Management Dashboard</p>
    </header>
  );
}

function MovieCard({ movie, onDelete, onToggleFav }) {
  return (
    <div className="card">
      <h3>{movie.title}</h3>
      <p>Genre: {movie.genre}</p>
      <p>⭐ Rating: {movie.rating}</p>

      <button
        className="fav-btn"
        onClick={() => onToggleFav(movie.id)}
      >
        {movie.favorite ? "❤️ Favorite" : "🤍 Add Favorite"}
      </button>

      <button
        className="delete-btn"
        onClick={() => onDelete(movie.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default function App() {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Interstellar",
      genre: "Sci-Fi",
      rating: 9.0,
      favorite: true,
    },
    {
      id: 2,
      title: "Avatar",
      genre: "Action",
      rating: 8.7,
      favorite: false,
    },
    {
      id: 3,
      title: "Joker",
      genre: "Drama",
      rating: 8.8,
      favorite: false,
    },
  ]);

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");

  const addMovie = () => {
    if (!title || !genre) return;

    const newMovie = {
      id: Date.now(),
      title,
      genre,
      rating: 8.0,
      favorite: false,
    };

    setMovies([...movies, newMovie]);
    setTitle("");
    setGenre("");
  };

  const deleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const toggleFavorite = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id
          ? { ...movie, favorite: !movie.favorite }
          : movie
      )
    );
  };

  const favoriteCount = movies.filter(
    (movie) => movie.favorite
  ).length;

  return (
    <div className="container">
      <Header title="🎬 Movie Hub Dashboard" />

      <div className="stats">
        <div className="stat-box">
          <h2>{movies.length}</h2>
          <p>Total Movies</p>
        </div>

        <div className="stat-box">
          <h2>{favoriteCount}</h2>
          <p>Favorites</p>
        </div>
      </div>

      <div className="form">
        <input
          type="text"
          placeholder="Movie Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <button onClick={addMovie}>
          Add Movie
        </button>
      </div>

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onDelete={deleteMovie}
            onToggleFav={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}