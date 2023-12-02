import React from "react";
import Button from "./Button";

function NoteItem({
  id,
  title,
  createdAt,
  body,
  onDelete,
  onArchive,
  isArchived,
}) {
  return (
    <div className="note-item">
      <div className="note-item__content">
        <h3 className="note-item__title">{title}</h3>
        <p className="note-item__date">{createdAt}</p>
        <p className="note-item__body">{body}</p>
      </div>
      <div className="note-item__action">
        <Button status="delete" onClick={() => onDelete(id)}>
          Delete
        </Button>
        <Button status="archive" onClick={() => onArchive(id)}>
          {!isArchived ? "Arsipkan" : "Pindahkan"}
        </Button>
      </div>
    </div>
  );
}

export default NoteItem;
