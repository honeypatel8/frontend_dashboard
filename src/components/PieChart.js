import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

export default function BasicPie({ data, title }) {
  const TOTAL = data?.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <>
      <div className="flex flex-col justify-center p-[1rem] m-[1rem] shadow-md space-y-2 ">
        <h1 className="text-center">{title}</h1>

        <PieChart
          series={[
            {
              data: data,
              arcLabel: getArcLabel,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: "white",
              fontSize: 14,
            },
          }}
          width={400}
          height={200}
        />
      </div>
    </>
  );
}
