import axios from "axios";

export default async function fetchWorkStatus(setStats) {
  const data = await axios.get("/workstatuses/stats");
  setStats((stats) => {
    return { ...stats, workStateStats: data.data };
  });
}
