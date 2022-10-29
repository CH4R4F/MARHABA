import React from "react";

const Input = ({ type, name, label, alt = "", required = false, placeholder, setUser, value, setError }) => {
  function handleChange(e) {
    setError({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      cpass: "",
    });
    setUser((prev) => ({ ...prev, [name]: e.target.value }));
  }

  return (
    <div className="form-control w-full">
      <label className="label" htmlFor={name}>
        <span className="label-text text-gray-700">{label}</span>
        <span className="label-text-alt">{alt}</span>
      </label>
      <input
        value={value}
        onChange={handleChange}
        id={name}
        required={required}
        name={name}
        type={type}
        placeholder={placeholder}
        className="input input-bordered text-base-200 border-base-300/20 focus:border-base-300 w-full"
      />
    </div>
  );
};

export default Input;
