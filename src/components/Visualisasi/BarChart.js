import { Bar } from "react-chartjs-2";

const BarChart = ({ data }) => {
  data.datasets[0].backgroundColor = "#95BDFF";
  return <Bar data={data} />;
};

export default BarChart;
