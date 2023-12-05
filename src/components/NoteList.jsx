import React from "react";
import NoteItem from "./NoteItem";
import NoteListSection from "./NoteListSection";

function NoteList({ notes, onDelete, onArchive, onUpdated }) {
  const activedNotes = notes.filter((note) => !note.archived);
  const archivedNotes = notes.filter((note) => note.archived);

  return (
    <>
      <NoteListSection status="Catatan Aktif" activedNotes={activedNotes}>
        {activedNotes.map((note) => (
          <NoteItem
            key={note.id}
            {...note}
            onDelete={onDelete}
            onArchive={onArchive}
            isArchived={note.archive}
            onUpdated={onUpdated}
          />
        ))}
      </NoteListSection>

      <NoteListSection status="Arsip" archivedNotes={archivedNotes}>
        {archivedNotes.map((note) => (
          <NoteItem
            key={note.id}
            {...note}
            onDelete={onDelete}
            onArchive={onArchive}
            isArchived={!note.archive}
            onUpdated={onUpdated}
          />
        ))}
      </NoteListSection>
    </>
  );
}

export default NoteList;
