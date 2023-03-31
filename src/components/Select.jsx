import React from "react";

const Select = ({ onChange, children, className, defaultValue, label,...props }) => {
  return (
    <div className={`relative ${className}`}>
      <select
        {...props}
        defaultValue={defaultValue}
        className="py-3 px-4 border w-full rounded-md placeholder-transparent focus:outline-none peer "
        onChange={onChange}
      >
        {children}
      </select>
      {label && (
        <label className="absolute capitalize left-2 -top-3  text-base text-gray-400 bg-secondary transition-all peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm">
          {label}
        </label>
      )}
    </div>
  );
};

export default Select;
