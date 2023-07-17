import axios from "axios";
export const updateProfileThroughAdmin = async (payload) => {
  const response = await axios.post("/admin/update", payload);
  return response;
};
