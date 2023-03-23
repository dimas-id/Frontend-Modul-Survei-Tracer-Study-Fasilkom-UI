import classes from "./styles.module.css";

const Skala = ({ option, changeHandler }) => {
  const skalaList = ["2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const optionChangeHandler = e => {
    changeHandler(e.target.value);
  };

  return (
    <div>
      <div className={classes["select-input-wrapper"]}>
        <div>Banyak skala</div>
        <div>
          <select
            name="high"
            id="high"
            value={option.banyak_skala}
            onChange={optionChangeHandler}
          >
            {skalaList.map(el => {
              return <option key={el} value={el}>{el}</option>;
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Skala;
