import axios from "axios";

export const deleteEmployee = async (payload) => {
  console.log(payload);
  const response = await axios.post("/employee/delete", payload);
  return response;
};
