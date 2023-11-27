import React, { Component } from "react";
import Button from "./Button";

class NoteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
    };
    this.maxLength = 50;
    this.onSubmit = this.onSubmit.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.addNote(this.state);
    this.setState({
      title: "",
      body: "",
    });
  }

  onHandleChange(e) {
    // console.log(e.target.value);
    const charInput = e.target.value;
    return this.setState(() => {
      if (this.maxLength <= charInput.length) {
        return { title: charInput.slice(0, this.maxLength) };
      }
      return {
        title: e.target.value,
      };
    });
  }

  render() {
    return (
      <div className="note-input">
        <h1 className="note-input__title">Buat Catatan</h1>
        <p className="note-input__title__char-limit">
          Sisa karakter: {this.maxLength - this.state.title.length}
        </p>
        <form className="note-input__body" onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.title}
            placeholder="Ini adalah judul ..."
            onChange={this.onHandleChange}
            required
          />
          <textarea
            value={this.state.body}
            placeholder="Tuliskan catatanmu di sini ..."
            onChange={(e) => this.setState({ body: e.target.value })}
            required
          ></textarea>
          <Button type="submit">Buat</Button>
        </form>
      </div>
    );
  }
}

export default NoteInput;
