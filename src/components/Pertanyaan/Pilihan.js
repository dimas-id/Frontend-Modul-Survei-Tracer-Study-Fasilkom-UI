import React from "react";
import classes from "./styles.module.css";

const Pilihan = ({ type, option, changeOptionHandler }) => {
  const addPilganHandler = () => {
    const newOpsi = option.data.slice();
    newOpsi.push("");
    changeOptionHandler(newOpsi);
  };

  return (
    <div>
      {option.data.map((el, idx) => {
        return (
          <div key={idx} className={classes.pilgan}>
            {type === "radio" && <div className={classes.circle}></div>}
            {type === "checkbox" && <div className={classes.square}></div>}
            {type === "drop-down" && <div className="">{idx + 1}. </div>}
            <input
              type="text"
              value={el}
              placeholder="Masukkan opsi jawaban"
              onChange={e => {
                const newOpsi = option.data.slice();
                newOpsi[idx] = e.target.value;
                changeOptionHandler(newOpsi);
              }}
            />
            <button
              onClick={() => {
                const newOpsi = option.data.slice();
                newOpsi.splice(idx, 1);
                changeOptionHandler(newOpsi);
              }}
            >
              <img
                src="https://i.ibb.co/V9PD3pF/x-mark.png"
                alt="x-mark"
                border="0"
              />
            </button>
          </div>
        );
      })}
      <div className={classes.pilgan}>
        {type === "radio" && <div className={classes.circle}></div>}
        {type === "checkbox" && <div className={classes.square}></div>}
        {type === "drop-down" && (
          <div className="">{option.data.length + 1}. </div>
        )}
        <button className={classes["btn-pilgan"]} onClick={addPilganHandler}>
          Tambahkan Lainnya
        </button>
      </div>
    </div>
  );
};

export default Pilihan;
