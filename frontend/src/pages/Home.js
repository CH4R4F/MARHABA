import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">MARHABA</h1>
          <p className="py-6">
            Welcome to the MARHABA restaurant. We are happy to serve you. But first you need to login or register to
            continue.
          </p>
          <div className="space-x-6">
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
