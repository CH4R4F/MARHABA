import { useState } from "react";
import Input from "../components/common/Input";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../utils/requests";
import { saveItem } from "../utils/localstorage";
import useAuth from "../hooks/useAuth";
import FormWrapper from "../components/common/FormWrapper";

let boilerplate = {
  email: "",
  password: "",
};

const Login = () => {
  const [user, setUser] = useState({ ...boilerplate });
  const [error, setError] = useState({ ...boilerplate, login: "" });
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  async function handleSubmit(e) {
    e.preventDefault();

    let data;
    try {
      data = await loginUser(user);
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "something went wrong";
      setError({ ...error, login: errorMessage });
      return;
    }
    saveItem("token", data.token);
    saveItem("user", data.user);
    setAuth({ token: data.token, user: data.user });
    navigate(from, { replace: true });
  }

  return (
    <FormWrapper>
      <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
        <h3 className="pt-4 text-2xl text-base-200 text-center">Login!</h3>
        {error.login && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center"
            role="alert"
          >
            <span className="block sm:inline">{error.login}</span>
          </div>
        )}
        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              value={user.email}
              setUser={setUser}
              setError={setError}
              label="Email"
              type="email"
              name="email"
              required={true}
              placeholder="Email"
            />
            <p className="text-xs italic text-red-500">{error.email}</p>
          </div>
          <div className="mb-4">
            <Input
              value={user.password}
              setUser={setUser}
              setError={setError}
              label="Password"
              type="password"
              name="password"
              required={true}
              placeholder="*************"
            />
            <p className="text-xs italic text-red-500">{error.password}</p>
          </div>
          <div className="mb-6 text-center">
            <button
              className="w-full px-4 py-2 font-bold text-white bg-primary rounded-full hover:bg-primary-focus focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
          <hr className="mb-6 border-t" />
          <div className="text-center">
            <Link
              className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
              to="/forget-password"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="text-center">
            You don't have an account?{" "}
            <Link className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" to="/register">
              Create an Account!
            </Link>
          </div>
        </form>
      </div>
    </FormWrapper>
  );
};

export default Login;
