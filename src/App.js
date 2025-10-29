import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await response.json();

      if (data.docs.length === 0) {
        setError("No books found!");
        setBooks([]);
      } else {
        setBooks(data.docs.slice(0, 10));
      }
    } catch (err) {
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">📚 Book Finder</h1>

      <form onSubmit={handleSearch} className="d-flex mb-4 justify-content-center">
        <input
          type="text"
          className="form-control w-50 me-2"
          placeholder="Search book title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      <div className="row">
        {books.map((book, index) => (
          <div key={index} className="col-md-3 mb-4">
            <div className="card h-100">
              {book.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  className="card-img-top"
                  alt={book.title}
                />
              ) : (
                <div className="card-img-top bg-light text-center p-5">No Image</div>
              )}
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">
                  {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
