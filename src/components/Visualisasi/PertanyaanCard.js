import BarChart from "./BarChart";
import PieChart from "./PieChart";
import classes from "./styles.module.css";
import DoughnutChart from "./DoughnutChart";
import ListChart from "./ListChart";
import HorizontalBarChart from "./HorizontalBar";

const PertanyaanCard = ({ pertanyaan, data, type, option }) => {
  if (type === "Skala Linear") {
    for (let i = 0; i < data.labels.length; i++) {
      data.labels[i] = Number(data.labels[i]) + 1;
    }
  }
  return (
    <div className={classes["pertanyaan-card"]}>
      <div className={classes["header-card"]}>
        <h3>{pertanyaan}</h3>
        <p style={{ fontSize: "12px", fontWeight: "500" }}>
          Tipe Pertanyaan:
          {type === "Pilihan Ganda" && " Pilihan Ganda"}
          {type === "Kotak Centang" && " Multiple Choice"}
          {type === "Skala Linear" && " Skala Linear"}
          {type === "Drop-Down" && " Drop Down"}
          {type === "Jawaban Singkat" && " Jawaban Singkat"}
        </p>
      </div>
      {type === "Pilihan Ganda" && <PieChart data={data} />}
      {type === "Kotak Centang" && <BarChart data={data} option={option} />}
      {type === "Skala Linear" && (
        <HorizontalBarChart data={data} option={option} />
      )}
      {type === "Drop-Down" && <DoughnutChart data={data} />}
      {type === "Jawaban Singkat" && <ListChart data={data} />}
    </div>
  );
};

export default PertanyaanCard;
