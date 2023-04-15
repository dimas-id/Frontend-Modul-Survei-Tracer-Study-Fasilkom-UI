import React from "react";
import classes from "./styles.module.css";

const Pilihan = ({
  type,
  option,
  pertanyaanId,
  wajibDiisi,
  handleInputChange,
  setStatus,
}) => {
  return (
    <div>
      {type === "radio" &&
        option
          .filter(item => item.pertanyaanId === pertanyaanId)
          .map(el => {
            return (
              <div
                className={classes.pertanyaanText}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: "10px",
                  fontSize: "15px",
                }}
              >
                <input
                  type="radio"
                  name={pertanyaanId}
                  value={el.opsiJawaban}
                  required={wajibDiisi}
                  onChange={event => {
                    handleInputChange(event, { pertanyaanId }, "radio");
                    setStatus({ pertanyaanId });
                  }}
                />
                {<text>{el.opsiJawaban}</text>}
                <br />
              </div>
            );
          })}
      {type === "checkbox" &&
        option
          .filter(item => item.pertanyaanId === pertanyaanId)
          .map(el => {
            return (
              <div
                className={classes.pertanyaanText}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: "10px",
                  fontSize: "15px",
                }}
              >
                <input
                  type="checkbox"
                  value={el.opsiJawaban}
                  required={wajibDiisi}
                  onChange={event => {
                    handleInputChange(event, { pertanyaanId }, "check-box");
                    setStatus({ pertanyaanId });
                  }}
                />
                {<text>{el.opsiJawaban}</text>}
                <br />
              </div>
            );
          })}
      {type === "drop-down" && (
        <select
          className={classes.input}
          required={wajibDiisi}
          onChange={event => {
            handleInputChange(event, { pertanyaanId }, "drop-down");
            setStatus({ pertanyaanId });
          }}
        >
          <option value="">Not Selected</option>
          {option
            .filter(item => item.pertanyaanId === pertanyaanId)
            .map((el, idx) => (
              <option value={el.opsiJawaban}>{el.opsiJawaban}</option>
            ))}
        </select>
      )}
      {type === "skala-linear" && (
        <div
          className={classes.linearScale}
          style={{ display: "flex", justifyContent: "center", gap: "30px" }}
        >
          {option
            .filter(item => item.pertanyaanId === pertanyaanId)
            .map(el => (
              <div>
                <span style={{ fontSize: "18px", marginLeft: "-8px" }}>
                  {parseInt(el.opsiJawaban) + 1}
                </span>
                <div>
                  <input
                    type="radio"
                    name={pertanyaanId}
                    value={el.opsiJawaban}
                    required={wajibDiisi}
                    onChange={event => {
                      handleInputChange(event, { pertanyaanId }, "radio");
                      setStatus({ pertanyaanId });
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Pilihan;
