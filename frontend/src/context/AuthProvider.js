import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      setAuth({ token, user });
    }
  }, []);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;
