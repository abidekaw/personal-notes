import React from "react";

function Header({ onSearch }) {
  return (
    <header className="note-app__header">
      <h1>Notes</h1>
      <div className="note-search">
        <input
          type="search"
          placeholder="Cari catatan ..."
          onChange={(e) => onSearch(e.target.value)}
          autocomplate="off"
        />
      </div>
    </header>
  );
}

export default Header;
