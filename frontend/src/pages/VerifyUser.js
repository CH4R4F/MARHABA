import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { verifyUserByToken } from "../utils/requests";
import NotFound from "./NotFound";

const VerifyUser = () => {
  const { token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    async function verifyUser() {
      try {
        await verifyUserByToken(token);
      } catch (error) {
        setError(true);
      }
    }
    verifyUser();
  });

  if (error) return <NotFound />;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Account Verified Successfully</h1>
      <p className="text-gray-600">You can now login to your account. </p>

      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        <Link to="/login">Login</Link>
      </button>
    </div>
  );
};

export default VerifyUser;
