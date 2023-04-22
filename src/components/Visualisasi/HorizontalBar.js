import { HorizontalBar } from "react-chartjs-2";

const HorizontalBarChart = ({ data }) => {
  data.datasets[0].backgroundColor = "#95BDFF";
  return <HorizontalBar data={data} />;
};

export default HorizontalBarChart;
