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

// Tentu, mari kita bahas algoritma yang digunakan dalam komponen `App` yang telah diperbarui dengan penanganan penyimpanan lokal (local storage):

// 1. **Constructor:**
//    - Menginisialisasi state komponen dengan catatan yang diambil dari penyimpanan lokal menggunakan `this.retrieveNotesFromLocalStorage()` atau dengan data awal jika tidak ada catatan yang tersimpan.

// 2. **Fungsi Penyimpanan Lokal:**
//    - `retrieveNotesFromLocalStorage()`: Mengambil catatan dari penyimpanan lokal. Jika ada catatan yang tersimpan, itu menguraikan data JSON; jika tidak, mengembalikan `null`.
//    - `saveNotesToLocalStorage(notes)`: Menyimpan catatan yang diberikan ke penyimpanan lokal setelah mengonversinya ke string JSON.

// 3. **Menambahkan Catatan (`onAddNoteHandle`):**
//    - Mengambil catatan saat ini dari state dan menambahkan catatan baru.
//    - Memperbarui state komponen dengan catatan baru.
//    - Memanggil `saveNotesToLocalStorage` untuk menyimpan catatan yang diperbarui di penyimpanan lokal.

// 4. **Menghapus Catatan (`onDeleteHandle`):**
//    - Memfilter catatan dengan `id` tertentu dari catatan saat ini di state.
//    - Memperbarui state komponen dengan catatan yang sudah difilter.
//    - Memanggil `saveNotesToLocalStorage` untuk menyimpan catatan yang diperbarui di penyimpanan lokal.

// 5. **Arsip Catatan (`onArchiveHandle`):**
//    - Melakukan pemetaan pada catatan saat ini di state dan mengganti properti `archived` dari catatan dengan `id` tertentu.
//    - Memperbarui state komponen dengan catatan yang sudah dimodifikasi.
//    - Memanggil `saveNotesToLocalStorage` untuk menyimpan catatan yang diperbarui di penyimpanan lokal.

// 6. **Mencari Catatan (`onSearchHandle`):**
//    - Mengatur `searchKeyword` di state komponen berdasarkan kata kunci pencarian yang diberikan untuk memfilter catatan.

// 7. **Rendering:**
//    - Merender komponen dengan state yang sudah diperbarui.
//    - Menampilkan catatan yang sudah difilter berdasarkan kata kunci pencarian.
//    - Meneruskan metode (`onAddNoteHandle`, `onDeleteHandle`, `onArchiveHandle`, dan `onSearchHandle`) sebagai prop ke komponen anak untuk interaksi.

// Secara keseluruhan, algoritma ini memastikan bahwa catatan diambil dari penyimpanan lokal ketika komponen dimuat, dan setiap perubahan pada catatan (penambahan, penghapusan, pengarsipan) tercermin baik dalam state komponen maupun penyimpanan lokal. Dengan cara ini, catatan tetap ada bahkan ketika halaman direfresh.
