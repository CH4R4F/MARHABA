import { useState, useContext } from "react";
import Input from "../components/common/Input";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import InputValidation from "../utils/InputValidation";
import { loginUser } from "../utils/requests";
import { saveItem } from "../utils/localstorage";

let boilerplate = {
  email: "",
  password: "",
};

const Login = () => {
  const [user, setUser] = useState({ ...boilerplate });
  const [error, setError] = useState({ ...boilerplate, login: "" });
  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    let err = false;
    const { email, password } = user;
    if (!InputValidation.isValidEmail(email)) {
      setError({ ...error, email: "please enter a valid email adress" });
      err = true;
    }

    if (!InputValidation.isValidPassword(password)) {
      setError({ ...error, password: "password should be atleast 8 characters" });
      err = true;
    }

    if (!err) {
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
      navigate("/dashboard");
    }
  }

  return (
    <div className="hero min-h-screen">
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex shadow-2xl">
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  "url('https://i.fbcd.co/products/resized/resized-750-500/637c28b2801cd5a86147a4eadada8661f0e81c948dae87caca3fe7d35d80ceb9.webp')",
              }}
            ></div>
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
                  <Link
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    to="/register"
                  >
                    Create an Account!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
