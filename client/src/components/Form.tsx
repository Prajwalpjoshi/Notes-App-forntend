import { error } from "console";
import React, { FC } from "react";

type Props = {
  updateText: () => void;
  updateContent: () => void;
  onCreate: () => void;
  handleClose: () => void;
  isOpen: Boolean;
  error: String;
};

const Form: FC<Props> = ({
  updateContent,
  updateText,
  isOpen,
  error,
  onCreate,
  handleClose,
}) => {
  return isOpen ? (
    <div className="create-container">
      <div className="create-form">
        <div className="form-close-container">
          <span className="close form-close" onClick={handleClose}>
            X
          </span>
        </div>
        <div className="error" id="error-holder">
          {error}
        </div>
        <div className="form-text">
          <span>Text: </span>
          <input type="text" id="text-input" onChange={updateText} />
        </div>
        <div className="form-content">
          <span>Content: </span>
          <input type="text" id="text-input" onChange={updateContent} />
        </div>
        <div className="form-btn">
          <button className="close-button" onClick={handleClose}>
            Close
          </button>
          <button className="create-button" onClick={onCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div> </div>
  );
};

export default Form;
