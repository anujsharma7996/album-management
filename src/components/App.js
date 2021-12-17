import { useEffect, useState } from "react";
import AddAlbum from "./AddAlbum";
import Albums from "./Albums";

function App() {
  // State for all the albums
  const [albums, setAlbums] = useState([]);

  // Fetching data from server
  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/albums";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data);
      });
  }, []);

  // Adding new album
  function addingAlbum(title) {
    fetch("https://jsonplaceholder.typicode.com/albums", {
      method: "POST",
      body: JSON.stringify({
        title: title,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAlbums((albums) => [...albums, data]);
        alert(`${title} has been added`);
      });
  }

  // Deleting an album
  function deleteAlbum(id) {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        setAlbums(
          albums.filter((album) => {
            return album.id !== id;
          })
        );
        setTimeout(function () {
          alert("Album has been deleted");
        }, 100);
      })
      .catch((err) => {
        console.log("Error deleting", err);
      });
  }

  return (
    <div className="App">
      <AddAlbum addingAlbum={addingAlbum} />

      {albums.map((album, index) => (
        <Albums
          key={album.title + album.id}
          title={album.title}
          userId={album.userId}
          id={album.id}
          index={index}
          deleteAlbum={deleteAlbum}
        />
      ))}
    </div>
  );
}

export default App;
