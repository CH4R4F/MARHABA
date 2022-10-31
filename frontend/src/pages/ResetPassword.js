import { useState } from "react";
import { useParams } from "react-router-dom";
import InputValidation from "../utils/InputValidation";
import FormWrapper from "../components/common/FormWrapper";
import Input from "../components/common/Input";
import { resetPassword } from "../utils/requests";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [data, setData] = useState({ password: "", cpass: "" });
  const [error, setError] = useState({ password: "", cpass: "", message: "" });
  const [sent, setSent] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    let err = false;
    const { password, cpass } = data;

    if (!InputValidation.isValidPassword(password)) {
      err = false;
      setError({ ...error, password: "Password is not valid, make sure it has atleast 8 characters" });
    }

    if (cpass !== password) {
      setError({ ...error, cpass: "passwords doesn't match" });
      err = true;
    }

    if (!err) {
      try {
        const res = await resetPassword(token, { password });
        if (res.success) {
          setSent(true);
        }
      } catch (err) {
        const errMessage = err?.response?.data?.message;
        setError({ ...error, message: errMessage });
      }
    }
  }

  if (sent) {
    setTimeout(() => {
      navigate("/login");
    }, 6000);
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-800">Password Reset Successful</h1>
        <p className="text-gray-600">You will be redirected to login page in 6 seconds</p>

        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          <Link to="/login">Login</Link>
        </button>
      </div>
    );
  }

  return (
    <FormWrapper>
      <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
        <h3 className="pt-4 text-2xl text-base-200 text-center">Reset Password</h3>
        {error.message && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center"
            role="alert"
          >
            <span className="block sm:inline">{error.message}</span>
          </div>
        )}
        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              value={data.password}
              setUser={setData}
              setError={setError}
              label="New Password"
              type="password"
              name="password"
              required={true}
              placeholder="*************"
            />
            <p className="text-xs italic text-red-500">{error.password}</p>
          </div>
          <div className="mb-4">
            <Input
              value={data.cpass}
              setUser={setData}
              setError={setError}
              label="Confirm Password"
              type="password"
              name="cpass"
              required={true}
              placeholder="*************"
            />
            <p className="text-xs italic text-red-500">{error.cpass}</p>
          </div>
          <button
            className="w-full px-4 py-2 font-bold text-white bg-primary rounded-full hover:bg-primary-focus focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </FormWrapper>
  );
};

export default ResetPassword;
