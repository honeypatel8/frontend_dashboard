import axios from "axios";

export default async function fetchDepartmentStats(setStats) {
  const data = await axios.get("departments/stats");
  setStats((stats) => {
    return { ...stats, departmentStats: data.data };
  });
}
