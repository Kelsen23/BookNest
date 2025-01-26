import "./Nav.css"

const Nav = ({ setSector }) => {

  return (
    <nav>
      <h2 className="search-link" onClick={() => setSector("Search The Book")}>Search The Book</h2>
      <h2 className="library-link" onClick={() => setSector("My Library")}>My Library</h2>
      <h2 className="favorite-link" onClick={() => setSector("My Favorite Books")}>My Favorite Books</h2>
    </nav>
  )
}

export default Nav