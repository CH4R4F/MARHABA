import axios from "axios";
import useAuth from "./useAuth";

const useRefresh = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const res = await axios.get("http://localhost:5000/api/token/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => ({ ...prev, token: res.data.accessToken }));

    return res.data.accessToken;
  };

  return refresh;
};

export default useRefresh;
