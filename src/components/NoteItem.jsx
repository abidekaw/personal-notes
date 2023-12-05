import React, { useState } from "react";
import Button from "./Button";

function NoteItem({
  id,
  title,
  createdAt,
  body,
  onDelete,
  onArchive,
  isArchived,
  onUpdated,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedBody, setUpdatedBody] = useState(body);

  const handleUpdate = () => {
    onUpdated(id, updatedBody);
    setIsEditing(false);
  };

  return (
    <div className="note-item">
      <div className="note-item__content">
        <h3 className="note-item__title">{title}</h3>
        <p className="note-item__date">{createdAt}</p>
        {isEditing ? (
          <textarea
            className="note-item__body-update"
            value={updatedBody}
            onChange={(e) => setUpdatedBody(e.target.value)}
            rows={10}
          />
        ) : (
          <p className="note-item__body">{body}</p>
        )}
      </div>
      <div className="note-item__action">
        <Button status="delete" onClick={() => onDelete(id)}>
          Delete
        </Button>
        <Button status="archive" onClick={() => onArchive(id)}>
          {!isArchived ? "Arsipkan" : "Pindahkan"}
        </Button>
        {!isEditing ? (
          <Button status="edit" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        ) : (
          <Button status="edit" onClick={handleUpdate}>
            Update
          </Button>
        )}
      </div>
    </div>
  );
}

export default NoteItem;

function NoteDetail() {
  return <h1>Note Detail</h1>;
}
