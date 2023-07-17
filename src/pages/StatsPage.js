import { useEffect, useState } from "react";
import fetchWorkStatus from "../apis/fetchWorkStatus";
import fetchEmployeeStats from "../apis/fetchEmployeeStats";
import BasicPie from "../components/PieChart";
import fetchDepartmentStats from "../apis/fetchDepartmentStats";
import {
  useGetDepartmentStatsQuery,
  useGetEmployeesStatsQuery,
  useGetWorkStateStatsQuery,
} from "../features/api/user";

const StatsPage = () => {
  const { data: employeedata, error } = useGetEmployeesStatsQuery();
  const { data: workStatedata } = useGetWorkStateStatsQuery();
  const { data: departmentdata } = useGetDepartmentStatsQuery();
  if (error) {
    console.log(error);
  }

  return (
    <div className="flex justify-center items-center">
      <BasicPie
        data={workStatedata ? workStatedata : []}
        title="Work State Data"
      />
      <BasicPie data={employeedata ? employeedata : []} title="Employee Data" />
      <BasicPie
        data={departmentdata ? departmentdata : []}
        title="Department Data"
      />
    </div>
  );
};

export default StatsPage;
