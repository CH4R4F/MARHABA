import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Input from "../components/common/Input";
import InputValidation from "../utils/InputValidation";
import { registerUser } from "../utils/requests";
import { saveItem } from "../utils/localstorage";
import { useNavigate } from "react-router-dom";

const boilerplate = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  cpass: "",
};

const Register = () => {
  const [error, setError] = useState({ ...boilerplate, registration: "" });
  const [user, setUser] = useState({ ...boilerplate });

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    let err = false;
    const { first_name, last_name, email, password, cpass } = user;
    if (!InputValidation.isValidName(first_name)) {
      setError({ ...error, first_name: "first name should be a valid name (min 3 chars)" });
      err = true;
    }

    if (!InputValidation.isValidName(last_name)) {
      setError({ ...error, last_name: "last name should be a valid name (min 3 chars)" });
      err = true;
    }

    if (!InputValidation.isValidEmail(email)) {
      setError({ ...error, email: "please enter a valid email adress" });
      err = true;
    }

    if (!InputValidation.isValidPassword(password)) {
      setError({ ...error, password: "password should be atleast 8 characters" });
      err = true;
    }

    if (cpass !== password) {
      setError({ ...error, cpass: "passwords doesn't match" });
      err = true;
    }

    if (!err) {
      let data;
      try {
        data = await registerUser(user);
      } catch (error) {
        const errorMessage = error?.response?.data?.message || "something went wrong";
        setError({ ...error, registration: errorMessage });
        return;
      }
      const _token = data.token;
      saveItem("token", _token);
      saveItem("user", data.user);
      navigate("/dashboard");
    }
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  "url('https://i.fbcd.co/products/resized/resized-750-500/637c28b2801cd5a86147a4eadada8661f0e81c948dae87caca3fe7d35d80ceb9.webp')",
              }}
            ></div>
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-base-200 text-center">Create an Account!</h3>
              {error.registration && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center"
                  role="alert"
                >
                  <span className="block sm:inline">{error.registration}</span>
                </div>
              )}
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit}>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <Input
                      value={user.first_name}
                      setUser={setUser}
                      setError={setError}
                      label="First Name"
                      type="text"
                      name="first_name"
                      required={true}
                      placeholder="First Name"
                    />
                    <p className="text-xs italic text-red-500">{error.first_name}</p>
                  </div>
                  <div className="md:ml-2">
                    <Input
                      value={user.last_name}
                      setUser={setUser}
                      setError={setError}
                      label="Last name"
                      type="text"
                      name="last_name"
                      required={true}
                      placeholder="Last Name"
                    />
                    <p className="text-xs italic text-red-500">{error.last_name}</p>
                  </div>
                </div>
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
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
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
                  <div className="md:ml-2">
                    <Input
                      value={user.cpass}
                      setUser={setUser}
                      setError={setError}
                      label="Confrm Password"
                      type="password"
                      name="cpass"
                      required={true}
                      placeholder="*************"
                    />
                    <p className="text-xs italic text-red-500">{error.cpass}</p>
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-primary rounded-full hover:bg-primary-focus focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Create Account
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
                  <Link className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" to="/login">
                    Already have an account? Login!
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

export default Register;
