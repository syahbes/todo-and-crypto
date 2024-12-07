"use client";
import { Coin } from "@/types";
import { Chart } from "chart.js/auto";
import { useEffect, useRef } from "react";


interface DoughnutChartProps {
  coins: Coin[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ coins }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Create new chart instance
    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: coins.map((coin) => coin.name),
        datasets: [
          {
            data: coins.map((coin) => coin.price),
            backgroundColor: ["#8BCFE8", "#9FC1D1", "#DDE9F2"], // Blue palette
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "top" as const,
          },
        },
      },
    });

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [coins]);

  return (
    <div style={{ width: "300px", height: "300px" }}>
      <canvas ref={chartRef} />;
    </div>
  );
};

export default DoughnutChart;
