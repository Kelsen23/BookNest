import { useState, useEffect } from "react";
import "./BookSearcher.css";
import { MdOutlineStarPurple500, MdStarPurple500 } from "react-icons/md";

const BookSearcher = ({ library, setLibrary, favorites, setFavorites }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  const [favoritedBooks, setFavoritedBooks] = useState({});

  const renderData = (books) => {
    const aboutBook = books.map((book) => ({
      title: book.volumeInfo.title || "No Title Available",
      description: book.volumeInfo.description || "No Description Available",
      image: book.volumeInfo.imageLinks?.thumbnail,
      authors: book.volumeInfo.authors?.join(", ") || "N/A",
    }));
    setData(aboutBook);
  };

  const fetchBookData = async () => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
      );
      const result = await res.json();
      renderData(result.items || []);
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
    }
  };

  useEffect(() => {
    fetchBookData();
  }, [searchTerm]);

  useEffect(() => {
    const initialFavoritedBooks = favorites.reduce((acc, book) => {
      acc[book.title] = true; 
      return acc;
    }, {});
    setFavoritedBooks(initialFavoritedBooks);
  }, [favorites]);

  const addToLibrary = (book) => {
    if (!library.some((item) => item.title === book.title)) {
      setLibrary((prevLibrary) => [...prevLibrary, book]);
    }
  };

  const addToFavorites = (book) => {
    const isFavorited = favoritedBooks[book.title];

    if (!isFavorited) {
      setFavorites((prevFavorites) => [...prevFavorites, book]);
      setFavoritedBooks((prev) => ({ ...prev, [book.title]: true }));
    } else {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((item) => item.title !== book.title)
      );
      setFavoritedBooks((prev) => ({ ...prev, [book.title]: false }));
    }
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div>
      <input
        type="text"
        placeholder="Type In The Name of Book"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="books-container">
        {data.length > 0
          ? data.map((book, index) => {
              const isFavorited = favoritedBooks[book.title];

              return (
                <div key={index} className="book-container">
                  <div className="title-container">
                    <h2 className="book-title">{book.title}</h2>
                  </div>

                  <div className="book-info-container">
                    <img
                      src={book.image}
                      style={{ width: "150px" }}
                      className="book-img"
                    />
                    <p className="author">
                      <strong>Author(s):</strong> {book.authors}
                    </p>
                    <p className="description">
                      <strong>Description:</strong> {book.description}
                    </p>
                  </div>

                  <div className="btn-container">
                    <button
                      className="addToLibrary-btn"
                      onClick={() => addToLibrary(book)}
                    >
                      Add To Library
                    </button>
                    {isFavorited ? (
                      <MdStarPurple500
                        className="favorite-btn"
                        onClick={() => addToFavorites(book)}
                        color="red"
                      />
                    ) : (
                      <MdOutlineStarPurple500
                        className="favorite-btn"
                        onClick={() => addToFavorites(book)}
                        color="gray"
                      />
                    )}
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default BookSearcher;
