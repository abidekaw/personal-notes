import React from "react";
import EmptyMessage from "./EmptyMessage";

export default function NoteView(props) {
  const { status, children, activedNotes, archivedNotes } = props;
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
