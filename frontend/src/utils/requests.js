import axios from "axios";
const host = "http://localhost:5000";

export async function registerUser(user) {
  const res = await axios.post(`${host}/api/auth/register`, user);
  return res.data;
}

export async function loginUser(user) {
  const res = await axios.post(`${host}/api/auth/login`, user);
  return res.data;
}

export async function sendForgetPasswordEmail(email) {
  const res = await axios.post(`${host}/api/auth/forgetpassword`, email);
  return res.data;
}

export async function resetPassword(token, password) {
  const res = await axios.post(`${host}/api/auth/resetpassword/${token}`, password);
  return res.data;
}

export async function verifyUserByToken(token) {
  const res = await axios.get(`${host}/api/auth/confirm/${token}`);
  return res.data;
}
