import React, { FC, FocusEvent } from "react";
import INote from "../interfaces/note.interfaces";

type Props = {
  note: INote;
  onNoteUpdated: (note: INote) => void;
  onDelete: (note: INote) => void;
};

const Note: FC<Props> = ({ note, onNoteUpdated, onDelete }) => {
  const noteTextUpdated = (event: FocusEvent<HTMLHeadElement>) => {
    if (event.target.textContent === note.text) {
      return;
    }
    const newNote: INote = {
      ...note,
      text: event.currentTarget.textContent || "",
    };
    onNoteUpdated(newNote);
  };

  const onDeleteNote = () => {
    onDelete(note);
  };

  return (
    <div className="note">
      <span className="close delete-note" onClick={onDeleteNote}>
        X
      </span>
      <h4
        suppressContentEditableWarning={true}
        contentEditable
        className="note-text"
        onBlur={noteTextUpdated}
      >
        {note.text}
      </h4>
      <h4
        suppressContentEditableWarning={true}
        contentEditable
        className="note-text"
      >
        {note.content}
      </h4>
    </div>
  );
};

export default Note;
