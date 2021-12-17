import { useState } from "react";
import "../AlbumStyle.css";

function Albums({ title, userId, id, index, deleteAlbum }) {
  // State for enabling/disabling edit mode
  const [editMode, setEditMode] = useState(false);

  // State for handling input
  const [titleInput, setTitleInput] = useState("");

  // State for handling title change
  const [titleChange, setTitleChange] = useState(title);

  const handleDelete = () => {
    deleteAlbum(id);
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleInput = (e) => {
    setTitleInput(e.target.value);
  };

  const handleSave = (e) => {
    if (titleInput.trim() === "") {
      alert("Please fill the title");
      return;
    }

    updateAlbum(id, titleInput);
    setEditMode(!editMode);
  };

  // function to make a PUT request to change the album title
  function updateAlbum(id, titleInput) {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: titleInput,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTitleChange(titleInput);
        setTimeout(function () {
          alert("Title updated");
        }, 100);
      });
  }

  return (
    <div className="album-container">
      <p>{index + 1}</p>

      {editMode ? (
        <input type="text" onChange={handleInput} />
      ) : (
        <p>{titleChange}</p>
      )}

      <div className="button-container">
        {editMode ? (
          <div>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleEdit}>Discard</button>
          </div>
        ) : (
          <button onClick={handleEdit}>
            <img
              alt="edit"
              src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
            />
          </button>
        )}
        <button onClick={handleDelete}>
          <img
            alt="delete"
            src="https://cdn-icons-png.flaticon.com/128/1214/1214428.png"
          />
        </button>
      </div>
    </div>
  );
}

export default Albums;
