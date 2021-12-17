import "../AlbumStyle.css";

function AddAlbum({ addingAlbum }) {
  // Submitting new album
  const handleOnSubmit = (e) => {
    e.preventDefault();
    addingAlbum(e.target.title.value);
    e.target.title.value = "";
  };

  return (
    <div className="add-album">
      <form onSubmit={handleOnSubmit}>
        <input placeholder="Album Title" required name="title" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default AddAlbum;
