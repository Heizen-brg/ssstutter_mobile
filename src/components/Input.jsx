import React from "react";

const Input = (props) => {
  const { label, className } = props;
  return (
    <div className={`relative ${className}`}>
      <input
        {...props}
        className={`py-3 px-4 border-b w-full ${
          label ? "placeholder-transparent" : ""
        } focus:outline-none peer `}
      />
      {label && (
        <label className="absolute capitalize left-2 -top-2.5  text-sm text-gray-400 transition-all bg-secondary peer-placeholder-shown:top-2.5 peer-focus:-top-2.5 peer-focus:text-sm">
          {label}
        </label>
      )}
    </div>
  );
};

export default Input;
