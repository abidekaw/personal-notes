import React from "react";
import NoteItem from "./NoteItem";
import NoteView from "./NoteView";

function NoteList({ notes, onDelete, onArchive }) {
  const activedNotes = notes.filter((note) => !note.archived);
  const archivedNotes = notes.filter((note) => note.archived);

  return (
    <React.Fragment>
      <NoteView status="Catatan Aktif" activedNotes={activedNotes}>
        {activedNotes.map((note) => (
          <NoteItem
            key={note.id}
            {...note}
            onDelete={onDelete}
            onArchive={onArchive}
            isArchived={note.archive}
          />
        ))}
      </NoteView>

      <NoteView status="Arsip" archivedNotes={archivedNotes}>
        {archivedNotes.map((note) => (
          <NoteItem
            key={note.id}
            {...note}
            onDelete={onDelete}
            onArchive={onArchive}
            isArchived={!note.archive}
          />
        ))}
      </NoteView>
    </React.Fragment>
  );
}

export default NoteList;
