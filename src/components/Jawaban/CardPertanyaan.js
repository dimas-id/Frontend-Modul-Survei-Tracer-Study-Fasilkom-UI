import Pilihan from "./Pilihan";
import classes from "./styles.module.css";

const CardPertanyaan = ({
  pertanyaan,
  status,
  setStatus,
  tipe,
  index,
  wajibDiisi,
  pertanyaanId,
  opsiJawaban,
  handleInputChange,
}) => {
  const redStatus = status.status.includes(String(pertanyaanId));
  return (
    <div className={`${classes.card} ${redStatus ? classes.red : ""}`}>
      <div className={classes.header}>
        <div className={classes["isian-pertanyaan"]}>
          <span className={classes.pertanyaanText}>
            {pertanyaan}
            {wajibDiisi === true && <text style={{ color: "red" }}>*</text>}
          </span>
        </div>
      </div>
      <div className={classes.body}>
        {tipe === "Jawaban Singkat" && (
          <div>
            <input
              type="text"
              placeholder="Masukkan jawaban anda"
              className={classes.input}
              required={wajibDiisi}
              onChange={event => {
                handleInputChange(event, { pertanyaanId }, "text");
                setStatus({ pertanyaanId });
              }}
            />
          </div>
        )}
        {[
          "Pilihan Ganda",
          "Kotak Centang",
          "Drop-Down",
          "Skala Linear",
        ].includes(tipe) && (
          <Pilihan
            option={opsiJawaban}
            type={
              tipe === "Pilihan Ganda"
                ? "radio"
                : tipe === "Kotak Centang"
                ? "checkbox"
                : tipe === "Drop-Down"
                ? "drop-down"
                : "skala-linear"
            }
            pertanyaanId={pertanyaanId}
            wajibDiisi={wajibDiisi}
            handleInputChange={handleInputChange}
            setStatus={setStatus}
          />
        )}
      </div>
      <div className={classes.footer}>
        <div className={classes.required}>
          {redStatus && (
            <label htmlFor={index} style={{ color: "red" }}>
              *required
            </label>
          )}
          {redStatus === false && (
            <label htmlFor={index}>
              <br></br>
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardPertanyaan;
