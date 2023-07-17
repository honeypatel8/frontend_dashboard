import axios from "axios";

export const fetchAllEmployees = async () => {
  const response = await axios.get("/employee");

  return response;
};
