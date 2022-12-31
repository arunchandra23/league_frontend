import React from "react";
import "./Modal.css";

function Modal({ text,handleClose }) {
  return (
    <div className="overlay">
    <div
      className=" ui raised segment"
      style={{
         zIndex: 100,
         display:'flex',
         flexDirection: 'column',
         justifyContent:'space-around',
        // top: "25%",
        // left: "25%",
        minHeight:250,
        width: "50%",
        // height: "50%",
      }}
    >
      <div className="modal-text">{text}</div>

      <div className="modal-button">
        <button onClick={()=>{
            handleClose(false)
        }} className="ui button">close</button>
      </div>
    </div>
    </div>
  );
}

export default Modal;
