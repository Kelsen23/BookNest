import { useEffect, useState } from "react";
import "./MyLibrary.css";
import { MdOutlineStarPurple500, MdStarPurple500 } from "react-icons/md";

const MyLibrary = ({ library, setLibrary, favorites, setFavorites }) => {
  const [favoritedBooks, setFavoritedBooks] = useState({});

  useEffect(() => {
    const initialFavoritedBooks = favorites.reduce((acc, book) => {
      acc[book.title] = true;
      return acc;
    }, {});
    setFavoritedBooks(initialFavoritedBooks);
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("library", JSON.stringify(library));
  }, [library]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleRemove = (book) => {
    setLibrary((prevBooks) =>
      prevBooks.filter((item) => book.title !== item.title)
    );
  };

  const toggleFavorite = (book) => {
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

  return (
    <div>
      <div className="myLibrary_sector-title-container">
        <h1>My Library</h1>
      </div>

      <div className="library-container">
        {library.length > 0 ? (
          library.map((book, index) => {
            const isFavorited = favoritedBooks[book.title];

            return (
              <div key={index} className="myLibrary_book-container">
                <div className="myLibrary_title-container">
                  <h2 className="myLibrary_book-title">{book.title}</h2>
                </div>

                <div className="myLibrary_book-info-container">
                  <img
                    src={book.image}
                    style={{ width: "150px" }}
                    className="myLibrary_book-img"
                    alt={book.title}
                  />
                  <p className="myLibrary_author">
                    <strong>Author(s):</strong> {book.authors}
                  </p>
                  <p className="myLibrary_description">
                    <strong>Description:</strong> {book.description}
                  </p>
                  <div className="myLibrary_btn-container">
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(book)}
                    >
                      Remove
                    </button>
                    {isFavorited ? (
                      <MdStarPurple500
                        className="favorite-btn"
                        onClick={() => toggleFavorite(book)}
                        color="red"
                      />
                    ) : (
                      <MdOutlineStarPurple500
                        className="favorite-btn"
                        onClick={() => toggleFavorite(book)}
                        color="gray"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="noLibraryData">Your Library Is Empty</p>
        )}
      </div>
    </div>
  );
};

export default MyLibrary;
