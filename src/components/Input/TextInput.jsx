import React from "react";
import classes from "./style.module.css";

const TextInput = ({ id, placeholder, valHandler, status }) => {
  function setValueHandler(valChange) {
    valHandler(valChange);
  }

  return (
    <div className={classes["input-wrapper"]} style={{ width: "100%" }}>
      {id === "deskripsi" && (
        <div style={{ fontWeight: "bold", fontSize: "1.1em" }}>deskripsi: </div>
      )}
      <input
        id={id}
        type="text"
        className={`${classes.placeholder} ${classes.red} ${classes.input} ${
          status ? classes["input-focus"] : ""
        }`}
        placeholder={placeholder}
        style={{
          backgroundColor: "white",
          padding: "5px 10px",
        }}
        onChange={e => {
          setValueHandler(e.target.value);
        }}
      ></input>
    </div>
  );
};

export default TextInput;
