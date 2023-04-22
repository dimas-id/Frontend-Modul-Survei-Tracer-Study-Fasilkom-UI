import randomColor from "randomcolor";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ data }) => {
  const color = [];
  for (let i = 0; i < data.labels.length; i++) {
    color.push(randomColor());
  }
  data.datasets[0].backgroundColor = color;

  return <Doughnut data={data} />;
};

export default DoughnutChart;
