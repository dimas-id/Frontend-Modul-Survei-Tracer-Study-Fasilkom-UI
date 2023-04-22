import randomColor from "randomcolor";
import { Pie } from "react-chartjs-2";

const PieChart = ({ data }) => {
  const color = [];
  for (let i = 0; i < data.labels.length; i++) {
    color.push(randomColor());
  }
  data.datasets[0].backgroundColor = color;

  return <Pie data={data} />;
};

export default PieChart;
