import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-primary">
      <h1 className="text-9xl font-extrabold text-secondary tracking-widest">404</h1>
      <div className="bg-black px-2 text-sm rounded rotate-12 absolute">Page Not Found</div>
      <button className="mt-5">
        <Link
          to={{
            pathname: "/",
            state: {
              from: "NotFound",
            },
          }}
          className="relative inline-block text-sm font-medium text-secondary group active:text-orange-500 focus:outline-none focus:ring"
        >
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-secondary group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block px-8 py-3 bg-primary border border-current">Go Home</span>
        </Link>
      </button>
    </main>
  );
};

export default NotFound;
