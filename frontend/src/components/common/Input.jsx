import React from "react";

const Input = ({ type, name, label, alt = "", required = false, placeholder }) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
        <span className="label-text-alt">{alt}</span>
      </label>
      <input
        required={required}
        name={name}
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full"
      />
    </div>
  );
};

export default Input;
