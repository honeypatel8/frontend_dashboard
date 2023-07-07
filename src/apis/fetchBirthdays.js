import axios from "axios";

export default async function fetchBirthDay(setGreetings) {
  const data = await axios.get("employee/birthday");
  setGreetings(data.data);
}
