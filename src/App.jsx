import { useState } from "react"
import BookSearcher from "./components/BookSearcher/BookSearcher"
import Nav from "./components/Nav/Nav"
import MyLibrary from "./components/MyLibrary/MyLibrary"
import Favorites from "./components/MyFavorites/Favorites"

const App = () => {

  const [library, setLibrary] = useState(JSON.parse(localStorage.getItem("library")) || []);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);
  const [sector, setSector] = useState("Search The Book");

  return (
    <div>
      <Nav setSector={setSector} />
      {sector === "Search The Book" && <BookSearcher library={library} setLibrary={setLibrary} favorites={favorites} setFavorites={setFavorites}   />}
      {sector === "My Library" && <MyLibrary library={library} setLibrary={setLibrary} favorites={favorites} setFavorites={setFavorites} />}
      {sector === "My Favorite Books" && <Favorites favorites={favorites} setFavorites={setFavorites} />}
    </div>
  )
}

export default App