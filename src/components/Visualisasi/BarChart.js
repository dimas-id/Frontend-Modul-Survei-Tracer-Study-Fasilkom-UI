import { Bar } from "react-chartjs-2";

const BarChart = ({ data, option }) => {
  data.datasets[0].backgroundColor = "#95BDFF";
  return <Bar data={data} options={option} />;
};

export default BarChart;
