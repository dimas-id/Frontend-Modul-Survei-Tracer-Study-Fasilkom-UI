import { HorizontalBar } from "react-chartjs-2";

const HorizontalBarChart = ({ data, option }) => {
 
  data.datasets[0].backgroundColor = "#95BDFF";
  return <HorizontalBar data={data} options={option} />;
};

export default HorizontalBarChart;
