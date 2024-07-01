import * as echarts from "echarts";
import { useEffect } from "react";
/**
 * a echart component
 * @param {props}  -the data that the chart required
 * @returns
 */
const Chart = (props) => {
  const getAssessmentNum = () => {
    let arr = [];
    props.chartData.map((item, index) => {
      arr.push("assessment" + (index + 1));
      item.data = item.data.map((i) => i - 1);
    });
    return arr;
  };
  /**
   * init the chart
   */
  useEffect(() => {
    let chartDom = document.getElementById("main");
    let myChart = echarts.init(chartDom);
    let option;
    option = {
      xAxis: {
        type: "category",
        data: [
          "head",
          "trunk",
          "pelvic",
          "head ant",
          "thoracic",
          "lumbar",
          "trunk inc",
          "pelvic tilt",
          "hip",
          "knee",
          "elbow",
        ],
      },
      yAxis: {
        type: "category",
        data: ["left1", "left2", "mid3", "right2", "right1"],
      },
      legend: {
        data: getAssessmentNum(),
      },
      series: props.chartData,
    };

    option && myChart.setOption(option);
    return () => myChart.dispose();
  }, [props]);

  return <div className="w-full h-80" id="main"></div>;
};

export default Chart;
