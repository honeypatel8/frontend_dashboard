import axios from "axios";

export default async function fetchWorkStatus(setStats) {
  const data = await axios.get("/employee/stats");
  setStats((stats) => {
    return { ...stats, employeeStats: data.data };
  });
}
