import React, { Component } from "react";
import Header from "./components/Header";
import { getInitialData, showFormattedDate } from "./utils";
import NoteList from "./components/NoteList";
import NoteInput from "./components/NoteInput";
import NoteAppBody from "./components/NoteAppBody";
import autoBind from "react-autobind";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: this.retrieveNotesFromLocalStorage() || getInitialData(),
      searchKeyword: "",
    };
    autoBind(this);
  }

  retrieveNotesFromLocalStorage() {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : null;
  }

  saveNotesToLocalStorage(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  onAddNoteHandle({ title, body }) {
    this.setState(
      ({ notes }) => ({
        notes: [
          ...notes,
          {
            id: +new Date(),
            title: title,
            body,
            createdAt: showFormattedDate(new Date()),
            archived: false,
          },
        ],
      }),
      () => this.saveNotesToLocalStorage(this.state.notes)
    );
  }

  onDeleteHandle(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes }, () => this.saveNotesToLocalStorage(notes));
  }

  onArchiveHandle(id) {
    this.setState(
      (prevState) => ({
        notes: prevState.notes.map((note) =>
          note.id === id ? { ...note, archived: !note.archived } : note
        ),
      }),
      () => this.saveNotesToLocalStorage(this.state.notes)
    );
  }

  onSearchHandle(keyword) {
    this.setState({ searchKeyword: keyword });
  }

  render() {
    // console.log(this.state.notes);
    const { notes, searchKeyword } = this.state;
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    return (
      <React.Fragment>
        <Header onSearch={this.onSearchHandle} />
        <NoteAppBody>
          <NoteInput addNote={this.onAddNoteHandle} />
          <NoteList
            notes={filteredNotes}
            onDelete={this.onDeleteHandle}
            onArchive={this.onArchiveHandle}
          />
        </NoteAppBody>
      </React.Fragment>
    );
  }
}

export default App;
