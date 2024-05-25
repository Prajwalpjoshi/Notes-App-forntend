import { useState, useEffect } from "react";
import axios from "axios";
import INote from "./interfaces/note.interfaces";
import Form from "./components/Form";
import Note from "./components/Note";

function App() {
  const [notes, setNotes] = useState<Array<INote>>([]);
  const [text, setText] = useState<String>("");
  const [content, setContent] = useState<String>("");
  const [isOpenForm, setIsOpenFrom] = useState<Boolean>(false);
  const [error, setError] = useState<String>("");

  const getNotes = async () => {
    try {
      const response = await axios.get(
        "https://noteappbackend-1.onrender.com/getNote"
      );
      setNotes(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleError = () => {
    if (!text) {
      setError("Text is required.");
      return true;
    }
    if (!content) {
      setError("Content is required.");
      return true;
    }
  };

  const handleClose = () => {
    setIsOpenFrom(false);
  };

  const handleOpen = () => {
    setIsOpenFrom(true);
  };

  const updateText = () => {
    const text = document.querySelectorAll("input")[0].value;
    setText(text);
  };

  const updateContent = () => {
    const text = document.querySelectorAll("input")[1].value;
    setContent(text);
  };

  const onDelete = async (note: INote) => {
    await axios.post("https://noteappbackend-1.onrender.com/deleteNote", note);
    getNotes();
  };

  const onCreate = async () => {
    let error = document.getElementById("error-holder");
    console.log(handleError());
    if (handleError()) {
      if (error != null) {
        error.style.display = "block";
      }
      console.log("error display");
      return;
    }
    if (error != null) {
      error.style.display = "none";
    }
    setIsOpenFrom(false);
    await axios.post("https://noteappbackend-1.onrender.com/createNote", {
      text,
      content,
    });
    resetForm();
    getNotes();
  };

  const resetForm = () => {
    setText("");
    setContent("");
  };

  const onNoteUpdated = async (note: INote) => {
    setNotes((notes) =>
      notes.map((oldNote: INote) => {
        return note._id === oldNote._id ? note : oldNote;
      })
    );
    axios.post("https://noteappbackend-1.onrender.com/modifyNote", note);
  };

  useEffect(() => {
    getNotes();
  }, []);

  let notesElement = notes.map((note) => {
    return (
      <Note
        key={note._id}
        onNoteUpdated={onNoteUpdated}
        note={note}
        onDelete={onDelete}
      />
    );
  });

  return (
    <div className="App">
      <div>
        <div className="notes-list">{notesElement}</div>
        <span className="material-symbols-outlined add" onClick={handleOpen}>
          add_circle
        </span>
        <Form
          updateText={updateText}
          updateContent={updateContent}
          onCreate={onCreate}
          handleClose={handleClose}
          error={error}
          isOpen={isOpenForm}
        />
      </div>
    </div>
  );
}

export default App;
