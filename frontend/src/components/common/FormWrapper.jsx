import React from "react";

const FormWrapper = ({ children }) => {
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
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormWrapper;
