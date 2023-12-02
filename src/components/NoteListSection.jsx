import React from "react";
import EmptyMessage from "./EmptyMessage";

function NoteListSection({ status, children, activedNotes, archivedNotes }) {
  return (
    <section>
      <h2>{status}</h2>
      <div className="notes-list">{children}</div>
      {status === "Catatan Aktif"
        ? !activedNotes.length && <EmptyMessage />
        : !archivedNotes.length && <EmptyMessage />}
    </section>
  );
}

export default NoteListSection;
