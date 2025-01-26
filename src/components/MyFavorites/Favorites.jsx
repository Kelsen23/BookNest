import { useEffect } from "react";
import "./Favorites.css";

const MyLibrary = ({ favorites, setFavorites }) => {

  const handleRemove = (book) => {
    setFavorites((prevBooks) => prevBooks.filter((item) => book.title !== item.title));
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div>
      <div className="favorites_sector-title-container">
        <h1>My Favorites</h1>
      </div>

      <div className="favorites-container">
        {favorites.length > 0 ? favorites.map((book, index) => (
          <div key={index} className="favorites_book-container">
            <div className="favorites_title-container">
              <h2 className="favorites_book-title">{book.title}</h2>
            </div>

            <div className="favorites_book-info-container">
              <img
                src={book.image}
                style={{ width: "150px" }}
                className="favorites_book-img"
                alt={book.title}
              />
              <p className="favorites_author">
                <strong>Author(s):</strong> {book.authors}
              </p>
              <p className="favorites_description">
                <strong>Description:</strong> {book.description}
              </p>
              <button onClick={() => handleRemove(book)}>Unfavorite</button>
            </div>
          </div>
        )) : <p className="noFavoritesData">Your Favorites Is Empty</p>}
      </div>
    </div>
  );
};

export default MyLibrary;
