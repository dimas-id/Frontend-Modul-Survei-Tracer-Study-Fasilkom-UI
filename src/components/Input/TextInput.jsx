import React from "react";
import "./style.css";

const TextInput = ({ id, placeholder, valHandler }) => {
  function setValueHandler(valChange) {
    valHandler(valChange);
  }

  return (
    <div className="input-wrapper">
      {id === "deskripsi" && (
        <div style={{ fontWeight: "bold", fontSize: "1.1em" }}>deskripsi: </div>
      )}
      <input
        id={id}
        type="text"
        className="placeholder"
        placeholder={placeholder}
        style={{
          backgroundColor: "white",
          padding: "5px 10px",
        }}
        onChange={e => setValueHandler(e.target.value)}
      ></input>
    </div>
  );
};

export default TextInput;
