import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import { formatTime } from "../utils/helper";

const LineChart = ({
  id,
  data,
  xAxisLabel,
  yAxisLabel,
  datasetLabel,
  getDataProperty,
  lineColor,
}) => {
  const [chart, setChart] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      const labels = data.map((item) => formatTime(item.time)); // Assuming data is an array with time values
      const temperatures = data.map((item) => getDataProperty(item));

      if (chart) {
        chart.data.labels = labels;
        chart.data.datasets[0].data = temperatures;
        chart.data.datasets[0].borderColor = lineColor;
        chart.update();
      } else {
        setChart(
          new Chart(ctx, {
            type: "line",
            data: {
              labels: labels,
              datasets: [
                {
                  label: datasetLabel,
                  data: temperatures,
                  fill: false,
                  borderColor: lineColor,
                  tension: 0.1,
                },
              ],
            },
            options: {
              animation: {
                duration: 0,
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: xAxisLabel,
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: yAxisLabel,
                  },
                },
              },
            },
          })
        );
      }
    }
  }, [data, xAxisLabel, yAxisLabel, datasetLabel, getDataProperty]);

  return (
    <div style={{ height: "60vh" }}>
      <canvas
        ref={chartRef}
        id={`${id}`}
        style={{ width: "50vw", height: "60vh" }}
      ></canvas>
    </div>
  );
};

export default LineChart;
