import Pilihan from "./Pilihan";
import Skala from "./Skala";
import classes from "./styles.module.css";

const CardPertanyaan = ({
  pertanyaan,
  tipe,
  index,
  required,
  option,
  changePertanyaanHandler,
  changeTipeHandler,
  changeRequiredHandler,
  changeOptionHandler,
  deleteQuestionHandler,
}) => {
  const tipeChangeHandler = e => {
    changeTipeHandler(index, e.target.value);
  };

  const pertanyaanChangeHandler = e => {
    changePertanyaanHandler(index, e.target.value);
  };

  const requiredChangeHandler = e => {
    changeRequiredHandler(index, e.target.checked);
  };

  const optionChangeHandler = e => {
    if (tipe === "Skala Linear") {
      changeOptionHandler(index, { banyak_skala: parseInt(e) });
    } else if (
      tipe === "Pilihan Ganda" ||
      tipe === "Kotak Centang" ||
      tipe === "Drop-Down"
    ) {
      changeOptionHandler(index, { data: e });
    }
  };

  return (
    <div className={classes.card}>
      <div className={classes.header}>
        <div className={classes["isian-pertanyaan"]}>
          <input
            type="text"
            onChange={pertanyaanChangeHandler}
            placeholder="Masukkan pertanyaan anda"
            value={pertanyaan}
          />
        </div>
        <div className={classes["drop-down"]}>
          <select
            name="tipe_pertanyaan"
            id="tipe_pertanyaan"
            value={tipe}
            onChange={tipeChangeHandler}
          >
            <option value="Jawaban Singkat">Jawaban Singkat</option>
            <option value="Pilihan Ganda">Pilihan Ganda</option>
            <option value="Kotak Centang">Kotak Centang</option>
            <option value="Drop-Down">Drop-Down</option>
            <option value="Skala Linear">Skala Linear</option>
          </select>
        </div>
      </div>
      <div className={classes.body}>
        {tipe === "Jawaban Singkat" && (
          <div className={classes["jawaban-singkat"]}>Teks Jawaban Singkat</div>
        )}
        {tipe === "Pilihan Ganda" && (
          <Pilihan
            option={option}
            changeOptionHandler={optionChangeHandler}
            type="radio"
          />
        )}
        {tipe === "Kotak Centang" && (
          <Pilihan
            option={option}
            changeOptionHandler={optionChangeHandler}
            type="checkbox"
          />
        )}
        {tipe === "Drop-Down" && (
          <Pilihan
            option={option}
            changeOptionHandler={optionChangeHandler}
            type="drop-down"
          />
        )}
        {tipe === "Skala Linear" && (
          <Skala option={option} changeHandler={optionChangeHandler} />
        )}
      </div>
      <div className={classes.footer}>
        <div className={classes.required}>
          <input
            id={index}
            type="checkbox"
            onChange={requiredChangeHandler}
            checked={required}
          />
          <label htmlFor={index}>required?</label>
        </div>
        <button
          className={classes["delete-question"]}
          onClick={deleteQuestionHandler}
        >
          <img
            id={index}
            src="https://i.ibb.co/ss3Z2yH/bin-1.png"
            alt="bin-1"
            border="0"
          />
        </button>
      </div>
    </div>
  );
};

export default CardPertanyaan;
