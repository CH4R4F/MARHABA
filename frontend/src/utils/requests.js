import axios from "axios";
const host = "http://localhost:5000";

export async function registerUser(user) {
  const res = await axios.post(`${host}/api/auth/register`, user);
  return res.data;
}
