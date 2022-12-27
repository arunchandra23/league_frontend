import React from "react";
import "./Modal.css";

function Modal({ text,handleClose }) {
  return (
    <div
      className="ui raised segment"
      style={{
        zIndex: 100,
        position: "absolute",
        top: "25%",
        left: "25%",
        width: "50%",
        height: "50%",
      }}
    >
      <div className="textContainer">{text}</div>

      <div className="buttonContainer">
        <button onClick={()=>{
            handleClose(false)
        }} className="ui button">close</button>
      </div>
    </div>
  );
}

export default Modal;
