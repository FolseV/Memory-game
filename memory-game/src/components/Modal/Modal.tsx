import React from "react";
import "./Modal.css";

interface Props {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  restart: () => void;
  moves: number;
}

const Modal: React.FC<Props> = (props) => {
  // onClick={() => props.setActive(false)}
  return (
    <div className={props.active ? "modal active" : "modal"}>
      <div
        className={props.active ? "modal__content active" : "modal__content "}
        onClick={(e) => e.stopPropagation}
      >
        <div className="modal__title">{props.message}</div>
        <div className="modal__body">
          <p>You WON! with {props.moves} moves.</p>
        </div>
        {/* <button className="modal_button">Close</button> */}
        <button className="modal_button" onClick={props.restart}>
          Restart
        </button>
      </div>
    </div>
  );
};

export default Modal;
