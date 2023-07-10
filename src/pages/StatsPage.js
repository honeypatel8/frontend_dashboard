import { useEffect, useState } from "react";
import fetchWorkStatus from "../apis/fetchWorkStatus";
import fetchEmployeeStats from "../apis/fetchEmployeeStats";
import BasicPie from "../components/PieChart";
import fetchDepartmentStats from "../apis/fetchDepartmentStats";

const StatsPage = () => {
  const [stats, setStats] = useState({
    workStateStats: [],
    employeeStats: [],
    departmentStats: [],
  });

  useEffect(() => {
    fetchWorkStatus(setStats);
    fetchEmployeeStats(setStats);
    fetchDepartmentStats(setStats);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BasicPie data={stats.workStateStats} title="Work State Data" />
      <BasicPie data={stats.employeeStats} title="Employee Data" />
      <BasicPie data={stats.departmentStats} title="Department Data" />
    </div>
  );
};

export default StatsPage;
