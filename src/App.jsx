import React, { Component } from "react";
import Header from "./components/Header";
import { getInitialData, showFormattedDate } from "./utils";
import NoteList from "./components/NoteList";
import NoteInput from "./components/NoteInput";
import NoteAppBody from "./components/NoteAppBody";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      searchKeyword: "",
    };
    this.onDeleteHandle = this.onDeleteHandle.bind(this);
    this.onArchiveHandle = this.onArchiveHandle.bind(this);
    this.onAddNoteHandle = this.onAddNoteHandle.bind(this);
    this.onSearchHandle = this.onSearchHandle.bind(this);
  }

  onAddNoteHandle({ title, body }) {
    this.setState(({ notes }) => ({
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
    }));
  }

  onDeleteHandle(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  onArchiveHandle(id) {
    this.setState((prevState) => ({
      notes: prevState.notes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      ),
    }));
  }

  onSearchHandle(keyword) {
    this.setState({ searchKeyword: keyword });
  }

  render() {
    // console.log(this.state.notes);
    const filteredNotes = this.state.notes.filter((note) => {
      return note.title
        .toLowerCase()
        .includes(this.state.searchKeyword.toLowerCase());
    });

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
