import classes from "./styles.module.css";

const SurveiCard = ({ survei, deskripsi, responden }) => {
  return (
    <div className={classes["pertanyaan-card"]}>
      <div className={classes["header-card"]}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <h2>{survei}</h2>{" "}
          <span style={{ fontWeight: 400, color: "#0EA293", fontSize: "13px", marginBottom: "20px" }}>
            {responden} Responden
          </span>
        </div>
        <div>{deskripsi}</div>
      </div>
    </div>
  );
};

export default SurveiCard;
