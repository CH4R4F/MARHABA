import { useState } from "react";
import { Link } from "react-router-dom";
import FormWrapper from "../components/common/FormWrapper";
import Input from "../components/common/Input";
import { sendForgetPasswordEmail } from "../utils/requests";

const ForgetPassword = () => {
  const [email, setEmail] = useState({ email: "" });
  const [error, setError] = useState({ email: "" });
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await sendForgetPasswordEmail(email);
      if (res.success) {
        setSent(true);
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "something went wrong please try again later";
      setError({ email: errorMessage });
      setSent(false);
      return;
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-800">Email Sent</h1>
        <p className="text-gray-600">Please check your email for further instructions</p>

        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          <Link to="/login">Login</Link>
        </button>
      </div>
    );
  }

  return (
    <FormWrapper>
      <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
        <h3 className="pt-4 text-2xl text-base-200 text-center">Forget Password</h3>
        {error.email !== "" && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center"
            role="alert"
          >
            <span className="block sm:inline">{error.email}</span>
          </div>
        )}
        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit}>
          <div className="mb-4 md:flex md:justify-between">
            <Input
              value={email.email}
              setUser={setEmail}
              setError={setError}
              label="Email"
              type="email"
              name="email"
              required={true}
              placeholder="Email"
            />
          </div>
          <div className="mb-6 text-center">
            <button
              className="w-full px-4 py-2 font-bold text-white bg-primary rounded-full hover:bg-primary-focus focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </FormWrapper>
  );
};

export default ForgetPassword;
