import classes from "./styles.module.css";

const ListChart = ({ data }) => {
  return (
    <div className={classes["isian-wrapper"]}>
      {data.labels.map((isian, idx) => (
        <div key={`${isian} ${idx}`} className={classes["isian-list"]}>
          {isian}
        </div>
      ))}
    </div>
  );
};

export default ListChart;
